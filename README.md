# Samuel Hale — Portfolio

Personal portfolio site built with vanilla HTML, CSS, and JavaScript. Hosted on GitHub Pages.

## Sections

- **Hero** — intro with degree, title, and call-to-action buttons
- **Education** — MS Computer Science (4.0 GPA) and BS Software Engineering
- **Experience** — Ultimate SWE project and Senior Capstone
- **Skills** — categorized skill tags
- **Contact** — email, LinkedIn, GitHub

## Projects auto-update

The projects section is generated client-side by `public/js/projects.js`. On load
it fetches your public repos from the GitHub API and renders a card per project:

- Coursework, boilerplate, and fork repos are filtered out via the `EXCLUDE`
  list in `projects.js` — edit that list to hide or reveal repos.
- Repos tagged with a **`portfolio`** GitHub topic are pinned to the top and
  marked "Featured" (add/remove the topic on GitHub to reorder without code).
- Cards link to the repo (or its GitHub Pages site when a homepage is set).

If the API is unreachable, the static cards baked into `index.html` remain.

## Local dev

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. No build step required.
