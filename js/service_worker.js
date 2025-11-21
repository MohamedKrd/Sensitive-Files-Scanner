// ========================================
// SERVICE WORKER (Background Script)
// ========================================

console.log('0xZAXOYI Service Worker loaded');

// Listen for scan requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startScan') {
        handleScan(request.domain, request.settings, sendResponse);
        return true; // Keep channel open for async response
    }
});

/**
 * Main scan handler
 */
async function handleScan(domain, settings, sendResponse) {
    try {
        // Load payloads
        const response = await fetch(chrome.runtime.getURL('data/payloads.json'));
        const data = await response.json();

        // Filter enabled categories
        const enabledCategories = settings.enabledCategories || [];
        const payloadsToTest = [];

        for (const category of data.payloads) {
            if (enabledCategories.includes(category.type)) {
                for (const item of category.items) {
                    payloadsToTest.push({
                        path: item,
                        type: category.type,
                        severity: category.severity
                    });
                }
            }
        }

        sendResponse({
            success: true,
            totalPayloads: payloadsToTest.length,
            message: 'Scan started'
        });

        // Start scanning with concurrency control
        await scanWithConcurrency(domain, payloadsToTest, settings);

    } catch (error) {
        console.error('Scan error:', error);
        sendResponse({
            success: false,
            error: error.message
        });
    }
}

/**
 * Scan with concurrency control
 */
async function scanWithConcurrency(domain, payloads, settings) {
    const maxConcurrent = settings.maxConcurrent || 10;
    const delayBetween = settings.delayBetween || 100;
    const timeout = settings.requestTimeout || 5000;

    const results = [];
    let checked = 0;

    // Process in batches
    for (let i = 0; i < payloads.length; i += maxConcurrent) {
        const batch = payloads.slice(i, i + maxConcurrent);
        const batchPromises = batch.map(payload =>
            checkPath(domain, payload, timeout)
        );

        const batchResults = await Promise.allSettled(batchPromises);

        batchResults.forEach((result, idx) => {
            checked++;
            const payload = batch[idx];

            if (result.status === 'fulfilled') {
                const scanResult = result.value;
                results.push(scanResult);

                // Send progress update
                chrome.runtime.sendMessage({
                    action: 'scanProgress',
                    data: {
                        checked,
                        total: payloads.length,
                        result: scanResult
                    }
                });
            } else {
                // Handle error
                results.push({
                    url: domain + payload.path,
                    path: payload.path,
                    type: payload.type,
                    status: 'error',
                    statusCode: 0,
                    classification: 'safe'
                });
            }
        });

        // Delay between batches
        if (i + maxConcurrent < payloads.length) {
            await sleep(delayBetween);
        }
    }

    // Send completion
    chrome.runtime.sendMessage({
        action: 'scanComplete',
        data: {
            results,
            domain
        }
    });
}

/**
 * Check single path
 */
async function checkPath(domain, payload, timeout) {
    const url = domain + payload.path;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            method: 'GET',
            signal: controller.signal,
            redirect: 'follow', // Follow redirects to check final URL
            cache: 'no-cache'
        });

        clearTimeout(timeoutId);

        const statusCode = response.status || 0;

        // Check for redirects
        // If the final URL is different from the requested URL (ignoring trailing slashes), it's likely a redirect to homepage/login
        const finalUrl = response.url;
        const requestedUrl = url;

        // Simple normalization to compare URLs (remove trailing slashes)
        const normFinal = finalUrl.replace(/\/+$/, '');
        const normRequested = requestedUrl.replace(/\/+$/, '');

        const isRedirected = response.redirected || (normFinal !== normRequested && !normFinal.includes(normRequested));

        // If redirected, treat as safe (not the actual file)
        if (isRedirected) {
            return {
                url,
                path: payload.path,
                type: payload.type,
                severity: payload.severity,
                status: 'redirected',
                statusCode: statusCode,
                classification: 'safe' // Mark as safe because it's just a redirect
            };
        }

        return {
            url,
            path: payload.path,
            type: payload.type,
            severity: payload.severity,
            status: response.ok ? 'found' : 'not_found',
            statusCode,
            classification: classifyFromType(payload.type, response.ok)
        };

    } catch (error) {
        // Error likely means not found or blocked
        return {
            url,
            path: payload.path,
            type: payload.type,
            severity: payload.severity,
            status: 'error',
            statusCode: 0,
            classification: 'safe',
            error: error.message
        };
    }
}

/**
 * Classify result based on type and success
 */
function classifyFromType(type, found) {
    if (!found) return 'safe';

    // Critical
    if (['config_files', 'env_files', 'vcs_exposed', 'backup_files', 'directories'].includes(type)) {
        return 'danger';
    }

    // Warning
    if (['logs', 'temporary_files'].includes(type)) {
        return 'warning';
    }

    // Low priority
    return 'warning';
}

/**
 * Sleep helper
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Install/Update handler
chrome.runtime.onInstalled.addListener(() => {
    console.log('0xZAXOYI installed');

    // Set default settings
    chrome.storage.local.get(['settings'], (result) => {
        if (!result.settings) {
            chrome.storage.local.set({
                settings: {
                    enabledCategories: [
                        'backup_files',
                        'config_files',
                        'env_files',
                        'logs',
                        'temporary_files',
                        'directories',
                        'api_documentation',
                        'vcs_exposed',
                        'misc'
                    ],
                    requestTimeout: 5000,
                    delayBetween: 100,
                    maxConcurrent: 10
                }
            });
        }
    });
});
