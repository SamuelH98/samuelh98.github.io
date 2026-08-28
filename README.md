# Samuel Hale — Portfolio

Personal portfolio site built with vanilla HTML, CSS, and JavaScript. Hosted on GitHub Pages.

## Sections

- **Hero** — intro with degree, title, and call-to-action buttons
- **Education** — MS Computer Science (4.0 GPA) and BS Software Engineering
- **Experience** — Ultimate SWE project and Senior Capstone
- **Skills** — categorized skill tags
- **Contact** — email, LinkedIn, GitHub

## Resume auto-sync

The `Resume - Samuel Hale.pdf` linked in the nav stays in sync with your live
Typst resume automatically, for free. No export step needed.

You shared the resume via a Typst **read-only link**
(`https://typst.app/project/rFi461t6tLvtN4FW6RvEj0`). Typst exposes project
files anonymously for read-only share links, so this repo can pull the latest
source whenever it changes.

The GitHub Action in `.github/workflows/sync-resume.yml` runs hourly (and
manually from the Actions tab → *Run workflow*) and:

1. Fetches the project's file list and downloads the files directly from
   `api.typst.app`
2. Writes the main file to `Resume - Samuel Hale.typ` (mapping the font family
   `Linux Libertine` → `Linux Libertine O`, which GitHub runners ship)
3. Recompiles `Resume - Samuel Hale.pdf` and commits both if anything changed

`scripts/sync-resume.sh` does the same thing locally (`./scripts/sync-resume.sh`).

> Edit the resume on Typst, save, and the portfolio updates itself on the next
> hourly run — or trigger it instantly with *Run workflow*.

## Local dev

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. No build step required.
