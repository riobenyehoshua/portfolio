# Portfolio site: notes for Claude

Rio's personal portfolio (mechanical engineering student, The Cooper Union). Audience: recruiters.
Live: https://riobenyehoshua.github.io/portfolio/ (GitHub Pages, deploys from `main`, root folder).

## Structure
- Plain HTML + one shared stylesheet (`css/style.css`). No build step, no framework. Keep it that way.
- Pages: `index.html`, `ping-pong.html`, `load-cell-scale.html`, `plantplex.html`, `shop.html`. The nav and footer
  contact are repeated in each page: a nav/contact change must be made in all five.
- Project order (dropdown, pager "Next project" links): ping pong -> load cell scale -> PlantPlex -> back to ping pong.
- Homepage order: intro, Projects, Currently working on (`#current`: Crazyflie drones, Motorsports; amber
  "In progress" label, So far / Next lines), Workshop Builds (`#shop`: preview cards linking to `shop.html`, which holds every build in full; photos in `images/shop/`),
  About, Skills, Beyond the classroom, Contact. The old standalone shop page lives in
  `source/old-versions/rio-portfolio-site.zip`; its circuit photos now sit on the ping pong page (Electronics section).
- Casting text: test and result come from `source/reports/dogbone-tensile-test-2026-11-04` (Instron export). The metal is
  6061 aluminum (confirmed by Rio). Don't compute stress from the width/thickness saved in that file: they were left
  over from another group's specimen (13.39 x 3.1 mm). Ask Rio for the measured cross-section.
- Design (redesign went live 2026-11-13): navy on white, Archivo + JetBrains Mono, wide capitals only on the name and
  section headlines. Each project page has a theme class on `<body>` (`inner p-red` ping pong, `inner p-blue` scale,
  `inner p-green` PlantPlex; `shop.html` is plain `inner`). Colors are CSS variables on `body` at the top of style.css.
- Menu (same in all five pages): Home · Projects ▾ (the three projects, each with a one-line description, plus
  "See all projects") · Current work · Builds · About ▾ (About me, Skills, Beyond the classroom) · Contact · Resume.
  Rio wants projects clearly labeled as projects; don't fold them into a general "Work" dropdown.
- Page footer is just the email in large type with LinkedIn and Resume buttons (no "Get in touch" heading).
  Resume links say "Resume", never "Resume (PDF)".
- Credit accurately: load cell scale, Rio planned and sketched the enclosure and a teammate did the CAD. PlantPlex,
  Rio worked out the pod shape with teammates, a teammate drew the panels in CAD, Rio laser-cut and built them;
  the grid frame was store-bought and assembled.
- `source/` is gitignored and private: original photos (`source/original-photos`, with a CSV mapping), the reports,
  and the original single-file artifact. Never publish files from it without asking.
- Resume lives at `files/Rio-Ben-Yehoshua-Resume.pdf` (fixed name; pages link to it). It is public.
  Rio edits it in Google Docs. Publish it only via `tools\update-resume.cmd`, which strips phone numbers
  (`tools/strip_phone.py`, PyMuPDF in the gitignored `tools/.venv`). Rio's phone number must never be published.

- PDF portfolio (4 Letter pages, for applications that want a PDF): source `tools/pdf/portfolio.html`
  (images via `../../images/`), built to `files/Rio-Ben-Yehoshua-Portfolio.pdf` by `tools\build-pdf.cmd`
  (headless Edge). It repeats site content: when project facts change on the site, update it too, rebuild,
  and check every page still fits (no overflow into the footer).
- `preview-*.html` in the root are gitignored mockups. `preview-4` to `preview-8` were the redesign and are now
  superseded by the live pages: edit the live pages, not the mockups.
- `TODO.md` (gitignored, private) is Rio's checklist of things to add later. Read it at the start of a session;
  when Rio says "later" about something, add it there, and tick items off when they're done.

## Conventions
- Ask Rio before any big design change (layout, colors, fonts). Wording and small fixes are fine.
- Only real photos/CAD/screenshots of Rio's work: no AI-generated images (the ping pong layout diagram was removed
  for this reason). Ping pong launcher: red parts = 3D-printed flywheels; other printed parts = motor/flywheel
  mounts; laser-cut cardboard enclosure covers the motors and wiring (mounts and enclosure are different things).
- Don't invent facts (dates, numbers, roles). Sources of truth: resume PDF and the reports in `source/reports/`.
- New images: put in `images/<project>/`, max ~2000px long edge, JPEG for photos, PNG for CAD/graphs.
  Use `loading="lazy"` unless it's visible when the page opens. Do NOT add width/height attributes to `<img>`:
  with a stale cached stylesheet they stretch photos (this happened once). Sizing comes from CSS
  (aspect-ratio + object-fit), same as the original design.
- After changing `css/style.css` or `js/site.js`, bump the `?v=N` on their links in all five pages, so
  browsers never combine a cached old stylesheet with new pages.
- Videos: `data-autoplay muted loop playsinline controls preload="none"` with a poster image.

## Workflow
1. Preview: `python -m http.server 8000` in this folder -> http://localhost:8000
2. Check phone width too (menu collapses under 760px).
3. Publish: commit and push to `main` (or `tools\publish.cmd "message"`). Live in about a minute.
