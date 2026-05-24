# Hiraeth UI Docs

This directory stores operational notes, issue records, and design decisions for the portal.

## Structure

- `issues/`: active and historical debugging records, regressions, incidents, and verification notes.
- `decisions/`: future ADRs for architectural decisions.

## Maintenance Rule

When an agent or human changes routing, rendering, deployment, monitoring, or public metadata, update the relevant document in `docs/` before closing the task. If a regression is found, create or update an issue record in `docs/issues/` with symptoms, evidence, suspected causes, fix attempts, and verification status.
