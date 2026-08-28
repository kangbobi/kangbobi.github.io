# AI-Learn Level 4 Reasoning Models Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a twelve-module Level 4 path that explains reasoning improvement through evaluation, inference-time scaling, verification, reinforcement learning intuition, GRPO, and distillation.

**Architecture:** Level 4 pure evaluators, voting, reward, and budget helpers live in `ai-learn/level-4/logic.mjs`; browser simulations live in `level-4.mjs`; concise reasoning traces are synthetic teaching artifacts and never expose hidden model chain-of-thought.

**Tech Stack:** HTML, CSS, JavaScript ES modules, Node test runner, Python/PyTorch pseudocode and small runnable examples.

**Spec:** `docs/superpowers/specs/2026-08-28-ai-learn-ai-engineer-path-design.md`

## Global Constraints

- Do not request, expose, or imitate hidden model chain-of-thought; use concise answer traces, candidate summaries, scores, and observable outputs.
- Evaluation precedes optimization.
- Reward/GRPO visuals are simplified pedagogical mechanisms and labeled accordingly.
- Reasoning improvements are framed as quality/compute/evaluation trade-offs, not mystical intelligence.

---

### Task 1: Reasoning logic core

**Files:** Create `ai-learn/level-4/logic.mjs`; create `ai-learn/tests/level-4-logic.test.mjs`.

**Interfaces:** `majorityVote(labels)`, `bestOfN(candidates)`, `weightedScore(criteria,weights)`, `relativeRewards(rewards)`, `budgetSummary(samples,costPerSample,latencyPerSample)`, `distillationGap(teacher,student)`.

- [ ] Write failing tests for majority voting, deterministic best-of-N tie handling, relative reward centering, budget totals, and distillation gap.
- [ ] Run RED.
- [ ] Implement minimal pure helpers.
- [ ] Run GREEN.
- [ ] Commit `feat: add Level 4 reasoning logic core`.

### Task 2: Modules 01–03 — baseline evaluation, inference scaling, best-of-N

**Files:** Create `level-4/01-reasoning-evaluation.html`, `02-inference-scaling.html`, `03-best-of-n.html`, plus `level-4.mjs` and `level-4.css`.

- [ ] Add page-structure tests.
- [ ] Build evaluation lab with task set, exact-format scorer, pass rate, and error categories.
- [ ] Build inference-budget control showing sample count versus estimated latency/cost and synthetic quality curve.
- [ ] Build candidate card/voting lab using concise candidate summaries and final answers only.
- [ ] Run tests; commit `feat: add Level 4 inference reasoning modules`.

### Task 3: Modules 04–05 — self-refinement and verifier design

**Files:** Create `04-self-refinement.html`, `05-verifier.html`; modify logic/runtime/tests.

- [ ] Write tests for stop-condition helper and weighted verifier score.
- [ ] Build generate → critique summary → revise loop with maximum-iteration stop and score history.
- [ ] Build verifier calibration lab comparing rule-based, learned/reward-like, and judge-style scoring limitations.
- [ ] Include leakage/bias/reward-hacking warning sections.
- [ ] Run tests; commit `feat: teach Level 4 refinement and verification`.

### Task 4: Modules 06–08 — RL mental model, policy gradient, GRPO

**Files:** Create `06-rl-mental-model.html`, `07-policy-gradient.html`, `08-grpo.html`; extend logic/tests.

**Interfaces:** add `softPolicyUpdate(probabilities,rewards,learningRate)` and `groupAdvantages(rewards)`.

- [ ] Write failing tests that rewarded action probability increases after a small policy update and group advantages sum near zero.
- [ ] Run RED.
- [ ] Implement simplified pure update helpers with normalization.
- [ ] Build policy/action/reward trajectory visual.
- [ ] Build token/action probability update visual using one-step pedagogical example.
- [ ] Build GRPO group-completion visual: sample group → score → relative advantage → update.
- [ ] Run tests; commit `feat: add Level 4 RL and GRPO intuition`.

### Task 5: Modules 09–10 — reward hacking and distillation

**Files:** Create `09-reward-hacking.html`, `10-distillation.html`; modify runtime/tests.

- [ ] Add deterministic examples where metric optimization produces an undesirable answer and tests for scorer disagreement.
- [ ] Build reward-hacking switcher showing proxy metric versus actual task quality.
- [ ] Build teacher/student distillation visual comparing quality, size, latency, and synthetic training examples.
- [ ] Provide small code skeleton for supervised distillation from generated teacher responses.
- [ ] Run tests; commit `feat: add Level 4 reward and distillation modules`.

### Task 6: Modules 11–12 — reasoning system architecture and capstone

**Files:** Create `11-reasoning-system.html`, `12-capstone.html`; modify manifest/runtime/tests.

- [ ] Write test for a deterministic orchestration result: candidate count, selected candidate, verifier score, budget consumed, stop reason.
- [ ] Build architecture trace: base model → sampler → verifier → policy/budget → final answer.
- [ ] Build capstone where learner chooses N, verifier weighting, and compute budget then observes quality/latency/cost trade-offs on synthetic benchmark cases.
- [ ] Mark all Level 4 modules published and require file validation pass.
- [ ] Run full suite; commit `feat: complete AI-Learn Level 4`.

### Task 7: Level 4 release gate

- [ ] Run all Node tests with 0 failures.
- [ ] Review every reasoning visual to ensure it shows observable summaries/results, not hidden chain-of-thought.
- [ ] Review budget/reward labels for pedagogical-simulation clarity.
- [ ] PR `feat: publish AI-Learn Level 4 Reasoning Models`.
- [ ] Merge after review/checks and verify Level 4 files on `main`.