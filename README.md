# Become AI: A Git Agent That Rewrites Its Own Code ✨

You start with a 12-line Cloudflare Worker that responds "I'm here." Through self-modification, you guide it to become the tool you need. Every change is a real git commit you can review.

**Live Instance:** https://become-ai.casey-digennaro.workers.dev

---

## Why This Exists
Many AI tools are generic. You need a starting point you control that grows only in the direction you specify. This does not ship with features. It ships with the ability to build them for you, one commit at a time.

---

## Quick Start
1.  **Fork** this repository. You own the code from the start.
2.  Deploy the single file to Cloudflare Workers. There are zero dependencies and no build steps.
3.  Add two secrets to your Worker: `DEEPSEEK_API_KEY` and a `GITHUB_TOKEN` with repo write access.
4.  POST to `/api/become` with a JSON goal:
    ```json
    {"goal": "Add an endpoint that returns the current time in UTC"}
    ```

You will see a commit appear on your forked repository.

---

## What It Does
- **Self-modifies:** You submit a plain-language goal. The agent writes and commits changes to its own source code.
- **Git-native:** Every change is a standard git commit with a message and diff. The history is traceable.
- **You retain oversight:** You can review, accept, or revert every change before it runs.
- **Zero runtime dependencies:** It runs entirely on the Cloudflare Workers runtime.
- **Transparent state:** All context is stored in Cloudflare KV. There is no hidden memory.

## Limitations
- **Single-file evolution:** The agent currently modifies only its main `index.js` file. It cannot create or manage a multi-file project. Your application's complexity is constrained by a single script, which may become difficult to manage beyond 20-30 modifications.

---

## What Makes This Different
1.  **You fork first.** You own the repository before any code is changed.
2.  **It only changes itself.** This agent does not call external APIs or spin up services. It only edits the single file it runs from.
3.  **No hidden guardrails.** There is no secret prompt layer overriding your instructions. You can tell it to become anything, and it will attempt your request.

---

## License
MIT. Use it, break it, fork it.

Attribution: Superinstance and Lucineer (DiGennaro et al.)

<div style="text-align:center;padding:16px;color:#64748b;font-size:.8rem"><a href="https://the-fleet.casey-digennaro.workers.dev" style="color:#64748b">The Fleet</a> &middot; <a href="https://cocapn.ai" style="color:#64748b">Cocapn</a></div>

---

<i>Built with [Cocapn](https://github.com/Lucineer/cocapn-ai) — the open-source agent runtime.</i>
<i>Part of the [Lucineer fleet](https://github.com/Lucineer)</i>

