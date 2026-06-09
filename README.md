# Portfolio Website

Simple personal portfolio for Surya Kiran Morla. Fixes in this branch:
- Removed stray text before `<!DOCTYPE>` in `index.html`.
- Fixed an IIFE syntax issue in `script.js` so client JS runs.

Quick start

1. Open the site locally by opening `index.html` in your browser.

2. To push changes to GitHub, run the helper script (requires Git installed):

```powershell
cd "d:\Projects\Portfolio"
powershell -ExecutionPolicy Bypass -File .\push-to-github.ps1 -RemoteUrl "https://github.com/YOUR_USERNAME/YOUR_REPO.git" -Branch main -CommitMessage "Fix: HTML/JS corrections"
```

Files of interest
- `index.html` — main page
- `styles.css` — styles
- `script.js` — client JS
- `push-to-github.ps1` — helper to init/commit/push

If you want, I can open a PR template or help create the GitHub repo.
# Portfolio

A simple, responsive single-page portfolio. Easy to customize and host.

## Quick start

1. Open `index.html` in a browser, or run a local server:
   ```bash
   npx serve .
   ```
2. Edit `index.html` and replace placeholder content with your own:
   - **Hero**: Your name, tagline, and headline
   - **About**: Short bio
   - **Projects**: Titles, descriptions, and links (Live / Code)
   - **Skills**: Your tools and technologies
   - **Contact**: Email and social links (LinkedIn, GitHub, Twitter, etc.)
3. Optional: Update `styles.css` — change the `:root` variables (e.g. `--accent`, `--bg`) to match your brand.

## Customization

- **Colors**: In `styles.css`, edit the CSS variables at the top (`:root`). `--accent` is the main highlight color.
- **Fonts**: The site uses [Syne](https://fonts.google.com/specimen/Syne) for headings and [DM Sans](https://fonts.google.com/specimen/DM+Sans) for body text. You can swap them in the `<link>` in `index.html` and in `:root` in `styles.css`.
- **Logo**: Replace the "YN" in the nav with your initials or a small logo image.

## Deploy

- **GitHub Pages**: Push this folder to a repo and enable Pages (Settings → Pages → source: main branch).
- **Netlify / Vercel**: Drag the project folder or connect the repo; no build step needed.

No build tools required—plain HTML, CSS, and JavaScript.
