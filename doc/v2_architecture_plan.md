# Agentinel V2: Enterprise-Grade Architecture Plan

This document outlines the pivot from a simple landing page to a "million-dollar startup" web presence. It focuses on strict component reusability, premium typography, extensive storytelling, and a fully functional documentation portal.

## 1. Component-Driven Architecture (Strict Mode)
We will refactor the current monolith `page.tsx` into a strict **Atomic Design** structure. This guarantees everything is reusable and maintainable.
- **Atoms (`src/components/ui/`):** Base elements like `<Typography>`, `<Button>`, `<Badge>`, `<CopyBox>`.
- **Molecules (`src/components/shared/`):** `<BentoCard>`, `<TerminalWindow>` (with hover animations strictly removed), `<FeatureIcon>`.
- **Organisms (`src/components/sections/`):** Every section on the page (Hero, Stats, Features) will be an isolated file imported into the main pages.
- **Layouts (`src/components/layouts/`):** `<DocsSidebar>`, `<MegaFooter>`, `<Navbar>`.

## 2. Typography & Aesthetics (Matching Ref 3)
To perfectly capture the aesthetic of the 3rd reference image (the finance/tech app):
- **Primary Font (Headings):** We will implement a high-contrast, elegant Serif font via `next/font` (e.g., `Playfair Display` or `Instrument Serif`) at exactly `font-weight: 400` with tight letter spacing for that premium editorial look.
- **Secondary Font (Body/UI):** A geometric Sans-Serif (e.g., `Inter` or `Geist`) at `font-weight: 400` for readable paragraphs, and `font-weight: 500/600` for crisp UI labels.
- **The Logo:** We will pull the official `logo.png` from your `agentinel` repository, convert it, and prominently display it in the Navbar and Footer.
- **Animations:** We will remove the "scale up" hover effect on the Terminal as requested. Animations will be reserved for subtle arrow translations on buttons and elegant fade-ins for the Bento Grid.

## 3. Expanded Landing Page (The New Flow)
The current page is too brief. An enterprise site needs to tell a comprehensive story. Here is the expanded layout:
1. **Navbar:** Refined with the real logo and a dropdown for "Resources".
2. **Hero Section:** Elegant serif typography, the animated terminal, and high-intent CTAs.
3. **Social Proof / Trust Strip:** Logos of the tools protected (Claude, Copilot, Cursor) + the massive threat DB stats.
4. **The Problem Section (NEW):** A dedicated section highlighting the actual danger of hallucinated/slopsquatted packages to build contrast and urgency.
5. **Features (Expanded Bento Grid):** The current grid, refined with more intricate SVGs and better glassmorphism.
6. **How It Works (Timeline):** The 4-step interception flow.
7. **Code & Config Showcase (NEW):** A section showing how dead-simple the `.agentinel.json` configuration is (Warn vs Strict mode).
8. **Pre-Footer CTA (NEW):** A massive, high-contrast block: "Secure your AI agents in 60 seconds."
9. **The Mega Footer (NEW):** Rebuilding the basic footer into a massive, multi-column enterprise footer (Product, Resources, Legal, Company links, and a newsletter/update signup).

## 4. The Documentation Portal (`/docs`)
We will build a completely new, real documentation section mimicking tools like Stripe or Vercel.
- **Docs Layout (`src/app/docs/layout.tsx`):** A fixed left sidebar with nested navigation categories, and a right-side content area.
- **Pages to Create:**
  - `/docs/introduction`: What is Agentinel?
  - `/docs/installation`: Setup for CLI and agents (`npx asen init`).
  - `/docs/configuration`: How to use `.agentinel.json` and strict mode vs warn mode.
  - `/docs/architecture`: Deep dive into the local OSV database and deep tree scanning.

## 5. Execution Phases (Pending Review)
If this plan is approved, I will execute in this exact order:
1. **Setup & Typography:** Migrate the official logo and configure the exact Serif/Sans-Serif fonts.
2. **Component Refactor:** Break down existing code into the strict `ui/`, `shared/`, and `sections/` folders.
3. **Landing Page Expansion:** Build the new Problem, Config Showcase, and Mega Footer sections.
4. **Docs Portal Construction:** Build the Sidebar layout and the 4 internal documentation pages.
