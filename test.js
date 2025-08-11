// Test script for LinkedIn Applicant Counter Extension
// Run this in browser console on a LinkedIn job posting page

(function testExtension() {
    console.log('🧪 Testing LinkedIn Applicant Counter Extension...');
    
    // Check if we're on a LinkedIn job page
    const isJobPage = window.location.href.includes('linkedin.com/jobs/view/');
    console.log('✅ On LinkedIn job page:', isJobPage);
    
    if (!isJobPage) {
        console.log('❌ Please navigate to a LinkedIn job posting page first');
        return;
    }
    
    // Check if extension is loaded
    const extensionElement = document.querySelector('.linkedin-applicant-counter');
    console.log('✅ Extension counter element found:', !!extensionElement);
    
    if (extensionElement) {
        console.log('📊 Current displayed count:', extensionElement.textContent);
    }
    
    // Check for content script
    console.log('✅ Content script loaded:', typeof window.linkedinApplicantCounter !== 'undefined');
    
    // Test network monitoring
    console.log('🌐 Testing network interception...');
    
    // Mock a LinkedIn API response to test parsing - now with correct "applies" field
    const mockApiResponse = {
        data: {
            applies: 108,  // This is the actual format: data.applies
            title: "Sales Oriented Project Manager",
            companyDetails: {
                company: "urn:li:fs_normalized_company:7942748"
            }
        }
    };
    
    console.log('🧪 Mock API response with "applies":108 in data.applies format:', mockApiResponse);
    
    // Test the specific "applies" field extraction
    function testAppliesExtraction(responseData) {
        // Test the actual implementation logic
        if (responseData && responseData.data && typeof responseData.data.applies === 'number') {
            const result = responseData.data.applies;
            console.log('✅ "applies" field extraction test result:', result);
            return result;
        } else {
            console.log('❌ "applies" field extraction test failed - not found in data.applies');
            return null;
        }
    }
    
    testAppliesExtraction(mockApiResponse);
    
    // Check for voyager/api/jobs/jobPostings URL pattern
    console.log('🔍 Extension should only monitor URLs containing: "voyager/api/jobs/jobPostings"');
    
    // Check browser console for extension messages
    console.log('📝 Look for messages starting with "LinkedIn Applicant Counter" in console');
    
    // Test page elements that extension looks for
    const targetElements = [
        '.job-details-jobs-unified-top-card__content',
        '.jobs-unified-top-card__content',
        '.job-view-layout'
    ];
    
    targetElements.forEach(selector => {
        const element = document.querySelector(selector);
        console.log(`✅ Target element ${selector}:`, !!element);
    });
    
    // Check for job ID in URL
    const jobIdMatch = window.location.href.match(/\/jobs\/view\/(\d+)/);
    console.log('✅ Job ID extracted:', jobIdMatch ? jobIdMatch[1] : 'Not found');
    
    // Test storage access
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['lastApplicantCount'], (result) => {
            console.log('✅ Last stored count:', result.lastApplicantCount || 'None');
        });
    }
    
    console.log('🧪 Extension test complete. Check results above.');
    
    return {
        isJobPage,
        hasExtensionElement: !!extensionElement,
        jobId: jobIdMatch ? jobIdMatch[1] : null
    };
})(); 