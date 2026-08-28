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
    919-904-3651 #h(0.4em) | #h(0.4em)
    #link("mailto:samueljameshale1998@gmail.com")[samueljameshale1998\@gmail.com] #h(0.4em) | #h(0.4em)
    #link("https://linkedin.com/in/samuel-james-hale")[Linkedin] 
    #h(0.4em) | #h(0.4em)
    #link("https://samuelh98.github.io")[Portfolio]
    #h(0.4em) | #h(0.4em)
    #text(size: 9.5pt)[US Citizen]
  ]
]

// ══════════════════════════════════════════════════════════════
// SUMMARY
// ══════════════════════════════════════════════════════════════
== Summary

Full Stack Engineer experienced in building applications end-to-end, from interface to database. Delivered student-facing features as part of a 12-person team, resolved UI bugs, and built automation that ensured consistent outputs regardless of operator. Brings a practical mix of front-end polish, back-end logic, and deployment discipline to web products, along with hands-on experience integrating AI tooling — including LLM-powered features, prompt engineering, and AI-assisted development workflows — to accelerate delivery and improve product quality.

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
  [Built and open-sourced Ultimate SWE, a structured AI-agent workflow skill now adopted by the research group to guide coding agents through requirements, architecture, and testing in a disciplined order.],
  [Drive technical direction for the group by evaluating and integrating LLMs, NLP, and computer vision into smart home systems, turning promising tools into working prototypes.],
  [Trusted to independently research and prototype AI-powered features using cloud APIs, informing which approaches the group pursues further.],
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
  [Delivered full-stack features — front end and back end — as part of a 12-person team building a web app to place NC students into math courses.],
  [Designed and built a document auto-generation feature that eliminated a manual, error-prone process, ensuring consistent output regardless of who ran it.],
  [Resolved user-facing UI bugs and helped maintain a CI/CD pipeline that caught issues automatically before they reached later stages.],
)

// ══════════════════════════════════════════════════════════════
// TECHNICAL SKILLS
// ══════════════════════════════════════════════════════════════
== Technical Skills

#grid(
  columns: (auto, 1fr),
  gutter: (0.4em, 0.35em),
  text(weight: "bold")[Languages:],
  [Python, JavaScript/TypeScript, Java, C\#, C/C++, SQL, Go],
  text(weight: "bold")[Web & Backend:],
  [React, Angular, Node.js, Django, Spring Boot, Flask, .NET, REST/GraphQL, microservices],
  text(weight: "bold")[Cloud & DevOps:],
  [AWS, Azure, Docker, Kubernetes, Terraform, CI/CD (GitHub Actions, Jenkins, GitLab, Azure DevOps)],
  text(weight: "bold")[Databases:],
  [PostgreSQL, MySQL, SQL Server, Redis, Neo4j],
  text(weight: "bold")[AI & Tooling:],
  [Claude Code, GitHub Copilot, LLM-assisted development, prompt engineering],
  text(weight: "bold")[Practices:],
  [Agile/Scrum, TDD, secure coding (OWASP, OAuth 2.0/JWT), Git/GitHub],
)

// ══════════════════════════════════════════════════════════════
// EDUCATION
// ══════════════════════════════════════════════════════════════
== Education

#entry[East Carolina University — M.S. in Computer Science][Jan. 2023 – May 2026]

#v(0.5em)
#entry[East Carolina University — B.S. in Software Engineering, Concentration in Data Science][Aug. 2021 – May 2025]
#text(style: "italic")[Chancellor's List (Spring 2025), Dean's List (Fall 2022, Fall 2023) · BS/MS Accelerated Program]