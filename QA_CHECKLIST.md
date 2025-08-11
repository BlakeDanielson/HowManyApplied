# Phase 3 QA Checklist

Use this checklist to validate functionality, stability, performance, and accessibility before packaging for the Chrome Web Store.

## Environments
- [ ] Chrome Stable (Windows 11)
- [ ] Chrome Beta (optional)
- [ ] Edge (sanity, optional)

## Preconditions
- [ ] Load unpacked extension in `chrome://extensions/`
- [ ] Ensure Developer Mode is ON
- [ ] Pin the extension

## Core Scenarios
- [ ] Job page: Navigate to a URL matching `linkedin.com/jobs/view/*`
  - [ ] Banner appears once at the top of the job header
  - [ ] Count is formatted with thousands separators
  - [ ] Screen reader announces the count (aria-live, role="status")
  - [ ] No console errors
- [ ] Non-job LinkedIn page (e.g., `linkedin.com/jobs/`)
  - [ ] No banner inserted
  - [ ] Popup shows guidance state
- [ ] SPA navigation between jobs (click different job cards without full page reload)
  - [ ] Banner updates for new job; no duplicates remain
  - [ ] Only one `.linkedin-applicant-counter` exists at any time
- [ ] Navigate away from job page (e.g., to `linkedin.com/notifications/`)
  - [ ] Banner removed from DOM
  - [ ] Toolbar badge cleared

## Variants
- [ ] Different job templates (company job page, promoted listings)
- [ ] Jobs with no applicant data (verify graceful no-banner or no-count state)
- [ ] Expired/closed jobs (no errors; graceful behavior)
- [ ] Logged-in user without Premium (baseline)
- [ ] Logged-in user with Premium (if available)

## Badge and Storage
- [ ] On job page with successful detection, badge shows count
- [ ] On navigation away, badge clears
- [ ] `chrome.storage.local` contains `lastApplicantCount` and `lastJobUrl` after detection
- [ ] Popup shows "Last detected" information when available

## Performance & Stability
- [ ] No infinite polling: bounded retries stop after a few seconds when no data
- [ ] MutationObserver present but not causing CPU spikes (watch Task Manager)
- [ ] No repeated identical console logs on idle pages

## Accessibility & UI
- [ ] `aria-live="polite"` and `role="status"` are present on count number
- [ ] Contrast is adequate in light and dark mode (prefers-color-scheme)
- [ ] Banner placement does not overlap critical LinkedIn UI
- [ ] Responsive at common widths (1366px, 1536px, 1920px)

## Error Console
- [ ] No uncaught exceptions
- [ ] Minimal log noise; nothing alarming for store reviewers

## Regression
- [ ] Popup buttons work (Open LinkedIn Jobs, Refresh Current Page)
- [ ] No behavior relies on `scripting` permission

## Artifacts for Store Listing
- [ ] 3–5 screenshots showing banner on different job pages
- [ ] Optional short GIF/video capture showing banner appearing after navigation

## Notes / Issues Found
- Itemize any failures here with steps to reproduce, expected vs actual, and console traces.


