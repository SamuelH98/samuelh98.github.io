/* ==========================================================================
   Resume Tailor — matches a pasted job description against resume-data.js,
   builds a Typst document from the result, and compiles it to PDF/SVG
   entirely in the browser via the typst.ts WASM compiler. No server,
   no API keys, no data ever leaves the browser tab.
   ========================================================================== */

(() => {
  const DATA = window.RESUME_DATA;

  // Extra synonyms so short JD phrasing ("k8s", "ML", "postgres"...) still matches.
  const SYNONYMS = {
    "JavaScript": ["js"],
    "TypeScript": ["ts"],
    "Kubernetes": ["k8s"],
    "PostgreSQL": ["postgres"],
    "Machine Learning": ["ml"],
    "Reinforcement Learning": ["rl"],
    "Natural Language Processing": ["nlp"],
    "NLP": ["natural language processing"],
    "Computer Vision": ["cv"],
    "CI/CD": ["continuous integration", "continuous deployment"],
    "REST API Design": ["rest api", "restful api", "rest apis"],
    "Node.js": ["nodejs", "node"],
    ".NET": ["dotnet", "asp.net"],
    "OAuth 2.0": ["oauth"],
    "LLM Integration": ["large language model", "llms", "llm"],
    "Prompt Engineering": ["prompt engineer"],
    "Google Cloud Platform": ["gcp"],
    "Agile": ["scrum", "kanban"],
  };

  // ---------- matching ----------
  const regexCache = new Map();

  function tagVariants(tag) {
    const base = tag.toLowerCase();
    const variants = [base];
    if (SYNONYMS[tag]) variants.push(...SYNONYMS[tag].map((s) => s.toLowerCase()));
    if (base.includes("/")) variants.push(...base.split("/").map((s) => s.trim()));
    return variants.filter(Boolean);
  }

  function matchesJD(tag, jdLower) {
    return tagVariants(tag).some((v) => {
      let re = regexCache.get(v);
      if (!re) {
        const esc = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        re = new RegExp(`(?:^|[^a-z0-9])${esc}(?:[^a-z0-9]|$)`, "i");
        regexCache.set(v, re);
      }
      return re.test(jdLower);
    });
  }

  function tailorResume(jdText) {
    const jdLower = jdText.toLowerCase();
    const hasJD = jdLower.trim().length > 0;

    const categories = DATA.skillCategories.map((cat) => {
      const matched = hasJD ? cat.tags.filter((t) => matchesJD(t, jdLower)) : [];
      return { ...cat, matched, score: matched.length };
    });
    const sortedCategories = hasJD ? [...categories].sort((a, b) => b.score - a.score) : categories;

    const scoredProjects = DATA.projects.map((p) => {
      const matchedTags = hasJD ? p.tags.filter((t) => matchesJD(t, jdLower)) : [];
      let score = matchedTags.length;
      if (hasJD && jdLower.includes(p.title.toLowerCase())) score += 2;
      return { ...p, matchedTags, score };
    });
    const orderedProjects = hasJD ? [...scoredProjects].sort((a, b) => b.score - a.score) : scoredProjects;
    const selectedProjects = orderedProjects.slice(0, 3).map((p) => {
      if (!hasJD) return { ...p, bullets: p.bullets.slice(0, 2) };
      const scoredBullets = p.bullets.map((b) => ({
        ...b,
        score: b.tags.filter((t) => matchesJD(t, jdLower)).length,
      }));
      return { ...p, bullets: [...scoredBullets].sort((a, b) => b.score - a.score).slice(0, 2) };
    });

    const experience = DATA.experience.map((exp) => {
      const scoredBullets = exp.bullets.map((b) => ({
        ...b,
        score: hasJD ? b.tags.filter((t) => matchesJD(t, jdLower)).length : 0,
      }));
      const orderedBullets = hasJD ? [...scoredBullets].sort((a, b) => b.score - a.score) : scoredBullets;
      return { ...exp, bullets: orderedBullets.slice(0, 2) };
    });

    // Collect skills demonstrated by matched experience + project bullets
    if (hasJD) {
      const expSkillTags = new Set();
      experience.forEach((exp) => {
        exp.bullets.forEach((b) => {
          if (b.score > 0) b.tags.forEach((t) => expSkillTags.add(t.toLowerCase()));
        });
      });
      selectedProjects.forEach((p) => {
        p.stack.forEach((t) => expSkillTags.add(t.toLowerCase()));
        p.tags.forEach((t) => expSkillTags.add(t.toLowerCase()));
        p.bullets.forEach((b) => {
          if (b.score > 0) b.tags.forEach((t) => expSkillTags.add(t.toLowerCase()));
        });
      });
      categories.forEach((cat) => {
        cat.tags.forEach((t) => {
          if (expSkillTags.has(t.toLowerCase()) && !cat.matched.some((m) => m.toLowerCase() === t.toLowerCase())) {
            cat.matched.push(t);
          }
        });
        cat.score = cat.matched.length;
      });
      sortedCategories.sort((a, b) => b.score - a.score);
    }

    const matchedCoursework = hasJD
      ? DATA.coursework
          .map((c) => ({
            ...c,
            score: c.tags.filter((t) => matchesJD(t, jdLower)).length,
          }))
          .filter((c) => c.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
      : [];

    const topCategories = sortedCategories.filter((c) => c.score > 0).slice(0, 3).map((c) => c.name);
    const matchedSkillTags = categories.flatMap((c) => c.matched);
    const totalScore = categories.reduce((s, c) => s + c.score, 0) + scoredProjects.reduce((s, p) => s + p.score, 0);

    return {
      hasJD,
      totalScore,
      topCategories,
      matchedSkillTags,
      selectedProjects,
      matchedCoursework,
      selection: {
        header: DATA.header,
        education: DATA.education,
        skillCategories: sortedCategories,
        experience,
        projects: selectedProjects,
      },
    };
  }

  // ---------- typst generation ----------
  function tEsc(str) {
    return String(str).replace(/([\\#$*_@`<>[\]])/g, "\\$1");
  }

  function buildSkillsBlock(skillCategories, hasJD) {
    const rows = skillCategories
      .filter((cat) => !hasJD || cat.matched.length > 0)
      .map((cat) => {
        const matchedSet = new Set(cat.matched.map((t) => t.toLowerCase()));
        const tags = hasJD
          ? cat.matched
          : [...cat.tags].sort((a, b) => {
              const am = matchedSet.has(a.toLowerCase()) ? 0 : 1;
              const bm = matchedSet.has(b.toLowerCase()) ? 0 : 1;
              return am - bm;
            });
        const tagsStr = tags.map((t) => tEsc(t)).join(", ");
        return `  text(weight: "bold")[${tEsc(cat.name)}:],\n  [${tagsStr}],`;
      })
      .join("\n");
    return `#grid(\n  columns: (auto, 1fr),\n  gutter: (0.4em, 0.32em),\n${rows}\n)`;
  }

  function buildEducationBlock(education) {
    return education
      .map(
        (ed) =>
          `#entry[${tEsc(ed.degree)}][${tEsc(ed.date)}]\n#text(style: "italic", size: 8.3pt)[${tEsc(ed.meta)}]`
      )
      .join("\n#v(0.22em)\n");
  }

  function buildExperienceBlock(experience) {
    return experience
      .map((exp) => {
        const bullets = exp.bullets.map((b) => `  [${tEsc(b.text)}],`).join("\n");
        return `#v(0.2em)\n#entry[${tEsc(exp.title)}][${tEsc(exp.date)}]\n#text(style: "italic", size: 8.3pt)[${tEsc(
          exp.meta
        )} — ${tEsc(exp.link)}]\n#list(\n  indent: 1em,\n${bullets}\n)`;
      })
      .join("\n");
  }

  function buildProjectsBlock(projects) {
    return projects
      .map((p) => {
        const bullets = p.bullets.map((b) => `  [${tEsc(typeof b === "string" ? b : b.text)}],`).join("\n");
        const linkLine = p.link ? `\n#text(style: "italic", size: 8.3pt)[${tEsc(p.link)}]` : "";
        return `#v(0.2em)\n#entry[${tEsc(p.title)}][${tEsc(p.stack.join(" · "))}]${linkLine}\n#list(\n  indent: 1em,\n${bullets}\n)`;
      })
      .join("\n");
  }

  function buildCourseworkBlock(coursework) {
    if (!coursework || coursework.length === 0) return "";
    const items = coursework.map((c) => `${tEsc(c.id)}: ${tEsc(c.name)}`).join(", ");
    return items;
  }

  function buildTypstSource(result) {
    const { header } = result.selection;
    const focusLine =
      result.hasJD && result.topCategories.length
        ? `#align(center)[#text(size: 8.3pt, style: "italic", fill: rgb("#0891b2"))[Tailored focus: ${tEsc(
            result.topCategories.join(", ")
          )}]]\n#v(0.18em)`
        : "";

    return `#set page(margin: (x: 0.65in, y: 0.45in))
#set text(size: 9.2pt)
#set par(leading: 0.46em, justify: false)

#show heading.where(level: 2): it => {
  v(0.3em)
  block(width: 100%)[
    #text(size: 10pt, weight: "bold")[#it.body]
    #line(length: 100%, stroke: 0.5pt + black)
  ]
  v(0.1em)
}

#let entry(title, date) = grid(
  columns: (1fr, auto),
  text(weight: "bold")[#title],
  text(style: "italic", size: 8.3pt)[#date]
)

#align(center)[
  #text(size: 15pt, weight: "bold")[${tEsc(header.name)}] \\
  #v(0.1em)
  #text(size: 8.3pt)[
    ${tEsc(header.phone)} #h(0.35em)|#h(0.35em)
    #link("mailto:${header.email}")[${tEsc(header.email)}] #h(0.35em)|#h(0.35em)
    #link("https://${header.linkedin}")[${tEsc(header.linkedin)}] #h(0.35em)|#h(0.35em)
    #link("https://${header.site}")[${tEsc(header.site)}] #h(0.35em)|#h(0.35em)
    ${tEsc(header.citizenship)}
  ]
]
#v(0.15em)
${focusLine}

== Education
${buildEducationBlock(result.selection.education)}

== Skills
${buildSkillsBlock(result.selection.skillCategories, result.hasJD)}

${result.hasJD && result.matchedCoursework.length > 0 ? `== Relevant Coursework\n${buildCourseworkBlock(result.matchedCoursework)}\n\n` : ""}== Experience
${buildExperienceBlock(result.selection.experience)}

== Selected Projects
${buildProjectsBlock(result.selection.projects)}
`;
  }

  // ---------- UI wiring ----------
  const jdInput = document.getElementById("jd-input");
  const generateBtn = document.getElementById("generate-btn");
  const statusEl = document.getElementById("tailor-status");
  const previewEl = document.getElementById("pdf-preview");
  const downloadBtn = document.getElementById("download-btn");
  const summaryEl = document.getElementById("match-summary");
  const projectsListEl = document.getElementById("selected-projects-list");

  function setStatus(msg, isError) {
    statusEl.textContent = msg;
    statusEl.classList.toggle("tailor-status-error", !!isError);
  }

  function renderSummary(result) {
    summaryEl.innerHTML = "";
    if (!result.hasJD) {
      summaryEl.innerHTML = `<span class="tailor-hint">Paste a job description above to see matched skills here.</span>`;
    } else if (result.matchedSkillTags.length === 0) {
      summaryEl.innerHTML = `<span class="tailor-hint">No direct skill matches found — showing the default resume ordering.</span>`;
    } else {
      result.matchedSkillTags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.className = "tailor-chip";
        chip.textContent = tag;
        summaryEl.appendChild(chip);
      });
    }

    projectsListEl.innerHTML = "";
    result.selectedProjects.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p.title + (result.hasJD && p.score > 0 ? ` (${p.score} match${p.score === 1 ? "" : "es"})` : "");
      projectsListEl.appendChild(li);
    });
  }

  let compilerReady = false;

  async function generate() {
    if (!compilerReady) {
      setStatus("Compiler still loading, one moment…");
      return;
    }
    generateBtn.disabled = true;
    setStatus("Scoring your job description…");
    const result = tailorResume(jdInput.value || "");
    renderSummary(result);

    const source = buildTypstSource(result);
    setStatus("Compiling tailored resume with Typst (WASM)…");

    try {
      const rawSvg = await window.$typst.svg({ mainContent: source });
      // Typst emits <style>svg { fill: none }</style> inside the SVG which
      // leaks globally and kills fill on every other SVG on the page.
      // Fix: give the SVG an ID and namespace all <style> selectors so they
      // only apply inside the Typst SVG, never outside.
      const svgId = "typst-preview";
      const namespaced = rawSvg
        .replace(/<svg\b/, `<svg id="${svgId}"`)
        .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => {
          const scoped = css.replace(/([^{}]+)(\{)/g, (match, selectors, brace) => {
            const prefixed = selectors.split(",").map(s => `#${svgId} ${s.trim()}`).join(", ");
            return prefixed + brace;
          });
          return `<style>${scoped}</style>`;
        });
      previewEl.innerHTML = namespaced;

      const pdfData = await window.$typst.pdf({ mainContent: source });
      const blob = new Blob([pdfData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      downloadBtn.href = url;
      downloadBtn.download = "Samuel_Hale_Resume_Tailored.pdf";
      downloadBtn.classList.remove("tailor-btn-disabled");
      downloadBtn.removeAttribute("aria-disabled");
      setStatus("Done — tailored resume compiled entirely in your browser.");
    } catch (err) {
      console.error(err);
      setStatus("Compile error: " + (err && err.message ? err.message : err), true);
    } finally {
      generateBtn.disabled = false;
    }
  }

  function initCompiler() {
    const typstScript = document.getElementById("typst");
    if (!typstScript) return;

    function onCompilerReady() {
      window.$typst.setCompilerInitOptions({
        getModule: () => "public/vendor/typst/typst_ts_web_compiler_bg.wasm",
      });
      window.$typst.setRendererInitOptions({
        getModule: () => "public/vendor/typst/typst_ts_renderer_bg.wasm",
      });
      compilerReady = true;
      setStatus("Ready. Paste a job description and click Generate — or just click Generate for the default resume.");
      generate();
    }

    // <script type="module"> is deferred and may have already fired by DOMContentLoaded
    if (window.$typst) {
      onCompilerReady();
      return;
    }

    typstScript.addEventListener("load", onCompilerReady);
    typstScript.addEventListener("error", () => {
      setStatus("Could not load the Typst WASM compiler (network/CDN issue). Try refreshing.", true);
    });
  }

  let compilerStarted = false;
  function startCompiler() {
    if (compilerStarted) return;
    compilerStarted = true;
    setStatus("Loading Typst WASM compiler…");
    initCompiler();
  }

  document.addEventListener("DOMContentLoaded", () => {
    generateBtn.addEventListener("click", generate);

    const section = document.getElementById("resume-tailor");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          startCompiler();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(section);
  });
})();
