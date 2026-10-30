# Design Systems Field Guide

- `dist/` — final, shareable HTML. Deploy this directory or share the HTML file directly; it contains its images, styles and scripts.
- `src/` — build script, research data, screenshot capture tooling and raw screenshots.
- `src/validation/` — intermediate checks and preview images; not deployment assets.

## Build

Run from this directory:

```sh
python3 src/build_guide.py
```

The build writes `dist/design-systems-field-guide.html` and refreshes `src/guide-data.json`. No package installation is required to build from the saved screenshots.

## Refresh screenshots (optional)

Install Playwright and its Chromium browser, then capture the public documentation pages and rebuild:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node src/capture.cjs
python3 src/build_guide.py
```

Inspect refreshed screenshots before publishing; public sites can change or show loading states. Intermediate validation files are excluded from Git.

## Publish

The guide is published at https://rtgibbons.github.io/design-systems-field-guide/.

The GitHub Pages workflow publishes the committed `dist/` directory on every push to `main`, or when run manually from GitHub Actions. It copies the guide to `index.html` during deployment so the site opens at its root URL. Rebuild and commit `dist/design-systems-field-guide.html` when changing the guide's source or screenshots.

Researched and built with gpt-6.1-sol. Documentation screenshots belong to their respective publishers.
