# Agentinel Landing Page - Implementation Plan & PRD

## Core Philosophy
- **Zero AI Images:** The entire site will be built using pure React components, CSS (glassmorphism, noise, glows), and custom SVGs. 
- **Code-First Aesthetics:** Terminals, code blocks, and animations will be built using DOM elements for perfect resolution, accurate text, and fast load times.
- **Monochrome + Cyan:** Strict adherence to a sleek, minimal aesthetic with a subtle cyan accent color matching the Agentinel logo.

## Page Architecture (Single Page Landing)

### 1. Navigation Bar
- **Left:** Agentinel Logo + Wordmark.
- **Center:** Jump links to Sections (Features, How it Works).
- **Right:** GitHub link / "Star on GitHub" button.

### 2. Hero Section
- **Headline:** Bold, premium typography stating the core value (e.g., *"The zero-cost, locally-run package guardrail for AI agents."*)
- **Visual:** The **Animated React Terminal Component**. It will automatically type out an install command, simulate a scan, and show the exact Agentinel block message.
- **CTAs:** A primary button for "Get Started" and a copyable CLI box `npm install --save-dev agentinel`.

### 3. Trust / Performance Bar
- A sleek horizontal strip right below the hero terminal showing core stats:
  - `100% Local (0 Cloud Calls)`
  - `216,000+ Threat DB`
  - `< 1ms Execution Latency`

### 4. Features (Bento Grid)
An asymmetrical, premium grid layout displaying the primary features:
- **Native AI Hooks:** Visual showing the JSON payload sent back to Claude/Copilot.
- **Deep Tree Scanning:** A custom SVG node graph showing dependency traversal.
- **Slopsquatting Heuristics:** A mini terminal component showing the `asen check` command blocking a fake package.
- **Zero-Cost:** A minimal card emphasizing the MIT license and lack of API fees.

### 5. How It Works
A minimal, vertical timeline with connecting cyan SVG lines:
- **Step 1: Intercept** (Catches the `PreToolUse` hook)
- **Step 2: Scan** (Checks the local OSV DB and heuristics instantly)
- **Step 3: Block** (Prevents malware execution)
- **Step 4: Self-Correct** (Feeds context to the AI so it knows to find the right package)

### 6. Footer
- Clean, minimal footer with GitHub link, License info, and creator credit (Aman Janwani).

## Component Architecture (Reusable)
To ensure everything is perfectly reusable for your future projects, we will build:
- `<TerminalWindow>`: Accepts props `command`, `output`, `animated`, `status` (success/error/warning).
- `<BentoCard>`: Reusable wrapper for grid items with consistent glassmorphism borders and hover states.
- `<CopyBadge>`: A click-to-copy pill for terminal commands.
- `<NoiseBackground>`: A fixed CSS overlay to give the site texture.

## Technical Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Icons:** `lucide-react`
- **Animations:** React `useEffect` (for typing) and standard CSS transitions.
