# BlueRocket Systems — Portfolio

Single-page personal portfolio for **Kim Ysrael Abana**, CEO & Founder of BlueRocket Systems. Niche: **GHL (GoHighLevel) automation** for coaches, agencies, and businesses.

## Stack & how to run

- Single static `index.html` + Tailwind via CDN + `assets/style.css` + `assets/script.js`
- No build step. No framework.
- Open directly: `open index.html` (works via `file://`)
- Or serve locally: `python3 -m http.server 4173 --bind 127.0.0.1` → http://127.0.0.1:4173

After edits, just reopen — no rebuild. Browsers cache `file://` aggressively; use `Cmd+Shift+R` to hard-refresh.

**Motion library** is dynamic-imported in `script.js` from `https://cdn.jsdelivr.net/npm/motion@11/+esm` and used to upgrade `.reveal` entrances to spring physics. A CSS `IntersectionObserver` baseline runs first so reveals still fire if the CDN is blocked or slow. Do not switch `script.js` to `<script type="module">` — module scripts CORS-fail on `file://` in Chromium browsers.

**GSAP** source is cloned at `../GSAP` for reference but is NOT wired into the page. A scrubbed-flow ScrollTrigger experiment was tried and rolled back.

**Motion source** is cloned at `../motion` for reference; the page consumes Motion from the CDN, not the local clone.

## Brand tokens

Defined in the inline `tailwind.config` in `index.html` and as CSS variables in `assets/style.css`:

| Token            | Hex        | Role                            |
| ---------------- | ---------- | ------------------------------- |
| `br-blue-500/600`| `#0F8BFF`  | Primary electric blue           |
| `br-blue-700`    | `#0070D9`  | Hover / darker primary          |
| `br-blue-900`    | `#0A1028`  | Dark navy (backgrounds, ink)    |
| `br-accent-500`  | `#1A1DFF`  | Deep royal / indigo accent      |
| `br-accent-400`  | `#3F42FF`  | Lighter accent for hover/glows  |
| `br-ink`         | `#111111`  | Body text default               |

Fonts (Google Fonts): **Inter** for body, **Manrope** for display headlines. FontAwesome 6 via cdnjs.

## Section map (top → bottom)

1. **Sticky header** — logo + nav + WhatsApp/audit CTAs
2. **Hero v2** (`.hero-v2`, dark cinematic split layout — full-height stage)
   - Left: status pill ("Automation Systems Architect · Available for builds"), H1 ("Built to Scale / Businesses With / **Automation**" — no trailing period, accent word is solid white + halo glow, NOT `background-clip:text` gradient), sub paragraph, two CTAs (white "Build My System" + glass "WhatsApp Kim"), micro proof row (4 gradient dots + "8 years building systems…")
   - Right: `.hero-stage` containing portrait (`profile-suit.png`, dominant scale, asymmetric cyan-left/navy-right rim), one consolidated radial blue glow behind portrait, decorative orbit rings, ground bleed, and 4 floating glass cards: identity badge (KA avatar), pipeline mini-stats with sparkline, "New lead captured" notif, "14 workflows live" status. The 5th chip card was removed — don't reintroduce.
3. **Trust band** (dark navy) — 4 glass cards: 8 Years on the Frontline · GHL & CRM Builds · Shipped with Claude Code · Back-Office That Holds
4. **Problems** (dark navy) — 4 numbered storytelling cards with animated scenes (funnel + falling users, orbiting messages, chaos sparks, synthesis collage)
5. **Method** (`bg-br-blue-50`) — 3 cards: Capture / Nurture / Convert
6. **Flow diagram** (`bg-br-blue-50`) — vertical workflow + branching SVG; cards highlight in a continuous wave via `--step` variable
7. **Comparison** — With BlueRocket vs The old way (5 items each)
8. **How we work** — 3-step process: Strategy call → Build phase → Go live & hand off
9. **Stack marquee** — auto-scrolling tool chips, pauses on hover and off-screen
10. **Services** — 6-card grid (CRM & Pipelines, Funnels, Websites, Workflow Automations, AI Agents, Fractional Ops). No prices, no bottom CTA row — cards end clean at their bullet list. (`.service-foot` CSS still defined in `style.css` if you ever want to bring it back.)
11. **Testimonial** — Optimist Neuro Psychological Testing Center
12. **Audit form** — submission swaps button to "Got it" then resets (placeholder handler in script.js)
13. **Footer** — contact (`ysrael.digitalservices@gmail.com`, WhatsApp), socials

## Asset files

- `assets/profile-suit.png` — **current hero portrait** (suit, transparent bg, used by `.hero-portrait img` with asymmetric cyan-left rim + navy-right shadow + ground bleed)
- `assets/profile.jpg` / `assets/profile.png` — older portrait sources, kept on disk but not referenced by the page
- `assets/logo.png` — BlueRocket Systems wordmark
- `assets/claude-code.png` — Claude Code mascot, background removed via `rembg`
- `assets/optimist-logo.jpg` — testimonial company logo

## Editing conventions

- **Reveal animation:** add `class="reveal"` + `data-reveal="up"` (or `"left" / "right"`) + optional `data-reveal-delay="120"` (ms). IntersectionObserver baseline in `script.js` toggles `is-in`; Motion (when loaded) upgrades the entrance to a spring via `inView` + `animate(el, target, { type: 'spring', stiffness: 85, damping: 18 })`. The `.motion-on` class on `<html>` disables the CSS transition once Motion takes over.
- **Card chrome:** generic cards use `.service-card`, `.method-card`, `.trust-card`, `.problem-card`, `.flow-card`. Each has its own hover state. Don't invent a new card class without checking these first.
- **Section eyebrow labels:** small uppercase chip or inline span. Two patterns exist; mirror whichever the neighbor section uses.
- **Tokens first:** edit colors/spacing in the Tailwind config (`index.html` head) or the `:root` variables (`style.css` top), not on individual selectors.
- **JS verify:** after non-trivial edits to `script.js`, run `node -e "new Function(require('fs').readFileSync('assets/script.js','utf8'))"` to confirm it parses.

## Things Kim has explicitly NOT wanted

- **No location reference on the public site** — "Tanza" / "Cavite" must not appear in public copy. The vault note keeps it; the rendered HTML does not.
- **No unverifiable trust claims** — earlier the trust pill said "100+ systems shipped"; that was replaced with "GHL automation specialist · For coaches, agencies & businesses". Don't reintroduce unbacked metrics.
- **No prices or "Get a quote" on service cards** — the bottom row was removed entirely. Cards end at the bullet list, no trailing CTA / arrow.
- **Original copy only** — write in Kim's voice; don't reuse copy verbatim from reference sites. When given competitor screenshots as references, the structure/pattern is fair game but the words are not.
- **Don't rebuild what's working** — Kim has iterated heavily on the hero (photo position, signature placement, headline). When asked for changes, make the smallest surgical edit; don't refactor adjacent sections.
- **Frontend-design pass was rejected** — the Outfit-font / JetBrains-Mono / bracket-eyebrow / hero-status-badge / registration-mark direction was tried and rolled back. Don't propose it again. Inter + Manrope stays.
- **GSAP scrubbed-flow ScrollTrigger was rejected** — converting the `.flow-step` infinite CSS wave to scroll-scrubbed pinning was tried and rolled back. The original CSS infinite wave stays. GSAP source is on disk but not wired in.
- **No fabricated testimonial metrics.** When asked to add `+43% booked consultations` / `70% follow-up reduction`-style numbers without source, refuse and ask for real Optimist (or other client) figures.
- **No `background-clip: text` gradient on headlines.** The hero accent word "Automation" was gradient-text once; replaced with solid white + halo glow `::after`. Emphasis via weight/size/glow, not gradient text.
- **No trailing period on the hero H1.** At large `clamp()` H1 sizes the `.` wraps to its own line and reads as a stray dot. Keep the headline punctuation-free.

## Things Kim likes

- WhatsApp CTAs everywhere (orange button, FA whatsapp icon, links to `#contact`)
- Continuous subtle motion (shimmer sweeps, marquee, orbiting icons, pulsing dots) — but bounded; nothing that strobes
- Founder-led, personal tone ("I build…", "Hi I'm Kim…") — not corporate "we"
- The 8-years-experience credential is part of his core positioning; it lives both in the hero intro paragraph and in the trust band

## Vault link

Long-term notes & history: `/Users/kimysraelabana/Desktop/Claude Code/Obisdian/Vault/BlueRocket Systems.md`

## Common one-off commands

```bash
# Re-cut a portrait's background to transparent PNG
python3 -c "from rembg import remove; open('assets/profile.png','wb').write(remove(open('Profile.jpg','rb').read()))"

# Quick syntax check on script.js
node -e "new Function(require('fs').readFileSync('assets/script.js','utf8'))"

# Stop the dev server if it was started in background
lsof -ti:4173 | xargs kill
```

## Session log

### 2026-05-26 — Initial build + comprehensive iteration

- Built the full single-page portfolio from scratch (header, hero, trust band, problems, method, flow diagram, comparison, how-we-work, stack marquee, services, testimonial, audit form, footer)
- Hero went through many iterations: portrait sizing, head-to-headline alignment, signature card placement, copy rewrites tailored to the GHL coaches/agencies/businesses niche
- Replaced placeholder testimonial with Optimist Neuro Psychological Testing Center (real client logo + quote + stat chips)
- Switched public email to `ysrael.digitalservices@gmail.com`
- Trialed a full frontend-design upgrade (Outfit fonts + mono eyebrow brackets + hero status badge + registration-mark dividers + grain overlay) and rolled it all back — captured in "Things Kim has explicitly NOT wanted" above
- Created this `CLAUDE.md`

Session note: `Sessions/2026-05-26-2014-bluerocket-portfolio-build.md` in the Obsidian vault.

### 2026-05-27 — Service cards cleanup

- Removed the bottom `service-foot` row from all 6 service cards. No more "Get a quote" placeholder; cards now end at their bullet list. CSS class `.service-foot` left in `style.css` as dormant utility.

Session note: `Sessions/2026-05-27-0016-services-cleanup.md` in the Obsidian vault.

### 2026-05-28 — Motion library + cinematic hero refinement + service copy

- Cloned Motion (`../motion`) and GSAP (`../GSAP`) source repos as portfolio siblings.
- Wired Motion into `script.js` via dynamic `import()` from jsdelivr ESM. `.reveal` entrances now spring-physics (`stiffness: 85, damping: 18`) when Motion loads; CSS `IntersectionObserver` baseline runs first as fallback. `<html>.motion-on` disables CSS transition when Motion takes over.
- Tried a GSAP ScrollTrigger scrubbed wave on `#flow` — Kim rolled it back. Captured in "explicitly NOT wanted".
- Hero v2 cinematic refinement: dropped one floating card (5 → 4), consolidated double-radial glow into one dominant blue ellipse, killed gradient text on "Automation" (replaced with solid white + halo `::after`), tightened padding (`py-28` → `py-14 lg:py-16`), shifted grid `1fr/1.05fr` → `0.95fr/1.15fr`, bumped portrait scale + asymmetric rim (cyan left spill, navy right shadow), wider cyan ground bleed.
- Elite typography: hero H1 → `clamp(2.75rem, 8vw, 7rem)` / `lh 0.9` / `tracking -0.05em`. Site-wide tighter tracking on Manrope h1/h2/h3 (`-0.045em / -0.035em / -0.03em`).
- Atmospheric depth across all `bg-br-blue-900` sections (hero, trust band, problems, results, footer): top+bottom radial blue glow + SVG film grain via `::after` with `mix-blend-mode: overlay` at 5% opacity.
- Floating cards realism: 6-layer box-shadow stack, inner top-edge gloss `::before`, hover deepens shadow + brightens cyan halo. Hero CTAs got outer glow halo on hover.
- Rewrote 6 service card descriptions in operational founder voice (`I`, not `we`); kept names + bullets.
- Removed trailing `.` after "Automation" in H1 — at large clamp() sizes it was wrapping to its own line as a stray dot ("white square" that Kim screenshotted).
- Held testimonial metrics pass pending real Optimist numbers.

Session note: `Sessions/2026-05-28-0120-portfolio-motion-cinematic-hero.md` in the Obsidian vault.
