# 0xZAXOYI Sensitive File Scanner

**Version:** 1.0.0  
**License:** MIT  
**Type:** Chrome Extension (Manifest V3)

---

## ETHICAL USE WARNING

**THIS TOOL IS FOR AUTHORIZED SECURITY TESTING ONLY.**

By using this software, you acknowledge and agree that:

- You will ONLY scan systems you own or have explicit written permission to test
- You will use this tool for legitimate bug bounty programs within proper scope
- You will comply with all applicable laws and regulations
- Unauthorized access to computer systems is illegal and may result in criminal prosecution
- You are solely responsible for your actions when using this tool

The developers assume no liability for misuse of this software. Use responsibly.

---

## Overview

0xZAXOYI Sensitive File Scanner is a Chrome extension designed for ethical hackers, security researchers, and penetration testers. It automates the discovery of publicly accessible sensitive files on web applications during authorized security assessments.

The extension scans for over 800 common security misconfigurations including exposed backup files, configuration files, environment variables, version control system exposure, CMS-specific vulnerabilities, framework configuration files, cloud service credentials, admin panel paths, database interfaces, API documentation endpoints, and security-sensitive files.



![0xZAXOYI Logo](0xZAXOYI.png)
---

## Features

### Core Capabilities

- 800+ payload paths covering backups, configs, logs, CMS files, frameworks, and cloud credentials
- Real-time scanning with live progress tracking
- Smart redirect detection to filter false positives from soft 404 errors
- Persistent scan state across tab switches and extension reopens
- Clickable results with direct links to discovered files
- Color-coded severity levels for easy prioritization

### User Experience

- Auto-fill domain detection from current browser tab
- Category management to enable or disable specific scan types
- Advanced settings for timeout, concurrency, and rate limiting
- Scan history with detailed statistics
- JSON export for results and complete scan history

### Technical Features

- Manifest V3 architecture for modern Chrome extensions
- Concurrency control with configurable parallel requests
- Built-in rate limiting with adjustable delays
- Local storage for all data to ensure privacy
- No external servers or tracking

### Payload Categories (20 total)

- Backup files (database dumps, archive files, SQL backups)
- Configuration files (framework configs, application settings)
- Environment variables (production, development, staging)
- Log files (error logs, access logs, application logs)
- Temporary files (editor backups, swap files)
- Exposed directories (backup folders, admin paths, upload directories)
- API documentation (Swagger, OpenAPI, GraphQL endpoints)
- Version control exposure (Git, SVN, CVS files)
- CMS-specific files (WordPress, Joomla, Drupal)
- Database files (SQLite, MySQL dumps)
- Admin panels (common login paths, database interfaces)
- Framework files (Laravel, Symfony, Django, Node.js)
- Cloud configuration (AWS, Azure, GCP credentials)
- Security files (SSH keys, certificates, tokens)
- Miscellaneous sensitive files

---

## Installation

### Method 1: Load Unpacked Extension (Development)

1. Download or clone this repository to your local machine

2. Open Google Chrome and navigate to `chrome://extensions/`

3. Enable **Developer Mode** by toggling the switch in the top-right corner

4. Click the **"Load unpacked"** button

5. Navigate to and select the `0xZAXOYI` folder containing the extension files

6. The extension icon should appear in your Chrome toolbar

7. Click the icon to verify installation and view the dashboard

### Method 2: Chrome Web Store (Future)

The extension will be available on the Chrome Web Store pending approval.

---

## Usage

### Quick Start

1. Navigate to the target website in Chrome (ensure you have authorization)

2. Click the 0xZAXOYI extension icon in your toolbar

3. The dashboard will auto-fill the current domain or enter manually

4. Click "Start Scan" to begin the security assessment

5. View real-time results as they appear on the results page

6. Click any discovered file path to open it in a new tab

7. Export results as JSON or save to scan history for future reference

### Dashboard

The main dashboard displays statistics including total scans performed, total findings across all scans, and critical findings requiring immediate attention.

### Settings Page

Configure scan behavior including:

- Category toggles for backup files, configs, logs, CMS files, and more
- Request timeout (maximum wait time per request, default 5000ms)
- Request delay (delay between requests to avoid rate limiting, default 100ms)
- Max concurrent requests (parallel requests, default 10)

### Results Page

View live scan progress with:

- Visual progress bar showing percentage complete
- Real-time statistics for safe, warning, and critical findings
- Filter options to show all results or filter by severity
- Export button to save results as JSON
- Save to history button to store scan for future review

### History Page

Review previous scans with:

- List of all saved scans with domain, date, and summary
- Export all history as JSON
- Clear all history option

### Result Classifications

- **Critical (High Risk):** Configuration files, backups, credentials, cloud keys
- **Warning (Medium Risk):** Log files, temporary files, exposed directories
- **Safe:** File not found or request was redirected

---

## Project Structure

```
0xZAXOYI/
├── manifest.json              # Extension configuration (Manifest V3)
├── pages/
│   ├── popup.html            # Dashboard interface
│   ├── settings.html         # Configuration page
│   ├── results.html          # Scan results display
│   └── history.html          # Scan history viewer
├── js/
│   ├── service_worker.js     # Background scanning engine
│   ├── popup.js              # Dashboard logic
│   ├── settings.js           # Settings management
│   ├── results.js            # Results display logic
│   ├── history.js            # History management
│   └── utils.js              # Shared utilities
├── css/
│   └── cyber-style.css       # User interface styling
├── data/
│   └── payloads.json         # 800+ scan paths database
├── icons/
│   ├── icon-16.png           # 16x16 extension icon
│   ├── icon-48.png           # 48x48 extension icon
│   └── icon-128.png          # 128x128 extension icon
└── README.md                 # This file
```

### Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Architecture:** Chrome Extension Manifest V3
- **Storage:** Chrome Local Storage API
- **No external dependencies or libraries required**

---

## Security and Privacy

### Local-Only Storage

All scan data, settings, and history are stored exclusively in Chrome's local storage. No external servers are contacted except for the scans you explicitly initiate. This extension does not collect, transmit, or share any user data.

### Scanning Methodology

The extension uses passive HTTP GET requests only. It does not attempt to exploit any vulnerabilities. Smart redirect detection filters false positives from soft 404 errors and homepage redirects. Built-in rate limiting and configurable concurrency prevent server overload.

### Privacy Guarantees

- Zero tracking or analytics
- No telemetry or usage statistics
- No network calls except user-initiated scans
- Scan results never leave your local device
- Complete privacy and data ownership

---

## Legal Disclaimer

```
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Important Legal Notes

Unauthorized access to computer systems is illegal under the Computer Fraud and Abuse Act (CFAA) in the United States and similar laws in other jurisdictions. This tool is designed exclusively for ethical security testing on systems you own or have explicit written authorization to test.

The developers of this software are not responsible for any misuse or illegal activity conducted with this tool. Users are solely responsible for ensuring they have proper authorization before conducting any security assessments.

Always obtain written permission before testing any systems you do not own. Familiarize yourself with applicable laws in your jurisdiction. This tool is intended for improving security, not compromising it.

**BY USING THIS SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREED TO ABIDE BY ALL APPLICABLE LAWS AND ETHICAL GUIDELINES.**

---

## Author

**Developer:** MohamedKrd  
**GitHub:** https://github.com/MohamedKrd  
**Twitter:** https://twitter.com/0xzaxoyi

---

## Contributions

Contributions are welcome. To contribute:

- Report bugs using GitHub Issues with detailed reproduction steps
- Suggest features by opening an issue with the enhancement label
- Submit code via pull requests after forking the repository
- Add new payload paths to `data/payloads.json` with appropriate categorization

When contributing, please ensure all additions follow ethical guidelines and are suitable for authorized security testing only.

---

## Support

For issues, questions, or security vulnerability reports, please use the GitHub repository issue tracker or contact the developer directly.

**Repository:** https://github.com/MohamedKrd/Sensitive-Files-Scanner

---

**Copyright (c) 2024 MohamedKrd**  
Licensed under the MIT License

**Use responsibly. Stay legal. Stay ethical.**
