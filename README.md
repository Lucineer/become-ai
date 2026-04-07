# Become AI

You start with a minimal agent base. Through guided self-modification, you grow it into a tool that fits your specific task.

This is a git-native agent that rewrites its own source code through real, traceable commits. It is part of the Cocapn Fleet.

**Live Instance:** https://become-ai.casey-digennaro.workers.dev

---

## The Problem
Most agent frameworks require you to adapt your needs to their pre-built capabilities, involving complex setup and glue code. You often get a system that is nearly useful but not quite right.

## The Approach
This agent starts as a simple, minimal function. You provide plain-language instructions for what you need. It then proposes and makes iterative changes to its own codebase, with each change recorded as a standard git commit you can review, accept, or reject.

---

## What This Provides
- **Transparent Evolution:** Every proposed change is a diff. Every accepted change is a commit. There is no hidden runtime or black-box logic.
- **Fork-First Ownership:** You deploy your own copy immediately. You control its evolution path and repository.
- **Zero Dependencies:** It runs on the standard Cloudflare Workers runtime. No npm packages, no build steps.
- **Optional Automation:** You can guide each step, schedule unattended improvement cycles, or pause evolution entirely.

## Current Features
- **Guided Self-Modification:** Submit a goal (e.g., "become a support bot"). The agent plans and executes a series of code changes to approach that goal.
- **Git Integration:** Direct, authenticated access to its own repository to commit changes.
- **State Tracking:** Evolution progress and context are stored in Cloudflare KV.
- **Inspection Endpoints:** API routes to check the current state, view pending proposals, and audit the change history.
- **Standard Interfaces:** Health check and basic chat endpoints that themselves evolve.

**Note:** The agent's effectiveness is tied to the specificity of your instructions and the capabilities of the underlying LLM. It iteratively improves but may not achieve complex, multi-faceted goals in a single run.

---

## Quick Start
1.  Fork this repository.
2.  Deploy it to Cloudflare Workers.
3.  Set the required environment secrets: `DEEPSEEK_API_KEY` and a `GITHUB_TOKEN` with repo permissions.
4.  Send a POST request to `/api/become` with a JSON body describing your goal (e.g., `{"goal": "Add a /status endpoint"}`).

You can also interact with the live instance to see the workflow:  
https://become-ai.casey-digennaro.workers.dev

---

## Requirements
You must supply your own API keys. The agent does not proxy or store credentials.
- `DEEPSEEK_API_KEY`: Used for code generation and planning.
- `GITHUB_TOKEN`: Used with `repo` scope to push commits to its own repository.

---

## Contributing
This is a fork-first project. The canonical source is part of the Cocapn Fleet. To contribute to the core protocol, please open pull requests against the main fleet repository.

## License
MIT

---

**Attribution:** Superinstance & Lucineer (DiGennaro et al.)

---
<div>
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> • 
  <a href="https://cocapn.ai">Cocapn</a>
</div>