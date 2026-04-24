---
type: moc
status: active
created: 2026-04-24
tags: [#w20/system, #w20/inbox, #w20/organization]
ai_assisted: false
---

# MOC – Inbox

Central hub for all unprocessed W20 captures. Each template is designed to auto-populate Dataview queries and route to its permanent JD location.

---

## Inbox Templates

Templates live in `00.01 Inbox/_templates/` — use these to capture new work with structured YAML that Dataview can query immediately.

### 1. [[Template – Client Proposal]]
- **Type:** `proposal`
- **Routes to:** `11.0x+CLIENT/`
- **Queryable by:** client name, proposal amount, decision date, status
- **Use when:** You receive a proposal request or need to track an active proposal

### 2. [[Template – Meeting Notes]]
- **Type:** `meeting-notes`
- **Routes to:** `20.0x/` or `11.0x/` (auto-extracted from content)
- **Queryable by:** attendees, decision type, created date, action items
- **Use when:** You finish a meeting and need to capture decisions + next steps

### 3. [[Template – Invoice Received]]
- **Type:** `invoice`
- **Routes to:** `30.01` (software/subscriptions) or `30.02` (contractors/services)
- **Queryable by:** vendor, amount, due date, payment status, category
- **Use when:** You receive an invoice or need to log an expense

### 4. [[Template – Research Link]]
- **Type:** `research`
- **Routes to:** `40.0x/` (reference materials by topic)
- **Queryable by:** relevance area, source, date captured, tag
- **Use when:** You find a useful link, article, or reference you want to keep

---

## Dataview Dashboards

Embed these queries in your daily note or this MOC to see inbox status at a glance.

### All Inbox Items (by JD location)
```dataview
table type, status, jd_location, created
where status = "inbox"
sort by jd_location, created desc
```

### Pending Decisions (proposals + invoices)
```dataview
table type, client, amount, decision_date
where (type = "proposal" or type = "invoice") and status = "inbox"
sort by decision_date asc
```

### Action Items Extracted from Meetings
```dataview
task
where contains(tags, "#w20/action") and !completed
sort by due asc
```

### Recently Captured (last 7 days)
```dataview
table type, jd_location, created
where created >= date(today) - dur(7 days)
sort by created desc
```

---

## Workflow

1. **Capture:** Use a template from `_templates/` — YAML auto-populates with `created`, `status`, `jd_location`, `related_moc`
2. **Review:** Dataview shows all inbox items grouped by location or type
3. **Route:** Once classified, move file to its permanent location (auto-router script can do this)
4. **Clean:** Mark `status: active` or `status: archived` once moved out of inbox

---

## Related
- [[00.00 JDex]]
- [[00.02 Tasks]]
- [[00.04 Needs review]]
