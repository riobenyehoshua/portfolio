# Rio Ben-Yehoshua: Portfolio

Static site: plain HTML and CSS, no build step.

```
index.html              Home (about, projects, skills, activities, contact)
ping-pong.html          Angry Birds Ping Pong Recirculation System
load-cell-scale.html    Digital Load Cell Scale
plantplex.html          PlantPlex
css/style.css           Shared styles for every page
images/                 Photos, CAD renders, logos (per-project subfolders)
videos/                 Ping pong demo videos
```

## Preview locally

```
python -m http.server 8000
```

Then open http://localhost:8000

## Deploy

Any static host works: GitHub Pages (deploy from the `main` branch, root folder) or Vercel (framework preset "Other", no build command).
