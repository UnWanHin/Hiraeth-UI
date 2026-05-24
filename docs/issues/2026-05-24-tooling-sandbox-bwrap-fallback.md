# Tooling Sandbox Fallback: bwrap RTM_NEWADDR Failure

## Status

Open for environment awareness. The project files were updated successfully with a Bun filesystem fallback.

## Date

2026-05-24

## Symptom

Some shell commands and the dedicated patch helper failed with:

```text
bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted
```

The failure appeared while preparing open-source deployment packaging and docs.

## Impact

- `apply_patch` could not update files in this session.
- Direct `git`, `find`, `node`, and some shell pipelines intermittently failed under the sandbox wrapper.
- `/home/ubuntu/.bun/bin/bun` continued to run and could spawn selected commands.

## Workaround Used

Used Bun filesystem APIs for deterministic file updates and Bun-spawned Git commands for repository checks.

## Follow-Up

If this repeats, prefer Bun-wrapped checks for this workspace and keep generated changes reviewed with `git diff` before committing.
