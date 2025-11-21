// ========================================
// HISTORY.JS
// ========================================

let scanHistory = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Load history
    await loadHistory();

    // Event listeners
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    document.getElementById('exportAllBtn').addEventListener('click', exportAll);
});

/**
 * Load scan history
 */
async function loadHistory() {
    const data = await getStorage(['scanHistory']);
    scanHistory = data.scanHistory || [];

    renderHistory();
}

/**
 * Render history list
 */
function renderHistory() {
    const container = document.getElementById('historyContainer');

    if (scanHistory.length === 0) {
        container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-text">No scan history yet.<br>Start your first scan from the dashboard.</div>
      </div>
    `;
        return;
    }

    container.innerHTML = '';

    scanHistory.forEach(scan => {
        const item = document.createElement('div');
        item.className = 'history-item';

        item.innerHTML = `
      <div class="history-domain">${scan.domain}</div>
      <div class="history-meta">
        <span>${formatDate(scan.startTime)}</span>
        <div class="history-findings">
          ${scan.summary.critical > 0 ? `<span class="finding-badge danger">${scan.summary.critical} Critical</span>` : ''}
          ${scan.summary.warnings > 0 ? `<span class="finding-badge warning">${scan.summary.warnings} Warnings</span>` : ''}
        </div>
      </div>
    `;

        item.addEventListener('click', () => viewScan(scan));

        container.appendChild(item);
    });
}

/**
 * View scan details
 */
function viewScan(scan) {
    // Store as current scan and navigate to results
    setStorage({ currentScan: scan }).then(() => {
        window.location.href = 'results.html';
    });
}

/**
 * Clear all history
 */
async function clearHistory() {
    if (!confirm('Are you sure you want to clear all scan history? This cannot be undone.')) {
        return;
    }

    await setStorage({ scanHistory: [] });
    scanHistory = [];
    renderHistory();

    showToast('History cleared', 'success');
}

/**
 * Export all history
 */
function exportAll() {
    if (scanHistory.length === 0) {
        showToast('No history to export', 'error');
        return;
    }

    const exportData = {
        exportDate: new Date().toISOString(),
        totalScans: scanHistory.length,
        scans: scanHistory
    };

    const filename = `0xZAXOYI-history-${Date.now()}.json`;
    exportJSON(exportData, filename);

    showToast('History exported', 'success');
}
