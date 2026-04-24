---
type: invoice
status: inbox
created: {{date:YYYY-MM-DD}}
jd_location: 30.01
tags: [#w20/finance, #w20/expenses, #w20/invoices]
related_moc: "[[MOC – Inbox]]"
ai_assisted: false

# Invoice Metadata
vendor:
vendor_id:
invoice_number:
invoice_date: {{date:YYYY-MM-DD}}
due_date:
amount: 0.00
currency: USD
category: [software | contractor | service | hardware | other]
po_reference:
payment_status: [pending | paid | overdue]
---

# Invoice – {{vendor}}

**Vendor:** {{vendor}}
**Invoice #:** {{invoice_number}}
**Date:** {{invoice_date}}
**Due:** {{due_date}}
**Amount:** {{currency}} {{amount}}

---

## Details

| Field | Value |
|-------|-------|
| **Vendor ID** | {{vendor_id}} |
| **PO Reference** | {{po_reference}} |
| **Category** | {{category}} |
| **Payment Status** | {{payment_status}} |

---

## Line Items

| Description | Amount | Notes |
|-------------|--------|-------|
| | | |

---

## Notes

-

---

## Actions

- [ ] Add to expense tracker
- [ ] Review charges
- [ ] Approve for payment
- [ ] Pay by {{due_date}}

---

**Status:** Awaiting classification & payment processing
See [[MOC – Inbox]] for finance location routing.
