/* Heapy story: an ecosystem of Kotlin projects in orbit around Komok.
 *
 * Data first, rendering second. To add a project, append an entry to PROJECTS
 * (see STORY.md). Everything else — orbits, lists, links, flows — is derived.
 */

"use strict";

const GITHUB = "https://github.com/Heapy/";

/* Orbits, from the center outwards. `id` matches PROJECTS[].layer and the
 * `data-layer` attribute of story sections in index.html. `period` is the
 * seconds one revolution takes and `dir` its direction; the values are
 * deliberately unrelated so the orbits never look like one rotating disc. */
const LAYERS = [
  { id: "everyday", name: "Everyday apps", hue: 28, orbit: 1, radius: 0.2, period: 70, dir: 1 },
  { id: "libraries", name: "Kotlin foundation", hue: 160, orbit: 2, radius: 0.47, period: 260, dir: -1 },
  { id: "toolchain", name: "Build & deliver", hue: 205, orbit: 3, radius: 0.63, period: 130, dir: 1 },
  { id: "harness", name: "Agent harness", hue: 265, orbit: 4, radius: 0.78, period: 420, dir: 1 },
  { id: "community", name: "Community", hue: 340, orbit: 5, radius: 0.9, period: 190, dir: -1 },
  { id: "operations", name: "Operations", hue: 50, orbit: 6, radius: 1, period: 600, dir: 1 },
];

/* status: "released" | "in-development" | "soon".
 * repo:   GitHub repository name under Heapy/, or null when not public yet.
 * url:    optional page to open instead of the repository — a relative path
 *         inside this site (e.g. "komok/"). The repository stays as a
 *         secondary link.
 * flows:  edges drawn on the map. Each edge is { to, kind } where `to` is a
 *         project id and `kind` is one of feeds | builds | delivers | runs | uses. */
const PROJECTS = [
  {
    id: "komok",
    name: "Komok",
    repo: "komok",
    url: "komok/index.html", // its own landing, a sub-page of this site; see STORY.md
    layer: "center",
    status: "in-development",
    why: "A personal information system for plans, knowledge and memories: tasks, notes, photos, places, mail, messages and media in one connected model, organised with the help of local and hosted language models.",
    flows: [],
  },

  /* Everyday apps — the first inhabitants of Komok. */
  {
    id: "kotomka",
    name: "kotomka",
    repo: "kotomka",
    layer: "everyday",
    status: "released",
    why: "Turns video URLs into readable summaries and notes with key frames, timestamps, transcripts and PDF export.",
    flows: [
      { to: "komok", kind: "feeds" },
      { to: "awesome-kotlin", kind: "feeds" },
    ],
  },
  {
    id: "kotbusta",
    name: "kotbusta",
    repo: "kotbusta",
    layer: "everyday",
    status: "released",
    why: "Browses a personal INPX/FB2 book library, searches metadata and annotations, converts to EPUB and sends books to Kindle.",
    flows: [{ to: "komok", kind: "feeds" }],
  },
  {
    id: "harmon",
    name: "harmon",
    repo: "harmon",
    layer: "everyday",
    status: "released",
    why: "Kotlin/Native macOS monitor: groups helper processes by app and explains memory and storage pressure.",
    flows: [{ to: "komok", kind: "feeds" }],
  },

  /* Kotlin foundation — libraries Komok and the apps are made of. */
  {
    id: "kotomi",
    name: "kotomi",
    repo: "kotomi",
    layer: "libraries",
    status: "released",
    why: "Typed dependency graphs wired at compile time, with isolated test overrides and lifecycle ownership.",
    flows: [{ to: "komok", kind: "feeds" }],
  },
  {
    id: "kotaml",
    name: "kotaml",
    repo: "kotaml",
    layer: "libraries",
    status: "released",
    why: "Read and write YAML with kotlinx.serialization; a supported fork of kaml.",
    flows: [{ to: "komok", kind: "feeds" }],
  },
  {
    id: "kinetica",
    name: "kinetica",
    repo: "kinetica",
    layer: "libraries",
    status: "in-development",
    why: "Kotlin UIs as immutable node trees with browser rendering, server rendering and headless tests.",
    flows: [{ to: "komok", kind: "feeds" }],
  },
  {
    id: "kinetica-terminal",
    name: "kinetica-terminal",
    repo: "kinetica-terminal",
    layer: "libraries",
    status: "in-development",
    why: "A shared Kotlin terminal engine with browser rendering and a native macOS terminal app.",
    flows: [{ to: "kinetica", kind: "uses" }],
  },
  {
    id: "krogu-time",
    name: "krogu-time",
    repo: "krogu-time",
    layer: "libraries",
    status: "released",
    why: "The Java 25 java.time API in common Kotlin for JVM, Android and iOS.",
    flows: [{ to: "komok", kind: "feeds" }],
  },
  {
    id: "krogu-math",
    name: "krogu-math",
    repo: "krogu-math",
    layer: "libraries",
    status: "in-development",
    why: "BigInteger, BigDecimal and MathContext in common Kotlin, following the java.math contract.",
    flows: [],
  },
  {
    id: "krogu-util",
    name: "krogu-util",
    repo: null,
    layer: "libraries",
    status: "soon",
    why: "Sorted and navigable collections missing from the multiplatform standard library.",
    flows: [],
  },
  {
    id: "kotmark",
    name: "kotmark",
    repo: "kotmark",
    layer: "libraries",
    status: "in-development",
    why: "Kotlin Multiplatform port of commonmark-java for parsing and rendering CommonMark, with GFM extensions.",
    flows: [{ to: "komok", kind: "feeds" }],
  },
  {
    id: "kotdoc",
    name: "kotdoc",
    repo: "kotdoc",
    layer: "libraries",
    status: "in-development",
    why: "Native Kotlin document conversion: porting Pandoc, then calibre's MOBI and more formats.",
    flows: [{ to: "kotbusta", kind: "feeds" }],
  },
  {
    id: "icu4k",
    name: "icu4k",
    repo: "icu4k",
    layer: "libraries",
    status: "in-development",
    why: "Incremental port of ICU4J to common Kotlin: Unicode algorithms without the JVM.",
    flows: [],
  },
  {
    id: "kwasm",
    name: "kwasm",
    repo: "kwasm",
    layer: "libraries",
    status: "in-development",
    why: "A WebAssembly runtime whose guest execution can suspend with Kotlin coroutines.",
    flows: [],
  },
  {
    id: "jwt-kt",
    name: "jwt-kt",
    repo: null,
    layer: "libraries",
    status: "soon",
    why: "RS256 JWT/JWS with public RSA key sets, Ktor authentication and bounded remote JWKS refresh.",
    flows: [{ to: "komok", kind: "feeds" }],
  },
  {
    id: "pombo",
    name: "pombo",
    repo: null,
    layer: "libraries",
    status: "soon",
    why: "An idiomatic Kotlin Multiplatform MTProto client for Telegram, with no TDLib or JNI runtime.",
    flows: [{ to: "komok", kind: "feeds" }],
  },

  /* Build & deliver — how the foundation is compiled, checked and shipped. */
  {
    id: "kvik",
    name: "kvik",
    repo: null,
    layer: "toolchain",
    status: "soon",
    why: "An experimental Kotlin Multiplatform build tool: plugins shipped as sources, compiled into a cached Kotlin/Native executable, lockfiles, remote compilation cache and JSON output for agents.",
    flows: [
      { to: "komok", kind: "builds" },
      { to: "kotomi", kind: "builds" },
      { to: "kinetica", kind: "builds" },
      { to: "kotmark", kind: "builds" },
    ],
  },
  {
    id: "ktc",
    name: "ktc-* plugins & actions",
    repo: "ktc-plugins",
    layer: "toolchain",
    status: "released",
    why: "Twenty plugins and GitHub Actions for the JetBrains Kotlin Toolchain: setup-ktc, ktc-check, ktc-publish, update-ktc, ktlint, ktfmt, bcv, kover, dokka, jib, kotest, sqldelight, quarkus, benchmark and more.",
    members: [
      "ktc-plugins", "setup-ktc", "setup-ktc-plugins", "setup-main-kts", "update-ktc",
      "ktc-check", "ktc-publish", "ktc-application", "ktc-bcv", "ktc-benchmark",
      "ktc-dokka", "ktc-jib", "ktc-kotest", "ktc-kover", "ktc-ktfmt", "ktc-ktlint",
      "ktc-quarkus", "ktc-spotless", "ktc-sqldelight", "ktc-to-gradle",
    ],
    flows: [
      { to: "kotaml", kind: "delivers" },
      { to: "krogu-time", kind: "delivers" },
      { to: "kotomi", kind: "delivers" },
    ],
  },
  {
    id: "skarb",
    name: "Skarb",
    repo: "skarb",
    layer: "toolchain",
    status: "in-development",
    why: "A Kotlin/Native publication server: CI uploads Maven layouts, Skarb validates the release, a human approves signing and publication.",
    flows: [
      { to: "kinetica", kind: "delivers" },
      { to: "kotmark", kind: "delivers" },
    ],
  },
  {
    id: "detekt-config",
    name: "detekt-config",
    repo: "detekt-config",
    layer: "toolchain",
    status: "released",
    why: "Shared Kotlin analysis rules for Gradle and Kotlin Toolchain builds.",
    flows: [{ to: "ktc", kind: "uses" }],
  },
  {
    id: "repo-kotlin-link",
    name: "repo.kotlin.link",
    repo: "repo.kotlin.link",
    layer: "toolchain",
    status: "released",
    why: "One Maven endpoint that proxies artifact requests to configured project repositories.",
    flows: [{ to: "skarb", kind: "uses" }],
  },

  /* Agent harness — the hands that build all of the above. */
  {
    id: "kotgent",
    name: "kotgent",
    repo: "kotgent",
    layer: "harness",
    status: "in-development",
    why: "An agentic development environment: run and supervise Claude, Codex, Junie and shell sessions; keep tasks, plans and reviews next to the code. A harness around the harness.",
    flows: [
      { to: "komok", kind: "builds" },
      { to: "kvik", kind: "builds" },
      { to: "kotomi", kind: "builds" },
      { to: "skarb", kind: "builds" },
    ],
  },
  {
    id: "kortex",
    name: "kortex",
    repo: "kortex",
    layer: "harness",
    status: "in-development",
    why: "Kotlin and JVM skills, review agents and task workflows for Junie, Codex and Claude Code.",
    flows: [{ to: "kotgent", kind: "feeds" }],
  },
  {
    id: "keemun",
    name: "keemun",
    repo: "keemun",
    layer: "harness",
    status: "in-development",
    why: "Architecture decisions, constraints, options and rationale as a graph that agents can query and update.",
    flows: [{ to: "kotgent", kind: "feeds" }],
  },
  {
    id: "kotlm",
    name: "kotlm",
    repo: "kotlm",
    layer: "harness",
    status: "in-development",
    why: "An OpenAI-compatible proxy to a Codex subscription with per-project keys, limits and metrics.",
    flows: [{ to: "kotgent", kind: "feeds" }],
  },
  {
    id: "argo-workflows-mcp",
    name: "argo-workflows-mcp",
    repo: "argo-workflows-mcp",
    layer: "harness",
    status: "released",
    why: "Lets MCP clients inspect and operate Argo workflows, templates, schedules and logs.",
    flows: [],
  },
  {
    id: "snowflake-mcp",
    name: "snowflake-mcp",
    repo: "snowflake-mcp",
    layer: "harness",
    status: "released",
    why: "Query Snowflake through MCP and manage multiple connections in a web UI.",
    flows: [],
  },

  /* Community — where the knowledge goes. */
  {
    id: "awesome-kotlin",
    name: "Awesome Kotlin",
    repo: "awesome-kotlin",
    layer: "community",
    status: "released",
    why: "The curated collection of Kotlin libraries, tools, articles and resources behind kotlin.link; an MCP server is planned.",
    flows: [{ to: "komok", kind: "feeds" }],
  },
  {
    id: "kotbot",
    name: "kotbot",
    repo: "kotbot",
    layer: "community",
    status: "released",
    why: "A Telegram Bot API library and the bot that serves the Kotlin community chats.",
    flows: [],
  },

  /* Operations — keeping it all running. */
  {
    id: "kodkod",
    name: "kodkod",
    repo: "kodkod",
    layer: "operations",
    status: "released",
    why: "Restarts unhealthy Docker containers and recreates selected ones when their image updates.",
    flows: [
      { to: "komok", kind: "runs" },
      { to: "skarb", kind: "runs" },
    ],
  },
];

const STATUS_LABEL = {
  released: "released",
  "in-development": "in development",
  soon: "soon",
};

const KIND_LABEL = {
  feeds: "feeds",
  builds: "builds",
  delivers: "delivers",
  runs: "runs",
  uses: "uses",
};

/* ------------------------------------------------------------------------ */
/* Derived data                                                             */
/* ------------------------------------------------------------------------ */

const byId = new Map(PROJECTS.map((p) => [p.id, p]));
const layerById = new Map(LAYERS.map((l) => [l.id, l]));

const EDGES = [];
for (const p of PROJECTS) {
  for (const f of p.flows) {
    if (!byId.has(f.to)) continue;
    EDGES.push({ from: p.id, to: f.to, kind: f.kind });
  }
}

/* Where a project opens. `url` (relative, inside this site) wins over the
 * GitHub repository; same-site pages open in the same tab. */
function repoUrl(p) {
  return p.url || (p.repo ? GITHUB + p.repo : null);
}

function isExternal(url) {
  return /^https?:\/\//.test(url);
}

function linkAttrs(url) {
  return isExternal(url) ? { href: url, target: "_blank", rel: "noopener" } : { href: url };
}

function layerColor(layerId, alpha, light) {
  if (layerId === "center") return `hsla(40, 90%, ${light ?? 72}%, ${alpha})`;
  const l = layerById.get(layerId);
  return `hsla(${l.hue}, 60%, ${light ?? 70}%, ${alpha})`;
}

/* ------------------------------------------------------------------------ */
/* Lists in the story sections                                              */
/* ------------------------------------------------------------------------ */

function el(tag, attrs, ...children) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null) continue;
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else n.setAttribute(k, v);
  }
  for (const c of children) if (c != null) n.append(c);
  return n;
}

function renderProjectItem(p) {
  const url = repoUrl(p);
  const title = url
    ? el("a", { ...linkAttrs(url), text: p.name })
    : el("span", { text: p.name });
  const head = el(
    "div",
    { class: "project-head" },
    el("span", { class: "project-name" }, title),
    el("span", { class: `status status-${p.status}`, text: STATUS_LABEL[p.status] }),
    p.url && p.repo ? el("a", { class: "project-repo", href: GITHUB + p.repo, target: "_blank", rel: "noopener", text: "GitHub" }) : null
  );
  const item = el(
    "li",
    { class: "project", "data-project": p.id, style: `--hue:${p.layer === "center" ? 40 : layerById.get(p.layer).hue}` },
    head,
    el("p", { class: "project-why", text: p.why })
  );
  if (p.members) {
    const list = el("details", { class: "members" }, el("summary", { text: `${p.members.length} repositories` }));
    const ul = el("ul");
    for (const m of p.members) {
      ul.append(el("li", {}, el("a", { href: GITHUB + m, target: "_blank", rel: "noopener", text: m })));
    }
    list.append(ul);
    item.append(list);
  }
  const out = EDGES.filter((e) => e.from === p.id);
  if (out.length) {
    const flow = el("p", { class: "project-flow" });
    const byKind = new Map();
    for (const e of out) {
      if (!byKind.has(e.kind)) byKind.set(e.kind, []);
      byKind.get(e.kind).push(byId.get(e.to).name);
    }
    let first = true;
    for (const [kind, names] of byKind) {
      if (!first) flow.append(" · ");
      first = false;
      flow.append(el("span", { class: "flow-kind", text: KIND_LABEL[kind] }), " ", el("span", { class: "flow-to", text: names.join(", ") }));
    }
    item.append(flow);
  }
  item.addEventListener("mouseenter", () => setHover(p.id));
  item.addEventListener("mouseleave", () => setHover(null));
  item.addEventListener("focusin", () => setHover(p.id));
  item.addEventListener("focusout", () => setHover(null));
  return item;
}

function renderLists() {
  for (const target of document.querySelectorAll("[data-projects]")) {
    const layerId = target.getAttribute("data-projects");
    const ul = el("ul", { class: "projects" });
    for (const p of PROJECTS) if (p.layer === layerId) ul.append(renderProjectItem(p));
    target.replaceChildren(ul);
  }
  const soon = document.querySelector("[data-soon]");
  if (soon) {
    const ul = el("ul", { class: "projects projects-soon" });
    for (const p of PROJECTS) if (p.status === "soon") ul.append(renderProjectItem(p));
    soon.replaceChildren(ul);
  }
  const count = document.querySelector("[data-count]");
  if (count) {
    const repos = PROJECTS.reduce((n, p) => n + (p.members ? p.members.length : p.repo ? 1 : 0), 0);
    count.textContent = String(repos);
  }
}

/* ------------------------------------------------------------------------ */
/* The map                                                                  */
/* ------------------------------------------------------------------------ */

const canvas = document.getElementById("map");
const tooltip = document.getElementById("tooltip");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const state = {
  active: "komok", // "komok" | layer id | "all" | "next"
  hover: null,
  pointerOver: false, // pointer is above the map
  motion: 1, // 0..1, how much the orbits are turning right now
  rot: new Map(), // layer id -> current rotation in radians
  width: 0,
  height: 0,
  dpr: 1,
  t: 0,
  nodes: new Map(), // id -> {x, y, r, a0, a, R, i}
  particles: [],
};

/* Orbits turn slowly, each at its own pace and direction (LAYERS[].period,
 * LAYERS[].dir), and ease to a halt while the pointer is over the map or a
 * project is hovered, so points stay where you aim. Radians per millisecond. */
function orbitSpeed(layer) {
  return (layer.dir * Math.PI * 2) / (layer.period * 1000);
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = rect.width;
  state.height = rect.height;
  canvas.width = Math.round(rect.width * state.dpr);
  canvas.height = Math.round(rect.height * state.dpr);
  layout();
  if (reduceMotion.matches) draw();
}

function layout() {
  const w = state.width;
  const h = state.height;
  const cx = w / 2;
  const cy = h / 2;
  /* Leave room for labels drawn outside the outer orbit. */
  const margin = w >= 520 ? 60 : 16;
  const maxR = Math.max(60, Math.min(w, h) / 2 - margin);
  state.center = { x: cx, y: cy };
  state.ringRadius = (orbit) => maxR * LAYERS[orbit - 1].radius;
  state.nodes.clear();
  state.nodes.set("komok", { x: cx, y: cy, r: Math.max(7, maxR * 0.07) });
  for (const layer of LAYERS) {
    const members = PROJECTS.filter((p) => p.layer === layer.id);
    const R = state.ringRadius(layer.orbit);
    const offset = layer.orbit * 0.9 + 0.6;
    if (!state.rot.has(layer.id)) state.rot.set(layer.id, 0);
    members.forEach((p, i) => {
      state.nodes.set(p.id, {
        x: 0,
        y: 0,
        r: Math.max(3.2, maxR * 0.019),
        a0: offset + (i / members.length) * Math.PI * 2,
        a: 0,
        R,
        i,
      });
    });
  }
  place();
}

/* Resolve every point's position from its base angle plus the rotation of
 * its orbit. Called after layout and once per animation frame. */
function place() {
  const c = state.center;
  for (const p of PROJECTS) {
    if (p.id === "komok") continue;
    const n = state.nodes.get(p.id);
    n.a = n.a0 + state.rot.get(p.layer);
    n.x = c.x + Math.cos(n.a) * n.R;
    n.y = c.y + Math.sin(n.a) * n.R;
  }
}

function advance(dt) {
  const target = state.pointerOver || state.hover ? 0 : 1;
  state.motion += (target - state.motion) * Math.min(1, dt / 350);
  if (Math.abs(target - state.motion) < 0.002) state.motion = target;
  if (state.motion === 0) return;
  for (const layer of LAYERS) {
    const next = state.rot.get(layer.id) + orbitSpeed(layer) * dt * state.motion;
    state.rot.set(layer.id, ((next % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2));
  }
  place();
}

function isLit(id) {
  const p = byId.get(id);
  if (state.hover) {
    if (id === state.hover) return true;
    return EDGES.some((e) => (e.from === state.hover && e.to === id) || (e.to === state.hover && e.from === id));
  }
  if (state.active === "all") return true;
  if (state.active === "komok") return id === "komok";
  if (state.active === "next") return p.status === "soon" || id === "komok";
  return p.layer === state.active || id === "komok";
}

function edgeLit(e) {
  if (state.hover) return e.from === state.hover || e.to === state.hover;
  if (state.active === "all") return true;
  if (state.active === "komok") return false;
  if (state.active === "next") return byId.get(e.from).status === "soon";
  return byId.get(e.from).layer === state.active;
}

function edgePath(e) {
  const a = state.nodes.get(e.from);
  const b = state.nodes.get(e.to);
  /* Curve towards the center so long edges arc gracefully instead of cutting
   * straight across orbits. */
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const cx = state.center.x;
  const cy = state.center.y;
  const pull = e.to === "komok" ? 0 : 0.35;
  return { a, b, c: { x: mx + (cx - mx) * pull, y: my + (cy - my) * pull } };
}

function pointOnQuad(p, t) {
  const u = 1 - t;
  return {
    x: u * u * p.a.x + 2 * u * t * p.c.x + t * t * p.b.x,
    y: u * u * p.a.y + 2 * u * t * p.c.y + t * t * p.b.y,
  };
}

function draw() {
  const { width: w, height: h, dpr } = state;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const c = state.center;
  const showLabels = w >= 520;
  const overview = state.active === "komok";
  const everything = state.active === "all";

  /* Orbits */
  for (const layer of LAYERS) {
    const R = state.ringRadius(layer.orbit);
    const active = state.active === layer.id || everything;
    ctx.beginPath();
    ctx.arc(c.x, c.y, R, 0, Math.PI * 2);
    ctx.strokeStyle = active ? layerColor(layer.id, everything ? 0.25 : 0.42) : "rgba(255,255,255,0.07)";
    ctx.lineWidth = active ? 1.2 : 1;
    ctx.stroke();
  }

  /* Edges */
  for (const e of EDGES) {
    const lit = edgeLit(e);
    const path = edgePath(e);
    ctx.beginPath();
    ctx.moveTo(path.a.x, path.a.y);
    ctx.quadraticCurveTo(path.c.x, path.c.y, path.b.x, path.b.y);
    const from = byId.get(e.from);
    ctx.strokeStyle = lit ? layerColor(from.layer, everything && !state.hover ? 0.32 : 0.55) : "rgba(255,255,255,0.045)";
    ctx.lineWidth = lit ? 1.1 : 0.8;
    ctx.stroke();
  }

  /* Particles flowing along lit edges */
  if (!reduceMotion.matches) {
    for (const prt of state.particles) {
      const e = EDGES[prt.edge];
      if (!edgeLit(e)) continue;
      const pos = pointOnQuad(edgePath(e), prt.t);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = layerColor(byId.get(e.from).layer, 0.9, 80);
      ctx.fill();
    }
  }

  /* Nodes first, labels in a second pass so no dimmed point lands on a name. */
  const labels = [];
  for (const p of PROJECTS) {
    if (p.id === "komok") continue;
    const n = state.nodes.get(p.id);
    const lit = isLit(p.id);
    const hovered = state.hover === p.id;
    const r = n.r * (hovered ? 1.6 : 1);
    if (lit) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 2.6, 0, Math.PI * 2);
      ctx.fillStyle = layerColor(p.layer, hovered ? 0.3 : 0.14);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    if (p.status === "soon") {
      ctx.strokeStyle = lit ? layerColor(p.layer, 0.95) : "rgba(255,255,255,0.22)";
      ctx.lineWidth = 1.2;
      ctx.fillStyle = "rgba(11,12,16,1)";
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillStyle = lit ? layerColor(p.layer, 1) : "rgba(255,255,255,0.22)";
      ctx.fill();
    }
    /* Labels sit radially outside the orbit, so they never cross the flows
     * that run inwards. In the all-connections view only the hovered node
     * is labelled; the lists carry the names. */
    const labelled = hovered || (lit && !everything && (!state.hover || state.hover === p.id));
    if (showLabels && labelled) labels.push({ p, n, r, hovered });
  }
  for (const { p, n, r, hovered } of labels) {
    ctx.save();
    ctx.font = `${hovered ? 600 : 400} 11.5px ui-monospace, SFMono-Regular, Menlo, monospace`;
    const cos = Math.cos(n.a);
    const sin = Math.sin(n.a);
    /* Nodes near the top or bottom get alternating distances so neighbouring
     * labels do not sit on one line. */
    const extra = Math.abs(cos) < 0.45 && n.i % 2 ? 13 : 0;
    const d = r + 7 + extra;
    const lx = n.x + cos * d;
    const ly = n.y + sin * d;
    let align = "center";
    let baseline = "middle";
    if (Math.abs(cos) < 0.25) baseline = sin < 0 ? "bottom" : "top";
    else align = cos > 0 ? "left" : "right";
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    /* A soft backing keeps the name legible over dimmed orbits and points. */
    const tw = ctx.measureText(p.name).width;
    const bx = align === "left" ? lx - 3 : align === "right" ? lx - tw - 3 : lx - tw / 2 - 3;
    const by = baseline === "top" ? ly - 1 : baseline === "bottom" ? ly - 13 : ly - 7;
    ctx.fillStyle = "rgba(11,12,16,0.78)";
    ctx.fillRect(bx, by, tw + 6, 14);
    ctx.fillStyle = hovered ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.8)";
    ctx.fillText(p.name, lx, ly);
    ctx.restore();
  }

  /* Orbit names are drawn only in the overview, stacked at the top as a
   * legend, above the points that drift under them as the orbits turn. Once
   * a chapter is active its heading names the orbit. */
  if (showLabels && overview) {
    ctx.save();
    ctx.font = "500 11px ui-sans-serif, system-ui, sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    for (const layer of LAYERS) {
      const R = state.ringRadius(layer.orbit);
      const name = layer.name.toUpperCase();
      ctx.fillStyle = "rgba(11,12,16,0.82)";
      ctx.fillRect(c.x + 5, c.y - R - 7, ctx.measureText(name).width + 6, 14);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillText(name, c.x + 8, c.y - R);
    }
    ctx.restore();
  }

  drawCenter();
}

/* Komok at the center: a small bright core inside a wide, slowly breathing
 * halo, with the name set underneath like the orbit legend. No flat disc
 * with text on it — the point is that everything else points here. */
function drawCenter() {
  const k = state.nodes.get("komok");
  const breath = reduceMotion.matches ? 0.5 : Math.sin(state.t / 1400) * 0.5 + 0.5;
  const lit = !state.hover || state.hover === "komok" || EDGES.some((e) => e.from === state.hover && e.to === "komok");
  const strength = lit ? 1 : 0.55;

  /* Wide halo: faint, large, barely moving. */
  const haloR = k.r * (7 + breath * 0.6);
  const halo = ctx.createRadialGradient(k.x, k.y, k.r * 0.6, k.x, k.y, haloR);
  halo.addColorStop(0, `hsla(40, 90%, 70%, ${0.16 * strength})`);
  halo.addColorStop(0.35, `hsla(40, 90%, 70%, ${0.05 * strength})`);
  halo.addColorStop(1, "hsla(40, 90%, 70%, 0)");
  ctx.beginPath();
  ctx.arc(k.x, k.y, haloR, 0, Math.PI * 2);
  ctx.fillStyle = halo;
  ctx.fill();

  /* Corona: tighter and brighter, this is what reads as light. */
  const coronaR = k.r * (2.4 + breath * 0.25);
  const corona = ctx.createRadialGradient(k.x, k.y, k.r * 0.8, k.x, k.y, coronaR);
  corona.addColorStop(0, `hsla(42, 95%, 78%, ${0.55 * strength})`);
  corona.addColorStop(1, "hsla(42, 95%, 78%, 0)");
  ctx.beginPath();
  ctx.arc(k.x, k.y, coronaR, 0, Math.PI * 2);
  ctx.fillStyle = corona;
  ctx.fill();

  /* Core: lit from slightly above-left so it reads as a body, not a sticker. */
  const core = ctx.createRadialGradient(k.x - k.r * 0.3, k.y - k.r * 0.3, 0, k.x, k.y, k.r);
  core.addColorStop(0, "hsl(44, 100%, 96%)");
  core.addColorStop(0.55, "hsl(41, 95%, 80%)");
  core.addColorStop(1, "hsl(36, 85%, 62%)");
  ctx.beginPath();
  ctx.arc(k.x, k.y, k.r, 0, Math.PI * 2);
  ctx.fillStyle = core;
  ctx.globalAlpha = 0.7 + 0.3 * strength;
  ctx.fill();
  ctx.globalAlpha = 1;

  /* A hairline ring just outside the core, like the orbits in miniature. */
  ctx.beginPath();
  ctx.arc(k.x, k.y, k.r * 1.55, 0, Math.PI * 2);
  ctx.strokeStyle = `hsla(40, 90%, 80%, ${0.28 * strength})`;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  /* The name appears only on hover; the heading next to the map says it. */
  if (state.hover === "komok") {
    ctx.save();
    ctx.font = "500 11px ui-sans-serif, system-ui, sans-serif";
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0.14em";
    ctx.fillStyle = "hsla(40, 90%, 80%, 0.9)";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("KOMOK", k.x + 1, k.y + k.r * 1.55 + 7);
    ctx.restore();
  }
}

function seedParticles() {
  state.particles = EDGES.flatMap((_, i) => [
    { edge: i, t: Math.random(), speed: 0.00012 + Math.random() * 0.00012 },
    { edge: i, t: Math.random(), speed: 0.00012 + Math.random() * 0.00012 },
  ]);
}

let last = 0;
function frame(now) {
  const dt = Math.min(48, now - last || 16);
  last = now;
  state.t = now;
  for (const prt of state.particles) {
    prt.t += prt.speed * dt;
    if (prt.t > 1) prt.t -= 1;
  }
  advance(dt);
  draw();
  requestAnimationFrame(frame);
}

/* ------------------------------------------------------------------------ */
/* Interaction                                                              */
/* ------------------------------------------------------------------------ */

function setActive(id) {
  if (state.active === id) return;
  state.active = id;
  document.body.dataset.active = id;
  if (reduceMotion.matches) draw();
}

function setHover(id) {
  if (state.hover === id) return;
  state.hover = id;
  for (const li of document.querySelectorAll(".project.is-hover")) li.classList.remove("is-hover");
  if (id) {
    const li = document.querySelector(`.project[data-project="${id}"]`);
    if (li) li.classList.add("is-hover");
  }
  if (reduceMotion.matches) draw();
}

function nodeAt(x, y) {
  let best = null;
  let bestD = 18;
  for (const [id, n] of state.nodes) {
    const d = Math.hypot(n.x - x, n.y - y);
    const hit = Math.max(bestD, n.r + 8);
    if (d < hit && (best === null || d < bestD)) {
      best = id;
      bestD = d;
    }
  }
  return best;
}

function showTooltip(id, x, y) {
  const p = byId.get(id);
  tooltip.innerHTML = "";
  const url = repoUrl(p);
  tooltip.append(
    el("strong", { text: p.name }),
    el("span", { class: `status status-${p.status}`, text: STATUS_LABEL[p.status] }),
    el("p", { text: p.why }),
    url ? el("p", { class: "tooltip-hint", text: isExternal(url) ? "Click to open on GitHub" : `Click to open the ${p.name} page` }) : null
  );
  tooltip.hidden = false;
  const rect = canvas.getBoundingClientRect();
  const tw = tooltip.offsetWidth;
  const left = Math.min(Math.max(8, x + 14), rect.width - tw - 8);
  const top = y + 14 + 180 > rect.height ? y - tooltip.offsetHeight - 14 : y + 14;
  tooltip.style.transform = `translate(${left}px, ${Math.max(8, top)}px)`;
}

function hideTooltip() {
  tooltip.hidden = true;
}

canvas.addEventListener("pointerenter", (ev) => {
  if (ev.pointerType !== "touch") state.pointerOver = true;
});
canvas.addEventListener("pointermove", (ev) => {
  if (ev.pointerType !== "touch") state.pointerOver = true;
  const rect = canvas.getBoundingClientRect();
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;
  const id = nodeAt(x, y);
  canvas.style.cursor = id && repoUrl(byId.get(id)) ? "pointer" : "default";
  setHover(id);
  if (id) showTooltip(id, x, y);
  else hideTooltip();
});
canvas.addEventListener("pointerleave", () => {
  state.pointerOver = false;
  setHover(null);
  hideTooltip();
});
canvas.addEventListener("click", (ev) => {
  const rect = canvas.getBoundingClientRect();
  const id = nodeAt(ev.clientX - rect.left, ev.clientY - rect.top);
  if (!id) return;
  const url = repoUrl(byId.get(id));
  if (!url) return;
  if (isExternal(url)) window.open(url, "_blank", "noopener");
  else window.location.href = url;
});

/* The section closest to the reading line (40% down the viewport) drives the
 * map. A plain scroll listener is more predictable here than an
 * IntersectionObserver because sections differ a lot in height. */
function observeSections() {
  const sections = Array.from(document.querySelectorAll("[data-layer]"));
  let ticking = false;
  const update = () => {
    ticking = false;
    const line = window.innerHeight * 0.4;
    let best = sections[0];
    let bestD = Infinity;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      const d = r.top <= line && r.bottom >= line ? 0 : Math.min(Math.abs(r.top - line), Math.abs(r.bottom - line));
      if (d < bestD) {
        best = s;
        bestD = d;
      }
    }
    if (best) setActive(best.getAttribute("data-layer"));
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

/* ------------------------------------------------------------------------ */
/* Boot                                                                     */
/* ------------------------------------------------------------------------ */

renderLists();
resize();
seedParticles();
observeSections();
window.addEventListener("resize", resize);
reduceMotion.addEventListener?.("change", () => {
  if (reduceMotion.matches) draw();
  else requestAnimationFrame(frame);
});
if (reduceMotion.matches) draw();
else requestAnimationFrame(frame);
document.body.dataset.active = state.active;
