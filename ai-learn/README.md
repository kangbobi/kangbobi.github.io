# AI-Learn — AI Engineer Path

AI-Learn is a static-first interactive course that teaches AI engineering through the sequence **analogy → interactive visualization → mental model → math/code → failure mode → checkpoint**.

## Learning path

The published path contains **58 modules across five levels**:

1. **Level 1 — Machine Learning Fundamentals (8 modules):** regression intuition, generalization, gradient descent, classification, trees/ensembles, feature engineering, evaluation, and an operational ML capstone.
2. **Level 2 — Deep Learning & PyTorch (10 modules):** neuron/activation intuition, forward pass, loss/gradient, backpropagation, tensors, autograd/optimizer, training loops, failure modes, and a deep-learning capstone.
3. **Level 3 — Build an LLM From Scratch (14 modules):** language modeling, tokenization, embeddings, positional information, attention, causal masking/multi-head attention, Transformer blocks, GPT assembly, pretraining, decoding, fine-tuning, alignment overview, and a mini-GPT capstone.
4. **Level 4 — Reasoning Models (12 modules):** evaluation baseline, inference-time scaling, best-of-N/voting, bounded refinement, verifiers, RL/policy-gradient intuition, GRPO, reward hacking, distillation, reasoning-system architecture, and a budgeted reasoning capstone.
5. **Level 5 — Production AI Engineer (14 modules):** system boundaries, semantic retrieval, RAG, structured outputs, tool calling, agent loops, memory/state, AI evaluation, security, observability, performance, deployment/versioning, operational AI architecture, and the final Operational Intelligence Assistant capstone.

The material is original. Public companion resources may inform topic sequencing, but the course does not reproduce copyrighted book chapters or diagrams.

## Runtime

The deployed course is plain HTML/CSS/JavaScript under `/ai-learn/`. It requires no backend, login, secret, paid runtime, or build step. Interactive browser labs are deterministic teaching simulations unless explicitly stated otherwise; Python/PyTorch samples are copyable examples for a real Python environment.

Shared course state lives under `ai-learn/core/`. Progress uses the versioned local key `ai-learn.progress.v2`; valid Level 1 completion from the legacy `ai-learn.progress.v1` format is migrated automatically.

## Safety boundaries

Production-AI lessons demonstrate explicit allowlists, schema validation, bounded agent loops, least privilege, traceability, and human approval for high-impact actions. Browser labs never execute real infrastructure changes.

## Verification

Run the complete repository course checks with:

```bash
node --test ai-learn/tests/*.test.mjs
```

The suite covers pure teaching calculations, progress migration, manifest integrity, published-file existence, lesson structure, JavaScript syntax, safe DOM constraints, legacy Level 1 entry points, and final-capstone approval boundaries. GitHub Actions runs the same test glob on AI-Learn pull requests and pushes.

## Deployment

The course is served by the existing GitHub Pages site at `/ai-learn/` after changes merge to the Pages source branch.
