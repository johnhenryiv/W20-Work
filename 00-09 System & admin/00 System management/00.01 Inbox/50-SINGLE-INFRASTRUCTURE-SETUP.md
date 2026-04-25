# 50 & Single Launch — Infrastructure Setup Guide

## Overview

This document walks through setting up the shared infrastructure for the project. You'll establish secure collaboration channels, file storage, and password management. **Timeline: Complete this week so you're ready to launch content work immediately.**

---

## Phase 1: Synology Setup (Your Role)

### Step 1: Create Synology Admin Account (if not already done)
- Set up Synology NAS with strong admin credentials
- Note the IP address and domain (you'll share this with Eric)
- Enable two-factor authentication on admin account

### Step 2: Create Eric's Login

**Access Synology Dashboard:**
1. Go to **Control Panel** → **User & Group**
2. Create new user:
   - **Username:** `eric`
   - **Password:** [Generate strong temporary password]
   - **Description:** "Eric — 50 & Single Production Collaborator"
   - **Assign Groups:** Create a new group called `50-single-team` and add Eric to it

**Grant Eric Permissions:**
1. Go to **Control Panel** → **Shared Folder**
2. Create a shared folder: `50-single-project`
   - Assign read/write permissions to `eric` user
   - Assign read/write permissions to `50-single-team` group
3. Create subfolders within `50-single-project/`:
   - `podcast-episodes`
   - `scripted-segments`
   - `quick-stories`
   - `graphics-assets`
   - `audio-files`
   - `production-notes`
   - `contacts-partnerships`

### Step 3: Share Access with Eric

Send Eric an email with:
```
Synology Access Details:
- IP Address: [YOUR IP]
- Synology URL: [YOUR SYNOLOGY URL]
- Username: eric
- Temporary Password: [PASSWORD]
- Note: You will be prompted to change this password on first login
- Access Shared Folder: 50-single-project
```

**Eric's First Steps:**
1. Log into Synology
2. Change password to something only he knows
3. Download/install Synology Drive app on his computer
4. Sync `50-single-project` folder locally for easy access

---

## Phase 2: Bitwarden Setup (Shared)

### Why Bitwarden?
- Secure password sharing without email vulnerabilities
- Audit logs track who accessed what
- Can revoke access instantly
- Works across devices

### Step 1: Create Your Bitwarden Account
1. Go to **bitwarden.com**
2. Sign up with your email
3. Create a master password (strong, unique, memorable only to you)
4. Enable two-factor authentication (2FA) — use authenticator app (Google Authenticator, Authy, Microsoft Authenticator)

### Step 2: Create Organization (Optional but Recommended)
1. In Bitwarden, go to **Settings** → **Organizations**
2. Create organization: `50-Single-Launch`
3. Invite Eric to organization:
   - Enter his email
   - Set role: **Manager** (allows him to manage shared items)
   - Send invitation

### Step 3: Create Shared Vault Folder
1. In Bitwarden, create folder: `50-Single-Shared`
2. Add credentials you want to share with Eric:
   - **Synology credentials** (username, password, IP)
   - **Google Drive/Workspace shared passwords** (if applicable)
   - **Podcast hosting credentials** (Anchor/Spotify, Buzzsprout, etc.)
   - **Email credentials** (50-single launch email, if separate)
   - **Partnership contact info** (OR9 Noir Nudists, SET app, 24W)

### Step 4: Eric's Bitwarden Setup
1. Eric creates his Bitwarden account at **bitwarden.com**
2. Accept your organization invitation
3. Access shared folder: `50-Single-Shared`
4. Enable 2FA on his account

### Bitwarden Best Practices
- **Never** share master passwords via email or chat
- Only share credentials through Bitwarden vault
- Rotate passwords annually
- Revoke Eric's access if needed: **Settings** → **Organization** → manage member access

---

## Phase 3: Google Drive Architecture

### Step 1: Create Google Drive Folder Structure

**Main folder:** `50 & Single Launch` (shared with Eric — give him Editor access)

```
50 & Single Launch/
├── 01-PODCAST
│   ├── Episode Outlines
│   ├── Guest Host List
│   ├── Guest Research & Notes
│   ├── Audio Files (Raw)
│   ├── Audio Files (Edited)
│   └── Episode Metadata (Titles, Descriptions, Show Notes)
│
├── 02-SCRIPTED-SEGMENTS
│   ├── "50 & Single" Segment Ideas
│   ├── Scripts (Drafts & Final)
│   ├── Casting & Talent
│   ├── Video Files
│   └── Editing Notes
│
├── 03-QUICK-STORIES
│   ├── Story Submission Template
│   ├── Submitted Stories (by date)
│   ├── Production Notes (Animation vs. Live)
│   ├── Video/Animation Assets
│   └── Scheduled Stories
│
├── 04-PARTNERSHIPS
│   ├── OR9 Noir Nudists
│   │   ├── Contact Info
│   │   ├── Sponsorship Proposal
│   │   └── Contracts & Agreements
│   ├── SET App
│   │   ├── Contact Info
│   │   ├── Partnership Terms
│   │   └── Integration Notes
│   └── 24W Holding Company
│       ├── Structure Doc
│       └── Messaging
│
├── 05-PRODUCTION-CALENDAR
│   ├── Timeline (May–June)
│   ├── Task Tracker
│   └── Launch Checklist
│
├── 06-CONTACTS
│   ├── Guest Hosts
│   ├── Guest Participants
│   ├── Partner Contacts
│   └── Service Providers (Audio Editor, Designer, etc.)
│
├── 07-BRAND-ASSETS
│   ├── Logo & Color Palette
│   ├── Social Media Templates
│   ├── Episode Graphics
│   └── Promotional Materials
│
└── 08-NOTES & IDEAS
    ├── Brainstorm (Shared Google Keep)
    ├── Tone & Format Reference
    ├── Sex-Positive Conversation Guidelines
    └── Inspiration & Clips
```

### Step 2: Create Shared Google Docs

**Document 1: "50 & Single Launch — Master Production Doc"**
- Overview of project
- Core ideas & tone
- Launch timeline
- Key contacts
- Status updates (living document)

**Document 2: "Guest Host & Participant Database"**
- Guest host names (that you have in mind)
- Topics/expertise
- Contact info
- Confirmation status
- Availability

**Document 3: "Episode Ideas & Topics"**
- Podcast episode themes
- Proposed guest matches
- Key talking points
- Research to do

**Document 4: "Segment Ideas Log"**
- Scripted segment concepts
- Quick-story themes
- Production notes
- Status

### Step 3: Create Google Keep Notes (Shared)

Create a shared Google Keep notebook: `50-Single-Launch-Notes`

Use for:
- Quick ideas (before they go into proper docs)
- Daily/weekly production notes
- Reminders to Eric
- Funny moments or quotes from conversations
- Links to inspiration or reference material

---

## Phase 4: Sharing & Permissions

### Google Drive Sharing
1. Right-click `50 & Single Launch` folder
2. **Share** → Enter Eric's email
3. Set permission: **Editor** (so he can create, edit, and organize)
4. Do **not** notify (you'll tell him directly)

### Which Docs to Share with Eric?
**Give Eric access (Editor role):**
- Master Production Doc
- Guest Host Database
- Episode Ideas
- Segment Ideas Log
- Google Keep Notes

**Keep private (View-only or your eyes only):**
- Any personal notes about talent/partnerships
- Sensitive contact info (if needed)
- Financial/sponsorship terms (unless Eric needs to manage)

---

## Phase 5: Communication Channels (Quick Setup)

### Email
- Decide: Do you want a separate project email (`50andsingle@...`)? If yes, create now and add to Bitwarden.

### Google Chat / Google Meet
- Use as backup for quick sync-ups
- Schedule weekly 15-minute check-ins: **Tuesdays, 10 AM**

### Phone / Text
- For urgent production issues only
- Use Bitwarden for phone numbers if needed

---

## Checklist: Complete This Week

- [ ] Synology: Create `eric` user & shared folder structure
- [ ] Synology: Send Eric login credentials (via Bitwarden or in-person)
- [ ] Bitwarden: Both create accounts, enable 2FA
- [ ] Bitwarden: Create shared `50-Single-Shared` folder with Synology & podcast hosting creds
- [ ] Google Drive: Create main folder & subfolder structure
- [ ] Google Drive: Create Master Production Doc, Guest Database, Ideas Log
- [ ] Google Keep: Create shared notebook for notes/ideas
- [ ] Google Drive: Share folder & docs with Eric (Editor access)
- [ ] Send Eric a summary email with all access points & first tasks
- [ ] Schedule first sync-up call with Eric (confirm he can access everything)

---

## Quick Reference: Where Everything Lives

| Asset | Location | Who Can Access |
|-------|----------|-----------------|
| Passwords & Credentials | Bitwarden (50-Single-Shared) | You & Eric |
| Project Files & Media | Synology (50-single-project) | You & Eric |
| Planning & Docs | Google Drive (50 & Single Launch) | You & Eric (Editor) |
| Quick Notes | Google Keep (50-Single-Launch-Notes) | You & Eric |
| Ongoing Calendar & Tasks | Google Drive (05-PRODUCTION-CALENDAR) | You & Eric |

---

## Next Steps (After Infrastructure Is Live)

Once you and Eric have confirmed access to all systems:
1. Schedule a 30-minute kick-off call
2. You'll share:
   - Guest host names & initial research
   - Scripted segment ideas (you draft these next)
   - Partnership strategy for OR9, SET, 24W
3. Eric confirms he's ready to move forward on agreed tasks
4. Begin creative content development (podcast outline, segment scripts, etc.)

---

**Questions?** Add them to the shared Google Keep or reach out directly. You're moving fast — this infrastructure should take 2–3 hours to set up, and then you're flying.
