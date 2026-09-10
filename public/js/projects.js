(function () {
  'use strict';

  const API_URL = 'https://api.github.com/users/SamuelH98/repos?per_page=100&sort=pushed';

  // Repos that are coursework, boilerplate, or not this account's own work.
  const EXCLUDE = new Set([
    'samuelh98.github.io',
    'hello-world',
    'github-slideshow',
    'github-upload',
    'markdown-portfolio',
    'presidents-of-the-united-states-test-module',
    'CSC256PublicChangeMgmt',
    'tech-portfolio',
    'CSC256PublicGitRemote',
    'GitIntroActivity',
    'Retirement-Behavioral-Test-Part-2',
    'musical-chainsaw',
    'windows-macosterminal',
    'OSX-KVM',
    'Docker-OSX',
    'void-packages',
    'MagiskOnWSA',
    'SENG-1000-Project',
    'SENG-1020-Project',
    'SENG3000-finalproject',
    'SENG6245_finalproject',
    'Team3-CapstoneProject',
    'CSCI3010-chatapp',
    'CSC221-sjhale-GroupProject',
    'CSCI6020-final-project',
    'CSCI_3700',
    'CSCI-3550-601-Clank-Westgear',
    'Lab-Testing-Wikipedia',
    'nixos-old',
    'nixos-hardware',
    'RestaurantWebApplication',
  ]);

  // Manual titles for repo names that don't prettify well by rule.
  const TITLE_OVERRIDES = {
    'Ultimate-SWE': 'Ultimate SWE',
    pacman_grpo: 'Pacman GRPO',
    'multi-threaded-webapi-SENG-3000': 'Multi-threaded Web API',
    'gnomintosh-nixos': 'Gnomintosh',
    dbview: 'dbview',
    'c-raytracer': 'C Raytracer',
    'resume-tailor': 'Resume Tailor',
    'unstuck-mcp': 'unstuck-mcp',
    'mmr-checker': 'MMR Checker',
    'django-docker-gcp': 'Django Docker GCP',
    LeagueofLegendsStats: 'League of Legends Stats',
    ChocolateEmpire: 'Chocolate Empire',
    talentflow: 'TalentFlow',
    nixos: 'NixOS',
  };

  // Copy for repos whose GitHub description is missing or terse.
  const DESCRIPTION_OVERRIDES = {
    'mission-control':
      'Mission control for AI-assisted development: orchestrates helper agents and keeps long-running work from spiraling.',
    'billing-app': 'Containerized billing application built with Docker.',
    'LANL-Dashboard': 'Dashboard application for exploring Los Alamos National Laboratory datasets.',
    ChocolateEmpire: 'Course-built web application for a chocolate empire storefront.',
    LeagueofLegendsStats: 'League of Legends statistics viewer.',
    nixos: 'Personal NixOS system configuration.',
  };

  // Primary category pill, keyed by repo name or language.
  const CATEGORY = {
    Orange: ['Systems', ''],
    'c-raytracer': ['Graphics', 'tag-ai'],
    dbview: ['CLI Tool', 'tag-tooling'],
    'Ultimate-SWE': ['Dev Tooling', 'tag-tooling'],
    'unstuck-mcp': ['Dev Tooling', 'tag-tooling'],
    pacman_grpo: ['AI / ML', 'tag-ai'],
    C: ['Systems', ''],
    'C++': ['Systems', ''],
    HTML: ['Web App', 'tag-mobile'],
    JavaScript: ['Web App', 'tag-mobile'],
    TypeScript: ['Web App', 'tag-mobile'],
    Cython: ['Data', ''],
    Python: ['Data', ''],
    Java: ['Backend', ''],
    Nim: ['Backend', ''],
    Dockerfile: ['Backend', ''],
    Nix: ['Config', ''],
    Shell: ['Config', ''],
  };

  function titleCase(str) {
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function prettifyName(name) {
    if (TITLE_OVERRIDES[name]) return TITLE_OVERRIDES[name];
    let out = name.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
    out = titleCase(out);
    out = out.replace(/\bSwe\b/g, 'SWE').replace(/\bGrpo\b/g, 'GRPO').replace(/\bMCP\b/gi, 'MCP');
    return out;
  }

  function categoryFor(repo, topics) {
    if (topics.indexOf('portfolio') !== -1) return ['Featured', 'tag-ai'];
    const topic = topics.find((t) => t !== 'portfolio');
    if (topic) return [topic.charAt(0).toUpperCase() + topic.slice(1), ''];
    return CATEGORY[repo.name] || CATEGORY[repo.language] || ['GitHub', ''];
  }

  function stackTags(repo, topics) {
    const tags = [];
    if (repo.language) tags.push(repo.language);
    topics.forEach((t) => {
      if (t !== 'portfolio' && tags.indexOf(t) === -1 && tags.length < 3) tags.push(t);
    });
    return tags;
  }

  function linked(repo) {
    return repo.homepage || repo.html_url;
  }

  function cardHTML(repo) {
    const topics = repo.topics || [];
    const [label, tagClass] = categoryFor(repo, topics);
    const tags = stackTags(repo, topics).slice(0, 4);
    const desc = DESCRIPTION_OVERRIDES[repo.name] || repo.description || `A ${repo.language || ''} project by Samuel Hale.`;
    const tagAttr = tagClass ? 'project-tag ' + tagClass : 'project-tag';
    return [
      '<a class="project-card glass-card" target="_blank" rel="noopener" href="' + linked(repo) + '">',
      '  <div class="project-header">',
      '    <span class="' + tagAttr + '">' + label + '</span>',
      '    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7.8H7.8"/></svg>',
      '  </div>',
      '  <h3 class="project-title">' + prettifyName(repo.name) + '</h3>',
      '  <p class="project-desc">' + desc + '</p>',
      '  <div class="project-stack">' + (tags.map((t) => '<span>' + t + '</span>').join('') || '<span>GitHub</span>') + '</div>',
      '</a>',
    ].join('');
  }

  fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error('GitHub API ' + res.status);
      return res.json();
    })
    .then((repos) => {
      if (!Array.isArray(repos)) throw new Error('Unexpected payload');

      const visible = (repos || [])
        .filter((r) => !r.fork && !r.archived && !EXCLUDE.has(r.name))
        .sort((a, b) => {
          const fa = (a.topics || []).indexOf('portfolio') !== -1 ? 1 : 0;
          const fb = (b.topics || []).indexOf('portfolio') !== -1 ? 1 : 0;
          if (fa !== fb) return fb - fa;
          return new Date(b.pushed_at) - new Date(a.pushed_at);
        });

      if (!visible.length) return;

      const grid = document.querySelector('.projects-bento');
      if (!grid) return;

      grid.innerHTML = '';
      visible.forEach((repo) => {
        const wrap = document.createElement('div');
        wrap.innerHTML = cardHTML(repo);
        grid.appendChild(wrap.firstElementChild);
      });
    })
    .catch(/* keep the static fallback baked into the HTML */ (err) => {
      console.warn('Projects auto-update failed, showing static list.', err);
    });
})();