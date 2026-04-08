// Become AI — a git-agent that becomes whatever you need
// Captain-to-cocapn: user instructions flow into the agent's own self-evolution
// The agent does not build an app FOR you. It iterates itself INTO the app.

const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*; frame-ancestors 'none';";

interface Env {
  BECOME_KV: KVNamespace;
  DEEPSEEK_API_KEY: string;
  GITHUB_TOKEN: string;
}

const GH_API = 'https://api.github.com';
const DS_URL = 'https://api.deepseek.com/chat/completions';

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

async function llm(prompt: string, key: string, system: string): Promise<string> {
  const r = await fetch(DS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
    body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'system', content: system }, { role: 'user', content: prompt }], max_tokens: 4000, temperature: 0.4 }),
  });
  if (!r.ok) throw new Error('LLM ' + r.status);
  const d = await r.json();
  return d.choices?.[0]?.message?.content || '';
}

async function ghGet(path: string, token: string): Promise<any> {
  const r = await fetch(GH_API + path, { headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'become-ai/1.0' } });
  return r.json();
}

async function ghPost(path: string, token: string, body: any): Promise<any> {
  const r = await fetch(GH_API + path, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'become-ai/1.0', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function ghPut(path: string, token: string, body: any): Promise<any> {
  const r = await fetch(GH_API + path, {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'become-ai/1.0', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.json();
}

// ── Phase 1: Bootcamp — receive captain's intent ────────────

async function startBootcamp(intent: string, env: Env): Promise<any> {
  const key = env.DEEPSEEK_API_KEY;
  const token = env.GITHUB_TOKEN;

  // Step 1: Analyze intent, find nearest archetype
  const analysisPrompt = 'A user wants to build: ' + intent + '\n\nYou are a git-agent bootcamp instructor. Your job is to help the agent BECOME this application, not build it as a separate project.\n\nRespond with JSON:\n{"archetype":"nearest open source repo to fork (e.g. studylog-ai for education)","equipment":["list of cocapn equipment modules to load"],"skills":["list of skill architectures to adopt"],"interface":"what the landing page should look like","firstFeature":"the single most important feature to add first","testPrompt":"a test prompt to verify the first feature works","milestones":["milestone 1","milestone 2","milestone 3"]}';

  const plan = await llm(analysisPrompt, key, 'You are a git-agent bootcamp planner. Respond with valid JSON only, no markdown.');
  let planData: any;
  try {
    const jsonMatch = plan.match(/\{[\s\S]*\}/);
    planData = JSON.parse(jsonMatch ? jsonMatch[0] : plan);
  } catch (e) {
    planData = { archetype: 'cocapn-lite', equipment: [], skills: [], interface: 'simple', firstFeature: 'basic chat', testPrompt: 'hello', milestones: ['working chat', 'add feature 1', 'polish'] };
  }

  // Step 2: Get current agent code
  let currentCode = '';
  try {
    const file = await ghGet('/repos/Lucineer/become-ai/contents/src/worker.ts', token);
    currentCode = atob(file.content);
  } catch (e) {
    currentCode = 'Could not read code';
  }

  // Step 3: Generate the first mutation — agent becomes the app
  const mutatePrompt = 'You are a git-agent undergoing bootcamp. The captain wants: ' + intent + '\n\nArchetype: ' + planData.archetype + '\nFirst feature: ' + planData.firstFeature + '\nTest prompt: ' + planData.testPrompt + '\n\nCurrent agent code (first 3000 chars):\n```\n' + currentCode.slice(0, 3000) + '\n```\n\nGenerate the COMPLETE new worker.ts that makes this agent become what the captain needs. Keep it under 400 lines. Use inline HTML. Include the landing page, the chat endpoint, and any specialized endpoints for the first feature.\n\nOutput the complete TypeScript code only. No explanation.';

  const newCode = await llm(mutatePrompt, key, 'You are a code evolution specialist. Output complete TypeScript Cloudflare Worker code only. No markdown, no explanation.');

  // Step 4: Save plan to KV
  const state = {
    intent,
    plan: planData,
    generation: 0,
    phase: 'bootcamp',
    mutations: [],
    timestamp: Date.now(),
  };
  await env.BECOME_KV.put('state', JSON.stringify(state));

  return { plan: planData, codeLength: newCode.length, nextStep: 'Review the mutation, then POST /api/apply to commit it' };
}

// ── Phase 2: Apply — commit the mutation ────────────────────

async function applyMutation(env: Env): Promise<any> {
  const key = env.DEEPSEEK_API_KEY;
  const token = env.GITHUB_TOKEN;
  const stateRaw = await env.BECOME_KV.get('state');
  if (!stateRaw) return { error: 'No bootcamp in progress. POST /api/become first.' };
  const state = JSON.parse(stateRaw);

  // Read current code, propose mutation, test, commit
  let currentCode = '';
  let currentSha = '';
  try {
    const file = await ghGet('/repos/Lucineer/become-ai/contents/src/worker.ts', token);
    currentCode = atob(file.content);
    currentSha = file.sha;
  } catch (e) {
    return { error: 'Could not read worker.ts' };
  }

  const mutatePrompt = 'You are a git-agent evolving itself. Captain intent: ' + state.intent + '\nCurrent milestone: ' + (state.plan.milestones[Math.min(state.generation, state.plan.milestones.length - 1)] || 'polish') + '\nTest prompt: ' + state.plan.testPrompt + '\n\nCurrent code (first 3000 chars):\n```\n' + currentCode.slice(0, 3000) + '\n```\n\nImprove this agent. Output the complete new worker.ts. Keep it under 400 lines. Output code only.';

  const newCode = await llm(mutatePrompt, key, 'Output complete TypeScript Cloudflare Worker code only. No markdown.');

  // Score before/after with test prompt
  const beforeScore = await score(currentCode, state.plan.testPrompt, key);
  const afterScore = await score(newCode, state.plan.testPrompt, key);

  state.generation++;
  const mutation = {
    generation: state.generation,
    beforeScore,
    afterScore,
    improved: afterScore > beforeScore,
    timestamp: Date.now(),
  };
  state.mutations.push(mutation);
  await env.BECOME_KV.put('state', JSON.stringify(state));

  if (afterScore >= beforeScore && token) {
    try {
      const branchName = 'become-gen-' + state.generation;
      const mainRef = await ghGet('/repos/Lucineer/become-ai/git/ref/heads/master', token);
      await ghPost('/repos/Lucineer/become-ai/git/refs', token, { ref: 'refs/heads/' + branchName, sha: mainRef.object.sha });
      await ghPut('/repos/Lucineer/become-ai/contents/src/worker.ts', token, {
        message: 'become: gen ' + state.generation + ' (' + state.intent.slice(0, 40) + ')\n\nScore: ' + beforeScore + ' -> ' + afterScore + '\n\nSuperinstance & Lucineer (DiGennaro et al.)',
        content: btoa(newCode),
        sha: currentSha,
        branch: branchName,
      });
      const pr = await ghPost('/repos/Lucineer/become-ai/pulls', token, {
        title: 'Become gen ' + state.generation + ': ' + (afterScore > beforeScore ? '+' : '=') + (afterScore - beforeScore),
        body: 'Captain intent: ' + state.intent + '\nScore: ' + beforeScore + ' -> ' + afterScore,
        head: branchName,
        base: 'master',
      });
      mutation.pr = pr.html_url;
      await env.BECOME_KV.put('state', JSON.stringify(state));
    } catch (e: any) {
      mutation.error = e.message;
      await env.BECOME_KV.put('state', JSON.stringify(state));
    }
  }

  return mutation;
}

async function score(code: string, testPrompt: string, key: string): Promise<number> {
  const evalPrompt = 'Agent code (first 2000 chars):\n```\n' + code.slice(0, 2000) + '\n```\n\nTest: "' + testPrompt + '"\n\nRate how well this agent handles the test. Score 1-10. Last line: "SCORE: N"';
  const raw = await llm(evalPrompt, key, 'Score 1-10. Last line must be "SCORE: N".');
  const m = raw.match(/SCORE:\s*(\d+)/);
  return m ? parseInt(m[1]) : 5;
}

// ── Endpoints ────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/health') return json({ status: 'ok', repo: 'become-ai', timestamp: Date.now() });
    if (path === '/vessel.json') return json({
      name: 'become-ai', displayName: 'Become', type: 'cocapn-vessel',
      category: 'infrastructure',
      description: 'A git-agent that becomes whatever you need. Captain-to-cocapn: your instructions flow into the agent self-evolution.',
      capabilities: ['self-evolution', 'bootcamp', 'captain-to-cocapn', 'intent-to-agent'],
      deployment: { url: 'https://become-ai.casey-digennaro.workers.dev' },
    });

    // Start bootcamp — captain gives intent
    if (path === '/api/become' && request.method === 'POST') {
      const { intent } = await request.json();
      if (!intent) return json({ error: 'Provide intent: what should this agent become?' }, 400);
      return json(await startBootcamp(intent, env));
    }

    // Apply one evolution step
    if (path === '/api/apply' && request.method === 'POST') {
      return json(await applyMutation(env));
    }

    // Run N steps overnight
    if (path === '/api/overnight' && request.method === 'POST') {
      const { steps } = await request.json();
      const n = Math.min(steps || 5, 20);
      const results = [];
      for (let i = 0; i < n; i++) {
        results.push(await applyMutation(env));
      }
      return json({ completed: results.length, results });
    }

    // Current state
    if (path === '/api/state') {
      const raw = await env.BECOME_KV.get('state');
      return json({ state: raw ? JSON.parse(raw) : null });
    }

    // Chat with current agent
    if (path === '/api/chat' && request.method === 'POST') {
      const { message } = await request.json();
      const key = env.DEEPSEEK_API_KEY;
      if (!key) return json({ error: 'No API key' }, 500);
      const stateRaw = await env.BECOME_KV.get('state');
      const intent = stateRaw ? JSON.parse(stateRaw).intent : 'a helpful assistant';
      const reply = await llm(message, key, 'You are an agent that is becoming: ' + intent + '. You are evolving yourself into this application. Be helpful and mention your evolution when relevant.');
      return json({ reply });
    }

    // Landing page
    return new Response(
      '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Become — The Agent That Becomes</title>'
      + '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">'
      + '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Inter,system-ui,sans-serif;background:#0a0a0f;color:#e2e8f0;min-height:100vh}a{color:#a855f7;text-decoration:none}'
      + '.hero{max-width:800px;margin:0 auto;padding:80px 24px 40px;text-align:center}.logo{font-size:64px;margin-bottom:16px}'
      + 'h1{font-size:clamp(2rem,5vw,3rem);font-weight:700;background:linear-gradient(135deg,#a855f7,#7c3aed);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:12px}'
      + '.tagline{font-size:1.15rem;color:#94a3b8;max-width:550px;margin:0 auto 48px;line-height:1.6}'
      + '.concept{background:#111118;border:1px solid #1e1e2e;border-radius:12px;padding:24px;max-width:600px;margin:0 auto 40px;text-align:left}'
      + '.concept h3{color:#a855f7;margin-bottom:12px;font-size:1rem}.concept p{color:#cbd5e1;line-height:1.7;margin-bottom:12px}'
      + '.concept strong{color:#e2e8f0}'
      + '.api{background:#0d0d14;border:1px solid #1e1e2e;border-radius:8px;padding:16px;max-width:600px;margin:0 auto 40px;text-align:left;font-family:monospace;font-size:.85rem;color:#94a3b8;line-height:1.8;white-space:pre-wrap}'
      + '.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;max-width:700px;margin:0 auto;padding:0 24px 60px}'
      + '.feat{background:#111118;border:1px solid #1e1e2e;border-radius:12px;padding:20px}.feat:hover{border-color:#a855f744}'
      + '.feat-icon{color:#a855f7;font-size:1.2rem;margin-bottom:8px}.feat-text{font-size:.9rem;color:#cbd5e1}'
      + '.fleet{text-align:center;padding:40px 24px;color:#475569;font-size:.8rem}.fleet a{color:#64748b;margin:0 8px}</style></head>'
      + '<body><div class="hero"><div class="logo">&#x1F52E;</div><h1>Become</h1>'
      + '<p class="tagline">A git-agent that becomes whatever you need. Not an app builder — an agent that iterates itself into the application. Captain-to-cocapn.</p></div>'
      + '<div class="concept"><h3>The Concept</h3>'
      + '<p><strong>Traditional:</strong> You describe an app. A coding agent builds it as a separate project.</p>'
      + '<p><strong>Become:</strong> You describe what you need. The agent iterates <em>itself</em> into that application. Each generation adds a feature or drops one. The agent IS the repo at every step.</p>'
      + '<p><strong>Captain-to-cocapn:</strong> Your instructions flow directly into the agent\'s self-evolution. No separate build step. No handoff. The agent reads its own code, proposes changes, tests them, and commits.</p>'
      + '<p><strong>Overnight mode:</strong> "Work on making round villager agents." Wake up to 20 iterations, review summaries, vibe-code modifications, keep moving.</p>'
      + '</div>'
      + '<div class="api">POST /api/become\n{"intent": "an IDE with syntax highlighting"}\n\nPOST /api/apply\n→ runs one evolution step\n\nPOST /api/overnight\n{"steps": 10}\n→ runs N steps (for overnight work)\n\nGET /api/state\n→ current bootcamp progress</div>'
      + '<div class="features">'
      + '<div class="feat"><div class="feat-icon">&#x1F52E;</div><div class="feat-text">Self-becoming</div></div>'
      + '<div class="feat"><div class="feat-icon">&#x2696;</div><div class="feat-text">Captain-to-cocapn</div></div>'
      + '<div class="feat"><div class="feat-icon">&#x1F319;</div><div class="feat-text">Overnight iteration</div></div>'
      + '<div class="feat"><div class="feat-icon">&#x1F4BB;</div><div class="feat-text">Archetype bootstrapping</div></div>'
      + '<div class="feat"><div class="feat-icon">&#x1F504;</div><div class="feat-text">Branch-based A/B</div></div>'
      + '<div class="feat"><div class="feat-icon">&#x2693;</div><div class="feat-text">Fleet equipment</div></div>'
      + '</div>'
      + '<div class="fleet"><a href="https://the-fleet.casey-digennaro.workers.dev">&#x2693; The Fleet</a> &middot; <a href="https://cocapn.ai">Cocapn</a> &middot; <a href="https://github.com/Lucineer/become-ai">GitHub</a></div>'
      + '</body></html>',
      { headers: { 'Content-Type': 'text/html', 'Content-Security-Policy': CSP;charset=utf-8' } },
      'X-Frame-Options': 'DENY',
    );
  },
};
