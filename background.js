// Background script for LinkedIn Job Applicant Counter
chrome.runtime.onInstalled.addListener(() => {
    console.log('LinkedIn Job Applicant Counter installed');
});

// Content script is injected via manifest content_scripts; no dynamic injection needed

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'applicantCountFound') {
        console.log(`Found ${request.count} applicants for job`);
        
        // Update badge with count
        chrome.action.setBadgeText({
            text: request.count.toString(),
            tabId: sender.tab.id
        });
        
        chrome.action.setBadgeBackgroundColor({
            color: '#0077b5',
            tabId: sender.tab.id
        });
        
        sendResponse({ success: true });
    }
    
    if (request.type === 'pageChanged') {
        // Clear badge when navigating away from job page
        chrome.action.setBadgeText({
            text: '',
            tabId: sender.tab.id
        });
    }
    
    return true; // Keep message channel open for async response
});

// Clear badge when tab is closed or navigated away
chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.action.setBadgeText({
        text: '',
        tabId: tabId
    });
});

// Default popup is used; no action click handler required