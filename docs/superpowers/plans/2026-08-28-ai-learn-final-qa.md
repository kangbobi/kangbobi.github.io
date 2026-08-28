# AI-Learn Final QA and Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Perform cross-level verification, accessibility review, navigation checks, progress migration validation, content consistency checks, and final release of the complete AI Engineer path.

**Architecture:** Final QA adds only shared fixes and tests. Level-specific content changes are limited to defects found during verification.

**Tech Stack:** Node test runner, static HTML/CSS/ES modules, GitHub Actions, manual browser review when available.

**Spec:** `docs/superpowers/specs/2026-08-28-ai-learn-ai-engineer-path-design.md`

## Global Constraints

- No root-site regressions.
- No broken Level 1 URLs.
- No module declared published without a valid file.
- Progress migration must be lossless for valid legacy completion.
- No hidden-chain-of-thought content in reasoning lessons.
- Security/tool examples retain least-privilege and human-approval boundaries.

---

### Task 1: Cross-level manifest and navigation validation

**Files:** Modify/create `ai-learn/tests/course-files.test.mjs`, `course-manifest.test.mjs`.

- [ ] Add tests resolving every published module file and previous/next target.
- [ ] Add test that dashboard counts equal manifest counts for all five levels.
- [ ] Add test that all module `(level,id)` pairs and hrefs are unique.
- [ ] Run test suite and fix any failures at the owning level.
- [ ] Commit `test: verify cross-level course navigation`.

### Task 2: Progress migration and resume matrix

**Files:** Extend `ai-learn/tests/progress.test.mjs`; modify `core/progress.mjs` only if a defect is found.

- [ ] Test empty storage, malformed JSON input passed to pure normalizer, partial v1 completion, all eight Level 1 completions, duplicate IDs, unknown legacy IDs, and valid v2 data.
- [ ] Test overall and per-level completion percentage.
- [ ] Test last-visited update and safe resume fallback when a module is unpublished/missing.
- [ ] Run tests; fix defects; commit `test: harden AI-Learn progress migration`.

### Task 3: Accessibility and semantic static checks

**Files:** Create `ai-learn/tests/accessibility-structure.test.mjs`; modify affected lesson files only for failures.

- [ ] Check each published HTML page has one `<h1>`, a language attribute, viewport metadata, labeled range inputs, and a dashboard/back navigation link.
- [ ] Check external links use safe target/rel combinations when opening a new context.
- [ ] Check interactive output regions have adjacent textual interpretation or accessible labels.
- [ ] Run tests and fix violations.
- [ ] Commit `fix: improve AI-Learn accessibility structure`.

### Task 4: Security/content boundary review

**Files:** Create `ai-learn/tests/content-boundaries.test.mjs`; modify affected modules if required.

- [ ] Assert Level 4 pages do not contain prompts asking learners to reveal hidden chain-of-thought.
- [ ] Assert Level 5 tool/agent pages include policy/allowlist/approval or equivalent boundary language.
- [ ] Assert no examples include credential-like placeholders that look like real secrets.
- [ ] Assert course pages do not inject arbitrary page content with `innerHTML` in shared/new browser modules.
- [ ] Run tests; fix violations; commit `test: enforce AI-Learn safety boundaries`.

### Task 5: Performance/static dependency audit

**Files:** Create `ai-learn/tests/performance-structure.test.mjs`.

- [ ] Assert new course pages do not load application frameworks or remote analytics scripts.
- [ ] Assert no model-weight/binary assets are introduced under `ai-learn/`.
- [ ] Check CSS/JS references are local except explicit reference links.
- [ ] Run tests; fix accidental dependencies; commit `test: keep AI-Learn static-first`.

### Task 6: Manual visual/E2E matrix

**Files:** Create `docs/superpowers/qa/2026-08-28-ai-learn-manual-qa.md`.

- [ ] Review dashboard at desktop and mobile widths.
- [ ] Follow one complete path through each level.
- [ ] Exercise at least one lab in every level.
- [ ] Verify completion/resume across reload.
- [ ] Verify long code/matrix blocks remain usable on mobile.
- [ ] Verify keyboard operation for primary sliders/buttons.
- [ ] Record actual pass/fail evidence. If browser execution is unavailable, explicitly mark each browser-dependent item `NOT VERIFIED — browser execution unavailable`; do not claim pass.
- [ ] Commit QA evidence document.

### Task 7: Final automated release gate

- [ ] Run `node --test ai-learn/tests/*.test.mjs`; require 0 failures.
- [ ] Review `git diff` for changes outside `ai-learn/`, AI-Learn workflow, and course docs; investigate any unrelated change.
- [ ] Confirm manifest reports five levels and all planned modules published.
- [ ] Confirm the existing root website files were not replaced by course assets.
- [ ] Open final PR `feat: complete AI-Learn AI Engineer path` for any final cross-level fixes.
- [ ] Merge only after available CI/review is green.
- [ ] Verify final `main` contains all levels and QA evidence; verify live Pages URLs when HTTP/browser access is available.