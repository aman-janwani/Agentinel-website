# Agentinel Website Design Documentation

## 1. Design System & Aesthetics

**Core Philosophy:** Minimal, Simple, Modern, and Elegant. The website should feel premium, trustworthy, and fast—mirroring Agentinel's core value proposition as a seamless, local guardrail with zero overhead.

### Typography
Inspired by the 3rd reference image (Financial App):
- **Primary Font (Headings):** Elegant, high-contrast Serif (e.g., *Playfair Display*, *Instrument Serif*, or *PP Editorial New*). This gives a sophisticated, "editorial" feel to the hero and section titles.
- **Secondary Font (Body & UI):** Clean, modern Sans-Serif (e.g., *Inter*, *Manrope*, or *Geist*). This ensures maximum readability for technical explanations and interface elements.

### Color Palette
- **Background:** Pristine White (`#FFFFFF`) or a very subtle off-white (`#FAFAFC`) for a clean, distraction-free canvas.
- **Primary Text:** Deep Charcoal/Soft Black (`#111111`) for maximum contrast without the eye strain of pure black.
- **Secondary Text:** Medium Gray (`#666666`) for descriptions and subtle UI text.
- **Accent Color:** Cyan (matching the Agentinel logo) used sparingly for critical interactive elements, glows, and active states.

### UI Elements
- **Cards & Containers:** Minimalist cards with soft, large rounded corners (e.g., `rounded-3xl`), subtle 1px borders (`#EAEAEA`), and very faint or zero drop shadows.
- **Buttons:** High-contrast pill-shaped buttons (e.g., solid black background with white text), similar to the "Join Waitlist" button in Image 3.

---

## 2. Page Architecture

### A. Navigation Bar
- **Style:** Floating, transparent, highly minimal.
- **Elements:** 
  - Left: Logo / "Agentinel" wordmark.
  - Center: Links (Features, How it Works).
  - Right: CTA (e.g., "GitHub" or "View Source").

### B. Hero Section
**Inspiration:** Image 3 (Finance App)
- **Layout:** Centered alignment with large breathing room (generous top/bottom padding).
- **Typography:** Massive Serif headline with a slight italicized emphasis on key words (e.g., "AI Coding, *Secured* in your local terminal").
- **Subtitle:** Clean sans-serif explaining what Agentinel does (Intercepts AI agents, blocks malicious packages, zero false positives).
- **Interactive Element:** A sleek input-style box. Instead of an email signup, this will be the install command (`npx agentinel`) with a copy button styled like the dark CTA in Image 3.
- **Visuals:** 3 overlapping, beautifully styled Terminal/IDE mockups (e.g., VS Code, Cursor, MacOS Terminal) showcasing Agentinel blocking a bad package and feeding back the error, mimicking the overlapping phones from Image 3.

### C. Stats/Proof Bar
**Inspiration:** Image 1 (Top stats section)
- A simple, minimal horizontal strip below the hero displaying key metrics:
  - `< 1ms` Latency
  - `216k+` Threat Database
  - `100%` Local

### D. Features Section (The "Bento Grid")
**Inspiration:** Images 1 & 2
- **Layout:** An asymmetric "Bento Box" grid layout.
- **Cards:**
  - **Local & Fast:** Emphasizing zero cloud dependencies.
  - **Massive Database:** Highlighting the OSV integration.
  - **Smart Heuristics:** Explaining slopsquatting protection.
  - **AI Feedback Loop:** The killer feature—showing how it talks back to Claude/Copilot to correct the package name.

### E. How It Works (Step-by-Step)
**Inspiration:** Image 1 (Four steps)
- **Layout:** Minimal vertical timeline or alternating side-by-side list.
- **Steps:**
  1. **Intercept:** Catches the install command via native hook.
  2. **Scan:** Checks local DB and heuristics.
  3. **Block/Allow:** Instant decision making.
  4. **Self-Correct:** Feeds context back to the AI.

### F. Footer
- Highly minimal. Copyright, links to GitHub, and a "Built by Aman Janwani" signature.

---

## 3. Reusable Component Strategy
To ensure the codebase is easily replicable for your future projects, we will build strictly modular, independent Next.js components:
- `Typography` (Heading, Subheading, Body)
- `Button` (Primary, Secondary, Outline)
- `BentoCard` (Wrapper for feature blocks)
- `TerminalMockup` (To display CLI outputs beautifully)
- `SectionLayout` (Consistent padding and max-width wrappers)

---

## 4. UI Assets & Media List

To elevate the monochrome aesthetic, we will need the following assets. These should be custom-made or heavily stylized to match the clean, premium feel.

### A. Hero Section Media
- **The Overlapping Terminals (Static or Motion):** 3 High-resolution mockups of a sleek terminal window (like MacOS terminal with no window buttons, just minimal glassmorphism). 
  - *Motion Suggestion:* A subtle looping Lottie animation or MP4 showing an AI agent typing `npm install...`, Agentinel flashing a cyan "Intercepted" status, and the AI correcting itself. 

### B. Bento Grid Graphics
- **Micro-animations (Lottie / CSS):**
  - A `< 1ms` speed dial or glowing pulse animation for the performance card.
  - A network node animation showing the local OSV database structure.
- **Iconography:** A custom set of minimal, 1px-stroke SVG icons. They should be strictly black/dark gray, but can "light up" with a cyan glow on hover.

### C. How It Works Section
- **Connection Lines:** SVG paths that connect the steps vertically. We can animate a cyan glowing dot traveling down the line as the user scrolls (Scroll-triggered animation).

### D. General Site Assets
- **Logo:** `logo.png` from the Agentinel repository. We'll use this in the Navigation Bar and Footer.
- **Texture Overlay:** A very subtle, low-opacity grain/noise texture (`noise.png`) overlaid on the background to give the monochrome design a more tactile, premium "matte" finish.
