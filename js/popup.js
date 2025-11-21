// ========================================
// POPUP.JS - Main Dashboard
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
    // Check for active scan first - persist indefinitely until user clicks "New Scan"
    const data = await getStorage(['currentScan']);
    if (data.currentScan && data.currentScan.startTime) {
        // Always redirect to results if scan exists (until manually cleared)
        window.location.href = 'results.html';
        return;
    }

    // Load stats
    await loadStats();

    // Auto-fill current tab domain
    await autoFillDomain();

    // Event listeners
    document.getElementById('startScanBtn').addEventListener('click', startScan);
    document.getElementById('targetDomain').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startScan();
    });
});

/**
 * Load dashboard stats
 */
async function loadStats() {
    const data = await getStorage(['scanHistory', 'totalFindings']);

    const scanHistory = data.scanHistory || [];
    let totalFindings = 0;
    let criticalFindings = 0;

    scanHistory.forEach(scan => {
        if (scan.results) {
            scan.results.forEach(result => {
                if (result.classification === 'danger') {
                    totalFindings++;
                    criticalFindings++;
                } else if (result.classification === 'warning') {
                    totalFindings++;
                }
            });
        }
    });

    document.getElementById('totalScans').textContent = scanHistory.length;
    document.getElementById('totalFindings').textContent = totalFindings;
    document.getElementById('criticalFindings').textContent = criticalFindings;
}

/**
 * Auto-fill domain from active tab
 */
async function autoFillDomain() {
    try {
        const url = await getActiveTabURL();
        if (url) {
            const normalized = normalizeDomain(url);
            if (normalized) {
                document.getElementById('targetDomain').value = normalized;
            }
        }
    } catch (error) {
        console.log('Could not auto-fill domain:', error);
    }
}

/**
 * Start scan
 */
async function startScan() {
    const input = document.getElementById('targetDomain');
    const btn = document.getElementById('startScanBtn');
    const btnText = document.getElementById('btnText');

    let domain = input.value.trim();

    // Validate
    if (!domain) {
        showToast('Please enter a domain', 'error');
        input.focus();
        return;
    }

    // Normalize
    domain = normalizeDomain(domain);
    if (!domain) {
        showToast('Invalid domain format', 'error');
        input.focus();
        return;
    }

    // Get settings
    const data = await getStorage(['settings']);
    const settings = data.settings || getDefaultSettings();

    // Update UI
    btn.disabled = true;
    btn.classList.add('scanning');
    btnText.textContent = 'Starting...';

    try {
        // Start scan via service worker
        chrome.runtime.sendMessage({
            action: 'startScan',
            domain,
            settings
        }, (response) => {
            if (response && response.success) {
                // Store scan info and open results page
                chrome.storage.local.set({
                    currentScan: {
                        domain,
                        startTime: new Date().toISOString(),
                        totalPayloads: response.totalPayloads,
                        results: []
                    }
                }, () => {
                    // Open results page
                    window.location.href = 'results.html';
                });
            } else {
                showToast('Failed to start scan', 'error');
                btn.disabled = false;
                btn.classList.remove('scanning');
                btnText.textContent = 'Start Scan';
            }
        });

    } catch (error) {
        console.error('Scan error:', error);
        showToast('Error starting scan', 'error');
        btn.disabled = false;
        btn.classList.remove('scanning');
        btnText.textContent = 'Start Scan';
    }
}
