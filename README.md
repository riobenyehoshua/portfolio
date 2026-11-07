# Rio Ben-Yehoshua: Portfolio

Static site: plain HTML and CSS, no build step. Live at https://riobenyehoshua.github.io/portfolio/

```
index.html              Home: intro, projects, about, skills, activities, contact
ping-pong.html          Ping Pong Recirculation System
load-cell-scale.html    Digital Load Cell Scale
plantplex.html          PlantPlex
css/style.css           Shared styles for every page
js/site.js              Phone menu + play videos only while on screen
images/  videos/        Media (per-project subfolders)
files/                  Published PDFs (resume)
tools/                  publish.cmd, update-resume.cmd
source/                 Private, not in git: original photos, reports, original single-file version
```

## Preview locally

    python -m http.server 8000

Then open http://localhost:8000

## Publish

    tools\publish.cmd "What I changed"
    tools\update-resume.cmd            (newest *Resume*.pdf in Downloads)
