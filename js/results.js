// ========================================
// RESULTS.JS - Live Scan Results
// ========================================

let currentScan = null;
let allResults = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
    // Load current scan
    const data = await getStorage(['currentScan']);
    currentScan = data.currentScan;

    if (!currentScan) {
        // No active scan, redirect to dashboard
        window.location.href = 'popup.html';
        return;
    }

    // Update UI
    updateScanInfo();

    // Load existing results if scan is complete or in progress
    if (currentScan.results && currentScan.results.length > 0) {
        allResults = currentScan.results;
        allResults.forEach(result => renderResult(result));
        updateStats();

        // If scan is complete, update status
        if (currentScan.endTime) {
            document.getElementById('scanStatus').textContent = 'COMPLETE';
            document.getElementById('scanStatus').style.background = 'rgba(0, 255, 65, 0.3)';
            document.getElementById('progressFill').style.width = '100%';
            document.getElementById('progressText').textContent = `${allResults.length} / ${allResults.length} checked`;
        }
    }

    // Listen for scan progress
    chrome.runtime.onMessage.addListener(handleScanMessage);

    // Event listeners
    document.getElementById('filterResults').addEventListener('change', handleFilterChange);
    document.getElementById('exportBtn').addEventListener('click', exportResults);
    document.getElementById('saveHistoryBtn').addEventListener('click', saveToHistory);

    const newScanBtn = document.getElementById('newScanBtn');
    if (newScanBtn) {
        newScanBtn.addEventListener('click', async () => {
            await setStorage({ currentScan: null });
            window.location.href = 'popup.html';
        });
    }
});

/**
 * Update scan information
 */
function updateScanInfo() {
    document.getElementById('scanDomain').textContent = currentScan.domain;
    document.getElementById('scanDate').textContent = formatDate(currentScan.startTime);
}

/**
 * Handle messages from service worker
 */
function handleScanMessage(message) {
    if (message.action === 'scanProgress') {
        handleProgress(message.data);
    } else if (message.action === 'scanComplete') {
        handleComplete(message.data);
    }
}

/**
 * Handle scan progress update
 */
function handleProgress(data) {
    const { checked, total, result } = data;

    // Update progress bar
    const percentage = (checked / total) * 100;
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${checked} / ${total} checked`;

    // Add result to list
    allResults.push(result);

    // Save results to storage immediately for persistence
    if (currentScan) {
        currentScan.results = allResults;
        setStorage({ currentScan });
    }

    // Update stats
    updateStats();

    // Render result
    renderResult(result);
}

/**
 * Handle scan completion
 */
function handleComplete(data) {
    console.log('Scan complete:', data);

    // Update status
    document.getElementById('scanStatus').textContent = 'COMPLETE';
    document.getElementById('scanStatus').style.background = 'rgba(0, 255, 65, 0.3)';

    // Update current scan in storage
    currentScan.results = allResults;
    currentScan.endTime = new Date().toISOString();

    setStorage({ currentScan });

    showToast('Scan completed', 'success');
}

/**
 * Update statistics
 */
function updateStats() {
    let safeCount = 0;
    let warningCount = 0;
    let dangerCount = 0;

    allResults.forEach(result => {
        if (result.classification === 'safe') safeCount++;
        else if (result.classification === 'warning') warningCount++;
        else if (result.classification === 'danger') dangerCount++;
    });

    document.getElementById('safeCount').textContent = safeCount;
    document.getElementById('warningCount').textContent = warningCount;
    document.getElementById('dangerCount').textContent = dangerCount;
}

/**
 * Render single result
 */
function renderResult(result) {
    const container = document.getElementById('resultsContainer');

    // Remove empty state on first result
    if (allResults.length === 1) {
        container.innerHTML = '';
    }

    // Check filter
    if (currentFilter !== 'all' && result.classification !== currentFilter) {
        return;
    }

    const item = document.createElement('div');
    item.className = `result-item ${result.classification}`;
    item.dataset.classification = result.classification;

    const path = document.createElement('a');
    path.className = 'result-path';
    path.href = result.url;
    path.target = '_blank'; // Open in new tab
    path.textContent = result.path;
    path.title = result.url;
    path.style.textDecoration = 'none';
    path.style.cursor = 'pointer';

    // Add hover effect
    path.onmouseover = () => path.style.textDecoration = 'underline';
    path.onmouseout = () => path.style.textDecoration = 'none';

    const status = document.createElement('div');
    status.className = `result-status ${result.classification}`;

    if (result.classification === 'danger') {
        status.textContent = '🔴 FOUND';
    } else if (result.classification === 'warning') {
        status.textContent = '🟡 FOUND';
    } else {
        status.textContent = '🟢 SAFE';
    }

    item.appendChild(path);
    item.appendChild(status);

    // Insert at top for critical findings
    if (result.classification === 'danger') {
        container.insertBefore(item, container.firstChild);
    } else {
        container.appendChild(item);
    }
}

/**
 * Handle filter change
 */
function handleFilterChange(e) {
    currentFilter = e.target.value;
    reRenderResults();
}

/**
 * Re-render all results based on filter
 */
function reRenderResults() {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    const filtered = currentFilter === 'all'
        ? allResults
        : allResults.filter(r => r.classification === currentFilter);

    if (filtered.length === 0) {
        container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">No results match the current filter.</div>
      </div>
    `;
        return;
    }

    filtered.forEach(result => renderResult(result));
}

/**
 * Export results to JSON
 */
function exportResults() {
    if (allResults.length === 0) {
        showToast('No results to export', 'error');
        return;
    }

    const exportData = {
        domain: currentScan.domain,
        scanTime: currentScan.startTime,
        results: allResults,
        summary: {
            total: allResults.length,
            critical: allResults.filter(r => r.classification === 'danger').length,
            warnings: allResults.filter(r => r.classification === 'warning').length,
            safe: allResults.filter(r => r.classification === 'safe').length
        }
    };

    const domain = new URL(currentScan.domain).hostname;
    const filename = `0xZAXOYI-${domain}-${Date.now()}.json`;

    exportJSON(exportData, filename);
    showToast('Results exported', 'success');
}

/**
 * Save to history
 */
async function saveToHistory() {
    if (allResults.length === 0) {
        showToast('No results to save', 'error');
        return;
    }

    // Get existing history
    const data = await getStorage(['scanHistory']);
    const scanHistory = data.scanHistory || [];

    // Create history entry
    const historyEntry = {
        id: generateId(),
        domain: currentScan.domain,
        startTime: currentScan.startTime,
        endTime: currentScan.endTime || new Date().toISOString(),
        results: allResults,
        summary: {
            total: allResults.length,
            critical: allResults.filter(r => r.classification === 'danger').length,
            warnings: allResults.filter(r => r.classification === 'warning').length,
            safe: allResults.filter(r => r.classification === 'safe').length
        }
    };

    // Add to history (most recent first)
    scanHistory.unshift(historyEntry);

    // Limit history to 50 entries
    if (scanHistory.length > 50) {
        scanHistory.pop();
    }

    // Save
    await setStorage({ scanHistory });

    showToast('Saved to history', 'success');
}
