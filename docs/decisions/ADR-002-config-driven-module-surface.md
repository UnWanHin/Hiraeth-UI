# ADR-002: Use Config-Driven Module Surfaces

## Status
Accepted

## Date
2026-05-25

## Context
Hiraeth is a private route console that will grow as more ports, Docker services, API panels, agent tools, and monitoring surfaces are added. The portal needs to stay useful without hard-coding a new page or component for every future service. It also needs to remain open-source friendly, with private hostnames and local assets kept in ignored local config.

## Decision
Use a config-driven module surface. The public configuration contract now includes:

- `modules[]` for home-page slots and service-page module filters.
- Per-service `category`, `module`, and `tags` metadata.
- `/services?module=<id>` and `/services?category=<name>` filtered views.

The backend sanitizes and returns this metadata from `GET /api/config`. The frontend renders module cards, service search, filter chips, and command-launcher module entries from the same config.

## Alternatives Considered

### Hard-code Each New Service Page

- Pros: Full control per service.
- Cons: Every new port requires code changes, makes the UI brittle, and increases the chance of route regressions.
- Rejected because most services only need launch, status, grouping, and search metadata.

### Use Only Categories Without Modules

- Pros: Simpler config.
- Cons: Categories are flat and do not provide home-page expansion slots or stable deep links for future sections.
- Rejected because the portal needs both high-level product areas and service-level taxonomy.

### Delegate Everything To An External Dashboard

- Pros: Less custom code.
- Cons: Harder to preserve the Hiraeth visual system, route safety checks, and local monitor/watchdog integration.
- Rejected for the main portal surface, though external dashboards can still be linked as services.

## Consequences

- Future services can usually be added by editing `config/portal.local.json`.
- Public examples remain generic while private deployments can define local modules and service metadata.
- The UI must keep route and query handling covered by smoke checks.
- Module IDs are now part of the configuration contract and should remain stable once used.
