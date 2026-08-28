# AI-Learn Level 1 Completion Design

**Date:** 2026-08-28
**Status:** Approved continuation

## Goal

Complete Level 1 as an eight-module, static-first interactive Machine Learning course published under `/ai-learn/`.

## Learning sequence

1. Belajar dari data — model, features, target, loss, regression intuition.
2. Generalization — train/test, underfit, overfit, leakage.
3. Gradient Descent — weight, bias, loss, learning rate, iterative optimization.
4. Classification — sigmoid probability, threshold, logistic regression.
5. Trees & Ensembles — decision paths, voting, random forest intuition.
6. Feature Engineering — scaling, categorical encoding, derived/time features.
7. Evaluation — confusion matrix, precision, recall, F1, threshold trade-offs.
8. Operational Capstone — cooling prediction + incident-risk reasoning with a deployment checklist.

## Teaching contract

Every new module follows: **analogy → visual interaction → concept → code → checkpoint/completion**. Operational examples use data-center style signals such as IT load, temperature, CRAC availability, alarms, and cooling power. Example datasets are explicitly illustrative.

## Architecture

- Keep Modules 1-2 in the existing `index.html`.
- Modules 3-8 are separate static HTML pages to keep files understandable and independently reviewable.
- `lesson.css` provides shared page styling.
- `lesson-logic.mjs` contains pure calculations usable by both browser UI and Node tests.
- `lesson.js` handles browser interactions and shared progress persistence.
- Progress remains in `localStorage` under `ai-learn.progress.v1` and is normalized across eight modules.
- No backend, account, analytics, external runtime, or secret is required.

## Verification

Pure learning calculations are covered by Node's built-in test runner. A GitHub Actions workflow runs the tests for changes under `ai-learn/**`. Changes are merged through a PR after source review and successful checks when Actions permissions are available.

## Acceptance criteria

- All eight modules are reachable in sequence.
- Modules 3-8 contain working interactive teaching controls.
- Completion progress spans eight modules and survives reloads.
- Logic tests cover gradient descent update behavior, sigmoid/classification, forest voting, feature transforms, confusion-matrix metrics, and capstone risk calculation.
- Mobile layout remains usable.
- Existing root GitHub Pages site is untouched.