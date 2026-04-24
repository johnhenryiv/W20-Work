---
type: reference
status: active
created: 2026-04-24
tags: [#w20/dataview, #w20/dashboard, #w20/inbox]
ai_assisted: false
---

# Dataview Queries – Inbox Dashboard

Copy-paste these Dataview queries into your daily notes or MOC to create live dashboards. **No manual updating required** — they pull from template YAML automatically.

---

## 1. Inbox Status Overview

**What it shows:** All inbox items grouped by JD location, with type and creation date.

```dataview
table type, jd_location, created
where status = "inbox"
group by jd_location
sort by jd_location, created desc
```

---

## 2. Pending Client Decisions

**What it shows:** Proposals awaiting decision, sorted by decision date (due soonest first).

```dataview
table client, amount, decision_date
where type = "proposal" and status = "inbox"
sort by decision_date asc
```

---

## 3. Overdue Invoices

**What it shows:** Unpaid invoices past due date (red flag for follow-up).

```dataview
table vendor, amount, due_date, payment_status
where type = "invoice" and due_date < today
sort by due_date asc
```

---

## 4. Invoices Due This Week

**What it shows:** Invoices coming due in the next 7 days.

```dataview
table vendor, amount, due_date
where type = "invoice" and due_date >= today and due_date <= today + dur(7 days)
sort by due_date asc
```

---

## 5. Action Items from Meetings

**What it shows:** All tasks extracted from meeting notes (via checkbox syntax).

```dataview
task
where contains(tags, "#w20/action")
group by file.link
sort by due asc
```

---

## 6. Recently Captured (Last 7 Days)

**What it shows:** All new items captured this week, by type.

```dataview
table type, jd_location, created
where created >= date(today) - dur(7 days)
group by type
sort by created desc
```

---

## 7. By-Category Summary

**What it shows:** Count of inbox items by type (proposals, meetings, invoices, research).

```dataview
table rows.length as count
where status = "inbox"
group by type
```

---

## 8. All Active (Non-Archived) Items

**What it shows:** Everything that hasn't been moved to a permanent location yet.

```dataview
table type, jd_location, created, status
where status != "archived"
sort by created desc
```

---

## 9. Proposals by Client

**What it shows:** All proposals grouped by client name.

```dataview
table amount, decision_date, status
where type = "proposal"
group by client
sort by decision_date asc
```

---

## 10. Research Items by Relevance Area

**What it shows:** Captured links/resources organized by what they're relevant for.

```dataview
table source, url, created
where type = "research"
group by relevance_area
sort by created desc
```

---

## How to Use

### Embed in Daily Notes
Add any query to your daily note template to see inbox status at a glance:

```markdown
## Inbox Check-in

![[Dataview Queries – Inbox Dashboard#1. Inbox Status Overview]]

## This Week's Decisions

![[Dataview Queries – Inbox Dashboard#2. Pending Client Decisions]]
```

### Create a Dashboard Page
Copy multiple queries into a single "Inbox Dashboard" note and check it weekly.

### Set Up Auto-Refresh
Obsidian Dataview auto-refreshes every time you open a file — no manual intervention needed.

---

## Customization

**Change the date range:** Replace `dur(7 days)` with `dur(14 days)`, `dur(1 months)`, etc.

**Filter by tag:** Add `and contains(tags, "#w20/clients")` to any query to narrow results.

**Sort differently:** Change `sort by` to any field in your template YAML (e.g., `sort by amount desc` for invoices by size).

**Group by different field:** Change `group by` to organize by vendor, client, date, etc.

---

## Pro Tips

1. **Create a "Decisions Dashboard":** Combine #2 and #3 to see all pending decisions + overdue items in one view.
2. **Weekly Review:** Check #6 (Recently Captured) every Friday to see what's come in and what's still waiting.
3. **Due This Week:** Use #4 to auto-generate a weekly "payment due" reminder.
4. **Team Visibility:** If shared with collaborators, Dataview dashboards are live — they always show current data.

---

## See Also
- [[MOC – Inbox]]
- [[Template – Client Proposal]]
- [[Template – Meeting Notes]]
- [[Template – Invoice Received]]
- [[Template – Research Link]]
