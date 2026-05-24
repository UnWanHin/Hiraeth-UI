# Hiraeth UI Agent Rules

## Documentation Maintenance

- Keep `docs/` current while working in this project.
- For every debugging session, regression, incident, or unexpected behavior, create or update a file in `docs/issues/` before the final response.
- Update the relevant issue document whenever new evidence, root cause, fix attempt, verification result, or rollback decision is discovered.
- Do not mark an issue resolved until the fix has been verified with the strongest available check. For browser-facing work, prefer real browser verification; if unavailable, explicitly record that limitation.
- For architectural decisions or expensive-to-reverse choices, write an ADR in `docs/decisions/`.

## Privacy And Open Source Hygiene

- Do not put tokens, API keys, Cloudflare tunnel tokens, private hostnames, personal images, or deployment-specific secrets in tracked docs or source files.
- Use placeholders such as `<portal-host>`, `<public-host>`, and `<tunnel-id>` in docs intended for the repository.
- Keep local deployment details in ignored local config files.

## Frontend Route Safety

- The visible portal page is controlled by `body[data-route]` and page classes. Do not hard-code all fallback HTML to `home`.
- If route fallback changes, verify `/`, `/services`, `/monitor`, `/ports`, and `/ops` each return the correct `body data-route`.
- A successful JavaScript build is not enough for UI changes. Confirm runtime behavior with browser tooling when available, or document why browser verification could not be run.
