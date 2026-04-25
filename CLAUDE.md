
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**W20 Work** is a Johnny.Decimal system that organizes Tony's work and business operations using constraint-based numeric filing. Every file has a unique address in the format `AC.ID` (e.g., `11.02`, `32.15`). The system is managed through Claude Code plugins that automate inbox processing, task management, and JDex maintenance.

## System Structure

The W20 system is divided into five areas, each with supporting categories:

| Area | Name | Focus |
|------|------|-------|
| **10-19** | Client engagements | Active clients, proposals, past engagements, delivery models |
| **20-29** | Operations & delivery | Delivery templates, processes, SOPs, meeting notes |
| **30-39** | Business finance & contracts | Invoices, contracts, business expenses, tax documents |
| **40-49** | Knowledge & resources | Reference materials, research, tools & software catalogs |
| **50-59** | Marketing & visibility | Portfolio, case studies, website, social media presence |

**System management** (00-09) includes:
- **00.00** JDex — the master index (single source of truth for all IDs)
- **00.01** Inbox — unprocessed captures and items awaiting classification
- **00.02** Tasks — active work items in jdtodo.txt format
- **00.03** Templates — reusable document templates (proposals, invoices, meeting notes, etc.)
- **00.04** Processing log — audit trail of files processed and actions taken
- **00.05** Needs review — items flagged for human review during classification

## Common Workflows

### Process your inbox
```
/jd:process-inbox W20
```
Classifies items in `00-09/00 System management/00.01 Inbox`, moves them to their permanent locations (e.g., `11.01+ACME` for an ACME client folder), and extracts actionable tasks to `00.02 Tasks`.

### Manage tasks
```
/jd:manage-tasks W20 [action] [filter]
```
Actions: `add` (new task), `complete` (mark done), `cancel`, `view` (show all), `overdue`.

Task format: `(A) 2026-04-24 Do thing +W20.11.01 @context due:2026-04-30`

For quick task marking, use natural language:
```
mark the client proposal done
show my overdue tasks
```

### Maintain the JDex
```
/jd:jdex-audit W20
```
Compares `00.00 JDex` against the actual folder structure, flags mismatches, and suggests updates when new folders are created.

### Manage sub-indexes
```
/jd:sub-index W20 11
```
Manages `+SUB` indexes for categories (e.g., `+ACME`, `+PROPOSAL-Q2`). Assigns next available numbers.

## Key Files & Locations

| File | Purpose |
|------|---------|
| `00-09/00 System management/00.00 JDex.md` | Master index — single source of truth |
| `00-09/00 System management/00.01 Inbox/` | Unprocessed items awaiting classification |
| `00-09/00 System management/00.02 Tasks.md` | Active and overdue tasks in jdtodo.txt format |
| `00-09/00 System management/00.03 Templates/` | Reusable templates (client proposals, invoices, meeting notes, research links, etc.) |
| `00-09/00 System management/00.04 Processing log.md` | Audit trail: what was processed, when, where it went |
| `00-09/00 System management/00.05 Needs review/` | Human review queue (classification conflicts, ambiguous items) |

## Task Format (jdtodo.txt)

```
(A) 2026-04-24 Task description +W20.11.01 @context due:2026-04-30
```

- **Priority:** `(A)`, `(B)`, `(C)`, or none
- **Date created:** `YYYY-MM-DD`
- **Description:** Plain text (80 chars recommended)
- **Location:** `+W20.AC.ID` (links task to its JD location)
- **Context:** `@phone`, `@email`, `@laptop` (optional, for grouping)
- **Due date:** `due:YYYY-MM-DD` (optional)

Completed tasks are archived with an `x` prefix: `x 2026-04-24 Task description...`

## Multi-System Support

The JD plugin supports multiple systems. If you have other systems (e.g., `P10 Personal`), you can switch between them:

```
/jd:process-inbox P10
/jd:manage-tasks P10 add
```

The plugin auto-detects all systems in the JD root (`~/Library/Mobile Documents/com~apple~CloudDocs/JD/`).

## Discovery & Navigation

When processing items or managing tasks, use natural language — the plugin understands variations:

```
process my inbox
show my tasks
add a task
what's due today
audit my JDex
update sub index
```

The plugin also maps ambiguous classifications to the UI:

```
? Meeting notes.md — medium confidence: W20.23.01 or W20.11.02?
```

Select the correct option or file it manually if uncertain.

## Plugin Skills (Auto-Triggered)

The JD plugin includes skills that activate on context:

| Skill | Triggers on |
|-------|------------|
| jd-inbox-processor | "process my inbox," "file my stuff," "sort my inbox," "triage" |
| jd-task-manager | "show my tasks," "what's due today," "add a task," "mark that done" |
| jd-jdex-audit | "audit my JDex," "check my system," "sync JDex," "verify my system" |
| jd-sub-index | "update sub index," "next sub number," "add a new project" |

## Notes for Claude Code Sessions

- **No build step.** The W20 system is pure organization — no code to compile, deploy, or test.
- **Direct filesystem operations.** All work happens on the local filesystem; the plugin manages folder structures and file movements.
- **JDex is canonical.** Always treat `00.00 JDex.md` as the source of truth. If a folder exists but isn't documented, it's out of sync.
- **Batch processing.** When processing a full inbox, let the plugin run to completion before manual intervention.
- **Task archival.** Completed tasks are marked with `x` prefix and remain in the file for audit; they're not deleted.
