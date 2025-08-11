# 🚀 Quick Start Guide

## Get Your LinkedIn Applicant Counter Running in 3 Minutes!

### Step 1: Load the Extension (30 seconds)
1. Open Chrome and go to `chrome://extensions/`
2. Turn ON "Developer mode" (top right)
3. Click "Load unpacked" 
4. Select this folder (`JobApply`)
5. Extension should appear - pin it to toolbar!

### Step 2: Test It Out (1 minute)
1. Go to [LinkedIn Jobs](https://www.linkedin.com/jobs/)
2. Click on ANY job posting
3. Look for the blue applicant counter to appear at the top!

### Step 3: Debug if Needed (1 minute)
If you don't see the counter:
1. Right-click on the page → "Inspect" → "Console"
2. Look for messages starting with "LinkedIn Applicant Counter"
3. You should see: "Intercepted API call" and "Found applies:XX" messages
4. Refresh the job page and try again
5. Click the extension icon to see status

**What to look for in console:**
- "Intercepted voyager/api/jobs/jobPostings call: [URL]" 
- "Found applies:108 in data.applies" (this means it's working!)
- The extension ONLY monitors voyager/api/jobs/jobPostings API calls

## 🎯 What You Should See

When it works, you'll see something like this at the top of LinkedIn job postings:

```
┌──────────────────────────────────┐
│ 🔢 1,234 TOTAL APPLICANTS       │
│    (Automatically detected)      │
└──────────────────────────────────┘
```

## 🔧 Still Not Working?

### Common Issues:
- **No icon files**: The extension will work without icons (just no pretty pictures)
- **Wrong page**: Make sure you're on a specific job page (URL has `/jobs/view/12345`)
- **LinkedIn changes**: LinkedIn may have changed their API structure

### Debug Mode:
1. Open browser console (F12)
2. Paste and run the contents of `test.js`
3. Check the test results for issues

### Get Help:
- Check `README.md` for detailed troubleshooting
- Look at `PROJECT_SUMMARY.md` for technical details
- Check browser console for error messages

## 🎉 Success!

Once you see those real applicant numbers, you'll have the competitive intelligence that other job seekers don't have. Apply strategically and land your dream job!

---

**Happy job hunting! 🎯** 