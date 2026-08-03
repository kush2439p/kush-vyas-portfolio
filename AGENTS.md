# Portfolio project instructions

This repository is Kush Vyas's personal developer portfolio. Treat this file and `DESIGN.md` as the persistent brief for every future change. Read both before modifying the interface, content, assets, animation, or architecture.

## Product intent

Create a memorable, calm, minimal portfolio for a balanced audience of hiring teams and potential collaborators. It should communicate backend depth, product care, and practical engineering through a refined editorial experience. The design should feel authored, spacious, and technically confident, never like a generic AI-generated developer template.

## Mandatory design workflow

- Use the `design-taste-frontend` skill for any frontend or visual decision.
- Do not use Sites, website builders, template generators, copy-pasted templates, or externally hosted design systems as the implementation source.
- Use `DESIGN.md` as the visual source of truth. The reference sites are inspiration only. Never recreate them pixel-for-pixel.
- Before a substantial UI change, state the design read and the relevant design dials in the work log or implementation notes.
- Keep the site intentionally minimal. Every section must earn its place.

## Reference roles

- `https://lannino.com/` is the primary influence: calm editorial composition, type-led hero, image rhythm, elegant loader, and purposeful pacing.
- `https://www.olivergareis.com/` is a secondary influence: restraint, whitespace, compact navigation, and case-study pacing.
- `https://www.aura.build/templates/offset-advertisin` and `https://afterglow.aura.build/` may influence selective type and transition treatment only. Do not copy their dark-neon or agency aesthetic.

## Content rules

- Use only substantiated profile information from the resume and the typed content source in `src/data/portfolio.ts`.
- Do not invent employers, clients, live URLs, performance metrics, project outcomes, awards, testimonials, or open-source contributions.
- Keep project claims specific and factual. Prefer what was built, the technical constraints, and the stack over inflated language.
- Current contact details: `kushv619@gmail.com`, `+91 7566891057`, Indore, India.
- Current profiles: GitHub `https://github.com/kush2439p`, LinkedIn `https://www.linkedin.com/in/kushvyas2439p/`, LeetCode `https://leetcode.com/u/kushv619/`.
- The selected projects are Voxo, JournalApp, TransitOps, and Smart Spend. Keep their repository links accurate.

## Technical architecture

- Use Next.js App Router with TypeScript in strict mode.
- Keep portfolio content typed and centralised in `src/data/portfolio.ts`.
- Use static, pre-rendered routes for the home page and project case studies at `/work/[slug]`.
- Use `next/image`, local project assets, meaningful metadata, `sitemap.ts`, `robots.ts`, and concise JSON-LD.
- Use direct `mailto:` contact rather than a backend contact form unless a future request explicitly authorises a service.
- Use semantic HTML and progressive enhancement. The website must remain readable without JavaScript.

## Asset policy

- Store all portfolio visual assets under `public/assets/`.
- Use original or generated visual assets that genuinely support the content. Do not use fake dashboard screenshots, placeholder gradients, or stock-photo clichés.
- Never generate a fabricated portrait or likeness of Kush without a supplied photo and explicit permission.
- Generated project art must be editorial technical illustration: local audio signals, API paths, database nodes, route graphs, and ledger logic. Use a restrained mineral palette, soft grain, no logos, no words, no watermarks, no fake UI, and no product-still-life imagery.
- The hero is typography-only. Do not use a portrait, a likeness, a deity, a Krishna image, or any other hero image unless Kush explicitly asks for it again.
- Keep optimized `.webp` project art in `public/assets/images/projects/`. Preserve source files only when useful for later regeneration.
- Keep the supplied resume at `public/assets/documents/Kush-Vyas-Resume.pdf`.
- Optimise images before shipping: suitable dimensions, modern format, descriptive names, and `next/image` sizing and priority set deliberately.

## Motion and interaction

- Motion is an editorial cue, not decoration. Use GSAP and ScrollTrigger only where motion helps hierarchy or storytelling.
- Animate only `transform` and `opacity`. Do not use scroll listeners to drive React state, scroll hijacking, excessive parallax, or a custom cursor. Keep the native cursor visible.
- The loader may appear only briefly during a first session and must not fake a progress meter.
- The home-page selected-work area is a GSAP pinned type-led sequence. Each project uses a huge chocolate-toned title and factual notes. Do not render project images or restore an image-card grid there. Project case-study routes may keep their contextual editorial technical art.
- A restrained letter-lift interaction is allowed because Kush explicitly requested it. Implement it through one shared `requestAnimationFrame` loop, keep the native cursor, and disable it for coarse pointers, tablet/mobile viewports, and reduced-motion preferences. Do not hide or replace letters.
- Apply the shared letter-lift wrapper to every visible text string on the home page and project case studies, including section labels, headings, body copy, links, footer details, and navigation. The standard interaction is motion only: the letter beneath a nearby fine-pointer cursor rises slightly while neighboring letters remain almost still. Never change text colour solely because the cursor is nearby. Keep the cursor treatment as a restrained outline, not a filled highlight.
- The KUSH wordmark uses a gentle scatter variation of the text interaction. Add a muted forest green only as a hover highlight and cursor state, never as a competing permanent accent.
- Every animated text group must preserve ordinary word wrapping. Keep each word intact, allow breaks only between words, and verify that email addresses, employer names, headings, and body copy never split individual letters across lines.
- The hero should open with a brief title and supporting-copy reveal. Decorative desktop marks must not be compressed into the mobile hero.
- Mobile is a distinct editorial sequence, not a shrunken desktop. On narrow touch screens, provide an accessible compact menu, keep the hero actions in the first viewport, sequence project chapters in with one-time GSAP reveals, present experience as an intentional horizontal swipe rail, and add clear tactile press feedback to links. The loader should be a brief abstract tile sequence, never a fake progress meter.
- Test the final site in available browser surfaces and report any browser limitation honestly. Resolve visible development errors before handoff.
- Pinned GSAP project and experience sequences must have enough scroll distance for each panel to fully exit before the next enters. Never overlap panels during fast scrolling. Use stable, unique React keys for all mapped UI.
- Support `prefers-reduced-motion` by presenting final states immediately and disabling nonessential animation.
- All interactive work items must have keyboard focus states and work without hover.

## Visual guardrails

- Do not use Inter, generic purple gradients, glowing AI motifs, oversized pill UI, or a uniform grid of boxed cards.
- Avoid unnecessary rounded containers. Use a single restrained radius scale only when it conveys grouping.
- Use the fixed light palette and single copper-red accent documented in `DESIGN.md`. Do not introduce competing accent colors or a dark-mode alternative.
- Keep hero copy to two lines or fewer, make its primary action visible without scrolling, and avoid the phrase "AI-powered" unless future evidence makes it essential.
- Do not use em dashes or en dashes in visible site copy. Use periods, commas, or regular hyphens.
- Do not add a theme toggle without a request. This portfolio intentionally uses a fixed light scheme.

## Responsiveness, access, and performance

- Design mobile deliberately. Do not merely shrink desktop layout.
- Use `100dvh` rather than `100vh` for full-height sections.
- Maintain strong text contrast, visible focus treatment, accessible labels, alt text for meaningful images, and logical heading order.
- Reserve image dimensions to avoid layout shift. Keep the first visual payload lean.
- Target fast initial paint, LCP below 2.5 seconds on a typical mobile connection, INP below 200 ms, CLS below 0.1, and an accessibility score of at least 95.

## Required verification before handoff

- Run lint, TypeScript checking, and a production build.
- Check the home page and a project page at desktop, tablet, and narrow mobile sizes.
- Check keyboard navigation, visible focus, reduced motion, menu and project-link behaviour, links, image loading, and no horizontal overflow.
- Search visible content for em dash and en dash characters before finalising.
- Report the verification performed and any limitation honestly.
