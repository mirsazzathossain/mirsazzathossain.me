![Tech Stack](public/images/msh-nextjs.png)

## mirsazzathossain.me

![website status](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Fmirsazzathossain.me&style=flat-square) ![GitHub](https://img.shields.io/github/license/mirsazzathossain/mirsazzathossain.me?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/mirsazzathossain/mirsazzathossain.me?style=flat-square) ![GitHub repo size](https://img.shields.io/github/repo-size/mirsazzathossain/mirsazzathossain.me?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/mirsazzathossain/mirsazzathossain.me?style=flat-square)

Source code for [mirsazzathossain.me](https://mirsazzathossain.me), my academic portfolio and research website. The site is built with [Astro](https://astro.build/), interactive [React](https://react.dev/) islands, [Tailwind CSS v4](https://tailwindcss.com/), and MDX content collections.

## Stack

- Framework: [Astro](https://astro.build/) with static output and the Vercel adapter
- UI islands: [React](https://react.dev/)
- Styling: [Tailwind CSS](https://tailwindcss.com/) v4
- Content: Astro content collections and MDX
- Math: `remark-math` and `rehype-katex`
- Comments: [giscus](https://giscus.app/)
- Deployment: [Vercel](https://vercel.com/)
- Analytics: Vercel Analytics and Speed Insights

## Project Structure

- `src/pages/*`: Astro routes.
- `src/components/*`: Astro and React components.
- `src/content/*`: MDX posts and snippets.
- `src/data/*`: Build-time JSON data for publications, projects, resources, courses, CV, and profile sections.
- `src/styles/*`: Tailwind entry point and global site layers.
- `src/utils/*`: Shared data, formatting, and content utilities.
- `public/*`: Static assets such as images, icons, PDFs, and the web manifest.
- `.github/workflows/ci.yml`: Build check for pushes and pull requests.
- `.github/workflows/update-publications.yml`: Weekly Google Scholar publication and citation sync.
- `vercel.json`: Vercel deployment settings for Astro.

## Publication Data

Publication data is split intentionally:

- `src/data/publications.json`: generated Scholar-facing publication data.
- `src/data/publications.override.json`: user-managed overrides and manual publication entries.
- `src/data/publication_stats.json`: publication summary stats used by the site.

Do not hand-edit generated publication fields in `publications.json`. Add corrections, BibTeX, PDFs, ranks, venue citations, feature flags, and manual papers in `publications.override.json`.

## Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The site is deployed on Vercel. The important settings are:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
- Project root: repository root

## Forking

If you clone or fork this repository, replace the personal content before publishing:

- `src/data/*`
- `src/content/*`
- `public/images/*`
- `public/files/*`
- site metadata in the layout/config files
