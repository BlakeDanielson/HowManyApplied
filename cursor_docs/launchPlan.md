## Launch Plan — LinkedIn Job Applicant Counter

### Objectives and KPIs
- **Primary**: 1,000+ GitHub stars; 200+ installs (unpacked) in week 1; 20+ qualified feedback comments/issues
- **Secondary**: 5+ community shares; 3+ creator mentions; 1-2 potential collab DMs

### Core Positioning
- **What**: A Chrome extension that automatically reveals the true number of applicants on LinkedIn job postings.
- **Why it matters**: Saves time, enables smarter application decisions, privacy-first, open-source.
- **Proof**: Mirrors the manual devtools method, automated. No tracking, local-only processing.

### Target Audience
- Active job seekers and career switchers
- Career coaches and resume writers
- Tech and business communities discussing hiring/interviews

### Assets Checklist (prep before posting)
- [ ] Short demo GIF (10–20s) showing the count appearing on a job page
- [ ] Before/After screenshot (LinkedIn default vs. “Actual applicants” badge)
- [ ] One-liner: “See the real applicant count on LinkedIn job posts. Automatically.”
- [ ] GitHub repo link and quick install steps (Load unpacked)
- [ ] Disclaimer snippet about educational use + LinkedIn ToS
- [ ] Issue templates on GitHub (bug, feature request) optional
- [ ] Readme anchors to Installation and Troubleshooting

### Links to include
- **Repo**: use this repository link
- **Install (Dev)**: README → Installation → Load unpacked
- **Support**: GitHub Issues

---

## Timeline

### T-2 to T-1 days (Prep)
- Record demo GIF and take 1-2 clean screenshots
- Final pass on README; ensure troubleshooting is concise
- Draft posts for X, LinkedIn, and Reddit (below)

### Launch Day (T0)
- Post on X and LinkedIn within a 2-hour window
- Post on 1–2 relevant subreddits (avoid mass cross-posting same hour)
- Ask a few friends to comment with feedback, not just “nice”

### T+1 to T+7 days (Follow-through)
- Reply to every comment within 12–24 hours
- Triage issues; ship quick fixes; post small updates
- Share one “lessons learned”/mini-update on day 3–4

---

## Platform-Specific Content

### X / Twitter
Hook ideas:
- “LinkedIn shows ‘10+ applicants’. Here’s the actual number — automatically.”
- “Stop opening DevTools to find the real applicant count. This Chrome extension does it for you.”

Tweet (single):
```
Job hunting on LinkedIn? See the REAL applicant count on any job posting — automatically.

• No tracking, open-source
• Works on linkedin.com/jobs/view/*
• 10s install (load unpacked)

Repo + demo → <GitHub link>
```

Thread (3–5 tweets):
1) Pain + promise (+ demo GIF)
2) How it works (intercepts API responses; looks for "applies"; renders UI)
3) Privacy (no external servers; local-only)
4) Install steps (Load unpacked) + note: Web Store coming soon
5) Ask: “Star the repo, report issues, and share with a job seeker”

Hashtags (optional, 1–2 max): #jobsearch #ChromeExtension #opensource

### LinkedIn
Post outline:
- Lead with outcome: “I built a Chrome extension that shows the true number of applicants on LinkedIn job posts.”
- 3 bullets on value: save time, real data, better decisions
- 2 bullets on how it works (automates the devtools method; privacy-first)
- 1 line install steps + repo link
- CTA: “I’d love your feedback — comment with issues/ideas.”

Example copy:
```
I built a small Chrome extension for job seekers: it reveals the REAL applicant count on LinkedIn job postings.

• Automates the devtools method (no more manual digging)
• Real counts from API responses
• Privacy-first, open-source

Install (dev, 10s): Load unpacked from the repo. Chrome Web Store listing is coming soon.
Grab it + see the demo: <GitHub link>

I’d love feedback: What would make this more useful for you?
```

### Reddit
Suggested subreddits (post where rules allow links and self-promo; always read rules first):
- r/JobHunting, r/cscareerquestions, r/jobs, r/SideProject, r/chrome_extensions

Angle: helpful tool share; transparent, no tracking, open-source, free.

Post template:
```
Title: A small free Chrome extension that shows the REAL applicant count on LinkedIn job posts

Body:
I made a tiny open-source extension that automates the common devtools trick to find actual applicant counts on LinkedIn.

• Works automatically on linkedin.com/jobs/view/*
• Pulls the count from API responses (what you’d manually find in Network tab)
• No tracking, local-only, MIT-licensed

Install (dev): Load unpacked from the repo (10s). Web Store: coming soon.
Repo + demo: <GitHub link>

Happy to answer questions, hear feedback, or take feature requests (issues welcome!).
```

Comment strategy:
- Be responsive; share fixes quickly
- If a mod flags self-promo, offer to remove and ask for guidance

---

## Launch Checklist (day-of)
- [ ] Demo GIF and screenshots attached where supported
- [ ] Posts customized per platform (no copy-paste blast)
- [ ] Repo link tested; README anchors work
- [ ] Friendly disclaimer present; no claims of affiliation
- [ ] Ask for stars/issues/feedback
- [ ] Monitor notifications for first 4–6 hours

## Post-Launch Tasks
- [ ] Pin a GitHub issue for FAQs and known issues
- [ ] Add a short CHANGELOG in README if fixes ship
- [ ] Collect feedback themes; prioritize quick wins
- [ ] Consider a short follow-up post with improvements and user quotes

## Notes on Compliance and Tone
- Educational/research framing; respect LinkedIn ToS
- Emphasize privacy and local processing
- Avoid implying endorsement by LinkedIn


