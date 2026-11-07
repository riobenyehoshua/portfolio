# Portfolio site: notes for Claude

Rio's personal portfolio (mechanical engineering student, The Cooper Union). Audience: recruiters.
Live: https://riobenyehoshua.github.io/portfolio/ (GitHub Pages, deploys from `main`, root folder).

## Structure
- Plain HTML + one shared stylesheet (`css/style.css`). No build step, no framework. Keep it that way.
- Pages: `index.html`, `ping-pong.html`, `load-cell-scale.html`, `plantplex.html`. The nav and footer
  contact are repeated in each page: a nav/contact change must be made in all four.
- Project order (dropdown, pager "Next project" links): ping pong -> load cell scale -> PlantPlex -> back to ping pong.
- Homepage order: intro, Projects, Currently working on (`#current`: Crazyflie drones, Motorsports; amber
  "In progress" label, So far / Next lines), In the shop (`#shop`: cardboard chair + metal casting, photos in `images/shop/`),
  About, Skills, Beyond the classroom, Contact. The old standalone shop page lives in
  `source/old-versions/rio-portfolio-site.zip`; its circuit photos now sit on the ping pong page (Electronics section).
- The casting text ("used it to determine its strain") is Rio's own wording and still vague: ask for the metal,
  the test and the result before expanding it. Don't invent details.
- Each project page has a theme class on `.page` (`t-pingpong` red, `t-scale` blue, `t-plant` green; home is purple).
  Colors are CSS variables at the top of style.css.
- `source/` is gitignored and private: original photos (`source/original-photos`, with a CSV mapping), the reports,
  and the original single-file artifact. Never publish files from it without asking.
- Resume lives at `files/Rio-Ben-Yehoshua-Resume.pdf` (fixed name; pages link to it). It is public.
  Rio edits it in Google Docs. Publish it only via `tools\update-resume.cmd`, which strips phone numbers
  (`tools/strip_phone.py`, PyMuPDF in the gitignored `tools/.venv`). Rio's phone number must never be published.

- `TODO.md` (gitignored, private) is Rio's checklist of things to add later. Read it at the start of a session;
  when Rio says "later" about something, add it there, and tick items off when they're done.

## Conventions
- Ask Rio before any big design change (layout, colors, fonts). Wording and small fixes are fine.
- Don't invent facts (dates, numbers, roles). Sources of truth: resume PDF and the reports in `source/reports/`.
- New images: put in `images/<project>/`, max ~2000px long edge, JPEG for photos, PNG for CAD/graphs.
  Use `loading="lazy"` unless it's visible when the page opens. Do NOT add width/height attributes to `<img>`:
  with a stale cached stylesheet they stretch photos (this happened once). Sizing comes from CSS
  (aspect-ratio + object-fit), same as the original design.
- After changing `css/style.css` or `js/site.js`, bump the `?v=N` on their links in all four pages, so
  browsers never combine a cached old stylesheet with new pages.
- Videos: `data-autoplay muted loop playsinline controls preload="none"` with a poster image.

## Workflow
1. Preview: `python -m http.server 8000` in this folder -> http://localhost:8000
2. Check phone width too (menu collapses under 760px).
3. Publish: commit and push to `main` (or `tools\publish.cmd "message"`). Live in about a minute.
