# AI-Learn Platform Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the shared course manifest, progress-v2 migration, dashboard, shared lesson shell, and structural CI needed by Levels 2–5 while preserving all existing Level 1 URLs.

**Architecture:** Keep the deployed course static-first. Pure state/navigation calculations live in ES modules under `ai-learn/core/`; DOM rendering remains separate. A manifest is the single source of truth for level/module IDs and URLs.

**Tech Stack:** HTML, CSS, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-28-ai-learn-ai-engineer-path-design.md`

## Global Constraints

- Existing Level 1 URLs must remain functional.
- No backend, authentication, secret, paid runtime, or arbitrary browser code execution.
- `localStorage` migration must preserve valid `ai-learn.progress.v1` completion.
- Browser rendering must not duplicate pure math/state logic.
- Do not use user-supplied HTML with `innerHTML`.
- CI must verify manifest/file consistency and existing Level 1 entry points.

---

### Task 1: Course manifest and validation

**Files:**
- Create: `ai-learn/core/course-manifest.mjs`
- Create: `ai-learn/tests/course-manifest.test.mjs`

**Interfaces:**
- Produces: `COURSE_MANIFEST`, `flattenModules(manifest)`, `findModule(levelId, moduleId)`.

- [ ] **Step 1: Write the failing tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSE_MANIFEST, flattenModules, findModule } from '../core/course-manifest.mjs';

test('manifest has five unique levels and unique module ids per level', () => {
  assert.equal(COURSE_MANIFEST.length, 5);
  assert.equal(new Set(COURSE_MANIFEST.map(x => x.id)).size, 5);
  for (const level of COURSE_MANIFEST) {
    assert.equal(new Set(level.modules.map(x => x.id)).size, level.modules.length);
  }
});

test('published level 1 paths remain stable', () => {
  assert.equal(findModule('level-1', '01').href, './#module-1');
  assert.equal(findModule('level-1', '08').href, './module-8.html');
});

test('flattenModules returns all modules with parent level id', () => {
  const all = flattenModules(COURSE_MANIFEST);
  assert.ok(all.length > 40);
  assert.ok(all.every(x => x.levelId));
});
```

- [ ] **Step 2: Run test to verify RED**

Run: `node --test ai-learn/tests/course-manifest.test.mjs`  
Expected: FAIL because `core/course-manifest.mjs` does not exist.

- [ ] **Step 3: Implement the manifest**

Create a five-level manifest matching the approved spec. Level 1 must point at existing files; Levels 2–5 must use stable level-based paths such as `./level-2/01-neuron.html`.

- [ ] **Step 4: Run test to verify GREEN**

Run: `node --test ai-learn/tests/course-manifest.test.mjs`  
Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add ai-learn/core/course-manifest.mjs ai-learn/tests/course-manifest.test.mjs
git commit -m "feat: add AI-Learn course manifest"
```

### Task 2: Progress-v2 migration and resume state

**Files:**
- Create: `ai-learn/core/progress.mjs`
- Create: `ai-learn/tests/progress.test.mjs`

**Interfaces:**
- Consumes: `COURSE_MANIFEST`.
- Produces: `migrateProgressV1(rawV1)`, `normalizeProgress(raw)`, `completionPercent(progress, manifest, levelId?)`, `markCompleted(progress, levelId, moduleId)`, `setLastVisited(progress, levelId, moduleId)`.

- [ ] **Step 1: Write failing tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { migrateProgressV1, normalizeProgress, markCompleted } from '../core/progress.mjs';

test('migrates valid level 1 completions from v1', () => {
  const next = migrateProgressV1({ completed: ['module-1', 'module-3', 'module-3'] });
  assert.deepEqual(next.completed['level-1'], ['01', '03']);
  assert.equal(next.version, 2);
});

test('normalizes corrupt progress safely', () => {
  assert.deepEqual(normalizeProgress(null), { version: 2, completed: {}, lastVisited: null });
});

test('markCompleted de-duplicates module ids', () => {
  const p = markCompleted({ version: 2, completed: {}, lastVisited: null }, 'level-2', '01');
  const q = markCompleted(p, 'level-2', '01');
  assert.deepEqual(q.completed['level-2'], ['01']);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test ai-learn/tests/progress.test.mjs`  
Expected: FAIL because module is missing.

- [ ] **Step 3: Implement minimal pure progress functions**

Use immutable-return helpers. Map `module-N` legacy IDs to zero-padded Level 1 IDs. Ignore malformed values instead of throwing.

- [ ] **Step 4: Run GREEN**

Run: `node --test ai-learn/tests/progress.test.mjs`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add ai-learn/core/progress.mjs ai-learn/tests/progress.test.mjs
git commit -m "feat: add progress v2 migration"
```

### Task 3: Shared lesson shell

**Files:**
- Create: `ai-learn/core/dom.mjs`
- Create: `ai-learn/core/lesson-shell.mjs`
- Create: `ai-learn/core/lesson-shell.css`
- Create: `ai-learn/tests/lesson-shell.test.mjs`

**Interfaces:**
- Produces: `getLessonNavigation(manifest, levelId, moduleId)` pure helper plus `mountLessonShell(options)` browser function.

- [ ] **Step 1: Write failing navigation test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getLessonNavigation } from '../core/lesson-shell.mjs';
import { COURSE_MANIFEST } from '../core/course-manifest.mjs';

test('navigation resolves previous and next within a level', () => {
  const nav = getLessonNavigation(COURSE_MANIFEST, 'level-2', '02');
  assert.equal(nav.previous.id, '01');
  assert.equal(nav.next.id, '03');
});
```

- [ ] **Step 2: Run RED**

Run: `node --test ai-learn/tests/lesson-shell.test.mjs`  
Expected: FAIL because lesson shell does not exist.

- [ ] **Step 3: Implement pure navigation and safe DOM helpers**

`dom.mjs` exports helpers that use `textContent`, `createElement`, and explicit attribute setting only. `mountLessonShell()` renders current level navigation, progress, dashboard link, and previous/next controls.

- [ ] **Step 4: Run GREEN**

Run: `node --test ai-learn/tests/lesson-shell.test.mjs`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add ai-learn/core/dom.mjs ai-learn/core/lesson-shell.mjs ai-learn/core/lesson-shell.css ai-learn/tests/lesson-shell.test.mjs
git commit -m "feat: add shared lesson shell"
```

### Task 4: Dashboard and Level 1 compatibility bridge

**Files:**
- Modify: `ai-learn/index.html`
- Modify: `ai-learn/app.js`
- Modify: `ai-learn/styles.css`
- Create: `ai-learn/dashboard.mjs`

**Interfaces:**
- Consumes: manifest and progress-v2 helpers.
- Produces: visible Levels 1–5 dashboard, overall progress, per-level progress, resume link.

- [ ] **Step 1: Add a structural test that expects dashboard hooks**

Create `ai-learn/tests/static-structure.test.mjs` using `fs.readFileSync()` and assert that `index.html` contains `id="learningPath"`, `id="overallProgress"`, and `dashboard.mjs`.

- [ ] **Step 2: Run RED**

Run: `node --test ai-learn/tests/static-structure.test.mjs`  
Expected: FAIL because the new dashboard hooks are absent.

- [ ] **Step 3: Implement dashboard and migration bridge**

On first load, read v2 if present; otherwise parse legacy `ai-learn.progress.v1`, migrate, then persist `ai-learn.progress.v2`. Preserve the existing Level 1 lesson sections and their links.

- [ ] **Step 4: Run GREEN plus existing tests**

Run: `node --test ai-learn/tests/*.test.mjs`  
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add ai-learn/index.html ai-learn/app.js ai-learn/styles.css ai-learn/dashboard.mjs ai-learn/tests/static-structure.test.mjs
git commit -m "feat: add AI Engineer learning dashboard"
```

### Task 5: Structural CI

**Files:**
- Modify: `.github/workflows/ai-learn.yml`
- Create: `ai-learn/tests/course-files.test.mjs`

**Interfaces:**
- Consumes: course manifest.
- Produces: CI failure when declared published module paths are missing or duplicate.

- [ ] **Step 1: Write the failing file-existence test**

For modules marked `published: true`, resolve their repo-relative file paths and assert each target exists. Exempt Level 1 hash anchors from file resolution.

- [ ] **Step 2: Run RED against a temporary deliberately-invalid manifest fixture inside the test**

Expected: test confirms the validator reports a missing file; then restore the valid manifest assertion.

- [ ] **Step 3: Update workflow**

Workflow command:

```yaml
- name: Test AI-Learn
  run: node --test ai-learn/tests/*.test.mjs
```

- [ ] **Step 4: Run full suite**

Run: `node --test ai-learn/tests/*.test.mjs`  
Expected: 0 failures.

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/ai-learn.yml ai-learn/tests/course-files.test.mjs
git commit -m "test: validate AI-Learn course structure"
```

### Task 6: Foundation release verification

**Files:** no production files unless review fixes are required.

- [ ] **Step 1:** Run `node --test ai-learn/tests/*.test.mjs` and require 0 failures.
- [ ] **Step 2:** Review `git diff main...HEAD -- ai-learn .github/workflows/ai-learn.yml` for unrelated root-site changes.
- [ ] **Step 3:** Manually open the dashboard at desktop and mobile width when browser execution is available; otherwise record that browser E2E remains unverified.
- [ ] **Step 4:** Open PR titled `feat: add AI-Learn platform foundation`.
- [ ] **Step 5:** Merge only after required available checks/review are green, then verify `main` contains the manifest, dashboard, and progress-v2 files.