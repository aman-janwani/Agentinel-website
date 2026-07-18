<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:ui-design-guidelines -->
# Agentinel UI / UX Design Guidelines

If you are generating or modifying UI components, strictly adhere to these established brand guidelines to maintain our premium, developer-focused aesthetic.

## 1. Typography
- **Primary (Sans):** `Inter` (`font-sans`) — Used for all body text, UI elements, and technical data.
- **Headings (Serif):** `Instrument Serif` (`font-serif`) — Used for massive, editorial-style hero headings and massive numbers (like 404).

## 2. Color Palette & Theming
- **Backgrounds:** 
  - Pure dark mode: `#0A0A0A`
  - Elevated dark mode (Terminal/Cards): `#111318` or `#0d1117`
- **Primary Accent:** Cyan `#00E5CC`. Used for CTAs, glowing effects, and active states.
- **Terminal Accents:** 
  - Red: `#FF5F56` (Errors/Blocks)
  - Amber: `#FFBD2E` (Warnings)
  - Green: `#27C93F` (Success)
- **Contrast & Accessibility (CRITICAL):**
  - **Light mode backgrounds:** Never use text lighter than `text-gray-500` to maintain WCAG contrast ratios.
  - **Dark mode backgrounds:** Use `text-gray-300` or `text-gray-400` for readable body text.

## 3. UI Components & Layouts
- **Buttons / CTAs:** Left-aligned by default. Punchy. Primary CTAs use `bg-[#00E5CC]` with `text-black` (or white text if explicitly requested) and bold/semi-bold weighting. Use `rounded-full` for all buttons.
- **Glassmorphism:** Heavily utilized for floating elements (navbars, pill menus, terminal windows). 
  - Dark glass: `bg-[#111318]/95 backdrop-blur-xl border border-[#2a2e38]`
  - Light glass: `bg-white/90 backdrop-blur-md`
- **Animations:** Subtle micro-interactions. Use `framer-motion` for `fadeUp` reveals. Hover states should include a slight `scale-[1.02]` or `hover:translate-x-1` translation.
- **Borders:** Extremely subtle. `border-white/5` or `border-white/10` in dark mode.

## 4. General Vibe
- Premium, sarcastic, developer-first, and hyper-modern. Avoid generic Bootstrap/Tailwind defaults. Use precise hex codes and custom spacing.
<!-- END:ui-design-guidelines -->

<!-- BEGIN:git-workflow-rules -->
# Git & Contribution Workflow

- **Branching:** ALWAYS create a new branch for your work (e.g., `git checkout -b feature/xyz`). NEVER push directly to the `main` branch.
- **Pull Requests:** After completing work and pushing the branch, use the GitHub CLI (`gh pr create`) to create a Pull Request with a standard open-source format (clear title, description of changes, list of affected components).
- **Approval:** Wait for the user to explicitly approve the PR before merging. Do NOT merge PRs autonomously without permission.
<!-- END:git-workflow-rules -->
