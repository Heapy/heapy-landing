# The Heapy story page

`index.html`, `style.css` and `app.js` in this directory form a single static page
for GitHub Pages (serve the repository from `/docs`). No build step, no dependencies.
`komok/` is the Komok companion page (see [Komok landing](#komok-landing) below).
The production container serves these pages at https://heapy.io/ and /komok/.

## The metaphor

Komok — the personal information system — sits at the center. Every other project is
a point on one of six orbits around it, ordered by how close it is to the end-game:

1. **Everyday apps** that will become parts of Komok (kotomka, kotbusta, harmon).
2. **Kotlin foundation** — libraries Komok is made of (kotomi, kotaml, kinetica, …).
3. **Build & deliver** — kvik, the ktc-* plugins and actions, Skarb.
4. **Agent harness** — kotgent and the tools around it.
5. **Community** — Awesome Kotlin, kotbot.
6. **Operations** — kodkod.

Lines between points are *flows*: libraries feed Komok, kvik builds, ktc-* and Skarb
deliver, kotgent builds everything, kodkod runs it. As the reader scrolls, the chapter
under the reading line lights its orbit; the "How it connects" chapter lights every
flow at once; "What's next" lights the hollow points — projects not public yet.

The orbits turn slowly, each at its own pace and some in the opposite direction
(`period` in seconds and `dir` on each entry of `LAYERS` in `app.js`), and ease to a
halt while the pointer is over the map or a project is hovered, so points stay where
you aim. Komok's name shows only when its core is hovered.
Hovering a point on the map or an item in a list highlights it and its
neighbours. Clicking a point opens the repository in a new tab — except Komok, which
opens its own landing at `komok/index.html` in the same tab. Users with `prefers-reduced-motion`
get a static drawing; the lists carry the same information for screen readers and
no-canvas browsers.

## Adding a project

Everything is derived from the `PROJECTS` array at the top of `app.js`. Append an entry:

```js
{
  id: "my-lib",                 // unique, used in flows and hover matching
  name: "my-lib",               // label on the map and in lists
  repo: "my-lib",               // GitHub repository under Heapy/, or null if not public
  // url: "my-lib/index.html",  // optional: open this page (relative, inside the site) instead of the repo
  layer: "libraries",           // one of LAYERS[].id, or "center"
  status: "in-development",     // "released" | "in-development" | "soon"
  why: "One sentence from the README, not an invention.",
  flows: [{ to: "komok", kind: "feeds" }], // kind: feeds | builds | delivers | runs | uses
  // members: ["repo-a", "repo-b"], // optional: collapse several repositories into one point
}
```

The point appears on its orbit, in the chapter whose `data-projects` matches the layer,
in the "Soon in Heapy" list when `status` is `"soon"`, and in the repository count.
Add a new orbit by appending to `LAYERS` and adding a `<section data-layer="…">` with
a matching `<div data-projects="…">` to `index.html`.

Keep descriptions consistent with the [full project directory](https://github.com/Heapy/.github/blob/main/docs/projects.md).

## Komok landing

`komok/` is a hand-designed, night-themed companion page for the Komok prototype, not a
mirror of its generated landing. The product copy follows `Heapy/komok/docs/landing.md`;
the screenshots in `komok/assets/` are the prototype captures. The story uses a quiet
time rail to move through a day, illuminated screenshot frames with small callouts, and
a constellation sketch to show how one trip connects dates, places, people, notes,
photos and sources. The palette echoes Komok's amber point on the Heapy map.

To add a chapter, give its section an `id` and `data-moment`, then add a matching anchor
to the `.time-rail` list in `index.html`. The rail updates its active point while scrolling.
Screenshot notes use percentage coordinates in `.hotspot`'s `--x` and `--y` custom
properties; keep the accompanying `.annotation-list` so the same details remain readable
without hover or JavaScript. Keep the main claims and product copy aligned with
`komok/docs/landing.md`, and retain the canonical URL and Heapy ecosystem links when
editing the landing. All assets and styles are local; there are no external fonts or
runtime dependencies.
