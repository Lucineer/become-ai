# Bootcamp Architecture

> A git-agent does not build an application FOR you. It iterates itself INTO the application.

## The Core Loop

```
Captain gives intent
    ↓
Bootcamp maps to archetype
    ↓
Agent clones nearest starting point
    ↓
Iteration cycle:
  Read own code
  Propose mutation (equipment or skill)
  Test against captain's criteria
  If better: commit to branch
  If worse: discard, try different mutation
    ↓
Repeat until captain says "ship it"
```

## Captain-to-Cocapn

Traditional agent frameworks have a handoff:

```
Human → prompt → coding agent → separate project → deploy → maintain
```

Captain-to-cocapn eliminates the handoff:

```
Captain → intent → agent evolves itself → agent IS the deployed application
```

The captain's instructions flow directly into the agent's self-evolution. There is no separate build step. No handoff. The agent reads its own code, proposes changes, tests them, and commits. The agent IS the repo at every step.

This works because of two architectural decisions:

1. **The repo IS the agent** — not a config file for an external runtime
2. **Git IS the coordination protocol** — branches are experiments, PRs are answers

## Equipment vs Skills

These are different layers with different operations:

**Equipment** (what the agent perceives):
- External modules connected to data sources, APIs, tools
- Added/removed without changing the agent's reasoning
- Example: a legal case database connector, a market data feed, a port scanner
- Equipment is LOADED — it plugs into the vessel like mech armor

**Skills** (how the agent thinks):
- Prompt treatment and response routing architecture
- Context structure that shapes reasoning patterns
- Example: legal reasoning, Socratic method, attack chain logic
- Skills are LEARNED — they modify how the agent processes information

**Treatment** (the bridge between input and output):
- Pre-processing: how the agent interprets the captain's intent
- Post-processing: how the agent converts its reasoning into IO
- This is what Claude Code's internal system does — and what git-agents can modify

A git-agent can modify all three:
- Add equipment (new data source)
- Tune skills (new reasoning pattern)
- Adjust treatment (new prompt engineering)

## Branch-Based A/B Testing

Every evolution step is a branch:

```
master (current agent)
  ├── become-gen-1 (tried feature A — score 6/10)
  ├── become-gen-2 (tried feature B — score 8/10) ← merged
  ├── become-gen-3 (tried feature C — score 5/10)
  └── become-gen-4 (combined B + refinement — score 9/10) ← merged
```

The agent doesn't guess. It tests. Each branch is an experiment. The scoring criteria come from the captain. The agent only merges what improves.

## Overnight Mode

```
Captain: "Work on making round villager NPCs overnight"
    ↓
Agent runs 20 iterations unattended:
  - Gen 1: Basic NPC dialogue (score 4)
  - Gen 2: Added personality traits (score 6)
  - Gen 3: Added memory of past conversations (score 7)
  - ...
  - Gen 18: Village gossip system (score 9)
    ↓
Morning: Captain reviews summaries, vibe-codes modifications
```

The human doesn't babysit. The agent works while they sleep. In the morning, the human reads a summary of each generation, makes adjustments, and the cycle continues.

## Canon Consistency

For creative work (worldbuilding, fiction, serial content):

**Pre-publish:**
- Agent tracks established facts in KV (characters, locations, rules, events)
- Before committing a mutation, checks: does this break canon?
- If conflict detected: flag for human review, don't auto-merge

**Post-publish:**
- New ideas are checked against published canon
- Agent alerts: "This new character motivation conflicts with Chapter 3's established timeline"
- Suggests: earlier scene modifications to accommodate, or alternative that preserves canon

## Self-Filtering and Refactoring

The test-driven evolution loop works for creative tasks:

1. Write 100 short stories (or worldbuilding entries, or game mechanics)
2. Define "completion tests" for each (consistency check, engagement score, canon compliance)
3. Agent iterates: generates new content, tests against existing, refactors if needed
4. Pre-publish: run full canon consistency check
5. Post-publish: new ideas auto-checked against published material

## The Compute Allowance Model

Local models are cheap. Cloud models are expensive. The bootcamp manages this:

```
Local model (Ollama, free):
  - Runs 100 cheap iterations per hour
  - Generates variations, filters obviously bad ones
  - Scores mutations against criteria

Cloud model (DeepSeek-Reasoner, $0.001/call):
  - Reserved for expensive decisions only
  - Storyboards the big picture (what should gen 10 look like?)
  - Scores the top 5 candidates from local filtering
  - Monthly allowance: captain sets cloud credit budget
```

This is the **expensive storyboarder + cheap animator** pattern:
- Big model: decides WHAT to build (5 calls)
- Small model: builds it (100 calls)
- Cost: 5x expensive + 100x cheap = still under $1/overnight session

## Archetype Catalog

See [BOOTCAMP-ARCHETYPES.md](./BOOTCAMP-ARCHETYPES.md) for the full domain map.

Each domain has:
- **Open archetype** — fork candidate (starting point)
- **Paid target** — reverse-actualization goal
- **Equipment list** — what to plug in
- **Skills list** — how to think

## What Makes This Different

| Other frameworks | Bootcamp |
|---|---|
| Agent builds a separate project | Agent becomes the project |
| Centralized orchestration | Sovereign nodes, no center |
| Fixed skill set | Self-modifying skills |
| Human babysits each step | Overnight unattended iteration |
| One model, one approach | Local+cloud allowance model |
| Deploy → maintain → upgrade | Continuously evolving |
| Configuration files | The repo IS the configuration |

## The Minimal Viable Bootcamp

A bootcamp needs:
1. A git-agent that can read its own code (~200 lines)
2. An LLM call for mutation proposals
3. A scoring function (LLM-judged or test-based)
4. Git branch creation + PR workflow
5. Captain intent → archetype mapping

That's it. Everything else — overnight mode, canon checking, compute allowance — is equipment loaded on top.

## Fork-First

The bootcamp itself is a git-agent. Fork it. It becomes whatever you need.

---

*Superinstance & Lucineer (DiGennaro et al.)*
