// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Validates a domain URL
 */
function isValidDomain(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Normalizes a domain URL (removes trailing slash, ensures protocol)
 */
function normalizeDomain(url) {
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return null;
  }
}

/**
 * Formats a date to readable string
 */
function formatDate(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}

/**
 * Classifies result severity based on payload type
 */
function classifyResult(payloadType, statusCode) {
  // If not found (404, 403, etc.), it's safe
  if (statusCode === 404 || statusCode === 403) {
    return 'safe';
  }

  // If found (200, 301, etc.)
  if (statusCode >= 200 && statusCode < 400) {
    // Critical findings
    if (['config_files', 'env_files', 'vcs_exposed'].includes(payloadType)) {
      return 'danger';
    }
    // High severity
    if (['backup_files', 'directories'].includes(payloadType)) {
      return 'danger';
    }
    // Medium severity
    if (['logs', 'temporary_files'].includes(payloadType)) {
      return 'warning';
    }
    // Low severity (common files)
    if (['api_documentation', 'misc'].includes(payloadType)) {
      return 'warning';
    }
  }

  return 'safe';
}

/**
 * Gets storage data
 */
async function getStorage(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(result);
    });
  });
}

/**
 * Sets storage data
 */
async function setStorage(data) {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, () => {
      resolve();
    });
  });
}

/**
 * Generates a unique ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Exports data as JSON file
 */
function exportJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Shows a toast notification (simple version)
 */
function showToast(message, type = 'info') {
  // Create toast element
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'success' ? 'var(--neon-green)' : type === 'error' ? 'var(--status-danger)' : 'var(--bg-secondary)'};
    color: var(--bg-primary);
    border-radius: 6px;
    box-shadow: var(--glow-md);
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Gets default settings
 */
function getDefaultSettings() {
  return {
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
  };
}

/**
 * Loads payloads from data file
 */
async function loadPayloads() {
  try {
    const response = await fetch(chrome.runtime.getURL('data/payloads.json'));
    const data = await response.json();
    return data.payloads;
  } catch (error) {
    console.error('Error loading payloads:', error);
    return [];
  }
}

/**
 * Gets active tab URL
 */
async function getActiveTabURL() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        resolve(tabs[0].url);
      } else {
        resolve(null);
      }
    });
  });
}
