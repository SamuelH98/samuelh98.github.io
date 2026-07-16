#set page(margin: (x: 0.75in, y: 0.65in))
#set text(font: "Linux Libertine O", size: 10.5pt)
#set par(leading: 0.55em)

// ── Heading style ──────────────────────────────────────────────
#show heading.where(level: 2): it => {
  v(0.45em)
  block(width: 100%)[
    #text(size: 11pt, weight: "bold")[#it.body]
    #line(length: 100%, stroke: 0.5pt + black)
  ]
  v(0.2em)
}

// ── Helper: right-aligned date on same line as bold title ──────
#let entry(title, date) = {
  grid(
    columns: (1fr, auto),
    text(weight: "bold")[#title],
    text(style: "italic")[#date]
  )
}

// ══════════════════════════════════════════════════════════════
// HEADER
// ══════════════════════════════════════════════════════════════
#align(center)[
  #text(size: 16pt, weight: "bold")[Samuel James Hale] \
  #v(0.2em)
  #text(size: 9.5pt)[
    919-904-3651 #h(0.3em)|#h(0.3em)
    #link("mailto:samueljameshale1998@gmail.com")[samueljameshale1998\@gmail.com] #h(0.3em)|#h(0.3em)
    #link("https://linkedin.com/in/samuel-james-hale")[linkedin.com/in/samuel-james-hale] #h(0.3em)|#h(0.3em)
    #link("https://samuelh98.github.io")[samuelh98.github.io] #h(0.3em)|#h(0.3em)
    U.S. Citizen
  ]
]

// ══════════════════════════════════════════════════════════════
// EDUCATION
// ══════════════════════════════════════════════════════════════
== Education

#entry[East Carolina University — M.S. in Computer Science][Jan. 2023 – May 2026]
#text(style: "italic")[GPA: 4.0]

#v(0.5em)
#entry[East Carolina University — B.S. in Software Engineering, Concentration in Data Science][Aug. 2021 – May 2025]
#text(style: "italic")[Chancellor's List (Spring 2025), Dean's List (Fall 2022, Fall 2023) · BS/MS Accelerated Program]

// ══════════════════════════════════════════════════════════════
// TECHNICAL SKILLS
// ══════════════════════════════════════════════════════════════
== Technical Skills

#grid(
  columns: (auto, 1fr),
  gutter: (0.4em, 0.35em),
  text(weight: "bold")[Languages:],
  [Python, JavaScript, TypeScript, Java, C\#, C/C++, SQL, Go, Bash],
  text(weight: "bold")[Web & Frontend:],
  [React, Angular, Express.js, HTML/CSS, RESTful API Design, GraphQL, HTMX],
  text(weight: "bold")[Backend:],
  [Spring Boot, Django, Flask, Micronaut, Node.js, .NET, Microservices, gRPC],
  text(weight: "bold")[Databases:],
  [PostgreSQL, MySQL, SQL Server, SQLite, Neo4j, Redis; query optimization, indexing, RBAC],
  text(weight: "bold")[Cloud & DevOps:],
  [AWS (Lambda, RDS, IoT Core, Cognito, EC2, S3), Azure, Docker, Kubernetes, Terraform, Linux, CI/CD (GitHub Actions, Jenkins, GitLab CI/CD, Azure DevOps)],
  text(weight: "bold")[Testing & Quality:],
  [JUnit, pytest, unit/integration testing, test-driven development (TDD), code review],
  text(weight: "bold")[Security:],
  [OWASP Top 10, JWT/OAuth 2.0 authentication, secure coding practices, input validation],
  text(weight: "bold")[AI & Tooling:],
  [Claude Code, GitHub Copilot, LLM-assisted development, prompt engineering],
  text(weight: "bold")[Version Control:],
  [Git, GitHub, GitLab; pull request workflows, branching strategies, SVN],
  text(weight: "bold")[Process:],
  [Agile/Scrum, sprint planning, system design, technical documentation],
)

// ══════════════════════════════════════════════════════════════
// EXPERIENCE & PROJECTS
// ══════════════════════════════════════════════════════════════
== Relevant Experience & Projects

// ── AI Research Group + Ultimate SWE ──────────────────────────
#v(0.3em)
#entry[
  AI Researcher & Programmer — ECU Faculty Research Group |
  #text(style: "italic")[(LLMs, NLP, Prompt Engineering, Smart Home AI)]
][2025 – Present]
#text(style: "italic")[#link("https://github.com/SamuelH98/Ultimate-SWE")[github.com/SamuelH98/Ultimate-SWE]]

#list(
  indent: 1em,
  [Collaborate weekly with a professor-led research group evaluating and integrating emerging AI tooling into smart home systems, spanning LLMs, voice assistants, NLP, and computer vision.],
  [Designed and contributed Ultimate SWE — a structured workflow skill adopted by the group to guide AI coding agents through requirements, architecture, testing, and handoff in a disciplined order rather than jumping straight to code.],
  [Research and prototype AI-powered features using cloud-based APIs and language models, assessing feasibility and performance for real-world home automation use cases.],
  [Drive technical direction by identifying promising tools, documenting implementation approaches, and presenting findings to guide future experiments.],
)

// ── Capstone ──────────────────────────────────────────────────
#v(0.3em)
#entry[
  Full-Stack Developer — Senior Capstone |
  #text(style: "italic")[(Django, PostgreSQL, Python, GitLab CI/CD)]
][Aug. 2024 – May 2025]
#text(style: "italic")[NC Math Placement Web Application · Team of 12]

#list(
  indent: 1em,
  [Part of a 12-person student team that built a real web application used to place North Carolina students into the right math courses — I worked on both the front end (what users see) and the back end (the logic and database behind the scenes).],
  [Created a feature that automatically generates formatted documents from the app's data, saving the team from doing it by hand every time and making sure the output looked consistent no matter who ran it.],
  [Fixed several visual bugs in the app's interface that were confusing users, then worked with teammates to get those fixes added to the shared codebase without causing new problems.],
  [Helped keep our automated test pipeline running smoothly so that every time someone submitted new code, the system checked it for problems automatically — this meant we caught mistakes early instead of finding them after launch.],
)
