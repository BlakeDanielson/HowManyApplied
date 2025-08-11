// Popup script for LinkedIn Job Applicant Counter
document.addEventListener('DOMContentLoaded', function() {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const statusDesc = document.getElementById('statusDesc');
    const refreshBtn = document.getElementById('refreshBtn');

    // Check current tab status
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        
        if (currentTab.url && currentTab.url.includes('linkedin.com')) {
            if (currentTab.url.includes('/jobs/view/')) {
                updateStatus('active', 'Active on Job Page', 'Extension is monitoring this LinkedIn job posting for applicant data.');
            } else if (currentTab.url.includes('/jobs/')) {
                updateStatus('partial', 'On LinkedIn Jobs', 'Navigate to a specific job posting to see applicant counts.');
            } else {
                updateStatus('partial', 'On LinkedIn', 'Go to LinkedIn Jobs to start using the extension.');
            }
        } else {
            updateStatus('inactive', 'Not on LinkedIn', 'Visit LinkedIn job postings to use this extension.');
        }
    });

    // Handle refresh button click
    refreshBtn.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
            window.close();
        });
    });

    function updateStatus(type, text, description) {
        statusText.textContent = text;
        statusDesc.textContent = description;
        
        statusDot.className = 'status-dot';
        
        switch (type) {
            case 'active':
                statusDot.classList.add('active');
                break;
            case 'partial':
                statusDot.style.background = '#ff9800';
                break;
            case 'inactive':
                statusDot.classList.add('inactive');
                break;
        }
    }

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === 'statusUpdate') {
            updateStatus(request.status, request.text, request.description);
        }
    });

    // Check for any stored data about recent activity
    chrome.storage.local.get(['lastApplicantCount', 'lastJobUrl'], function(result) {
        if (result.lastApplicantCount && result.lastJobUrl) {
            const jobId = result.lastJobUrl.match(/\/jobs\/view\/(\d+)/);
            if (jobId) {
                const countInfo = document.createElement('div');
                countInfo.style.cssText = `
                    background: #e8f5e8;
                    border: 1px solid #4caf50;
                    border-radius: 6px;
                    padding: 10px;
                    margin-bottom: 15px;
                    font-size: 12px;
                `;
                countInfo.innerHTML = `
                    <strong>Last detected:</strong><br>
                    ${result.lastApplicantCount.toLocaleString()} applicants<br>
                    <span style="color: #666;">Job ID: ${jobId[1]}</span>
                `;
                
                document.querySelector('.status').after(countInfo);
            }
        }
    });
}); 