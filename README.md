# LinkedIn Job Applicant Counter

A Chrome extension that automatically reveals the true number of applicants on LinkedIn job postings, based on the method shown in your reference image.

## 🚀 Features

- **Automatic Detection**: Works on all LinkedIn job posting pages (`linkedin.com/jobs/view/*`)
- **Real-time Data**: Extracts actual applicant counts from LinkedIn's API responses
- **Beautiful UI**: Clean, professional display that integrates seamlessly with LinkedIn
- **No Manual Work**: Automates the entire process shown in your reference image
- **Privacy Focused**: Only works on LinkedIn, no data collection

## 📱 How It Works

The extension automates the manual process outlined in your reference image:

1. **Detects** when you're viewing a LinkedIn job posting
2. **Intercepts** network requests to LinkedIn's API
3. **Extracts** the real applicant count from the API responses
4. **Displays** the count prominently on the job posting page

Instead of manually:
- Opening developer tools
- Going to Network tab
- Searching for "jobPostings" 
- Finding the "views" count

The extension does all this automatically and shows the result instantly!

## 🛠 Installation

### Method 1: Load Unpacked Extension (Development)

1. **Download/Clone** this repository to your computer
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top right)
4. **Click "Load unpacked"** and select the folder containing these files
5. **Pin the extension** to your toolbar for easy access

### Method 2: Chrome Web Store (Coming Soon)
*Extension will be submitted to Chrome Web Store after testing*

## 📋 Usage

1. **Install** the extension following the steps above
2. **Navigate** to any LinkedIn job posting (URL like `linkedin.com/jobs/view/12345`)
3. **Watch** as the extension automatically detects and displays the real applicant count
4. **See the count** displayed prominently at the top of the job posting

### Visual Example

When viewing a LinkedIn job posting, you'll see:

```
![alt text](https://github.com/BlakeDanielson/HowManyApplied/blob/83bbe6ced5e05f7880cb4ee779cc59677916cfe2/Screenshot%202025-08-10%20201636.png "Total Applicants")
```

## 🎯 Benefits

- **Save Time**: No more manual developer tools process
- **Get Real Data**: See actual applicant numbers, not just "10+ applicants"
- **Make Better Decisions**: Apply strategically based on competition level
- **Professional Advantage**: Know what others don't know

## 🔧 Technical Details

### Files Structure
```
linkedin-applicant-counter/
├── manifest.json          # Extension configuration
├── content.js             # Main functionality script
├── background.js          # Service worker
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── styles.css            # UI styling
├── icons/                # Extension icons
└── README.md            # This file
```

### Permissions Required
- `activeTab`: To access LinkedIn job pages (when user opens popup)
- `storage`: To remember the last detected count for the popup
- `*://*.linkedin.com/*`: To work on LinkedIn domains

### How Detection Works
1. **Network Interception**: Monitors fetch/XHR requests to LinkedIn's API
2. **Data Extraction**: Searches API responses for the specific `"applies":24` field format
3. **UI Injection**: Dynamically adds the count display to the page
4. **SPA Handling**: Handles LinkedIn's single-page application navigation

**Technical Detail**: The extension specifically looks for the `"applies"` field in LinkedIn's API responses, which contains the exact number of applicants as shown in your reference image.

## 🐛 Troubleshooting

### Extension Not Working?
1. **Refresh** the LinkedIn job page
2. **Check** that you're on a job posting page (not job search results)
3. **Ensure** the extension is enabled in `chrome://extensions/`
4. **Try** clicking the extension icon to manually trigger

### No Count Showing?
- Some job postings may not have applicant data available
- LinkedIn may change their API structure (we'll update accordingly)
- Try refreshing the page or waiting a few seconds

### Developer Console
Open browser developer tools and check console for messages starting with "LinkedIn Applicant Counter"

## 🔒 Privacy & Security

- **No Data Collection**: Extension doesn't collect or store personal data
- **LinkedIn Only**: Only works on LinkedIn domains
- **Local Processing**: All data processing happens locally in your browser
- **No External Servers**: No data is sent to external servers

## 🚧 Development

### Setting Up Development Environment

1. Clone the repository
2. Make changes to the files
3. Go to `chrome://extensions/`
4. Click "Reload" on the extension to test changes

### Packaging / Manual Install
- Include: `manifest.json`, `content.js`, `background.js`, `popup.html`, `popup.js`, `styles.css`
- Exclude dev helpers from ZIP: `create_icons.html`, `test.js`
- Icons are optional for manual installs; if you add custom icons, update the `icons` section in `manifest.json` accordingly

### Testing
- Test on various LinkedIn job postings
- Check console for any error messages
- Verify the count display appears correctly

## 📈 Future Enhancements

- [ ] **Export Data**: Save applicant counts for later analysis
- [ ] **Statistics**: Track application competition over time
- [ ] **Notifications**: Alert when applicant count changes
- [ ] **Bulk Analysis**: Analyze multiple job postings at once
- [ ] **Job Matching**: Suggest jobs based on competition level

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on LinkedIn
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## ⚠️ Disclaimer

This extension is for educational and research purposes. Use responsibly and in accordance with LinkedIn's Terms of Service. The extension automates publicly available information that you could access manually through developer tools.

## 🙋‍♂️ Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Open an issue on GitHub with details about the problem
3. Include browser version, extension version, and steps to reproduce

---

**Made for job seekers who want the competitive edge! 🎯** 
