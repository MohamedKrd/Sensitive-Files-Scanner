// ========================================
// SETTINGS.JS
// ========================================

let payloads = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Load payloads
    payloads = await loadPayloads();

    // Render categories
    renderCategories();

    // Load settings
    await loadSettings();

    // Event listeners
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
});

/**
 * Render category checkboxes
 */
function renderCategories() {
    const container = document.getElementById('categoriesContainer');

    const categoryLabels = {
        backup_files: '🗃️ Backup Files (backup.zip, db_backup.sql, etc.)',
        config_files: '⚙️ Configuration Files (config.php, web.config, etc.)',
        env_files: '🔐 Environment Files (.env, .env.production, etc.)',
        logs: '📋 Log Files (error.log, debug.log, etc.)',
        temporary_files: '📝 Temporary Files (.swp, .bak, .old, etc.)',
        directories: '📁 Sensitive Directories (/backup/, /.git/, etc.)',
        api_documentation: '📖 API Documentation (swagger-ui.html, etc.)',
        vcs_exposed: '🚨 Version Control Exposed (.git/HEAD, .svn/, etc.)',
        misc: '🔧 Miscellaneous (phpinfo.php, robots.txt, etc.)'
    };

    payloads.forEach(category => {
        const item = document.createElement('div');
        item.className = 'checkbox-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `cat_${category.type}`;
        checkbox.value = category.type;
        checkbox.checked = true;

        const label = document.createElement('label');
        label.className = 'checkbox-label';
        label.htmlFor = `cat_${category.type}`;
        label.textContent = categoryLabels[category.type] || category.type;

        item.appendChild(checkbox);
        item.appendChild(label);
        container.appendChild(item);
    });
}

/**
 * Load settings from storage
 */
async function loadSettings() {
    const data = await getStorage(['settings']);
    const settings = data.settings || getDefaultSettings();

    // Update checkboxes
    settings.enabledCategories.forEach(catType => {
        const checkbox = document.getElementById(`cat_${catType}`);
        if (checkbox) checkbox.checked = true;
    });

    // Update other fields
    document.getElementById('requestTimeout').value = settings.requestTimeout || 5000;
    document.getElementById('delayBetween').value = settings.delayBetween || 100;
    document.getElementById('maxConcurrent').value = settings.maxConcurrent || 10;
}

/**
 * Save settings
 */
async function saveSettings() {
    const btn = document.getElementById('saveSettingsBtn');
    const originalText = btn.textContent;

    // Get enabled categories
    const enabledCategories = [];
    payloads.forEach(category => {
        const checkbox = document.getElementById(`cat_${category.type}`);
        if (checkbox && checkbox.checked) {
            enabledCategories.push(category.type);
        }
    });

    // Validate at least one category
    if (enabledCategories.length === 0) {
        showToast('Please select at least one category', 'error');
        return;
    }

    // Get other settings
    const requestTimeout = parseInt(document.getElementById('requestTimeout').value) || 5000;
    const delayBetween = parseInt(document.getElementById('delayBetween').value) || 100;
    const maxConcurrent = parseInt(document.getElementById('maxConcurrent').value) || 10;

    // Validate
    if (requestTimeout < 1000 || requestTimeout > 30000) {
        showToast('Timeout must be between 1000-30000ms', 'error');
        return;
    }

    if (delayBetween < 0 || delayBetween > 5000) {
        showToast('Delay must be between 0-5000ms', 'error');
        return;
    }

    const settings = {
        enabledCategories,
        requestTimeout,
        delayBetween,
        maxConcurrent
    };

    // Save to storage
    await setStorage({ settings });

    // Update UI
    btn.textContent = '✓ Saved';
    btn.style.background = 'var(--status-safe)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);

    showToast('Settings saved successfully', 'success');
}
