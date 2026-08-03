# Design direction: Kush Vyas portfolio, revision two

## Design read

This is a light, editorial developer portfolio for hiring teams and collaborators. It should feel like a carefully art-directed creative-developer site with the technical substance of an experienced Java backend engineer. The page is an evidence-led narrative, not a product catalogue.

The dominant reference is Lannino: bright canvas, large controlled type, compact navigation, irregular image choreography, and calm moments between animated sequences. Made With GSAP informs the interactions: masked type entrances, image tile fan-outs, project-row image swaps, and gentle drag response. The supplied Nexus, Botanist, and Package Tracking briefs inform quality of spatial composition and motion transitions, not their dark theme, serif choices, or onboarding layouts.

### Design dials

- Visual variance: 8/10. One strong hero composition, then clearly different work, proof, and experience layouts.
- Motion intensity: 7/10. Polished GSAP sequences with a reason to exist, never constant spectacle.
- Information density: 3/10. Generous space around a smaller amount of substantive proof.
- Audience: recruiters and potential collaborators who need to feel both engineering depth and visual care.

## Non-negotiable corrections

- The default page is bright. Do not use a dark first screen or system-driven dark mode.
- The loader must never block the page. It appears for 900ms at most on a first visit and has a CSS fallback that always reveals content.
- Do not use product-still-life photography or generic abstract objects as project imagery.
- Use local illustrated engineering scenes: terminal-like structures, API request paths, database nodes, local audio signals, route graphs, and ledger logic. They must be visual metaphors, not fabricated product screenshots.
- Project work must show the engineering story, the stack, the source link, and a meaningful implementation focus.
- Open-source work is a visible proof section with actual named repositories and pull-request references, not a small statistic.

## Colour and type

Use a fixed light scheme. No theme switch and no automatic dark mode.

| Token | Value | Role |
| --- | --- | --- |
| `--canvas` | `#f4f4ef` | Main background |
| `--paper` | `#fbfbf8` | Raised field and loader |
| `--ink` | `#181a18` | Display and body copy |
| `--muted` | `#69706a` | Supporting copy |
| `--line` | `#d6d8d1` | Grid rules and dividers |
| `--accent` | `#a94f37` | One warm copper-red action and motion accent |
| `--accent-soft` | `#e3c3b9` | Highlight fill only |

- Primary display: self-hosted Manrope, tight, wide, and confident.
- Utility type: self-hosted DM Mono.
- No Inter, serif display, neon, purple, glass, gradients, terminal-chrome, or generic dashboard UI.

## Home page sequence

1. **First-visit loader**. A restrained sequence of mineral-colour tiles rises and settles. CSS animation guarantees it exits even if JavaScript is delayed. Reduced-motion users skip it.
2. **Light hero**. A typography-only editorial manifesto with a large left-aligned name and positioning. Use cropped, masked text, a copper field, and subtle type movement as the visual composition. Do not place a portrait, deity, character, or hero image here.
3. **Selected work sequence**. A compact pinned type-led sequence progresses through four projects. Each frame uses a huge kinetic chocolate-toned project name, concise engineering notes, stack, and source link. Do not render project images or a card grid here.
5. **Open-source field notes**. `13 authored PRs` is the headline, followed by actual Redis, Hazelcast, Apache Spark, and Appwrite references with their PR numbers and direct links.
6. **Experience as a scroll manifesto**. A terracotta vertical rule draws through a pinned two-column composition. Four proof points appear in order: building interactive systems, teaching 100+ students, backend work at Infosys Springboard, and merged upstream contributions. Capabilities follow as a compact editorial matrix.
7. **Contact**. Bright closing section with email as the only dominant action and useful profile links below.

## Project case studies

Each project page is a readable engineering case study, not a marketing landing page.

- Project name, year, one-sentence purpose, source link.
- Full-width illustrative engineering plate, related to the actual technical problem.
- Three concise blocks: what it does, engineering focus, technology.
- A `system notes` strip using factual project constraints, such as local whisper.cpp inference, JWT and RBAC, fleet-domain entities, or MySQL-backed expense tracking.

## Illustration system

Create four consistent local illustrations under `public/assets/images/projects/` with these motifs:

| Project | Illustration motif |
| --- | --- |
| Voxo | Local audio wave becoming structured timestamp segments around a microphone input node |
| JournalApp | A secure journal data flow through JWT gate, Redis cache, and MongoDB document nodes |
| TransitOps | Route graph with dispatch, driver, maintenance, and cost signals moving through a fleet map |
| Smart Spend | Expense tokens flowing through a ledger, category branches, and a MySQL store |

Style: editorial technical illustration, warm off-white ground, charcoal linework, copper-red and muted sage signal colours, slight paper grain, large simple geometry, no realistic products, no text inside the artwork, no logo, no person, no fake UI, no watermark.

## GSAP motion plan

- Use `gsap.matchMedia()` to scope desktop-only project-deck and hover choreography.
- Loader: abstract tile rise, opacity exit. CSS animation fallback ends it at 1.1 seconds.
- Hero entry: title and supporting copy rise in sequence. Desktop may include a single quiet decorative mark.
- Hero: masked words rise once, then settle. The composition may use a subtle copper field and type-scale shift only when reduced motion is off.
- Work sequence: each project crossfades with a 10px directional shift and a restrained tile wipe as its scroll segment becomes active. Its title may cycle through a restrained set of font variations only while hovered.
- Experience sequence: a vertical rule draws from top to bottom. Each proof point crossfades and shifts into a shared left-copy, right-word layout.
- Text lift: letters within selected headings, navigation items, body copy, and footer email move a few pixels upward or downward around a nearby fine-pointer cursor. One shared requestAnimationFrame loop handles every registered text group. Disable it on tablet, mobile, and reduced-motion preferences.
- Experience: line segments draw as their chapter enters view.
- Keep the native cursor visible. A small cursor aura may change to muted forest green over interactive text. Nearby letters lift smoothly but are never hidden or replaced. Do not use canvas, WebGL, or scroll listeners driving React state.
- Reduced motion presents complete content immediately and disables looping or pointer motion.
- Mobile uses a separate one-column rhythm: a compact expandable navigation, a centred type-led hero with a restrained animated tile field, project chapters with one-time entry reveals, a horizontal experience rail whose chapters open through a subtle tile wipe, and tactile press feedback. Do not attempt to simulate a desktop cursor on touch devices.

## Responsive and accessibility rules

- Use `min-height: 100dvh`, native scrolling, visible focus, and semantic navigation.
- Hero must show title, supporting copy, and a clear work action within the first viewport on desktop and mobile.
- Desktop uses a 12-column editorial grid. Mobile collapses to a one-column reading order with a visible project image per row.
- Project interactions work with keyboard focus, not only hover.
- Give images descriptive alt text. Decorative line elements are hidden from assistive technology.
- Test at 1440px, 768px, and 390px. Confirm no horizontal overflow, no layout-shifted images, and no loader persistence.

## Completion check

The revision is complete only when it visibly reads as a bright, distinctive, technical portfolio rather than a dark developer template or a product-selling site. Work, experience, and open-source proof must be easy to find, factual, and visually considered.
