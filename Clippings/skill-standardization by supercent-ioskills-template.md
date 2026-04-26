---
title: "skill-standardization by supercent-io/skills-template"
source: "https://skills.sh/supercent-io/skills-template/skill-standardization"
author:
published:
created: 2026-04-25
description: "Install the skill-standardization skill for your AI agent. Published by supercent-io/skills-template."
tags:
  - "clippings"
---
[skills](https://skills.sh/) ///skill-standardization

## skill-standardization

Installation

Summary

**Validate and standardize SKILL.md files against the Agent Skills specification.**

- Validates frontmatter fields (name, description, allowed-tools, metadata) and enforces naming conventions, length constraints, and format rules
- Converts legacy skill formats to standard structure, including section heading normalization and directory layout alignment
- Provides templates and step-by-step guidance for creating new skills, improving descriptions for reliable triggering, and batch-validating skill directories
- Includes evaluation test case scaffolding (evals.json) with assertion patterns for verifiable skill testing

SKILL.md

## Skill Standardization

## When to use this skill

- Creating a new SKILL.md file from scratch
- Auditing existing skills for Agent Skills specification compliance
- Converting legacy skill formats (non-standard headings, frontmatter) to standard
- Improving skill descriptions to trigger more reliably on relevant prompts
- Adding evaluation test cases (`evals/evals.json`) to a skill
- Batch-validating all skills in a directory for consistency

## Agent Skills Specification Reference

### Frontmatter fields

| Field | Required | Constraints |
| --- | --- | --- |
| `name` | Yes | 1–64 chars, lowercase alphanumeric + hyphens, no leading/trailing/consecutive hyphens, must match parent directory name |
| `description` | Yes | 1–1024 chars, must describe what skill does AND when to trigger |
| `allowed-tools` | No | Space-delimited list of pre-approved tools |
| `compatibility` | No | Max 500 chars, environment requirements |
| `license` | No | License name or reference to bundled file |
| `metadata` | No | Arbitrary key-value map for additional fields |

### Standard directory structure

```
skill-name/
├── SKILL.md          # Required
├── scripts/          # Optional: executable scripts
├── references/       # Optional: detailed documentation
├── assets/           # Optional: templates, images, data
└── evals/            # Optional: evaluation test cases
    └── evals.json
```

### Progressive disclosure tiers

| Tier | What's loaded | When | Token budget |
| --- | --- | --- | --- |
| 1\. Catalog | name + description | Session start | ~100 tokens per skill |
| 2\. Instructions | Full SKILL.md body | On activation | < 5000 tokens (500 lines max) |
| 3\. Resources | scripts/, references/ | When needed | Varies |

## Instructions

### Step 1: Validate an existing skill

Run the validation script on a skill directory:

```bash
bash scripts/validate_skill.sh path/to/skill-directory
```

Validate all skills in a directory:

```bash
bash scripts/validate_skill.sh --all .agent-skills/
```

The script checks:

- Required frontmatter fields (`name`, `description`)
- `name` format: lowercase, no consecutive hyphens, matches directory name
- `description` length: 1–1024 characters
- `allowed-tools` format: space-delimited (not YAML list)
- Recommended sections present
- File length: warns if over 500 lines

### Step 2: Write an effective description

The `description` field determines when a skill triggers. A weak description means the skill never activates; an over-broad one triggers at wrong times.

**Template:**

```yaml
description: >
  [What the skill does — list specific operations.]
  Use when [trigger conditions]. Even if the user doesn't explicitly
  mention [domain keyword] — also triggers on: [synonym list].
```

**Principles** (from agentskills.io):

1. **Imperative phrasing** — "Use this skill when..." not "This skill does..."
2. **User intent, not implementation** — describe what the user wants to achieve
3. **Be explicit about edge cases** — "even if they don't say X"
4. **List trigger keywords** — synonyms, related terms the user might type
5. **Stay under 1024 characters** — descriptions grow during editing; watch the limit

**Before / After:**

```yaml
# Before (weak — never triggers)
description: Helps with PDFs.

# After (optimized — reliable triggering)
description: >
  Extract text and tables from PDF files, fill forms, merge and split documents.
  Use when the user needs to work with PDF files, even if they don't explicitly
  say 'PDF' — triggers on: fill form, extract text from document, merge files,
  read scanned pages.
```

### Step 3: Create a new SKILL.md

Use this template as the starting point:

```markdown
---
name: skill-name
description: >
  [What it does and specific operations it handles.]
  Use when [trigger conditions]. Triggers on: [keyword list].
allowed-tools: Bash Read Write Edit Glob Grep
metadata:
  tags: tag1, tag2, tag3
  version: "1.0"
---

# Skill Title

## When to use this skill
- Scenario 1
- Scenario 2

## Instructions

### Step 1: [Action]
Content...

### Step 2: [Action]
Content...

## Examples

### Example 1: [Scenario]
Input: ...
Output: ...

## Best practices
1. Practice 1
2. Practice 2

## References
- [Link](url)
```

### Step 4: Convert legacy section headings

| Legacy heading | Standard heading |
| --- | --- |
| `## Purpose` | `## When to use this skill` |
| `## When to Use` | `## When to use this skill` |
| `## Procedure` | `## Instructions` |
| `## Best Practices` | `## Best practices` |
| `## Reference` | `## References` |
| `## Output Format` | `## Output format` |

### Step 5: Add evaluation test cases

Create `evals/evals.json` with 2–5 realistic test prompts:

```json
{
  "skill_name": "your-skill-name",
  "evals": [
    {
      "id": 1,
      "prompt": "Realistic user message that should trigger this skill",
      "expected_output": "Description of what success looks like",
      "assertions": [
        "Specific verifiable claim (file exists, count is correct, format is valid)",
        "Another specific claim"
      ]
    }
  ]
}
```

Good assertions are **verifiable**: file exists, JSON is valid, chart has 3 bars. Avoid vague assertions like "output is good."

## Available scripts

- **`scripts/validate_skill.sh`** — Validates a SKILL.md against the Agent Skills spec

## Examples

### Example 1: Validate a skill directory

```bash
bash scripts/validate_skill.sh .agent-skills/my-skill/
```

Output:

```
Validating: .agent-skills/my-skill/SKILL.md
✓ Required field: name = 'my-skill'
✓ Required field: description present
✗ Description length: 1087 chars (max 1024)
✓ Name format: valid lowercase
✗ Name/directory mismatch: name='myskill' vs dir='my-skill'
✓ Recommended section: When to use this skill
✓ Recommended section: Instructions
⚠ Missing recommended section: Examples
✓ File length: 234 lines (OK)

Issues: 2 errors, 1 warning
```

### Example 2: Batch validate all skills

```bash
bash scripts/validate_skill.sh --all .agent-skills/
```

### Example 3: Fix common frontmatter issues

```yaml
# WRONG — tags inside metadata is non-standard for some validators
metadata:
  tags: [tag1, tag2]   # list syntax
  platforms: Claude    # non-spec field

# CORRECT — per Agent Skills spec
metadata:
  tags: tag1, tag2     # string value
allowed-tools: Bash Read Write  # space-delimited, not a YAML list
```

## Best practices

1. **Description quality first** — weak descriptions mean the skill never activates; improve it before anything else
2. **Keep SKILL.md under 500 lines** — move detailed reference docs to `references/`
3. **Pin script versions** — use `uvx ruff@0.8.0` not just `ruff` to ensure reproducibility
4. **No interactive prompts in scripts** — agents run in non-interactive shells; use `--flag` inputs, never TTY prompts
5. **Structured output from scripts** — prefer JSON/CSV over free-form text; send data to stdout, diagnostics to stderr
6. **Add evals before publishing** — at least 2–3 test cases covering core and edge cases

## References

- [Agent Skills Specification](https://agentskills.io/specification)
- [Optimizing Descriptions](https://agentskills.io/skill-creation/optimizing-descriptions)
- [Evaluating Skills](https://agentskills.io/skill-creation/evaluating-skills)
- [Using Scripts](https://agentskills.io/skill-creation/using-scripts)
- [Adding Skills Support](https://agentskills.io/client-implementation/adding-skills-support)

Weekly Installs

10.5K

Repository

[supercent-io/sk…template](https://github.com/supercent-io/skills-template "supercent-io/skills-template")

GitHub Stars

88

First Seen

Jan 24, 2026

[skills](https://skills.sh/) / [anthropics](https://skills.sh/anthropics) / [skills](https://skills.sh/anthropics/skills) /pdf

## pdf

Installation

Summary

**Comprehensive PDF processing with text extraction, merging, splitting, form filling, and OCR capabilities.**

- Supports core operations: merge/split PDFs, extract text and tables, rotate pages, add watermarks, encrypt/decrypt, and extract images
- Includes Python libraries (pypdf, pdfplumber, reportlab) and command-line tools (qpdf, pdftotext, pdftk) with ready-to-use code examples
- Handles scanned PDFs via OCR using pytesseract and pdf2image for searchable text extraction
- Dedicated form-filling workflow documented in FORMS.md; advanced features and JavaScript alternatives covered in REFERENCE.md

SKILL.md

## PDF Processing Guide

## Overview

This guide covers essential PDF processing operations using Python libraries and command-line tools. For advanced features, JavaScript libraries, and detailed examples, see REFERENCE.md. If you need to fill out a PDF form, read FORMS.md and follow its instructions.

## Quick Start

```python
from pypdf import PdfReader, PdfWriter

# Read a PDF
reader = PdfReader("document.pdf")
print(f"Pages: {len(reader.pages)}")

# Extract text
text = ""
for page in reader.pages:
    text += page.extract_text()
```

## Python Libraries

### pypdf - Basic Operations

#### Merge PDFs

```python
from pypdf import PdfWriter, PdfReader

writer = PdfWriter()
for pdf_file in ["doc1.pdf", "doc2.pdf", "doc3.pdf"]:
    reader = PdfReader(pdf_file)
    for page in reader.pages:
        writer.add_page(page)

with open("merged.pdf", "wb") as output:
    writer.write(output)
```

#### Split PDF

```python
reader = PdfReader("input.pdf")
for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    with open(f"page_{i+1}.pdf", "wb") as output:
        writer.write(output)
```

#### Extract Metadata

```python
reader = PdfReader("document.pdf")
meta = reader.metadata
print(f"Title: {meta.title}")
print(f"Author: {meta.author}")
print(f"Subject: {meta.subject}")
print(f"Creator: {meta.creator}")
```

#### Rotate Pages

```python
reader = PdfReader("input.pdf")
writer = PdfWriter()

page = reader.pages[0]
page.rotate(90)  # Rotate 90 degrees clockwise
writer.add_page(page)

with open("rotated.pdf", "wb") as output:
    writer.write(output)
```

### pdfplumber - Text and Table Extraction

#### Extract Text with Layout

```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        print(text)
```

#### Extract Tables

```python
with pdfplumber.open("document.pdf") as pdf:
    for i, page in enumerate(pdf.pages):
        tables = page.extract_tables()
        for j, table in enumerate(tables):
            print(f"Table {j+1} on page {i+1}:")
            for row in table:
                print(row)
```

#### Advanced Table Extraction

```python
import pandas as pd

with pdfplumber.open("document.pdf") as pdf:
    all_tables = []
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            if table:  # Check if table is not empty
                df = pd.DataFrame(table[1:], columns=table[0])
                all_tables.append(df)

# Combine all tables
if all_tables:
    combined_df = pd.concat(all_tables, ignore_index=True)
    combined_df.to_excel("extracted_tables.xlsx", index=False)
```

### reportlab - Create PDFs

#### Basic PDF Creation

```python
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

c = canvas.Canvas("hello.pdf", pagesize=letter)
width, height = letter

# Add text
c.drawString(100, height - 100, "Hello World!")
c.drawString(100, height - 120, "This is a PDF created with reportlab")

# Add a line
c.line(100, height - 140, 400, height - 140)

# Save
c.save()
```

#### Create PDF with Multiple Pages

```python
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet

doc = SimpleDocTemplate("report.pdf", pagesize=letter)
styles = getSampleStyleSheet()
story = []

# Add content
title = Paragraph("Report Title", styles['Title'])
story.append(title)
story.append(Spacer(1, 12))

body = Paragraph("This is the body of the report. " * 20, styles['Normal'])
story.append(body)
story.append(PageBreak())

# Page 2
story.append(Paragraph("Page 2", styles['Heading1']))
story.append(Paragraph("Content for page 2", styles['Normal']))

# Build PDF
doc.build(story)
```

#### Subscripts and Superscripts

**IMPORTANT**: Never use Unicode subscript/superscript characters (₀₁₂₃₄₅₆₇₈₉, ⁰¹²³⁴⁵⁶⁷⁸⁹) in ReportLab PDFs. The built-in fonts do not include these glyphs, causing them to render as solid black boxes.

Instead, use ReportLab's XML markup tags in Paragraph objects:

```python
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet

styles = getSampleStyleSheet()

# Subscripts: use <sub> tag
chemical = Paragraph("H<sub>2</sub>O", styles['Normal'])

# Superscripts: use <super> tag
squared = Paragraph("x<super>2</super> + y<super>2</super>", styles['Normal'])
```

For canvas-drawn text (not Paragraph objects), manually adjust font the size and position rather than using Unicode subscripts/superscripts.

## Command-Line Tools

### pdftotext (poppler-utils)

```bash
# Extract text
pdftotext input.pdf output.txt

# Extract text preserving layout
pdftotext -layout input.pdf output.txt

# Extract specific pages
pdftotext -f 1 -l 5 input.pdf output.txt  # Pages 1-5
```

### qpdf

```bash
# Merge PDFs
qpdf --empty --pages file1.pdf file2.pdf -- merged.pdf

# Split pages
qpdf input.pdf --pages . 1-5 -- pages1-5.pdf
qpdf input.pdf --pages . 6-10 -- pages6-10.pdf

# Rotate pages
qpdf input.pdf output.pdf --rotate=+90:1  # Rotate page 1 by 90 degrees

# Remove password
qpdf --password=mypassword --decrypt encrypted.pdf decrypted.pdf
```

### pdftk (if available)

```bash
# Merge
pdftk file1.pdf file2.pdf cat output merged.pdf

# Split
pdftk input.pdf burst

# Rotate
pdftk input.pdf rotate 1east output rotated.pdf
```

## Common Tasks

### Extract Text from Scanned PDFs

```python
# Requires: pip install pytesseract pdf2image
import pytesseract
from pdf2image import convert_from_path

# Convert PDF to images
images = convert_from_path('scanned.pdf')

# OCR each page
text = ""
for i, image in enumerate(images):
    text += f"Page {i+1}:\n"
    text += pytesseract.image_to_string(image)
    text += "\n\n"

print(text)
```

### Add Watermark

```python
from pypdf import PdfReader, PdfWriter

# Create watermark (or load existing)
watermark = PdfReader("watermark.pdf").pages[0]

# Apply to all pages
reader = PdfReader("document.pdf")
writer = PdfWriter()

for page in reader.pages:
    page.merge_page(watermark)
    writer.add_page(page)

with open("watermarked.pdf", "wb") as output:
    writer.write(output)
```

### Extract Images

```bash
# Using pdfimages (poppler-utils)
pdfimages -j input.pdf output_prefix

# This extracts all images as output_prefix-000.jpg, output_prefix-001.jpg, etc.
```

### Password Protection

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("input.pdf")
writer = PdfWriter()

for page in reader.pages:
    writer.add_page(page)

# Add password
writer.encrypt("userpassword", "ownerpassword")

with open("encrypted.pdf", "wb") as output:
    writer.write(output)
```

## Quick Reference

| Task | Best Tool | Command/Code |
| --- | --- | --- |
| Merge PDFs | pypdf | `writer.add_page(page)` |
| Split PDFs | pypdf | One page per file |
| Extract text | pdfplumber | `page.extract_text()` |
| Extract tables | pdfplumber | `page.extract_tables()` |
| Create PDFs | reportlab | Canvas or Platypus |
| Command line merge | qpdf | `qpdf --empty --pages ...` |
| OCR scanned PDFs | pytesseract | Convert to image first |
| Fill PDF forms | pdf-lib or pypdf (see FORMS.md) | See FORMS.md |

## Next Steps

- For advanced pypdfium2 usage, see REFERENCE.md
- For JavaScript libraries (pdf-lib), see REFERENCE.md
- If you need to fill out a PDF form, follow the instructions in FORMS.md
- For troubleshooting guides, see REFERENCE.md

Weekly Installs

84.6K

Repository

[anthropics/skills](https://github.com/anthropics/skills "anthropics/skills")

GitHub Stars

123.8K

First Seen

Today

[skills](https://skills.sh/) / [anthropics](https://skills.sh/anthropics) / [skills](https://skills.sh/anthropics/skills) / [pdf](https://skills.sh/anthropics/skills/pdf) /Snyk

## pdf

Fail

Audited by Snyk on Feb 17, 2026

Risk Level: HIGH

Full Analysis

HIGH W007: Insecure credential handling detected in skill instructions.

- Insecure credential handling detected (high risk: 0.80). The skill includes examples that embed plaintext passwords in code and a CLI example passing a password as a command-line argument (qpdf --password=mypassword and writer.encrypt("userpassword", "ownerpassword")), which instructs handling secrets verbatim and is an insecure pattern that could lead to exfiltration.

Audit Metadata

Risk Level

HIGH

Analyzed

Feb 17, 2026, 10:15 PM