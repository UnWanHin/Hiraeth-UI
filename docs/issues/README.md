# Issues

Issue files in this directory are the running memory for debugging and regression work.

## File Naming

Use:

`YYYY-MM-DD-short-title.md`

Example:

`2026-05-24-portal-rendering-regression.md`

## Required Sections

Each issue should include:

- Status: `open`, `mitigated`, `resolved`, or `superseded`.
- Impact: what users see and which routes/features are affected.
- Evidence: commands, responses, logs, screenshots, or browser console findings.
- Root cause: confirmed causes only; keep guesses under hypotheses.
- Changes made: exact files or behavior changed.
- Verification: what passed, what failed, and what is still unverified.
- Next actions: concrete follow-up work or rollback path.

## Documentation Hygiene

Do not put tokens, private hostnames, personal images, API keys, Cloudflare tunnel tokens, or machine-specific secrets in tracked docs. Use placeholders such as `<portal-host>`, `<public-host>`, or `<tunnel-id>`.
