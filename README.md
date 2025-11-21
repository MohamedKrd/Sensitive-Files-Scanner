# 0xZAXOYI Sensitive Files Scanner

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-00ff41?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-00ff41?style=for-the-badge)
![Manifest](https://img.shields.io/badge/manifest-V3-00ff41?style=for-the-badge)
![Chrome](https://img.shields.io/badge/chrome-extension-00ff41?style=for-the-badge)

**Ethical Web Security Testing Tool**

*For authorized penetration testing and bug bounty programs only*

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Legal](#%EF%B8%8F-legal-disclaimer)

</div>

---

## ⚠️ ETHICAL USE ONLY

> **WARNING:** This tool is designed EXCLUSIVELY for ethical security testing on systems you own or have explicit written permission to test. Unauthorized scanning of web applications is **ILLEGAL** and may result in criminal prosecution.

**By using this tool, you agree that:**
- ✅ You will ONLY scan systems you own or have written authorization to test
- ✅ You will use this tool for bug bounty programs with proper scope
- ✅ You will comply with all applicable laws and regulations
- ✅ You understand that unauthorized access is a criminal offense
- ❌ You will NOT use this for malicious purposes or unauthorized penetration testing

---

## 🎯 What is 0xZAXOYI?

0xZAXOYI is a powerful Chrome extension designed for ethical hackers, security researchers, and penetration testers. It automates the discovery of publicly accessible sensitive files on web applications during authorized security assessments.

### 🔍 What It Does

The extension scans for **800+ common security misconfigurations** including:
- Exposed backup files and database dumps
- Configuration files and environment variables
- Version control system exposure (.git, .svn)
- CMS-specific vulnerabilities (WordPress, Joomla, Drupal)
- Framework configuration files (Laravel, Django, Symfony, Node.js)
- Cloud service credentials (AWS, Azure, GCP)
- Admin panel paths and database interfaces
- API documentation endpoints
- Security-sensitive files (SSH keys, certificates)

---

## ✨ Features

### 🚀 Core Capabilities
- **800+ Payload Paths**: Comprehensive database covering backups, configs, logs, CMS files, frameworks, and more
- **Real-time Scanning**: Live progress tracking with color-coded results (🔴 Critical, 🟡 Warning, 🟢 Safe)
- **Smart Redirect Detection**: Automatically filters false positives from soft 404s and homepage redirects
- **Persistent State**: Scan results persist across tab switches and extension reopens
- **Clickable Results**: Direct links to discovered files for easy verification

### 🎨 User Experience
- **Cyberpunk UI**: Futuristic neon-green interface with smooth animations
- **Auto-fill Domain**: Automatically detects current tab's domain
- **Category Management**: Enable/disable specific scan categories (backups, configs, etc.)
- **Advanced Settings**: Customize timeout, concurrency, and rate limiting
- **Scan History**: Save and review previous scans with detailed statistics

### 🔧 Technical Features
- **Manifest V3**: Modern Chrome extension architecture
- **Concurrency Control**: Configurable parallel requests (default: 10)
- **Rate Limiting**: Adjustable delay between requests to avoid detection
- **Export Options**: JSON export for results and scan history
- **Local Storage**: All data stored locally for privacy

---

## 📦 Installation

### Method 1: Load Unpacked (Development)

1. **Download the extension**
   ```bash
   git clone https://github.com/yourusername/0xZAXOYI.git
   cd 0xZAXOYI
   ```

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Enable **Developer Mode** (top-right toggle)

3. **Load the extension**
   - Click **"Load unpacked"**
   - Select the `0xZAXOYI` folder
   - The extension icon should appear in your toolbar

4. **Verify installation**
   - Click the extension icon
   - You should see the dashboard with ethical warnings

### Method 2: Chrome Web Store
*Coming soon - awaiting approval*

---

## 🎮 Usage

### Quick Start

1. **Navigate to target website** (with permission!)
2. **Click the 0xZAXOYI icon** in your toolbar
3. **Verify the auto-filled domain** or enter manually
4. **Click "Start Scan"**
5. **Review results** in real-time as they appear

### Dashboard Overview

#### 📊 Stats Display
- **Total Scans**: Number of completed scans
- **Total Findings**: Sum of critical and warning findings
- **Critical Findings**: High-severity discoveries

#### ⚙️ Settings Page
Configure scan behavior:
- **Categories**: Toggle backup files, configs, logs, CMS files, etc.
- **Request Timeout**: Max wait time per request (default: 5000ms)
- **Request Delay**: Delay between requests (default: 100ms)
- **Max Concurrent**: Parallel requests (default: 10)

#### 📈 Results Page
Real-time scan progress:
- **Progress Bar**: Visual percentage complete
- **Live Stats**: Safe/Warning/Critical counters
- **Filter Options**: Show all, critical only, warnings only, safe only
- **Export**: Save results as JSON
- **Save to History**: Store scan for future reference

#### 📜 History Page
Review past scans:
- **Scan Details**: Domain, date, result summary
- **Export All**: Download complete history
- **Clear History**: Remove all saved scans

### Result Classifications

| Icon | Status | Meaning |
|------|--------|---------|
| 🔴 | **FOUND (Critical)** | High-risk file detected (configs, backups, credentials) |
| 🟡 | **FOUND (Warning)** | Medium-risk file detected (logs, temp files) |
| 🟢 | **SAFE** | File not found or redirected |

---

## 🏗️ Technical Architecture

### File Structure

```
0xZAXOYI/
├── manifest.json              # Extension configuration (Manifest V3)
├── pages/
│   ├── popup.html            # Dashboard UI
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
│   └── cyber-style.css       # Cyberpunk UI styling
├── data/
│   └── payloads.json         # 800+ scan paths database
├── icons/
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md                 # This file
```

### Technology Stack

- **Frontend**: HTML5, CSS3 (Cyberpunk theme), Vanilla JavaScript
- **Architecture**: Chrome Extension Manifest V3
- **Storage**: Chrome Local Storage API
- **Fonts**: Orbitron, Rajdhani (Google Fonts)
- **No external dependencies**: Fully standalone

### Payload Categories (20 Total)

1. **Backup Files** (65 paths): `.zip`, `.sql`, `.tar.gz`, database dumps
2. **Config Files** (60 paths): `config.php`, `.env`, `settings.yml`, framework configs
3. **Environment Files** (45 paths): `.env` variations, production/dev configs
4. **Logs** (60 paths): Error logs, access logs, application logs
5. **Temporary Files** (40 paths): `.swp`, `.bak`, editor backups
6. **Directories** (95 paths): `/backup/`, `/admin/`, `/uploads/`, VCS folders
7. **API Documentation** (30 paths): Swagger, OpenAPI, GraphQL endpoints
8. **VCS Exposed** (35 paths): `.git/`, `.svn/`, CVS files
9. **CMS WordPress** (40 paths): WP configs, admin panels, plugins
10. **CMS Joomla** (25 paths): Joomla-specific files
11. **CMS Drupal** (25 paths): Drupal configuration files
12. **Database Files** (30 paths): SQLite, MySQL dumps, DB backups
13. **Admin Panels** (45 paths): Common admin login paths
14. **Framework Laravel** (25 paths): Laravel `.env`, storage, configs
15. **Framework Symfony** (20 paths): Symfony configs and cache
16. **Framework Django** (20 paths): Django settings and static files
17. **Framework Node.js** (25 paths): `package.json`, `.env`, configs
18. **Cloud Config** (30 paths): AWS, Azure, GCP credentials
19. **Security Files** (30 paths): SSH keys, certificates, tokens
20. **Miscellaneous** (50 paths): `phpinfo.php`, `robots.txt`, version files

**Total: 800+ unique paths**

---

## 🛡️ Security & Privacy

### Local-Only Storage
- **No external servers**: All data stored in Chrome's local storage
- **No analytics**: Zero tracking or telemetry
- **No network calls**: Except for the scans you explicitly run
- **Privacy-first**: Your scan history never leaves your device

### Scanning Methodology
- **Passive GET requests**: No exploitation attempts
- **Redirect detection**: Filters false positives from soft 404s
- **Rate limiting**: Built-in delays to prevent server overload
- **Configurable**: Adjust concurrency and timing to your needs

---

## 🎓 Use Cases

### ✅ Authorized Use Cases
- **Bug Bounty Programs**: HackerOne, Bugcrowd, Synack, Intigriti
- **Penetration Testing**: With signed contracts and written permission
- **Security Audits**: Internal security assessments on your own infrastructure
- **Development**: Testing your own applications during development
- **Red Team Exercises**: Within scope of authorized engagements

### ❌ Prohibited Use Cases
- **Unauthorized scanning**: Testing systems without permission
- **Malicious intent**: Using findings for illegal purposes
- **Competitive intelligence**: Scanning competitors without authorization
- **Automated mass scanning**: Indiscriminate internet-wide scanning
- **Production disruption**: Overloading servers or causing downtime

---

## ⚖️ Legal Disclaimer

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

- **Unauthorized access is illegal**: Violates Computer Fraud and Abuse Act (CFAA) in the US and similar laws worldwide
- **You are responsible**: The developers are not liable for misuse of this tool
- **Get permission first**: Always obtain written authorization before testing
- **Know the laws**: Familiarize yourself with local cybersecurity laws
- **Ethical hacking only**: This tool is for improving security, not breaking it

**BY USING THIS SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREED TO ABIDE BY ALL APPLICABLE LAWS AND ETHICAL GUIDELINES.**

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
- Use GitHub Issues
- Provide detailed reproduction steps
- Include browser version and OS

### Suggesting Features
- Open a GitHub Issue with the `enhancement` label
- Describe the use case and expected behavior

### Contributing Code
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Adding Payload Paths
If you have additional sensitive file paths to add:
1. Edit `data/payloads.json`
2. Add to the appropriate category
3. Include severity rating
4. Submit a PR with explanation

---

## 📝 Changelog

### Version 1.0.0 (2024-11-21)
- ✨ Initial release
- 🎯 800+ payload paths across 20 categories
- 🎨 Cyberpunk neon-green UI
- 🔍 Smart redirect detection
- 💾 Persistent scan state
- 🔗 Clickable result links
- 📊 Scan history and export
- ⚙️ Advanced configuration options

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**0xZAXOYI** - Ethical Security Testing Tool

- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourusername](https://twitter.com/yourusername)

---

## 🙏 Acknowledgments

- Security research community for methodology and best practices
- Bug bounty platforms for ethical hacking frameworks
- OWASP for security testing guidelines
- Chrome extension development community

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/0xZAXOYI/issues)
- **Security Vulnerabilities**: Please report privately via email
- **Questions**: Open a discussion on GitHub

---

<div align="center">

**Remember: Use this tool responsibly and only on systems you have permission to test.**

**Stay legal. Stay ethical. Stay safe.**

⚡ Powered by ethical hacking principles ⚡

</div>
