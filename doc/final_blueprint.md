# Agentinel Website: Final Architecture Blueprint

## Vision Statement
A premium, animation-heavy, sarcastic developer tool website that is impossible to forget. Pure white with stark black text. One textured section. Flowing serif headings. Framer Motion everywhere. Multi-page documentation that rivals Tailwind CSS in quality and depth.

---

## Tech Stack (Final)
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (page transitions, parallax, scroll-triggered reveals, stagger animations)
- **Icons:** Lucide React + Custom SVGs
- **Fonts:** `Instrument Serif` (headings, flowy, premium) + `Inter` (body, UI)
- **Logo:** Real logo.png from agentinel repo

---

## Folder Architecture (Strict Atomic Design)

```
src/
  app/
    layout.tsx                    (Root layout with Framer Motion AnimatePresence)
    page.tsx                      (Assembles all landing sections)
    docs/
      layout.tsx                  (Docs layout with sidebar)
      page.tsx                    (Redirects to /docs/introduction)
      introduction/page.tsx
      installation/page.tsx
      configuration/page.tsx
      architecture/page.tsx
      hooks/page.tsx
      commands/page.tsx

  components/
    ui/                           (Atoms: pure reusable primitives)
      Button.tsx
      Badge.tsx
      CopyBox.tsx

    shared/                       (Molecules: composed from atoms)
      TerminalWindow.tsx          (Animated terminal, no hover scale)
      FeatureCard.tsx
      SectionLabel.tsx

    sections/                     (Organisms: full page sections)
      HeroSection.tsx
      ProblemSection.tsx
      StatsBar.tsx
      FeaturesGrid.tsx
      HowItWorks.tsx
      ComparisonTable.tsx
      PreFooterCTA.tsx

    layouts/                      (Page-level wrappers)
      Navbar.tsx
      MegaFooter.tsx
      DocsSidebar.tsx

    icons/
      GithubIcon.tsx

  lib/
    utils.ts
```

---

## Phase 1: Foundation and Typography

### Tasks
1. Install `framer-motion` and `@fontsource/instrument-serif` (or use next/font with Google Fonts).
2. Rewrite `globals.css` with the final CSS variables:
   - Background: `#FFFFFF`
   - Text: `#0A0A0A`
   - Accent: `#00E5CC` (refined muted cyan, not neon)
   - Noise section background: `#F5F4F0` with CSS noise filter
3. Rewrite `layout.tsx` with `Instrument Serif` + `Inter` and `AnimatePresence` wrapper for page transitions.
4. Create the `ui/Button.tsx`, `ui/Badge.tsx`, `ui/CopyBox.tsx` atoms.

---

## Phase 2: Hero Section (The Most Important Part)

### Design: Split Layout
Inspired by ref3.png (the finance app). The screen is divided exactly in half:

**Left Half:**
- Navbar sits at the top spanning full width
- Below navbar on left: Small `<Badge>` chip "v1.0.0 is Live"
- Large `Instrument Serif` heading: "Security layer for autonomous coding."
- Subtitle text (Inter, gray): "Because your AI loves slopsquatting."
- Two CTAs: "Read the Docs" pill button + copyable `npm install` box
- Stats row: 3 numbers inline (100% Local, 216k+ DB, <1ms)

**Right Half:**
- A massive, dark terminal window pinned to the right edge
- Two tabs above it: "Normal Hook" and "Claude Code Agent"
- Tab 1 (Normal Hook): Animates typing `npm install react-router-v7-fake` then shows the warning output line by line
- Tab 2 (Claude Code Agent): Shows the JSON `PreToolUse` intercept payload being fed back to the agent
- The terminal has a subtle cyan glow on the bottom edge
- NO hover scale animation on the terminal

### Framer Motion Details
- Left side content: `fadeInUp` stagger (each element fades up 80px with 150ms delay between)
- Right terminal: slides in from the right with a slight spring bounce
- Parallax: On scroll, the terminal moves up slightly slower than the text (depth effect)

---

## Phase 3: Problem Section (The Sarcasm Zone)

### Design: Dark Textured Section (The ONE noise section)
- Background: `#0A0A0A` with the CSS noise texture overlay
- This creates a dramatic contrast as the user scrolls off the white hero
- Heading (Serif, white): "Your AI confidently installed what?" followed by a red strikethrough of a fake package name
- Body text (gray, Inter): Explains slopsquatting and hallucinations with dry wit
- A subtle red glow in the background for tension

### Framer Motion Details
- Scroll-triggered: Text reveals with a clip-path animation (text slides up from below a mask)

---

## Phase 4: Stats Bar

### Design: Pure White Section
- 3 massive stats in a row separated by thin gray lines
- Each number counts up (via Framer Motion `useMotionValue` + `useTransform`) when it enters the viewport
- `100%`, `216,000+`, `<1ms`

---

## Phase 5: Features Grid (Bento)

### Design: Asymmetrical Cards on White
- Cards are pure white with a subtle `1px` gray border and soft shadow
- On scroll, cards stagger-fade in from below
- Headings in `Instrument Serif`
- Feature 1 (wide): AI Self-Correction Loop with the live JSON code block
- Feature 2 (tall): Deep Tree Scanning with a custom animated SVG node graph
- Feature 3 (square): Slopsquatting heuristics with mini terminal
- Feature 4 (wide): CI/CD Fallbacks with the `npx asen check` terminal

---

## Phase 6: How It Works (Timeline)

### Design: Light Gray Background
- 4 steps in a vertical alternating layout
- A thin cyan vertical line connects all steps
- Each step circle has a number inside, not an icon
- On scroll, the connecting line "draws itself" using SVG `stroke-dashoffset` animation

---

## Phase 7: Comparison Table (New Section)

### Design: Clean White, Editorial Feel
- Title: "How does Agentinel compare?" (Serif)
- A clean table comparing Agentinel vs Commercial Alternatives
- Agentinel column has a subtle cyan left border highlight
- Checkmarks are cyan, X marks are gray

---

## Phase 8: Pre-Footer CTA

### Design: Near-Black Section
- Large centered serif heading: "Secure your AI agents in 60 seconds. For free. Always."
- Single large button: "Get Started Now"
- Sub-text: "No account. No server. No config. Just npm install."

---

## Phase 9: Mega Footer (Dark)

### Design: Dark Section, Multi-Column
- 4 columns: Product, Developers, Resources, Stay Updated (email subscription)
- Real logo in top left
- Copyright + MIT license at the bottom

---

## Phase 10: Multi-Page Documentation

### URL Structure: `/docs/[page]`
All pages share a fixed sidebar layout. Sidebar has collapsible sections.

**Sidebar Navigation:**
- Getting Started
  - Introduction
  - Installation
- Core Concepts
  - Configuration (Warn vs Strict)
  - OSV Architecture
- Hooks & Integrations
  - Claude Code Hook
  - Codex CLI Hook
  - Copilot CLI Hook
  - Gemini CLI Hook
- CLI Reference
  - All Commands (`asen init`, `asen check`, `asen allow`, `asen unshim`)

**Content Quality:** Each page will be a full, rich documentation page styled exactly like Tailwind CSS docs with:
- Code blocks with syntax highlighting (CSS-only, no extra lib needed)
- Info/Warning callout boxes
- Command examples copied directly from the agentinel README and IMPLEMENTATION.md
- Step-by-step instructions

---

## Phase 11: Final Polish
- Ensure all page transitions work with Framer Motion AnimatePresence
- Add `<meta>` SEO tags
- Ensure all fonts and assets are optimized
- Final responsive mobile pass

---

## Execution Order (Sequential, One Phase at a Time)
1. Foundation and Typography (installs + globals + atoms)
2. Hero Section
3. Problem Section
4. Stats Bar
5. Features Grid
6. How It Works
7. Comparison Table
8. Pre-Footer CTA + Mega Footer
9. Docs Layout + 8 documentation pages
10. Final Polish and Animations Pass
