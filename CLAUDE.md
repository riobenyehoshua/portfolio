# Portfolio site: notes for Claude

Rio's personal portfolio (mechanical engineering student, The Cooper Union). Audience: recruiters.
Live: https://riobenyehoshua.github.io/portfolio/ (GitHub Pages, deploys from `main`, root folder).

## Structure
- Plain HTML + one shared stylesheet (`css/style.css`). No build step, no framework. Keep it that way.
- Pages: `index.html`, `ping-pong.html`, `load-cell-scale.html`, `plantplex.html`. The nav and footer
  contact are repeated in each page: a nav/contact change must be made in all four.
- Project order (dropdown, pager "Next project" links): ping pong -> load cell scale -> PlantPlex -> back to ping pong.
- Each project page has a theme class on `.page` (`t-pingpong` red, `t-scale` blue, `t-plant` green; home is purple).
  Colors are CSS variables at the top of style.css.
- `source/` is gitignored and private: original photos (`source/original-photos`, with a CSV mapping), the reports,
  and the original single-file artifact. Never publish files from it without asking.
- Resume lives at `files/Rio-Ben-Yehoshua-Resume.pdf` (fixed name; pages link to it). It is public.

## Conventions
- Ask Rio before any big design change (layout, colors, fonts). Wording and small fixes are fine.
- Don't invent facts (dates, numbers, roles). Sources of truth: resume PDF and the reports in `source/reports/`.
- New images: put in `images/<project>/`, max ~2000px long edge, JPEG for photos, PNG for CAD/graphs.
  Give `<img>` width/height attributes and `loading="lazy"` unless it's in the top banner.
- Videos: `data-autoplay muted loop playsinline controls preload="none"` with a poster image.

## Workflow
1. Preview: `python -m http.server 8000` in this folder -> http://localhost:8000
2. Check phone width too (menu collapses under 760px).
3. Publish: commit and push to `main` (or `tools\publish.cmd "message"`). Live in about a minute.
