# Manual Test Steps (Phase 3)

Follow these steps to manually verify the extension end-to-end.

## Setup
1. Open Chrome; go to `chrome://extensions/`.
2. Enable Developer Mode.
3. Click "Load unpacked" and select the project folder.
4. Pin the extension.

## Tests
1. Open `https://www.linkedin.com/jobs/`.
   - Open the extension popup: it should say to navigate to a specific job posting.
2. Click a job result to open a job view (`/jobs/view/123...`).
   - Within a few seconds, the green banner should appear once at the top of the job header.
   - The count should be formatted with thousands separators.
   - The browser toolbar badge should show the same count.
3. Click another job in the sidebar (SPA navigation).
   - The banner updates for the new job; ensure there is still only one banner.
4. Navigate away (e.g., `https://www.linkedin.com/notifications/`).
   - The banner is removed and the toolbar badge is cleared.
5. Refresh the page while on a job view.
   - The banner appears again; no console errors.

## Edge Cases
- Jobs with no count available: no errors; banner may not appear.
- Expired/closed job postings: no errors.
- Slow network: banner appears once data is present; no infinite retries.

## Post-Checks
- In the popup, the "Last detected" box shows the last job ID and count when available.
- No errors in DevTools Console related to the extension.


