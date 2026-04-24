---
type: daily-note
status: evergreen
created: 2026-04-24
tags: [#w20/daily-ritual, #w20/template, #w20/review]
ai_assisted: false
---

# Daily Note — {{date:YYYY-MM-DD}}

This template embeds live Dataview queries from the Inbox system. Everything updates automatically as you capture new items.

---

## Inbox Check-in

**Pending decisions due this week:**
```dataview
table type, client, amount, decision_date
where (type = "proposal" or type = "invoice") and status = "inbox"
sort by decision_date asc
```

**Overdue items (action required):**
```dataview
table vendor, amount, due_date
where type = "invoice" and due_date < today
sort by due_date asc
```

**Recently captured (last 3 days):**
```dataview
table type, jd_location, created
where created >= date(today) - dur(3 days) and status = "inbox"
sort by created desc
```

---

## Action Items from Recent Meetings

**Due today:**
```dataview
task
where contains(tags, "#w20/action") and due = today and !completed
```

**Due this week:**
```dataview
task
where contains(tags, "#w20/action") and due >= today and due <= today + dur(7 days) and !completed
sort by due asc
```

---

## Today's Capture

Use these 2 templates to structure new captures — YAML auto-populates with creation date and JD location.

### New Proposal
- Template: [[Template – Client Proposal]]
- Save as: `00.01 Inbox/CLIENT-proposal-YYYY-MM-DD.md`

### Meeting Notes
- Template: [[Template – Meeting Notes]]
- Save as: `00.01 Inbox/meeting-ATTENDEE-YYYY-MM-DD.md`
- Action items auto-extract to tasks ↑

### Invoice Received
- Template: [[Template – Invoice Received]]
- Save as: `00.01 Inbox/invoice-VENDOR-YYYY-MM-DD.md`

### Research Link
- Template: [[Template – Research Link]]
- Save as: `00.01 Inbox/research-TOPIC-YYYY-MM-DD.md`

---

## Daily Ritual

### Morning (5 min)
- [ ] Review "Pending decisions due this week" — any urgent calls?
- [ ] Check "Due today" action items
- [ ] Scan "Overdue items" — follow up needed?

### Throughout Day
- [ ] Capture proposals, meetings, invoices, research using templates above
- [ ] Mark action items complete as you finish them

### Evening (10 min)
- [ ] Review "Recently captured" — anything need immediate routing?
- [ ] Triage inbox items to JD locations (or flag for [[00.04 Needs review]])
- [ ] Mark today's action items done

---

## Weekly Review (Friday)

### Inbox Health
```dataview
table rows.length as count
where status = "inbox"
group by type
```

### All Pending Decisions
```dataview
table client, amount, decision_date, status
where type = "proposal" and status != "archived"
sort by decision_date asc
```

### Finance Summary
- Total invoices this week:
- Paid this week:
- Overdue:

### New Proposals Processed
```dataview
table client, amount, decision_date
where type = "proposal" and created >= date(today) - dur(7 days)
sort by created desc
```

### Research Captured
```dataview
table source, relevance_area, created
where type = "research" and created >= date(today) - dur(7 days)
sort by created desc
```

---

## System Maintenance

- [ ] Run JDex audit: `/jd:jdex-audit W20`
- [ ] Check [[00.04 Needs review]] for classification conflicts
- [ ] Archive completed tasks in [[00.02 Tasks]]
- [ ] Update any inactive client folders

---

## Notes

-

---

## Related
- [[MOC – Inbox]] — template hub & routing rules
- [[00.00 JDex]] — master system index
- [[00.02 Tasks]] — active task list
- [[Dataview Queries – Inbox Dashboard]] — all 10 dashboard queries
