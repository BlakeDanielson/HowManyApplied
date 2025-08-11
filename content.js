// LinkedIn Job Applicant Counter Content Script
(function() {
    'use strict';

    console.log('🎯 LinkedIn Applicant Counter: Extension loaded and ready!');

    let applicantCountDisplayed = false;
    let observer;
    let dataCheckInterval;
    let remainingChecks = 5; // bounded retries for compliance and performance

    // Start monitoring for job data immediately
    startDataMonitoring();

    // Function to extract job ID from URL
    function getJobIdFromUrl() {
        const urlMatch = window.location.href.match(/\/jobs\/view\/(\d+)/);
        return urlMatch ? urlMatch[1] : null;
    }

    // Function to start monitoring for job data
    function startDataMonitoring() {
        console.log('👀 LinkedIn Applicant Counter: Starting data monitoring...');
        
        if (dataCheckInterval) {
            clearInterval(dataCheckInterval);
            dataCheckInterval = null;
        }
        // reset retries whenever monitoring starts (e.g., after SPA nav)
        remainingChecks = 5;

        // Check every 1 second for job data (bounded retries)
        dataCheckInterval = setInterval(() => {
            const onJobPage = window.location.href.includes('/jobs/view/');
            if (!applicantCountDisplayed && onJobPage) {
                const jobId = getJobIdFromUrl();
                if (jobId) {
                    // Method 1: Check for data in DOM
                    if (checkDOMForJobData(jobId)) return;
                    
                    // Method 2: Check LinkedIn's global variables
                    if (checkLinkedInGlobals(jobId)) return;
                    
                    // Method 3: Attempt direct API fetch using CSRF when available
                    if (attemptDirectApiFetch(jobId)) return;

                    // Method 4: Check local storage (if accessible)
                    checkLocalStorage(jobId);
                }
                // only decrement retries while on a job page
                if (!applicantCountDisplayed) {
                    remainingChecks -= 1;
                }
            }
            if (remainingChecks <= 0 || applicantCountDisplayed) {
                clearInterval(dataCheckInterval);
                dataCheckInterval = null;
            }
        }, 1000);
    }

    // Removed cookie/CSRF and network history access for compliance

    // Utility: safe deep search for { applies: number } with guards
    function findAppliesInObject(root) {
        const maxNodes = 20000; // guard for performance
        const maxDepth = 8;
        const visited = new WeakSet();
        let processed = 0;
        const candidateKeys = new Set(['applies','applicantCount','applicants','numApplicants','appliesCount','appliedCount']);
        function walk(node, depth) {
            if (!node || typeof node !== 'object' || depth > maxDepth || visited.has(node)) return null;
            visited.add(node);
            processed += 1;
            if (processed > maxNodes) return null;
            // Direct property check
            for (const key in node) {
                if (candidateKeys.has(key) && typeof node[key] === 'number') {
                    return node[key];
                }
            }
            // Recurse
            for (const key in node) {
                try {
                    const child = node[key];
                    const result = walk(child, depth + 1);
                    if (typeof result === 'number') return result;
                } catch (_) {}
            }
            return null;
        }
        return walk(root, 0);
    }

    // Method 1: Check if job data is embedded in the DOM
    function checkDOMForJobData(jobId) {
        // Look for script tags that might contain job data
        const scripts = document.querySelectorAll('script');
        for (const script of scripts) {
            const content = script.textContent || script.innerText || '';
            if (content.includes(jobId) && (content.includes('"applies"') || content.includes('applicant'))) {
                console.log('🎯 LinkedIn Applicant Counter: Found job data in DOM script tag');
                
                // Extract applies count with regex
                const appliesMatch = content.match(/"appl\w+?":\s*(\d+)/);
                if (appliesMatch) {
                                            const count = parseInt(appliesMatch[1]);
                        console.log(`✅ LinkedIn Applicant Counter: Extracted applies count from DOM: ${count}`);
                        displayApplicantCount(count);
                        return true;
                }
                // Try JSON parse for structured data
                try {
                    if (script.type && script.type.includes('application')) {
                        const json = JSON.parse(content);
                        const deepCount = findAppliesInObject(json);
                        if (typeof deepCount === 'number') {
                            console.log(`✅ LinkedIn Applicant Counter: Extracted applies via JSON parse: ${deepCount}`);
                            displayApplicantCount(deepCount);
                            return true;
                        }
                    }
                } catch (_) {}
            }
        }
        // Fallback: scan JSON embedded in data attributes of likely containers (bounded)
        try {
            const candidates = document.querySelectorAll('[data-*], [data-state], [data-test], [data-view-model]');
            let scanned = 0;
            for (const el of candidates) {
                if (scanned > 200) break;
                scanned++;
                for (const attr of el.getAttributeNames()) {
                    if (!attr.startsWith('data-')) continue;
                    const val = el.getAttribute(attr) || '';
                    if (val.includes('{') && val.includes('}') && (val.includes(jobId) || val.includes('appl'))) {
                        try {
                            const deepCount = findAppliesInObject(JSON.parse(val));
                            if (typeof deepCount === 'number') {
                                console.log(`✅ LinkedIn Applicant Counter: Extracted applies from data-* attribute: ${deepCount}`);
                                displayApplicantCount(deepCount);
                                return true;
                            }
                        } catch (_) {}
                    }
                }
            }
        } catch (_) {}
        return false;
    }

    // Method 2: Check LinkedIn's global variables
    function checkLinkedInGlobals(jobId) {
        try {
            const candidates = [
                window.__INITIAL_STATE__,
                window.__APOLLO_STATE__,
                window.voyagerDataLayer,
                window.__data,
                window.linkedinData,
                window.pageData,
                window.jobData
            ];

            for (const obj of candidates) {
                if (obj && typeof obj === 'object') {
                    try {
                        // Prefer structural search over stringify for performance
                        const deepCount = findAppliesInObject(obj);
                        if (typeof deepCount === 'number') {
                            console.log(`✅ LinkedIn Applicant Counter: Extracted applies from globals: ${deepCount}`);
                            displayApplicantCount(deepCount);
                            return true;
                        }
                    } catch (_) {
                        // Ignore stringify issues
                    }
                }
            }
        } catch (e) {
            console.log('🔍 LinkedIn Applicant Counter: Error checking globals:', e);
        }
        return false;
    }

    // Utility: obtain CSRF token (meta, cookie JSESSIONID, or known globals)
    function getCSRFToken() {
        try {
            // 1) Meta tag
            const meta = document.querySelector('meta[name="csrf-token"]');
            const metaVal = meta ? meta.getAttribute('content') : null;
            if (metaVal) return metaVal;

            // 2) Cookie JSESSIONID (value often like "ajax:XYZ")
            const cookies = document.cookie.split(';');
            for (const raw of cookies) {
                const [name, ...rest] = raw.trim().split('=');
                if (name === 'JSESSIONID') {
                    const val = rest.join('=');
                    const unquoted = val ? val.replace(/^\"|\"$/g, '') : '';
                    const m = unquoted.match(/ajax:([^;"']+)/);
                    if (m && m[1]) return m[1];
                }
            }

            // 3) Known globals (best-effort)
            if (typeof window.voyagerCSRF === 'string' && window.voyagerCSRF) return window.voyagerCSRF;
            if (typeof window._csrf === 'string' && window._csrf) return window._csrf;
        } catch (_) {}
        return null;
    }

    // Method 3: Direct fetch attempt using CSRF (meta/cookie/globals)
    function attemptDirectApiFetch(jobId) {
        try {
            const apiUrl = `https://www.linkedin.com/voyager/api/jobs/jobPostings/${jobId}`;
            const headers = {
                'accept': 'application/vnd.linkedin.normalized+json+2.1',
                'x-restli-protocol-version': '2.0.0',
                'referer': window.location.href
            };

            const csrf = getCSRFToken();
            if (!csrf) return false; // cannot proceed without CSRF
            headers['csrf-token'] = `ajax:${csrf}`;

            // Perform a best-effort fetch; if blocked, it will fail silently and we'll fall back
            fetch(apiUrl, {
                method: 'GET',
                credentials: 'include',
                cache: 'no-store',
                headers
            })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                extractApplicantCount(data);
            })
            .catch(() => {
                // Ignore errors; other methods may succeed
            });

            return true; // attempt initiated
        } catch (_) {
            return false;
        }
    }

    // Method 3: Check browser storage
    function checkLocalStorage(jobId) {
        try {
            // Check localStorage for cached job data
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.includes('job') || key.includes('voyager'))) {
                    const value = localStorage.getItem(key);
                    if (value && value.includes(jobId) && value.includes('"applies"')) {
                        console.log('🎯 LinkedIn Applicant Counter: Found job data in localStorage');
                        
                        const appliesMatch = value.match(/"applies":(\d+)/);
                        if (appliesMatch) {
                                                            const count = parseInt(appliesMatch[1]);
                                console.log(`✅ LinkedIn Applicant Counter: Extracted applies count from storage: ${count}`);
                                displayApplicantCount(count);
                                return true;
                        }
                    }
                }
            }
        } catch (e) {
            // localStorage might be restricted
        }
        return false;
    }

    // Removed fetch/XHR monkey-patching for compliance

    // Removed performance cache re-fetch and internal cache scanning for compliance

    // Function to extract applicant count from API response
    function extractApplicantCount(responseData) {
        console.log('🔍 LinkedIn Applicant Counter: Analyzing response data...');
        console.log('📋 Full response structure:', responseData);
        
        // Check if responseData exists
        if (!responseData) {
            console.log('❌ LinkedIn Applicant Counter: Response data is null/undefined');
            return;
        }
        
        // Check if responseData.data exists
        if (!responseData.data) {
            console.log('❌ LinkedIn Applicant Counter: No "data" property in response');
            console.log('📋 Available properties:', Object.keys(responseData));
            return;
        }
        
        // Check if applies field exists
        if (typeof responseData.data.applies !== 'number') {
            console.log('❌ LinkedIn Applicant Counter: No "applies" field found in data');
            console.log('📋 Available data properties:', Object.keys(responseData.data));
            console.log('📋 Data.applies value:', responseData.data.applies);
            console.log('📋 Data.applies type:', typeof responseData.data.applies);
            
            // Try to find applies field anywhere in the response
            const responseStr = JSON.stringify(responseData);
            const appliesMatch = responseStr.match(/"applies":(\d+)/);
            if (appliesMatch) {
                const count = parseInt(appliesMatch[1]);
                console.log(`🎯 LinkedIn Applicant Counter: Found "applies" field via search: ${count}`);
                displayApplicantCount(count);
                return;
            } else {
                console.log('🔍 LinkedIn Applicant Counter: No "applies" field found anywhere in response');
            }
            return;
        }
        
        // Success case
        const applicantCount = responseData.data.applies;
        console.log(`✅ LinkedIn Applicant Counter: Found "applies":${applicantCount} in data.applies`);
        displayApplicantCount(applicantCount);
    }

    // Function to display the applicant count on the page
    function displayApplicantCount(count) {
        if (applicantCountDisplayed) {
            console.log('🚫 LinkedIn Applicant Counter: Count already displayed, skipping duplicate...');
            return;
        }

        // Set flag immediately to prevent duplicates
        applicantCountDisplayed = true;
        
        // Stop the monitoring interval
        if (dataCheckInterval) {
            clearInterval(dataCheckInterval);
            console.log('🛑 LinkedIn Applicant Counter: Stopped monitoring - count found!');
        }

        // Remove any existing banners first (safety check)
        const existingBanners = document.querySelectorAll('.linkedin-applicant-counter');
        existingBanners.forEach(banner => {
            console.log('🧹 LinkedIn Applicant Counter: Removing existing banner');
            banner.remove();
        });

        // Find a good location to display the count
        const jobHeader = document.querySelector('.job-details-jobs-unified-top-card__content') ||
                         document.querySelector('.jobs-unified-top-card__content') ||
                         document.querySelector('.job-view-layout');

        if (jobHeader) {
            const countElement = document.createElement('div');
            countElement.className = 'linkedin-applicant-counter success';
            countElement.innerHTML = `
                <div class="applicant-count-badge">
                    <span class="count-number" aria-live="polite" role="status">${count.toLocaleString()}</span>
                    <span class="count-label">Total Applicants</span>
                </div>
            `;

            // Insert the element at the top of the job header
            jobHeader.insertBefore(countElement, jobHeader.firstChild);

            console.log(`✅ LinkedIn Applicant Counter: Successfully displayed ${count} total applicants`);

            // Notify background script
            chrome.runtime.sendMessage({
                type: 'applicantCountFound',
                count: count,
                url: window.location.href
            });

            // Store data for popup
            chrome.storage.local.set({
                lastApplicantCount: count,
                lastJobUrl: window.location.href,
                lastUpdate: Date.now()
            });
        }
    }



    // Initialize the extension
    function init() {
        console.log('🔍 LinkedIn Applicant Counter: Checking URL:', window.location.href);
        
        if (!window.location.href.includes('linkedin.com/jobs/view/')) {
            console.log('❌ LinkedIn Applicant Counter: Not on a job posting page');
            return;
        }

        console.log('✅ LinkedIn Applicant Counter: On job posting page, ready to display counts...');
        applicantCountDisplayed = false;
        
        // Log that we're ready on this job page
        const jobId = getJobIdFromUrl();
        if (jobId) {
            console.log('🆔 LinkedIn Applicant Counter: Job ID found:', jobId);
            console.log('💡 Extension will search for applicant data using multiple methods');
        }

        // Set up observer for dynamic content changes
        if (observer) {
            observer.disconnect();
        }

        observer = new MutationObserver(() => {
            if (applicantCountDisplayed) return;
            const jobId = getJobIdFromUrl();
            if (!jobId) return;
            if (checkDOMForJobData(jobId)) return;
            if (checkLinkedInGlobals(jobId)) return;
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Start or restart monitoring when we enter a job view
        startDataMonitoring();
    }

    // Handle page navigation (LinkedIn is a SPA)
    let currentUrl = window.location.href;
    
    const urlObserver = new MutationObserver(() => {
        if (window.location.href !== currentUrl) {
            const prevUrl = currentUrl;
            currentUrl = window.location.href;

            // If we navigated away from a job page, clear banner and notify background to clear badge
            const wasJobPage = /linkedin\.com\/jobs\/view\//.test(prevUrl);
            const isJobPage = /linkedin\.com\/jobs\/view\//.test(currentUrl);
            if (wasJobPage && !isJobPage) {
                try {
                    const banners = document.querySelectorAll('.linkedin-applicant-counter');
                    banners.forEach(b => b.remove());
                } catch (_) {}
                chrome.runtime.sendMessage({ type: 'pageChanged' });
                applicantCountDisplayed = false;
            }

            setTimeout(init, 1000); // Give time for page to load
        }
    });

    // Function to start URL monitoring when DOM is ready
    function startUrlMonitoring() {
        if (document.body) {
            urlObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log('🔍 LinkedIn Applicant Counter: URL monitoring started');
        } else {
            // If body doesn't exist yet, wait a bit and try again
            setTimeout(startUrlMonitoring, 100);
        }
    }

    // Initial load - wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            startUrlMonitoring();
        });
    } else {
        init();
        startUrlMonitoring();
    }

})(); 