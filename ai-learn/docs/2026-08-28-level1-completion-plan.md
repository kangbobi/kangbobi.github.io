# AI-Learn Level 1 Completion Implementation Plan

> **For agentic workers:** execute task-by-task with Red-Green-Refactor and review before merge.

**Goal:** Finish AI-Learn Level 1 with eight interactive ML modules and automated logic verification.

**Architecture:** Static HTML/CSS/JS under `/ai-learn/`; pure reusable calculations in `lesson-logic.mjs`; browser wiring in `lesson.js`; shared lesson UI in `lesson.css`. Existing Modules 1-2 remain compatible while progress expands to eight modules.

**Tech Stack:** HTML5, CSS, ES modules, SVG/DOM, Node built-in test runner, GitHub Actions, GitHub Pages.

**Spec:** `ai-learn/docs/2026-08-28-level1-completion-design.md`

## Global Constraints

- No backend/login/secrets.
- Analogy and visualization precede code.
- Operational examples are illustrative and clearly framed as such.
- Existing root GitHub Pages site must remain untouched.
- Progress uses `ai-learn.progress.v1`.

---

### Task 1: Pure ML teaching logic + CI

**Files:** create `ai-learn/tests/lesson-logic.test.mjs`, `ai-learn/lesson-logic.mjs`, `.github/workflows/ai-learn.yml`.

**Produces:** `gradientStep`, `sigmoid`, `classifyProbability`, `forestVote`, `minMaxScale`, `confusionMetrics`, `operationalRisk`.

- [ ] Write tests first.
- [ ] Confirm workflow RED because implementation is missing.
- [ ] Implement minimal pure logic.
- [ ] Confirm workflow GREEN.

### Task 2: Shared lesson runtime and styles

**Files:** create `ai-learn/lesson.js`, `ai-learn/lesson.css`.

**Produces:** progress normalization across eight modules, completion buttons, copy buttons, and module-specific interactions.

- [ ] Add browser-safe shared runtime.
- [ ] Add responsive learning layout.
- [ ] Source review for unsafe DOM/API use.

### Task 3: Modules 3-5

**Files:** create `ai-learn/module-3.html`, `module-4.html`, `module-5.html`.

- [ ] Gradient descent interactive stepper and learning-rate comparison.
- [ ] Classification probability/threshold lab.
- [ ] Decision-tree path and random-forest voting lab.

### Task 4: Modules 6-8

**Files:** create `ai-learn/module-6.html`, `module-7.html`, `module-8.html`.

- [ ] Feature scaling/encoding intuition.
- [ ] Confusion matrix + precision/recall/F1 threshold lab.
- [ ] Operational capstone combining regression/risk reasoning and deployment checklist.

### Task 5: Navigation/progress integration

**Files:** modify `ai-learn/index.html`, `ai-learn/app.js`, `ai-learn/README.md`.

- [ ] Expose Modules 3-8 from Level 1 navigation.
- [ ] Expand progress denominator to eight.
- [ ] Replace Module 3 teaser with course-completion path.

### Task 6: Verification and release

- [ ] Review complete diff.
- [ ] Confirm Actions checks.
- [ ] Merge PR.
- [ ] Verify GitHub Pages URL and representative module URLs.