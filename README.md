# Agentinel - Official Website 🛡️

![Agentinel Hero](public/og-image.png)

> The official landing page and documentation site for **Agentinel** — the zero-cost, locally-run package guardrail for autonomous AI coding agents. 

🔗 **For the core Agentinel CLI, hooks, and source code, please visit the [Main Agentinel Repository](https://github.com/aman-janwani/agentinel).**

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
