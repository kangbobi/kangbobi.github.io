# AI-Learn — AI Engineer Path Design

**Date:** 2026-08-28  
**Status:** Approved high-level design; awaiting spec review before implementation planning  
**Target:** `https://kangbobi.github.io/ai-learn/`

## 1. Purpose

Expand the existing AI-Learn Level 1 course into a complete, static-first AI Engineer learning path that progresses from classical machine learning through deep learning, large language models, reasoning models, and production AI engineering.

The course is intended to teach how systems work rather than how to memorize APIs. Every module must teach intuition first, then allow the learner to manipulate a visual model, then introduce mathematics and code.

The course remains original learning material. Public Sebastian Raschka resources may define sequencing and reference implementations, but book text, diagrams, or proprietary exercises must not be copied.

## 2. Product principles

1. **Intuition before API** — concepts are introduced with analogy and operational examples before library code.
2. **Interactive before abstract** — each major concept has a visual or manipulative lab when feasible.
3. **Code after mental model** — Python/PyTorch examples follow the visual explanation.
4. **Engineering over demos** — capstones end in an operational workflow, not a toy chatbot.
5. **Static-first** — the public course must run on GitHub Pages without a backend, login, secrets, or paid service.
6. **No fake execution** — browser simulations must be clearly labeled as simulations; real Python/PyTorch examples are presented as runnable code for local/Colab execution unless a real runtime is later added.
7. **Evidence-based completion** — pure calculations and course navigation logic are testable; CI protects future updates.

## 3. Final learning path

### Level 1 — Machine Learning Fundamentals

**Status:** already published.  
**Outcome:** understand supervised ML, fitting, generalization, classification, trees, features, metrics, and safe operational use.

Existing modules:

1. Model, feature, target, loss, regression intuition
2. Train/test, generalization, overfitting, leakage
3. Gradient descent
4. Classification
5. Decision trees and random forests
6. Feature engineering
7. Evaluation metrics
8. Operational ML capstone

### Level 2 — Deep Learning & PyTorch

**Outcome:** understand how neural networks learn and be able to train a small network with PyTorch without treating autograd as magic.

Modules:

1. **Neuron as a weighted decision** — `y = activation(w·x + b)`; interactive weighted-input playground.
2. **Activation functions** — ReLU, sigmoid, tanh; manipulate input and compare shape/effect.
3. **Layers and forward pass** — visualize values flowing through a tiny MLP.
4. **Loss and gradient** — connect Level 1 gradient descent to multi-parameter networks.
5. **Backpropagation** — local derivatives and chain rule as responsibility passed backward through a pipeline.
6. **Tensors and PyTorch** — shapes, broadcasting, matrix multiplication, tensors versus arrays.
7. **Autograd and optimizer** — inspect gradients, zeroing, step, learning rate.
8. **Training a neural network** — dataset, DataLoader, epochs, validation, regularization, checkpoints.
9. **Deep-learning failure modes** — saturation, exploding/vanishing gradients, overfitting, data scaling.
10. **Level 2 capstone** — small operational regression/classification network using illustrative telemetry.

### Level 3 — Build an LLM From Scratch

**Outcome:** understand the core components of a GPT-style language model from raw text to instruction-following behavior.

The ordering follows the public structure of Sebastian Raschka's LLM-from-Scratch companion materials, but the teaching content and visuals are original.

Modules:

1. **Language modeling mental model** — next-token prediction and why it can produce language behavior.
2. **Tokenization** — characters, words, subwords, BPE intuition; interactive tokenizer comparison.
3. **Token embeddings** — IDs are not meaning; map discrete tokens into vectors.
4. **Positional information** — why order must enter the model.
5. **Self-attention intuition** — query/key/value as retrieval inside a sequence.
6. **Attention math** — dot products, scaling, softmax, weighted sum; editable attention matrix.
7. **Causal masking and multi-head attention** — prevent future leakage and learn multiple relationships.
8. **Transformer block** — attention + MLP + residual + normalization.
9. **GPT assembly and forward pass** — compose embeddings, blocks, LM head, logits.
10. **Pretraining** — sequence batching, cross-entropy, training loop, validation loss, sampling.
11. **Decoding** — greedy, temperature, top-k/top-p intuition and quality/diversity trade-offs.
12. **Fine-tuning** — classification and instruction tuning; dataset formatting and objective changes.
13. **Alignment overview** — preference optimization concepts, clearly separated from base pretraining.
14. **Level 3 capstone** — trace one prompt end-to-end through a miniature GPT simulation and corresponding PyTorch skeleton.

### Level 4 — Reasoning Models

**Outcome:** understand that reasoning quality can be improved through evaluation, inference-time compute, feedback, reinforcement learning, and distillation rather than treating "reasoning" as a mystical property.

The ordering follows the public chapter map of Sebastian Raschka's Reasoning-from-Scratch companion materials; teaching content remains original.

Modules:

1. **Reasoning baseline and evaluation** — define a task, dataset, answer format, and reliable scoring before optimizing.
2. **Inference-time scaling** — spend more compute at inference; compare one-shot versus multiple attempts.
3. **Best-of-N and majority voting** — sample multiple solutions and select/aggregate.
4. **Self-consistency and self-refinement** — generate, critique, revise; distinguish useful feedback loops from endless retries.
5. **Verifier / judge design** — rules, learned reward, LLM-as-judge limitations, leakage, calibration.
6. **Reinforcement-learning mental model** — policy, action/token, reward, trajectory, credit assignment.
7. **Policy gradients intuition** — reinforce useful sampled behavior without reproducing full advanced derivations prematurely.
8. **GRPO intuition and workflow** — groups of completions, relative reward, policy update, stability concerns.
9. **Reward hacking and evaluation traps** — optimize the metric without solving the task, judge bias, contamination.
10. **Distillation** — teacher generates useful behavior/data; student learns a cheaper approximation.
11. **Reasoning system architecture** — base model + sampler + verifier + policy + budget/stop conditions.
12. **Level 4 capstone** — interactive multi-path reasoning simulator with verifier selection and compute-budget trade-offs.

### Level 5 — Production AI Engineer

**Outcome:** move from model understanding to building reliable AI-backed products and operational systems.

Modules:

1. **System boundaries** — model versus product; deterministic application layer around probabilistic components.
2. **Embeddings and semantic search** — similarity, chunking, retrieval quality, metadata filtering.
3. **RAG architecture** — ingest → index → retrieve → context → answer; failure modes and evaluation.
4. **Structured outputs** — schemas, validation, retries, safe parsing, deterministic downstream contracts.
5. **Tool calling** — tools as explicit capabilities; permissions, validation, idempotency, timeouts.
6. **Agent loops** — plan/act/observe patterns, stop conditions, when not to use an agent.
7. **Memory and state** — conversational state, durable application state, retrieval memory; privacy boundaries.
8. **AI evaluation** — offline golden sets, task metrics, human review, pairwise eval, LLM-as-judge with calibration.
9. **Guardrails and security** — prompt injection, data exfiltration, tool authorization, sandboxing, least privilege.
10. **Observability** — traces, prompts, tool calls, latency, tokens/cost, error classes, feedback loops.
11. **Performance engineering** — caching, batching, model routing, context management, latency/cost/quality trade-offs.
12. **Deployment and versioning** — model/prompt/config versions, canaries, rollback, CI/CD for AI behavior.
13. **Operational AI architecture** — metrics/events/docs → retrieval/models → reasoning/tools → verifier/guardrails → recommendation → human/automation.
14. **Final capstone** — design and simulate an operational intelligence assistant that analyzes telemetry and documentation, proposes a diagnosis, cites evidence, estimates confidence, and routes high-risk actions to human approval.

## 4. Teaching contract for every module

Every module uses the same sequence unless the topic makes one step genuinely unnecessary:

1. **Why this matters** — one concrete question the concept solves.
2. **Analogy** — grounded analogy, preferably operational/engineering where natural.
3. **Visual lab** — sliders, matrices, nodes, paths, probability bars, token views, or trace timelines.
4. **Mental model** — one compact diagram or flow.
5. **Math** — only the mathematics required to explain the mechanism.
6. **Code** — concise Python/PyTorch or application code matching the visual mechanism.
7. **Failure mode** — at least one way the concept can be misunderstood or misused.
8. **Checkpoint** — quiz, prediction-before-reveal, or short challenge.
9. **Completion** — persist progress locally.

A learner must never need the code sample to understand the preceding visual explanation.

## 5. Information architecture

### 5.1 Learning dashboard

`/ai-learn/` becomes the course dashboard while preserving links to the existing Level 1 modules.

Dashboard responsibilities:

- show Levels 1–5;
- show module counts and local progress per level;
- show overall progress;
- provide resume-last-module navigation;
- distinguish `Published`, `In progress`, and future content only during development; no fake "complete" state;
- provide a compact path overview from ML to production AI.

### 5.2 URL structure

New content uses stable level-based URLs rather than continuing a flat `module-N.html` namespace:

- `/ai-learn/level-2/01-neuron.html`
- `/ai-learn/level-2/02-activations.html`
- `/ai-learn/level-3/01-language-modeling.html`
- `/ai-learn/level-4/01-reasoning-evaluation.html`
- `/ai-learn/level-5/01-system-boundaries.html`

Existing Level 1 URLs remain valid to avoid breaking published links.

### 5.3 Shared navigation

Each lesson page includes:

- level/module title;
- progress for current level and overall path;
- previous/next lesson;
- link back to dashboard;
- module table-of-contents for the current level;
- explicit reference links where relevant.

## 6. Frontend architecture

The course remains framework-free for the deployed learning surface unless static-file complexity proves unmanageable during implementation. The default architecture is:

```text
ai-learn/
  index.html                    # learning dashboard
  core/
    progress.mjs                # progress/read/resume logic
    math.mjs                    # reusable numeric helpers
    dom.mjs                     # safe DOM helpers
    lesson-shell.mjs            # navigation and lesson chrome
    lesson-shell.css
  level-1/                      # optional future migration only; existing URLs preserved
  level-2/
    *.html
    level-2.mjs
    level-2.css
    logic.mjs
  level-3/
    *.html
    level-3.mjs
    level-3.css
    logic.mjs
  level-4/
    *.html
    level-4.mjs
    level-4.css
    logic.mjs
  level-5/
    *.html
    level-5.mjs
    level-5.css
    logic.mjs
  tests/
    *.test.mjs
```

### Boundaries

- `logic.mjs` files contain pure functions only and must not depend on the DOM.
- browser files render and bind controls but do not duplicate mathematical logic.
- shared core modules may be imported by any level but may not depend on level-specific code.
- each level can be understood and tested independently.
- Level 1 receives only targeted compatibility changes; unrelated refactors are out of scope.

## 7. Progress model

Use one versioned localStorage document instead of level-specific keys.

```json
{
  "version": 2,
  "completed": {
    "level-1": ["01", "02"],
    "level-2": ["01"]
  },
  "lastVisited": {
    "level": "level-2",
    "module": "02"
  }
}
```

Requirements:

- migrate the existing `ai-learn.progress.v1` data without losing Level 1 completion;
- tolerate corrupt/missing localStorage data and fall back safely;
- de-duplicate completed modules;
- never store quiz answers, code, credentials, or personal data;
- progress is local to the browser and clearly described as such.

## 8. Interactive lab design

### Deep-learning labs

- weighted-neuron playground;
- activation curve explorer;
- forward-pass network with live node values;
- backprop responsibility/gradient flow;
- tensor shape and matrix multiplication explorer;
- optimizer step visual.

### LLM labs

- tokenization/BPE-style merge visualization using a small pedagogical tokenizer, not a claim of exact production tokenizer behavior;
- embedding-space toy visualization;
- attention heatmap with editable Q/K-like vector relationships;
- causal-mask visualization;
- multi-head comparison;
- Transformer-block trace;
- next-token logits → softmax → sampling controls;
- decoding temperature/top-k comparison.

### Reasoning labs

- multiple sampled reasoning paths represented as concise traces, not hidden chain-of-thought reproduction;
- best-of-N voting;
- verifier scores and selection;
- reward comparison;
- simplified policy-update visualization;
- distillation teacher/student comparison;
- inference budget versus quality/latency chart.

### Production labs

- vector similarity and retrieval ranking;
- chunk-size/retrieval trade-off;
- RAG trace viewer;
- structured-output validation/retry simulation;
- tool permission gate;
- agent loop with explicit stop condition;
- evaluation matrix;
- cost/latency/quality routing simulator;
- final operational workflow trace.

## 9. Code examples and execution model

### Browser

Browser JavaScript executes only deterministic teaching simulations and pure numeric demonstrations.

### Python/PyTorch

Python examples must be:

- syntactically complete enough to copy;
- small enough to understand in the module;
- aligned with the visual mechanism;
- explicit about dependencies;
- labeled when illustrative rather than executed in-browser.

Deep-learning and LLM training examples should use intentionally small shapes/models. The course must not suggest that training a production-scale LLM is required to understand the mechanism.

### Optional external execution

Colab/local execution links may be added later, but the deployed course must not depend on them for core learning or navigation.

## 10. References

Reference links are supplemental and open in a new context. The primary public references for Level 3 and Level 4 are the official Sebastian Raschka companion sites/repos.

Rules:

- never embed copied book passages;
- do not mirror copyrighted PDFs;
- source-code snippets copied from third parties require compatible licensing and attribution; prefer original minimal examples;
- distinguish our course explanation from external references.

## 11. Accessibility and mobile behavior

- semantic headings and labels;
- keyboard-operable controls;
- sliders have visible values and labels;
- visual state is not conveyed by color alone;
- SVG/canvas-like visuals include textual interpretation;
- respect reduced-motion preference for animations;
- minimum practical touch targets for mobile;
- no lesson requires horizontal scrolling except intentional code blocks/matrices with a visible scroll container.

## 12. Performance

Target the static-learning use case:

- no application framework bundle by default;
- no remote analytics or runtime dependency;
- lazy-initialize heavy lesson visuals;
- avoid large image assets when CSS/SVG can explain the concept;
- level pages load independently;
- avoid shipping PyTorch/model weights to the browser.

## 13. Error handling

- invalid numeric input is clamped or rejected visibly;
- lab calculations guard divide-by-zero and non-finite values;
- localStorage access is wrapped in safe fallbacks;
- a failed optional browser API such as clipboard must not break the lesson;
- missing DOM targets in shared modules must fail safely rather than preventing unrelated lesson content from loading;
- references or optional external resources failing must not break core lessons.

## 14. Testing strategy

### Pure logic tests

Use Node's built-in test runner for deterministic logic such as:

- neuron and activation calculations;
- matrix/attention normalization helpers;
- causal masking;
- softmax/sampling helpers with deterministic inputs;
- evaluation metrics;
- reasoning vote/reward calculations;
- retrieval similarity/ranking;
- progress migration and percentage calculation;
- cost/latency routing policies used by simulations.

### Structural checks

CI should check:

- every declared module file exists;
- previous/next lesson links resolve inside the repository;
- dashboard module counts match the course manifest;
- no duplicate module IDs;
- ES module syntax parses;
- existing Level 1 entry points still exist.

### Manual/E2E review

Before publishing each level:

- desktop and mobile navigation;
- interactive controls;
- progress completion/resume;
- code copy fallback;
- readable matrices/code on mobile;
- one end-to-end path through the level.

Browser automation may be added when the available execution environment supports it; lack of browser automation must be stated rather than replaced with an unverified claim.

## 15. CI/CD and release strategy

- continue using GitHub Pages on the existing public repository;
- work in isolated feature branches;
- tests/structural checks run on PRs after workflow availability permits;
- merge each level independently after verification rather than landing all 40+ modules in one unreviewable commit;
- preserve the root non-AI-Learn website;
- deploy by merge to the existing Pages source branch;
- verify repository state and, when HTTP access is available, verify the live URL after propagation.

Recommended delivery slices:

1. **Platform foundation + dashboard/progress v2**
2. **Level 2 — Deep Learning**
3. **Level 3 — LLM From Scratch**
4. **Level 4 — Reasoning Models**
5. **Level 5 — Production AI Engineer**
6. **Cross-level QA, navigation, accessibility, final polish**

Each slice is releasable and leaves the site usable if subsequent work pauses.

## 16. Security and privacy

The static course should have a small attack surface:

- no authentication or secret storage;
- no arbitrary code execution in the browser;
- no user-supplied HTML injection into `innerHTML`; create DOM nodes or use text content;
- external links use safe link attributes where applicable;
- examples teaching tool calling explicitly demonstrate allowlists, validation, least privilege, and human approval for high-impact actions;
- final capstone separates model recommendation from execution authority.

## 17. Final capstone behavior

The final Level 5 capstone simulates an operational intelligence workflow:

```text
Telemetry + Events + Documentation
              ↓
        Feature / Retrieval Layer
              ↓
     Numeric Models + LLM Layer
              ↓
      Reasoning / Tool Selection
              ↓
     Evidence + Verifier + Policy
              ↓
 Recommendation + Confidence + Sources
              ↓
      Human approval when required
```

The learner should be able to inspect the trace and identify:

- which inputs were available;
- what was retrieved;
- what prediction/reasoning step occurred;
- what evidence supports the recommendation;
- what uncertainty remains;
- why the policy allows, blocks, or escalates an action.

The capstone is successful if the learner can explain why an AI system can be useful operationally without granting the model unrestricted authority.

## 18. Out of scope for this expansion

- training production-scale foundation models;
- GPU-backed inference hosted by the course;
- user accounts or cloud-synced progress;
- certificates, payments, social/community features;
- arbitrary in-browser Python execution;
- production integration with live company telemetry;
- autonomous execution of real operational changes;
- copying full chapters, figures, or exercises from copyrighted books.

These can be separate projects if later required.

## 19. Acceptance criteria

The expansion is complete when:

1. Levels 1–5 are visible from the dashboard and all planned modules are published.
2. Existing Level 1 URLs remain functional.
3. Progress v1 migrates to the v2 schema without losing valid completion data.
4. Each new module follows the teaching contract and has at least one meaningful interaction or explicit reason why interaction is not useful.
5. Level 2 contains a working neural-network/backprop visual path and PyTorch examples.
6. Level 3 traces a miniature GPT flow from tokenization through generation/fine-tuning concepts.
7. Level 4 demonstrates inference-time scaling, verification, RL/GRPO intuition, and distillation without presenting hidden model chain-of-thought as a required artifact.
8. Level 5 covers RAG, tools, agents, evaluation, security, observability, performance, deployment, and an operational capstone.
9. Pure logic and structural tests pass in the final branch.
10. Navigation and progress are manually reviewed on desktop and mobile-sized layouts.
11. No change breaks the repository's existing root website.
12. No backend, secret, or paid runtime is required to use the published course.
