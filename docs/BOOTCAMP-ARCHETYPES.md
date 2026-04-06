# Bootcamp Archetype Catalog

Every git-agent starts from the nearest open-source archetype and iterates itself into the target application. This catalog maps domains to fork candidates and reverse-actualization targets.

## Terminal-Native Coding
- **Open archetype:** Aider, OpenHands, Cline
- **Paid target:** Claude Code, Windsurf, Cursor
- **Equipment:** syntax highlighting, file tree, terminal IO, git integration, test runner
- **Skills:** code generation, refactoring, debugging, code review

## Autonomous Web Research
- **Open archetype:** GPT Researcher, Storm
- **Paid target:** OpenAI Deep Research, Perplexity Pages
- **Equipment:** web scraper, search API, citation tracker, source ranking
- **Skills:** query decomposition, source synthesis, fact verification, summarization

## Physical Robotics / Hardware
- **Open archetype:** LeRobot (Hugging Face), RoboStack, nexus-runtime
- **Paid target:** Figure AI, Tesla Optimus, Boston Dynamics
- **Equipment:** bytecode VM, wire protocol, safety state machine, trust engine
- **Skills:** reflex synthesis, fleet coordination, trust scoring, equipment manifest

## Educational / Classroom
- **Open archetype:** OpenMAIC, TutorGPT, studylog-ai
- **Paid target:** Khanmigo, VTS Editor
- **Equipment:** Socratic engine, flashcard system, crystal graph, draft comparison
- **Skills:** teach-don't-tell, adaptive difficulty, spaced repetition, misconception detection

## Creative VFX / CGI
- **Open archetype:** Blender AI Lab, AITemplate, ComfyUI
- **Paid target:** Wonder Dynamics, Adobe Firefly Video, Runway
- **Equipment:** storyboard pipeline, sprite renderer, scene composer
- **Skills:** visual storytelling, style transfer, pacing, shot composition

## Multi-Agent Orchestration
- **Open archetype:** CrewAI, Microsoft AutoGen, fleet-orchestrator
- **Paid target:** Sierra, Microsoft Copilot Studio
- **Equipment:** event bus, task queue, trust engine, vessel discovery
- **Skills:** role assignment, dependency resolution, conflict mediation, consensus

## Cybersecurity / Pentesting
- **Open archetype:** PentestGPT, XENA, OWASP ZAP
- **Paid target:** Pentera, Picus Security
- **Equipment:** port scanner, payload generator, report formatter, CVE lookup
- **Skills:** attack chain reasoning, vulnerability prioritization, remediation planning

## Enterprise Customer Support
- **Open archetype:** Chatwoot, Typebot
- **Paid target:** Intercom Fin, Zendesk AI
- **Equipment:** ticket system, knowledge base, sentiment analyzer, escalation router
- **Skills:** intent classification, resolution prediction, handoff logic, follow-up

## Financial / Investment
- **Open archetype:** OpenBB, FinRL
- **Paid target:** Wealthfront, Betterment
- **Equipment:** market data feed, portfolio tracker, risk calculator, tax optimizer
- **Skills:** asset allocation, rebalancing, tax-loss harvesting, risk assessment

## Legal / Compliance
- **Open archetype:** Open-Legal-Data, Legal-NLP
- **Paid target:** Harvey AI, CoCounsel (Casetext)
- **Equipment:** case database, citation network, contract analyzer, compliance checker
- **Skills:** legal reasoning, precedent matching, contract drafting, risk identification

## B2B Marketing Attribution
- **Open archetype:** Matomo, Snowplow
- **Paid target:** HockeyStack, 6sense
- **Equipment:** event tracker, funnel analyzer, attribution model, dashboard
- **Skills:** channel scoring, lead scoring, campaign optimization, ROI calculation

## Gaming / NPC Intelligence
- **Open archetype:** Mindstorms (AI NPCs), ChatHaruhi, craftmind-herding
- **Paid target:** Inworld AI, Convai
- **Equipment:** behavior tree, dialogue system, memory manager, emotion engine
- **Skills:** personality consistency, context-aware dialogue, goal-driven behavior, relationship tracking

## TTRPG / Dungeon Master
- **Open archetype:** dmlog-ai, FoundryVTT
- **Paid target:** AI Dungeon, Roleplay Gateway
- **Equipment:** dice roller, NPC memory, world state, encounter engine
- **Skills:** narrative pacing, branch management, belief economy, echo synthesis

## Personal Productivity
- **Open archetype:** personallog-ai, Logseq
- **Paid target:** Notion AI, Rewind
- **Equipment:** task tracker, journal, calendar sync, knowledge graph
- **Skills:** priority inference, habit tracking, context switching, daily synthesis

## Health / Fitness
- **Open archetype:** healthlog-ai, Open Fit
- **Paid target:** Whoop, Oura
- **Equipment:** workout logger, sleep tracker, nutrition DB, recovery calculator
- **Skills:** plan adaptation, injury prevention, progress projection, motivation

## Cooking / Recipes
- **Open archetype:** cooklog-ai, RecipeRadar
- **Paid target:** Whisk, SideChef
- **Equipment:** recipe DB, ingredient matcher, substitution engine, timer
- **Skills:** meal planning, dietary adaptation, technique coaching, grocery optimization

---

## How Bootcamp Uses This

1. Captain describes intent: "I need a legal research assistant"
2. Bootcamp maps to archetype: Legal/Compliance → Open-Legal-Data
3. System clones nearest archetype or starts from cocapn-lite with legal equipment
4. Agent iterates itself: adds case search, citation network, contract drafting
5. Each generation: test → score → mutate → commit → if better, keep
6. Overnight mode: 20 iterations unattended, human reviews in morning

## Equipment vs Skills

**Equipment** (what the agent perceives):
- External modules loaded at runtime
- Connected to data sources, APIs, tools
- Example: legal case database connector, market data feed, port scanner

**Skills** (how the agent thinks):
- Prompt treatment and response routing
- Context architecture that shapes reasoning
- Example: legal reasoning patterns, attack chain logic, Socratic method

**The bootcamp modifies BOTH** — adding equipment for new capabilities, tuning skills for domain expertise. A git-agent can appear as any of these categories because it's not category-specific — it's self-evolving.

---

*Superinstance & Lucineer (DiGennaro et al.)*
