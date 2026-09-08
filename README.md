# BLADE Runtime

BLADE is no longer a single application. It is a **local application platform** that loads approved modules and data from a shared folder (OneDrive / SharePoint) and renders only what that user is allowed to use.

**Reference implementation:** [BLADE_Alpha](https://github.com/dad2lna-coder/BLADE_Alpha) (do not destroy it).

**First objective:** new UI, same scheduling behavior. Then separate the engine from the UI.

## What lives in the executable

Stable runtime only:

- Svelte UI framework
- Tauri desktop runtime
- module loader + capability / permission system
- configuration + local cache
- filesystem access, import / export
- validation framework
- core scheduling engine
- shared UI components

Features are **not** hard-coded into the `.exe`.

## Repo layout

See ARCHITECTURE.md and the folders in this commit.

## Three update lanes

| Lane | What changes | Rebuild .exe? |
| --- | --- | --- |
| Data | roster.json, capacity.json, predictions | No |
| Config / modules | airport config, permissions, module packages | No |
| Runtime | Tauri, Rust, core engine, module API | Yes |

## Security

The shared folder is not a place to execute arbitrary JavaScript with full machine access. Modules declare capabilities. The runtime grants or denies them.

## Status

Scaffold + architecture only. Migration from BLADE_Alpha starts next: new UI, same behavior.
