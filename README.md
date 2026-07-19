# Agentinel - Official Website 🛡️

<div align="center">
  <img src="public/og-image.png" alt="Agentinel Hero" width="100%" />
</div>

<br />

> **The official landing page and documentation site for Agentinel — the zero-cost, locally-run package guardrail for autonomous AI coding agents.**

*Agentinel guards your AI agent when it installs npm packages, catching hallucinated dependencies, slopsquatting, and malicious packages before they execute on your machine.*

🔗 **For the core Agentinel CLI, hooks, and source code, please visit the [Main Agentinel Repository](https://github.com/aman-janwani/agentinel).**

---

## 📖 The Problem

AI coding agents (like Claude Code, Copilot, or Cursor) install dependencies on your behalf, often while you aren't looking closely. 
- Sometimes they install a package that was registered last week with no history. 
- Sometimes they install a package whose name they entirely **hallucinated**. 
- Sometimes, they install a legitimate package that pulls in a compromised one three levels deep.

**Agentinel** checks every package an install would bring in, at the exact moment the agent reaches for it. It evaluates the package against a bundled, locally-run database of over 216,000 known malicious packages and zero-cost registry heuristics. It then tells the agent why something looks wrong so the AI can back off and reconsider.

Every other tool in this space guards your terminal. **Agentinel guards your agent.**

---

## ⚡ Features & Security Philosophy

- **Zero-Cost & Private:** Agentinel does no network interception, runs no cloud proxies, and requires no paid APIs. The malware list is matched locally.
- **Deep Tree Scanning:** Checks every package an install would *actually* bring in, not just the one named. (`npm install express` brings in 67 packages. We check all 67).
- **Known Malware:** Bundles a local OSV database of 216,000+ confirmed malicious packages.
- **Zero False Positives on Popular Packages:** Tested against the top 100 npm packages.
- **Heuristic Scanning:** Flags npm takedowns, packages under 30 days old with < 1k downloads (slopsquatting), publisher drift, and non-existent hallucinated names.
- **Cross-Platform Compatibility:** Fully tested and natively supported across macOS, Linux, and Windows.
- **Fails Open:** Designed so that if it crashes or can't reach the registry, it fails open. It will never permanently wedge your terminal or block your work.

---

This repository contains the source code for the Agentinel website, built with modern web standards to be blazingly fast, visually stunning, and highly accessible.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Language:** TypeScript
- **Deployment:** Vercel (Recommended)
- **Newsletter API:** [Resend](https://resend.com)

## 💻 Getting Started

To run the website locally for development:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aman-janwani/Agentinel-website.git
   cd Agentinel-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file and add your Resend API keys if you want to test the newsletter functionality.
   ```bash
   cp .env.example .env.local
   ```
   *Note: Your `.env.local` is git-ignored and safe to put private keys in.*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the site:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/src/app` - Next.js App Router pages (including `/docs` for all documentation).
- `/src/components/sections` - Major landing page sections (Hero, How It Works, Features, etc.).
- `/src/components/layouts` - Global layouts like the Navbar and MegaFooter.
- `/src/app/actions` - Next.js Server Actions (e.g., Resend newsletter integration).

## 🤝 Contributing

Agentinel is an open-source project and we welcome contributions! 
If you find a typo in the documentation, want to improve the UI, or have an idea for a new section, feel free to open a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
