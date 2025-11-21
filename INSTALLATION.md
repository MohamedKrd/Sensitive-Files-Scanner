# 0xZAXOYI - Quick Installation Guide

## 🚀 5-Minute Setup

### Step 1: Prepare Icons (Optional but Recommended)

The extension needs PNG icons. You have 3 options:

**Option A - Quick Test (No Design Needed)**
1. Open MS Paint or any image editor
2. Create a 128x128 pixel image
3. Fill it with green color
4. Save as `icon-128.png`, `icon-48.png`, `icon-16.png`
5. Place all three in the `icons/` folder

**Option B - Use the SVG Template**
1. Open `icons/PLACEHOLDER-ICON.svg` in your browser
2. Take a screenshot
3. Resize to 128x128, 48x48, and 16x16
4. Save as PNG files in `icons/` folder

**Option C - Skip for Now**
- The extension will load without icons (Chrome will use a default icon)
- You can add icons later

### Step 2: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Type in address bar: `chrome://extensions/`
   - Or: Menu (⋮) → More Tools → Extensions

2. **Enable Developer Mode**
   - Look for the toggle in the top-right corner
   - Turn it ON

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to: `Desktop\Sensitive Files\0xZAXOYI`
   - Click "Select Folder"

4. **Verify Load**
   - You should see "0xZAXOYI" in your extensions list
   - The icon should appear in your Chrome toolbar
   - If there are any errors, check the errors section

### Step 3: Test the Extension

1. **Click the extension icon** in your toolbar
2. You should see the neon green dashboard
3. Try entering a test domain: `https://example.com`
4. Click through Settings and History pages

---

## 🔧 Troubleshooting

### "Manifest file is missing or unreadable"
- Make sure you selected the `0xZAXOYI` folder, not a parent folder
- File must be named exactly `manifest.json`

### Extension loads but shows errors
- Open the extension card in `chrome://extensions/`
- Click "Errors" to see details
- Common issues:
  - Missing icon files (safe to ignore for testing)
  - Service worker errors (check browser console)

### Extension icon doesn't appear in toolbar
- Right-click the puzzle piece icon in Chrome toolbar
- Click "0xZAXOYI" and enable "Pin to toolbar"

### Pages look broken or unstyled
- Make sure `css/cyber-style.css` exists
- Check browser console (F12) for errors
- Hard refresh the page (Ctrl+Shift+R)

---

## ⚠️ IMPORTANT: Before First Scan

### Legal & Ethical Requirements

**READ THIS BEFORE SCANNING ANY WEBSITE:**

1. ✅ **Get Permission First**
   - Only scan websites you own
   - Or have written authorization to test
   - Never scan without explicit permission

2. ✅ **Understand the Law**
   - Unauthorized scanning may violate CFAA (US) or similar laws
   - Criminal penalties can include fines and imprisonment
   - Civil lawsuits are also possible

3. ✅ **Use Responsibly**
   - Don't overload servers (use default settings)
   - Report findings responsibly
   - Never exploit discovered vulnerabilities

4. ✅ **Test Locally First**
   - Set up a local test server (XAMPP, WAMP, etc.)
   - Create test files to verify the scanner works
   - This is the safest way to learn

---

## 📚 Recommended Test Setup (Safe & Legal)

### Option A: Test on Your Own Server
1. Install XAMPP/WAMP/MAMP
2. Create test files in your web root:
   - `config.php`
   - `.env`
   - `backup.zip`
3. Start the server
4. Scan `http://localhost`

### Option B: Use Official Testing Sites
- DVWA (Damn Vulnerable Web Application)
- OWASP WebGoat
- HackTheBox (requires account)

---

## 📖 Next Steps

1. **Read the full README.md** for detailed features
2. **Configure Settings** for your first scan
3. **Review Ethical Guidelines** in the Settings page
4. **Practice on local servers** before real-world testing
5. **Export results** to JSON for reporting

---

## 🎨 Customization Tips

### Change the Color Theme
Edit `css/cyber-style.css`:
```css
--neon-green: #00ff41;  /* Change to your preferred color */
```

### Modify Scan Payloads
Edit `data/payloads.json` to add or remove file paths

### Adjust Performance
Settings → Advanced Settings:
- Increase concurrent requests for faster scans
- Increase delay for gentler scanning
- Adjust timeout for slow servers

---

## 📞 Need Help?

- Check the **README.md** for detailed documentation
- Review **ICON-SETUP.md** for icon creation help
- Check browser console (F12) for error messages
- Verify all files are in the correct folders

---

<div align="center">
  <strong>Happy Ethical Hacking! 🔒</strong>
  <br>
  <em>Remember: Always get permission first.</em>
</div>
