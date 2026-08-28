# AI-Learn Level 3 LLM From Scratch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a fourteen-module Level 3 path that explains GPT-style LLMs from next-token prediction through fine-tuning and a miniature end-to-end capstone.

**Architecture:** Pure tokenizer/attention/sampling helpers live in `ai-learn/level-3/logic.mjs`; browser labs live in `level-3.mjs`; pages reuse the shared lesson shell. The browser uses toy vectors and tiny token sets only.

**Tech Stack:** HTML, CSS, JavaScript ES modules, Node test runner, Python/PyTorch code samples.

**Spec:** `docs/superpowers/specs/2026-08-28-ai-learn-ai-engineer-path-design.md`

## Global Constraints

- Content and visuals are original; official Sebastian Raschka companion resources are references, not copied course text.
- Browser tokenization/attention labs are pedagogical simulations and must not claim exact production-tokenizer/model behavior.
- Never display or request hidden chain-of-thought.
- Keep matrices small enough to inspect manually.

---

### Task 1: LLM pure logic core

**Files:** Create `ai-learn/level-3/logic.mjs`; create `ai-learn/tests/level-3-logic.test.mjs`.

**Interfaces:** `softmax(values)`, `dot(a,b)`, `causalMask(size)`, `attentionScores(queries,keys)`, `applyMask(scores,mask)`, `weightedSumRows(weights,values)`, `topK(logits,k)`, `temperatureScale(logits,t)`, `crossEntropy(probabilities,targetIndex)`.

- [ ] Write failing tests for normalized softmax, triangular causal mask, attention row sizes, top-k filtering, and temperature behavior.
- [ ] Run RED.
- [ ] Implement pure finite-number guarded functions.
- [ ] Run GREEN.
- [ ] Commit `feat: add Level 3 LLM math core`.

### Task 2: Modules 01–04 — language modeling, tokenization, embeddings, position

**Files:** Create `level-3/01-language-modeling.html` through `04-position.html`, plus `level-3.mjs` and `level-3.css`.

- [ ] Add structural tests for page metadata/lab/code/checkpoint hooks.
- [ ] Implement next-token probability lab over a tiny fixed vocabulary.
- [ ] Implement small BPE-style merge visualization using original toy vocabulary.
- [ ] Implement embedding-vector toy view and cosine-style proximity explanation.
- [ ] Implement position/order demonstration showing same tokens in different order.
- [ ] Run tests; commit `feat: add Level 3 language representation modules`.

### Task 3: Modules 05–07 — self-attention, attention math, causal multi-head

**Files:** Create `05-self-attention.html`, `06-attention-math.html`, `07-causal-multihead.html`; modify logic/runtime/tests.

- [ ] Write tests for attention normalization and masking future positions to zero probability.
- [ ] Verify RED.
- [ ] Build editable attention heatmap with concise textual interpretation.
- [ ] Build Q/K/V step visual: dot → scale → softmax → weighted value.
- [ ] Build causal-mask and multiple-head comparison visual.
- [ ] Run tests; commit `feat: teach Level 3 attention`.

### Task 4: Modules 08–09 — Transformer block and GPT assembly

**Files:** Create `08-transformer-block.html`, `09-gpt-assembly.html`; modify runtime/tests.

- [ ] Add pure residual-add and layer-shape helpers/tests if needed.
- [ ] Build block trace: norm → attention → residual → norm → MLP → residual.
- [ ] Build GPT stack visual: tokens → embedding+position → N blocks → LM head → logits.
- [ ] Include tiny PyTorch module skeleton matching the visual components.
- [ ] Run tests; commit `feat: assemble miniature GPT path`.

### Task 5: Modules 10–11 — pretraining and decoding

**Files:** Create `10-pretraining.html`, `11-decoding.html`; modify logic/runtime/tests.

- [ ] Write tests for cross-entropy and deterministic top-k candidate selection.
- [ ] Implement context/target shifting visualization and mini batch window.
- [ ] Implement train/validation-loss teaching curve and sampling interval explanation.
- [ ] Implement decoding lab comparing greedy, temperature, and top-k using a fixed probability table.
- [ ] Run tests; commit `feat: add Level 3 pretraining and decoding`.

### Task 6: Modules 12–13 — fine-tuning and alignment overview

**Files:** Create `12-fine-tuning.html`, `13-alignment-overview.html`.

- [ ] Add structural tests checking classification/instruction-format examples and separation of base pretraining versus fine-tuning objectives.
- [ ] Build dataset-format switcher: classification label versus instruction/input/response.
- [ ] Explain freezing/unfreezing, loss target differences, evaluation splits.
- [ ] Add preference/alignment overview without overclaiming that one method equals full alignment.
- [ ] Run tests; commit `feat: add Level 3 fine-tuning concepts`.

### Task 7: Module 14 — miniature GPT capstone

**Files:** Create `14-capstone.html`; modify runtime/manifest/tests.

- [ ] Add test for deterministic trace object containing tokens, attention weights, logits, and selected next token.
- [ ] Implement interactive prompt trace through tokenizer → embeddings → causal attention → block → logits → decoding.
- [ ] Provide corresponding intentionally-small PyTorch skeleton and reference links to official companion resources.
- [ ] Mark Level 3 manifest modules published and require file validation pass.
- [ ] Run suite; commit `feat: complete AI-Learn Level 3`.

### Task 8: Level 3 release gate

- [ ] Run all Node tests with 0 failures.
- [ ] Review all pages for copied-text risk and pedagogical-simulation labels.
- [ ] Review attention/tokenization labs on mobile-sized layout when browser tooling exists.
- [ ] PR `feat: publish AI-Learn Level 3 LLM From Scratch`.
- [ ] Merge after review/checks and verify Level 3 files on `main`.