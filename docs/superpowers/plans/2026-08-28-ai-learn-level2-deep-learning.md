# AI-Learn Level 2 Deep Learning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Level 2 as a ten-module interactive path from a single neuron through PyTorch training and a telemetry capstone.

**Architecture:** Level-specific pure functions live in `ai-learn/level-2/logic.mjs`; browser interactions live in `level-2.mjs`; pages reuse the shared lesson shell. Each lesson is a small static HTML document with one main concept/lab.

**Tech Stack:** HTML, CSS, JavaScript ES modules, Node test runner, Python/PyTorch code samples.

**Spec:** `docs/superpowers/specs/2026-08-28-ai-learn-ai-engineer-path-design.md`

## Global Constraints

- Use analogy → visual → mental model → math → code → failure mode → checkpoint.
- Browser labs are deterministic simulations; PyTorch examples are labeled for local/Colab execution.
- Keep model shapes intentionally small.
- No backend or model weights in the browser.

---

### Task 1: Neural math core

**Files:** Create `ai-learn/level-2/logic.mjs`; create `ai-learn/tests/level-2-logic.test.mjs`.

**Interfaces:** `weightedSum(inputs, weights, bias)`, `relu(x)`, `sigmoid(x)`, `tanhActivation(x)`, `denseLayer(inputs, weights, biases, activation)`, `mseLoss(prediction,target)`, `numericGradient(fn,x,epsilon)`.

- [ ] Write failing tests covering weighted sum, activation values, dense layer output shape, MSE, and numeric gradient.
- [ ] Run `node --test ai-learn/tests/level-2-logic.test.mjs`; expect missing-module failure.
- [ ] Implement minimal pure functions with finite-number guards.
- [ ] Re-run; require all Level 2 logic tests pass.
- [ ] Commit `feat: add Level 2 neural math core`.

### Task 2: Module 01–03 — neuron, activations, forward pass

**Files:** Create `level-2/01-neuron.html`, `02-activations.html`, `03-forward-pass.html`, `level-2.mjs`, `level-2.css`.

**Interfaces:** consume Task 1 functions; use shared `mountLessonShell()`.

- [ ] Add static-structure tests asserting each page has module metadata, one lab root, one code block, and completion control.
- [ ] Verify tests fail before pages exist.
- [ ] Implement neuron playground with editable inputs/weights/bias and activation output.
- [ ] Implement activation explorer comparing ReLU/sigmoid/tanh and textual interpretation.
- [ ] Implement tiny 2→2→1 MLP forward-pass visual showing node values and matrix dimensions.
- [ ] Run full tests; require pass; commit `feat: add Level 2 neural fundamentals`.

### Task 3: Module 04–05 — loss, gradient, backpropagation

**Files:** Create `level-2/04-loss-gradient.html`, `05-backpropagation.html`; modify `level-2.mjs` and `logic.mjs`; extend tests.

**Interfaces:** add `chainRule(localGradients)`, `oneStepNeuronUpdate({inputs,weights,bias,target,learningRate})`.

- [ ] Write failing tests proving one update reduces loss for a fixed pedagogical sample and chain-rule multiplication is correct.
- [ ] Run RED.
- [ ] Implement pure update/backprop helpers.
- [ ] Build loss surface/gradient direction interaction and backprop graph showing local derivative × incoming gradient.
- [ ] Include explicit failure-mode section: learning rate too high, saturation, gradient confusion.
- [ ] Run tests; commit `feat: teach Level 2 gradients and backprop`.

### Task 4: Module 06–07 — tensors, autograd, optimizer

**Files:** Create `06-tensors-pytorch.html`, `07-autograd-optimizer.html`; modify browser runtime.

- [ ] Add structural tests for code samples containing `torch.tensor`, `.backward()`, `.grad`, `zero_grad()`, and `optimizer.step()` in their appropriate pages.
- [ ] Verify RED.
- [ ] Implement tensor shape/broadcasting/matmul explorer with small arrays.
- [ ] Implement autograd training-step timeline: forward → loss → zero_grad → backward → step.
- [ ] Provide copyable PyTorch examples aligned with visuals.
- [ ] Run tests; commit `feat: add Level 2 PyTorch mechanics`.

### Task 5: Module 08–09 — training loop and failure modes

**Files:** Create `08-training-loop.html`, `09-failure-modes.html`; modify runtime/tests.

- [ ] Add deterministic learning-curve helper/test using precomputed illustrative epoch values and validation-gap classification.
- [ ] Implement epoch/batch/validation visual and checkpoint explanation.
- [ ] Implement failure-mode switcher for underfit, overfit, vanishing gradient, exploding gradient, unscaled input.
- [ ] Include code showing Dataset/DataLoader, train/eval modes, optimizer and validation loop.
- [ ] Run tests; commit `feat: add Level 2 training workflow`.

### Task 6: Module 10 — telemetry capstone

**Files:** Create `10-capstone.html`; modify `level-2.mjs`; extend manifest/tests.

- [ ] Write failing test for a small two-layer forward simulation used by the capstone.
- [ ] Implement capstone: illustrative telemetry inputs → normalized features → tiny network → regression/risk outputs → validation/guardrail discussion.
- [ ] Add complete PyTorch skeleton with seeded training example and explicit note that course browser does not execute it.
- [ ] Mark all Level 2 manifest modules published and verify file-existence test passes.
- [ ] Run complete suite; commit `feat: complete AI-Learn Level 2`.

### Task 7: Level 2 release gate

- [ ] Run `node --test ai-learn/tests/*.test.mjs`; require 0 failures.
- [ ] Review all ten pages for teaching-contract sections.
- [ ] Manual desktop/mobile pass when browser tooling is available; otherwise record limitation.
- [ ] PR `feat: publish AI-Learn Level 2 Deep Learning`.
- [ ] Merge after review/checks, then verify Level 2 files exist on `main`.