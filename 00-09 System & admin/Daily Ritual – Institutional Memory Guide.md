---
type: reference
status: active
created: 2026-04-24
tags: [#w20/ritual, #w20/system, #w20/daily-practice]
ai_assisted: false
---

# Daily Ritual – Institutional Memory Guide

The W20 system lives through daily practice. This guide explains how daily notes become the hub of institutional memory—capturing decisions, routing work, and feeding Dataview dashboards that run your business.

---

## Why Daily Notes Matter

**Institutional memory is not:**
- A backup system
- An archive you review later
- Documentation you write after the fact

**Institutional memory IS:**
- A *daily capture ritual* that structures how you think
- The *source of truth* for what's pending, due, and overdue
- A *live dashboard* that shows system health at a glance
- The *context* for decisions (why was this proposed? who decided?)

Daily notes are where the W20 system becomes real—not abstract filing rules, but actual work flowing through your hands.

---

## The Daily Rhythm (25 min)

### Morning (5 min) — Situational Awareness

Open your daily note. Read these three queries:

**1. Pending Decisions Due This Week**
```
Are there any client proposals or invoices I need to act on today?
What's the decision deadline?
```

**2. Overdue Items**
```
Anything past due that needs follow-up?
Any invoices I should have paid?
```

**3. Due Today**
```
What action items are due *right now*?
Can I clear any before starting the day?
```

This takes 5 minutes. You now have situational awareness for the day.

### Throughout Day — Structured Capture

When something happens—meeting, proposal, invoice, useful link—don't just type it. **Use a template.**

The template gives you structure:
- **What you're capturing** (type: proposal, meeting, invoice, research)
- **When** (created date auto-fills)
- **Where it goes** (jd_location, related_moc auto-populate)
- **What to do next** (action items, routing rules)

Example: After a client call about a new proposal, you spend 2 minutes:
1. Open [[Template – Client Proposal]]
2. Fill in client name, amount, decision date
3. Save to `00.01 Inbox/`

YAML is auto-populated. Dataview picks it up immediately. Tomorrow morning, it appears in your "Pending Decisions" query. You didn't organize it; the template did.

### Evening (10 min) — Triage & Review

Spend 10 minutes reviewing what you captured:

**1. Check "Recently Captured"**
```
Anything I added today or yesterday that needs routing?
Can it move to its permanent JD location?
Or does it need [[00.04 Needs review]] (flag for later)?
```

**2. Mark Done**
- Completed any action items? Check them off.
- Moved any inbox items to permanent locations? Update status.
- Archived research or proposals? Mark them `status: archived`.

**3. Flag Risks**
- Any overdue invoices I haven't followed up on?
- Any pending decisions getting close to deadline?
- Any blockers or decisions waiting on someone else?

---

## Weekly Review (Friday, 30 min)

Every Friday, spend 30 minutes reviewing the week in your daily note's "Weekly Review" section.

### What You're Looking For

**1. Inbox Health**
```
How many items are still in "inbox" status?
Anything stuck that should have been routed?
```

**2. Finance Summary**
```
How many invoices came in?
How many paid?
Anything overdue?
```

**3. Proposals & Decisions**
```
Did any proposals get decided this week?
Are any new ones pending?
What are the decision deadlines?
```

**4. Research & References**
```
What did we capture?
Is it relevant to current projects?
Should anything go to Knowledge vault?
```

### Actions
- **Blockers:** If something is stuck, flag it in [[00.04 Needs review]] or reach out
- **Routing:** Move any remaining "inbox" items to permanent locations
- **Archive:** Clear out completed proposals, paid invoices, resolved decisions
- **JDex audit:** Run `/jd:jdex-audit W20` to catch any new folders out of sync

---

## Monthly Review (Last Friday, 1 hour)

Once a month, spend an hour looking at the bigger picture:

### System Health
- How many active clients are tracked?
- What's the average time from proposal → decision?
- How many invoices are unpaid? (should be <5)
- Is the inbox staying under 10 items?

### Process Review
- Did any routine tasks fall through?
- Are templates working, or do we need new ones?
- Are there patterns in routing failures? (stuff that ends up in [[00.04 Needs review]])

### Institutional Knowledge
- Did we document key decisions? (in meeting notes → MOC)
- Are client relationships tracked? (in `11.0x+CLIENT/`)
- Is research organized? (in `40.0x/`)

---

## How Dataview Powers Institutional Memory

Every query in your daily note is a **live window into system state**—no manual aggregation needed.

### Queries Do the Remembering
- **"Pending Decisions"** query remembers which proposals are waiting
- **"Overdue Invoices"** query flags what needs follow-up
- **"Recently Captured"** query shows what came in without asking you to search
- **"Action Items Due"** query pulls tasks from meeting notes automatically

You don't have to remember. The system does.

### Templates Do the Structuring
When you use a template, you're not just capturing data—you're *labeling* it for the system:
- Type = What kind of thing is this?
- Status = Where is it in its lifecycle?
- JD location = Where does it belong?
- Tags = How do I find it later?

Dataview queries read these labels and organize automatically.

### MOCs Connect the Dots
[[MOC – Inbox]] shows you:
- What templates exist
- What queries pull from them
- How items route to permanent locations
- What the workflow looks like

MOCs are your *system orientation*—the "why" behind the structure.

---

## Institutional Memory Best Practices

### 1. Always Use Templates
Don't freestyle capture. Templates bake in structure, which feeds Dataview.

### 2. Keep YAML Consistent
- Every capture gets `type`, `status`, `created`, `jd_location`
- Tags use consistent naming: `#w20/area`, `#project/name`
- Don't skip fields

### 3. Date Everything
`created: YYYY-MM-DD` is not optional. Dataview sorts by date; without it, queries break.

### 4. Review Dashboards, Don't Maintain Them
You don't update queries. Dataview does. Your job is to *read* what it tells you and act.

### 5. Route Inbox Items Promptly
Inbox clutter = cognitive clutter. After capture, move items to permanent JD locations within 24 hours.

### 6. Archive Completed Items
Proposals that were decided → mark `status: archived`
Invoices that were paid → mark `status: archived`
Tasks that are done → archive in [[00.02 Tasks]]

Clearing completed items keeps dashboards showing what's *active*.

### 7. Document Decisions in MOC
When a client decision gets made, update the client MOC with the outcome (in their `11.0x+CLIENT/` folder).

---

## Monthly Maintenance Checklist

Every month, spend 15 minutes on system health:

- [ ] Run `jd:jdex-audit W20` — catch new folders out of sync
- [ ] Check [[00.04 Needs review]] — resolve any classification conflicts
- [ ] Archive old completed items — keep dashboards current
- [ ] Review [[00.00 JDex]] — is it still accurate?
- [ ] Update [[MOC – Inbox]] — have we added new templates or dashboards?
- [ ] Scan Knowledge vault — should any research be linked back to clients?

---

## The Philosophy

Daily notes are not a *task management system*. They're a *memory system*—a place where:
- Decisions get documented (so you remember why)
- Work gets routed (so it doesn't get lost)
- Patterns become visible (so you see what's working)
- The system stays healthy (so it serves you, not the other way around)

By spending 25 minutes a day + 30 minutes weekly, you build institutional memory that outlasts you. Future you (or someone reading your notes) will know:
- What was decided and when
- Why it was decided that way
- Who was involved
- What the outcomes were
- What changed because of it

That's institutional memory. That's why templates and daily notes matter.

---

## See Also
- [[Daily Note Template]] — copy this into Obsidian daily notes
- [[MOC – Inbox]] — system architecture
- [[Dataview Queries – Inbox Dashboard]] — all 10 queries explained
- [[00.00 JDex]] — master index
