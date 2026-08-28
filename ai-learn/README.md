# AI-Learn Level 1

Interactive Machine Learning foundation course built around the learning sequence **analogy → visualization → concept → code → checkpoint**.

## Modules

1. Belajar dari data — model, feature, target, loss, regression intuition.
2. Generalization — train/test, underfitting, overfitting, data leakage.
3. Gradient Descent — weight, bias, gradient, learning rate.
4. Classification — sigmoid probability and decision thresholds.
5. Trees & Ensembles — decision trees, complexity, random-forest voting.
6. Feature Engineering — scaling, categorical encoding, derived features.
7. Evaluation — confusion matrix, precision, recall, accuracy, F1.
8. Operational Capstone — combine prediction, risk, data quality, policy, and human guardrails.

Examples use illustrative data-center operational signals so the concepts stay concrete. They are teaching examples, not production thresholds or measured site behavior.

## Runtime

The deployed course is static HTML/CSS/JavaScript under `/ai-learn/`. It needs no backend, login, secret, or build step. Pure teaching calculations live in `lesson-logic.mjs` and browser interactions in `lesson.js`.

Progress is stored locally under `ai-learn.progress.v1` and spans all eight modules.

## Verification

Run the pure logic tests with:

```bash
node --test ai-learn/tests/*.test.mjs
```

GitHub Actions runs the same check for changes to the course.

## Deployment

The course is served by the existing GitHub Pages site at `/ai-learn/` after changes merge to the Pages source branch.
