# AI-Learn Level 5 Production AI Engineer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a fourteen-module Level 5 path from AI system boundaries through RAG, tools, agents, evaluation, security, observability, deployment, and a final operational-intelligence capstone.

**Architecture:** Pure retrieval, evaluation, routing, policy, and trace calculations live in `ai-learn/level-5/logic.mjs`; browser simulations live in `level-5.mjs`; every high-impact action is represented through an explicit policy/human-approval layer.

**Tech Stack:** HTML, CSS, JavaScript ES modules, Node test runner, Python/application code examples.

**Spec:** `docs/superpowers/specs/2026-08-28-ai-learn-ai-engineer-path-design.md`

## Global Constraints

- Model output is never equivalent to execution authority.
- Tool examples demonstrate allowlists, validation, least privilege, idempotency, timeouts, and human approval for high-impact actions.
- No live credentials, telemetry, or external system writes are used by the course.
- RAG/agent/browser labs are deterministic simulations unless explicitly labeled otherwise.

---

### Task 1: Production-AI pure logic core

**Files:** Create `ai-learn/level-5/logic.mjs`; create `ai-learn/tests/level-5-logic.test.mjs`.

**Interfaces:** `cosineSimilarity(a,b)`, `rankDocuments(queryVector,documents)`, `validateStructuredOutput(value,schema)`, `toolAllowed(tool,allowlist)`, `shouldStopAgent(state)`, `evaluatePredictions(cases)`, `routeModel(options,weights)`, `policyDecision(action,risk,approval)`.

- [ ] Write failing tests for vector ranking, schema validation, tool allowlist rejection, agent stop condition, model routing, and high-risk approval requirement.
- [ ] Run RED.
- [ ] Implement minimal pure helpers with deterministic tie handling and finite-number guards.
- [ ] Run GREEN.
- [ ] Commit `feat: add Level 5 production AI logic core`.

### Task 2: Modules 01–03 — system boundaries, embeddings/search, RAG

**Files:** Create `level-5/01-system-boundaries.html`, `02-embeddings-search.html`, `03-rag.html`, plus `level-5.mjs` and `level-5.css`.

- [ ] Add page-structure tests.
- [ ] Build deterministic-app-layer versus probabilistic-model architecture visual.
- [ ] Build vector-similarity ranking lab with 2D/3D toy vectors and metadata filters.
- [ ] Build RAG trace lab: ingest → chunk → embed → retrieve → context → answer, including retrieval-failure examples.
- [ ] Run tests; commit `feat: add Level 5 retrieval foundations`.

### Task 3: Modules 04–06 — structured outputs, tools, agents

**Files:** Create `04-structured-outputs.html`, `05-tool-calling.html`, `06-agent-loops.html`; modify logic/runtime/tests.

- [ ] Write tests for schema validation, retry termination, tool allowlist, idempotency key handling, and agent stop rules.
- [ ] Build malformed JSON/schema retry simulation with bounded retries.
- [ ] Build tool permission gate showing input validation and approval for high-impact operations.
- [ ] Build plan/act/observe agent loop with explicit maximum steps, success condition, and safe-stop reason.
- [ ] Run tests; commit `feat: teach Level 5 structured tools and agents`.

### Task 4: Modules 07–08 — memory/state and AI evaluation

**Files:** Create `07-memory-state.html`, `08-ai-evaluation.html`; modify runtime/tests.

- [ ] Add tests distinguishing transient conversation state, durable application state, and retrieval memory records.
- [ ] Build memory-boundary visual including privacy/deletion concerns.
- [ ] Build offline golden-set lab with exact/task metrics, pairwise preference, human review, and calibrated judge score.
- [ ] Include evaluation leakage and benchmark-contamination warnings.
- [ ] Run tests; commit `feat: add Level 5 state and evaluation`.

### Task 5: Modules 09–10 — security/guardrails and observability

**Files:** Create `09-security-guardrails.html`, `10-observability.html`; extend logic/tests.

- [ ] Write tests proving untrusted retrieved text cannot directly authorize a tool and high-risk action requires explicit policy approval.
- [ ] Build prompt-injection boundary simulation: untrusted document instruction versus application policy.
- [ ] Build trace timeline showing model call, retrieval, tool calls, latency, token/cost estimates, validation errors, and final outcome.
- [ ] Include least privilege, sandboxing, secret isolation, and audit trail examples.
- [ ] Run tests; commit `feat: add Level 5 AI security and observability`.

### Task 6: Modules 11–12 — performance and deployment/versioning

**Files:** Create `11-performance.html`, `12-deployment-versioning.html`; modify logic/runtime/tests.

- [ ] Write tests for deterministic route scoring across latency/cost/quality weights and cache hit behavior.
- [ ] Build model-routing lab with quality/cost/latency sliders.
- [ ] Build context-budget/cache/batching explanation with explicit trade-offs.
- [ ] Build deployment flow: prompt/model/config version → offline eval → canary → monitor → promote/rollback.
- [ ] Add CI/CD and behavior-regression example.
- [ ] Run tests; commit `feat: add Level 5 performance and deployment`.

### Task 7: Module 13 — operational AI architecture

**Files:** Create `13-operational-ai.html`; modify runtime/tests.

- [ ] Add deterministic trace-model test with typed steps: source, retrieval, model, verifier, policy, recommendation.
- [ ] Build interactive architecture: metrics/events/docs → retrieval/models → reasoning/tools → verifier/guardrails → recommendation → human/automation.
- [ ] Allow learner to inspect evidence, uncertainty, and policy outcome for each trace step.
- [ ] Run tests; commit `feat: add operational AI architecture module`.

### Task 8: Module 14 — final capstone

**Files:** Create `14-capstone.html`; modify manifest/runtime/tests.

- [ ] Write failing capstone orchestration tests for evidence citations, confidence band, risk classification, and approval escalation.
- [ ] Build synthetic operational case with telemetry anomaly + event history + documentation snippets.
- [ ] Simulate retrieval and numeric/model outputs, concise diagnosis, cited evidence, confidence, and action recommendation.
- [ ] Require human approval for high-risk actions; explicitly block execution when evidence/policy is insufficient.
- [ ] Add learner challenge: identify one bad retrieval, one uncertainty source, one security boundary, and one rollback/monitoring requirement.
- [ ] Mark all Level 5 modules published; run all structural checks.
- [ ] Commit `feat: complete AI-Learn Production AI Engineer path`.

### Task 9: Level 5 release gate

- [ ] Run all Node tests with 0 failures.
- [ ] Security review tool/agent examples for authorization and injection boundaries.
- [ ] Manual desktop/mobile pass when browser tooling exists.
- [ ] PR `feat: publish AI-Learn Level 5 Production AI Engineer`.
- [ ] Merge after review/checks and verify Level 5 files on `main`.