# Khoirul Anam - Personal Portfolio & Technical Log

[![Astro 5](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-GitHub_Pages-22c55e?style=flat&logo=githubactions&logoColor=white)](https://khoirulanam.my.id)

A lightning-fast, ultra-lightweight portfolio and engineering log built with **Astro 5**, featuring a 1980s/90s minimalist terminal aesthetic, serif typography, self-hosted **Fantasque Sans Mono**, smooth client-side SPA transitions, and dynamic data integration extracted directly from `../cv`.

---

## ⚡ Architecture & Highlights

- **Framework:** Astro 5 Static Site Generation (SSG) with zero unnecessary client JavaScript.
- **SPA Transitions:** Smooth, client-side routing via Astro `<ClientRouter />` (`astro:transitions`).
- **Aesthetic:** Retro 80s/90s Minimalist dark mode with subtle CRT scanlines, terminal prompts, and box-drawing accents.
- **Typography:** Self-hosted **Fantasque Sans Mono** woff2 nerd font paired with editorial **Newsreader Serif**.
- **Data Source of Truth:** `src/data/cv.ts`, parsed from `../cv` (LaTeX CV & Portfolio assets).
- **Blog & Dispatches:** Markdown (`.md`) content collection with automated frontmatter validation (`src/content/blog/`).
- **SEO & Social:** Open Graph, Twitter cards, JSON-LD Schema (`Person` and `BlogPosting`), XML sitemap index, and `robots.txt`.
- **Target Metrics:** 95–100 score across all Google Lighthouse audits.

---

## 📁 Repository Structure

```
├── .github/workflows/
│   └── deploy.yml            # Automated GitHub Actions Pages deployment
├── public/
│   ├── CNAME                 # khoirulanam.my.id
│   ├── fonts/                # Self-hosted Fantasque Sans Mono woff2
│   ├── photos/               # Portfolio assets & architecture screenshots
│   └── robots.txt            # Search engine directives & sitemap pointer
├── src/
│   ├── components/           # Modular Astro components
│   │   ├── Header.astro      # Terminal-style navigation & status
│   │   ├── Hero.astro        # Executive summary & key stats
│   │   ├── ExperienceSection.astro # Work & open source timeline
│   │   ├── ProjectsSection.astro   # Deep dive projects with screenshots
│   │   ├── SkillsSection.astro     # Unix package matrix
│   │   ├── EducationSection.astro  # Academic credentials
│   │   ├── ContactSection.astro    # Terminal contact ports
│   │   ├── BlogCard.astro          # Article cards
│   │   └── Footer.astro            # System footer with ASCII borders
│   ├── content/
│   │   └── blog/             # Technical Markdown articles
│   ├── data/
│   │   └── cv.ts             # Typed data extracted from ../cv
│   ├── layouts/
│   │   └── BaseLayout.astro  # Main layout with SEO & ClientRouter
│   ├── pages/
│   │   ├── index.astro       # Single-page portfolio & recent notes
│   │   └── blog/             # Article index & slug dynamic routing
│   └── styles/
│       └── global.css        # Tailwind tokens & retro CRT scanline styling
├── astro.config.mjs          # Astro config with sitemap & Tailwind plugin
├── tsconfig.json             # TypeScript strict Astro config
└── package.json
```

---

## 🛠️ Local Development

### Prerequisites
- Node.js `v20+` or `v22+`
- npm `v10+`

### Setup & Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server with hot-reload
npm run dev

# 3. Build optimized static output to dist/
npm run build

# 4. Preview the static production build locally
npm run preview
```

---

## 🚀 GitHub Pages CI/CD Deployment

This repository includes a pre-configured GitHub Actions workflow at [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml).

### Enabling GitHub Pages:
1. In your GitHub repository (`khoirulanammyid/khoirulanammyid.github.io`), go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push changes to the `main` branch.
4. The workflow will automatically install dependencies, build the Astro static site, and deploy directly to `https://khoirulanam.my.id`.
