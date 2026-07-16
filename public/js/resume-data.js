/* ==========================================================================
   Resume data model — single source of truth for the Resume Tailor tool.
   Every skill / project / bullet carries a `tags` array used to score it
   against a pasted job description. Nothing here is ever built from
   arbitrary user input, so it's safe to drop straight into Typst markup.
   ========================================================================== */

window.RESUME_DATA = {

  header: {
    name: "Samuel James Hale",
    phone: "919-904-3651",
    email: "samueljameshale1998@gmail.com",
    linkedin: "linkedin.com/in/samuel-james-hale",
    site: "samuelh98.github.io",
    citizenship: "U.S. Citizen",
  },

  education: [
    {
      degree: "East Carolina University — M.S. in Computer Science",
      date: "Jan. 2023 – May 2026",
      meta: "GPA: 4.0",
    },
    {
      degree: "East Carolina University — B.S. in Software Engineering, Concentration in Data Science",
      date: "Aug. 2021 – May 2025",
      meta: "Chancellor's List (Spring 2025), Dean's List (Fall 2022, Fall 2023) · BS/MS Accelerated Program",
    },
  ],

  coursework: [
    { id: "CSC251", name: "Advanced JAVA Programming", tags: ["java", "object-oriented", "java se", "java enterprise", "spring", "jpa", "jdbc", "maven"] },
    { id: "CSC121", name: "Python Programming", tags: ["python", "python programming", "scripting"] },
    { id: "CSC221", name: "Advanced Python Programming", tags: ["python", "advanced python", "oop", "decorators", "generators", "async"] },
    { id: "CSC227", name: "Cloud Application Development", tags: ["cloud", "cloud application", "aws", "azure", "cloud deployment", "serverless", "cloud native"] },
    { id: "CSC256", name: "Software Quality Assurance", tags: ["qa", "quality assurance", "testing", "selenium", "test automation", "test case", "regression testing", "istqb"] },
    { id: "DBA120", name: "Database Programming", tags: ["database", "sql", "mysql", "sql server", "stored procedure", "database design", "query optimization"] },
    { id: "CTI110", name: "Web, Programming & Database Foundation", tags: ["web development", "html", "css", "javascript", "database", "sql", "web application"] },
    { id: "CSC134", name: "C++ Programming", tags: ["c++", "cpp", "object-oriented", "stl", "memory management"] },
    { id: "CSC151", name: "JAVA Programming", tags: ["java", "java programming", "object-oriented"] },
    { id: "CTI120", name: "Network & Security Foundation", tags: ["networking", "network security", "firewall", "tcp", "udp", "cisco", "ccna"] },
    { id: "CSC154", name: "Software Development", tags: ["software development", "software lifecycle", "agile", "version control", "git"] },
    { id: "CSCI 6840", name: "Data Mining", tags: ["data mining", "data analysis", "data science", "etl", "data pipeline", "classification", "clustering"] },
    { id: "CSCI 6020", name: "Machine Learning", tags: ["machine learning", "ml engineer", "model training", "supervised learning", "unsupervised learning", "scikit-learn", "tensorflow", "pytorch", "neural network", "deep learning", "model deployment"] },
    { id: "CSCI 6010", name: "Big Data Analytics & Management", tags: ["big data", "hadoop", "spark", "data engineering", "data warehouse", "etl", "data pipeline", "kafka", "hive"] },
    { id: "CSCI 6035", name: "Reinforcement Learning", tags: ["reinforcement learning", "rl", "reward shaping", "policy gradient", "q-learning", "agent"] },
    { id: "CSCI 6810", name: "Topics in Artificial Intelligence", tags: ["artificial intelligence", "ai engineer", "generative ai", "llm", "large language model", "nlp", "computer vision", "ai infrastructure"] },
    { id: "CSCI 6905", name: "Topics in Computer Science", tags: [] },
    { id: "CSCI 6995", name: "Research Project", tags: [] },
    { id: "CSCI 6710", name: "Enterprise Web Applications", tags: ["enterprise web", "java enterprise", "spring", "microservice", "rest api", "web application", "full stack", "fullstack"] },
    { id: "SENG 6285", name: "Cloud Computing", tags: ["cloud", "aws", "azure", "gcp", "cloud infrastructure", "serverless", "lambda", "cloud deployment", "terraform", "cloud native"] },
    { id: "SENG 6245", name: "Software Construction", tags: ["software construction", "design patterns", "solid", "refactoring", "code quality", "clean code", "software craftsmanship"] },
    { id: "CSCI 4140", name: "Natural Language Processing", tags: ["nlp", "natural language processing", "text classification", "named entity", "sentiment analysis", "transformer", "bert", "tokenization"] },
    { id: "CSCI 5800", name: "Artificial Intelligence", tags: ["artificial intelligence", "search algorithm", "constraint satisfaction", "knowledge representation", "expert system"] },
    { id: "CSCI 3000", name: "Operating Systems", tags: ["operating system", "linux kernel", "systems programming", "concurrency", "thread", "memory management", "process scheduling"] },
    { id: "CSCI 3010", name: "Computer Networks", tags: ["computer network", "networking", "tcp", "udp", "http", "dns", "load balancer", "firewall", "network security"] },
    { id: "CSCI 3650", name: "Design & Analysis of Algorithms", tags: ["algorithm", "data structure", "complexity", "dynamic programming", "graph algorithm", "sorting", "searching"] },
  ],

  // Order here is the default/fallback order when a category has no matches.
  skillCategories: [
    {
      name: "Languages",
      tags: ["Python", "JavaScript", "TypeScript", "Java", "C#", "C/C++", "Nim", "Cython", "Go", "Bash", "SQL", "HTML/CSS"],
    },
    {
      name: "Web & Frontend",
      tags: ["React", "React Native", "Angular", "Express.js", "HTMX", "GraphQL", "REST API Design"],
    },
    {
      name: "Backend",
      tags: ["Spring Boot", "Django", "Flask", "Micronaut", "Node.js", ".NET", "Microservices", "gRPC"],
    },
    {
      name: "Databases",
      tags: ["PostgreSQL", "MySQL", "SQL Server", "SQLite", "Neo4j", "Redis", "query optimization", "indexing", "schema design"],
    },
    {
      name: "Cloud & DevOps",
      tags: ["AWS", "Lambda", "Google Cloud Platform", "Azure", "Docker", "Kubernetes", "NixOS", "Terraform", "CI/CD", "GitHub Actions", "Jenkins", "GitLab CI/CD"],
    },
    {
      name: "ML & AI",
      tags: ["PyTorch", "Reinforcement Learning", "GRPO", "PPO", "LLM Integration", "NLP", "Computer Vision", "Prompt Engineering", "TensorBoard", "Machine Learning"],
    },
    {
      name: "Graphics & Systems",
      tags: ["Vulkan", "GLFW", "Wayland", "wlroots", "Ray Tracing", "Linux", "Binary Parsing", "Systems Programming"],
    },
    {
      name: "Security",
      tags: ["OWASP Top 10", "JWT", "OAuth 2.0", "Secure Coding"],
    },
    {
      name: "Testing & Quality",
      tags: ["pytest", "JUnit", "Selenium", "TDD", "Unit Testing", "Integration Testing", "Software Verification"],
    },
    {
      name: "Process & Tooling",
      tags: ["Agile", "Scrum", "Requirements Engineering", "System Design", "Git", "GitHub", "GitLab", "MCP Protocol", "AI-assisted Development", "Technical Writing"],
    },
  ],

  experience: [
    {
      title: "AI Researcher & Programmer — ECU Faculty Research Group",
      meta: "LLMs, NLP, Prompt Engineering, Smart Home AI",
      link: "github.com/SamuelH98/Ultimate-SWE",
      date: "2025 – Present",
      bullets: [
        {
          text: "Collaborate weekly with a professor-led research group evaluating and integrating emerging AI tooling into smart home systems, spanning LLMs, voice assistants, NLP, and computer vision.",
          tags: ["llm", "nlp", "voice assistant", "computer vision", "smart home", "iot", "research"],
        },
        {
          text: "Designed and contributed Ultimate SWE, a structured workflow skill adopted by the group to guide AI coding agents through requirements, architecture, testing, and handoff in a disciplined order rather than jumping straight to code.",
          tags: ["ai agents", "requirements engineering", "software architecture", "workflow", "prompt engineering", "technical writing"],
        },
        {
          text: "Research and prototype AI-powered features using cloud-based APIs and language models, assessing feasibility and performance for real-world home automation use cases.",
          tags: ["api integration", "llm", "prototyping", "cloud", "feasibility analysis"],
        },
        {
          text: "Drive technical direction by identifying promising tools, documenting implementation approaches, and presenting findings to guide future experiments.",
          tags: ["technical leadership", "documentation", "research"],
        },
      ],
    },
    {
      title: "Full-Stack Developer — Senior Capstone",
      meta: "Django, PostgreSQL, Python, GitLab CI/CD",
      link: "NC Math Placement Web Application · Team of 12",
      date: "Aug. 2024 – May 2025",
      bullets: [
        {
          text: "Part of a 12-person student team that built a production web application used to place North Carolina students into the right math courses, working across both the front end and the back end.",
          tags: ["django", "full-stack", "web application", "team", "python", "postgresql"],
        },
        {
          text: "Built a feature that automatically generates formatted documents from the application's data, eliminating manual work and keeping output consistent regardless of who ran it.",
          tags: ["automation", "document generation", "backend"],
        },
        {
          text: "Diagnosed and fixed interface bugs that were confusing users, then coordinated with teammates to merge the fixes into the shared codebase without introducing regressions.",
          tags: ["debugging", "frontend", "collaboration", "code review"],
        },
        {
          text: "Maintained the team's CI/CD pipeline so every submission was automatically tested, catching integration issues before they reached production.",
          tags: ["ci/cd", "gitlab", "testing", "devops"],
        },
      ],
    },
  ],

  // Every project has technology + domain tags used for scoring.
  // Each bullet also carries tags so the tailor picks the most relevant ones.
  projects: [
    {
      title: "Orange",
      link: "github.com/SamuelH98/Orange",
      stack: ["C", "wlroots", "Meson", "Wayland"],
      tags: ["c", "wayland", "wlroots", "linux", "gpu", "graphics", "systems programming", "desktop environment", "compositor", "drm", "nvidia"],
      bullets: [
        {
          text: "Designed and built a full Wayland compositor from scratch in C, delivering a macOS-inspired desktop environment — shell, dock, desktop icons, menus, and wallpaper — demonstrating end-to-end systems programming ownership.",
          tags: ["c", "wayland", "wlroots", "systems programming", "linux", "compositor"],
        },
        {
          text: "Resolved GPU driver compatibility across Intel, AMD, and NVIDIA hardware including Optimus hybrid graphics, ensuring broad Linux desktop support without vendor-specific workarounds.",
          tags: ["gpu", "nvidia", "linux", "drm", "graphics"],
        },
      ],
    },
    {
      title: "LANL-Dashboard",
      link: "",
      stack: ["C", "Python", "Neo4j", "Gradio", "Ollama/Gemma"],
      tags: ["cybersecurity", "neo4j", "graph database", "python", "c", "llm", "docker", "data pipeline", "dashboard", "threat detection", "security", "machine learning"],
      bullets: [
        {
          text: "Engineered a multi-stage cybersecurity analysis pipeline that reduced manual log review from hours to minutes, enabling faster threat identification for the Los Alamos National Laboratory dataset.",
          tags: ["cybersecurity", "data pipeline", "security", "threat detection", "python"],
        },
        {
          text: "Built a multi-threaded C preprocessor that parses millions of authentication logs into a Neo4j graph, giving the security team a queryable, relationship-aware view of network activity.",
          tags: ["c", "neo4j", "graph database", "cybersecurity", "systems programming"],
        },
        {
          text: "Integrated a Gemma LLM agent for autonomous threat detection and human-readable security report generation, reducing analyst overhead and accelerating incident response.",
          tags: ["llm", "machine learning", "security", "threat detection", "api integration"],
        },
      ],
    },
    {
      title: "pacman_grpo",
      link: "",
      stack: ["Python", "PyTorch"],
      tags: ["python", "pytorch", "reinforcement learning", "machine learning", "grpo", "ppo", "multiprocessing", "ai agent", "deep learning"],
      bullets: [
        {
          text: "Implemented GRPO from DeepSeek's research paper to train an autonomous Pac-Man agent, improving convergence over standard PPO by leveraging group-relative advantage estimation.",
          tags: ["reinforcement learning", "machine learning", "pytorch", "python", "grpo", "ppo"],
        },
        {
          text: "Built parallel trajectory collection with TensorBoard logging, enabling rapid experiment iteration and reproducible training runs across multiple reward shaping strategies.",
          tags: ["python", "pytorch", "multiprocessing", "machine learning", "deep learning"],
        },
      ],
    },
    {
      title: "SmartDo",
      link: "",
      stack: ["TypeScript", "React Native", "Expo"],
      tags: ["react native", "typescript", "mobile", "ios", "android", "expo", "mobile app", "ui/ux", "frontend"],
      bullets: [
        {
          text: "Designed and shipped a cross-platform task management app with hierarchical organization and gesture-based interactions, improving personal productivity through a clean, Things3-inspired UX.",
          tags: ["react native", "typescript", "mobile", "mobile app", "ui/ux"],
        },
        {
          text: "Implemented responsive dark/light theming and search with NativeWind and Expo Router, reducing UI development time while maintaining a consistent design system.",
          tags: ["react native", "typescript", "frontend", "ui/ux", "expo"],
        },
      ],
    },
    {
      title: "SkyScript",
      link: "",
      stack: ["Django", "Python", "Cohere API"],
      tags: ["django", "python", "api integration", "llm", "weather", "sqlite", "backend", "nlp"],
      bullets: [
        {
          text: "Integrated Cohere's language model into a weather application to generate contextual forecasts and clothing recommendations, turning raw data into actionable, personalized advice for users.",
          tags: ["llm", "nlp", "api integration", "django", "python"],
        },
        {
          text: "Designed a Django backend with SQLite persistence for user preferences, ensuring a seamless cross-session experience without requiring user authentication.",
          tags: ["django", "python", "sqlite", "backend"],
        },
      ],
    },
    {
      title: "mmr-checker",
      link: "",
      stack: ["Node.js", "SQLite", "Riot API"],
      tags: ["node.js", "javascript", "sqlite", "api integration", "caching", "backend", "rest api"],
      bullets: [
        {
          text: "Built a self-hosted MMR estimator that reverse-engineers hidden matchmaking data across all regions, giving players visibility into a metric Riot Games does not expose publicly.",
          tags: ["node.js", "javascript", "api integration", "backend", "rest api"],
        },
        {
          text: "Implemented SQLite caching with season-aware invalidation, cutting repeat lookup latency from multiple API calls to near-instant responses and reducing external API consumption.",
          tags: ["node.js", "sqlite", "caching", "javascript", "backend"],
        },
      ],
    },
    {
      title: "c-raytracer",
      link: "",
      stack: ["C", "Vulkan", "GLFW"],
      tags: ["vulkan", "graphics", "gpu", "ray tracing", "shaders", "c", "rendering", "graphics pipeline"],
      bullets: [
        {
          text: "Implemented a real-time GPU-accelerated ray tracer using Vulkan, gaining deep hands-on experience with graphics pipelines, shader programming, and low-level GPU resource management.",
          tags: ["vulkan", "graphics", "gpu", "ray tracing", "shaders", "c"],
        },
        {
          text: "Built the rendering pipeline from scratch in C, demonstrating performance-critical systems programming and a thorough understanding of modern graphics hardware.",
          tags: ["c", "graphics", "rendering", "graphics pipeline", "systems programming"],
        },
      ],
    },
    {
      title: "dbview",
      link: "",
      stack: ["C"],
      tags: ["c", "sqlite", "binary parsing", "systems programming", "database internals", "cli", "low-level"],
      bullets: [
        {
          text: "Built a zero-dependency SQLite binary viewer by parsing the B-tree format directly in C, eliminating the libsqlite3 dependency and enabling inspection on minimal or embedded systems.",
          tags: ["c", "sqlite", "binary parsing", "systems programming", "database internals"],
        },
        {
          text: "Implemented full column-type support with auto-sized, ANSI-colored terminal output — a deep exercise in binary format parsing and pointer arithmetic that strengthened low-level debugging skills.",
          tags: ["c", "binary parsing", "cli", "low-level", "systems programming"],
        },
      ],
    },
    {
      title: "unstuck-mcp",
      link: "github.com/SamuelH98/unstuck-mcp",
      stack: ["JavaScript", "MCP Protocol"],
      tags: ["javascript", "mcp", "ai agents", "developer tooling", "automation", "cli", "prompt engineering"],
      bullets: [
        {
          text: "Built an MCP server that prevents AI coding agents from entering infinite fix loops, saving developer time by automatically tracking failed attempts and normalizing error signatures.",
          tags: ["ai agents", "developer tooling", "automation", "mcp"],
        },
        {
          text: "Achieved cross-platform compatibility with GitHub Copilot CLI, OpenAI Codex CLI, and OpenCode, reducing wasted compute and developer frustration across multiple AI-assisted workflows.",
          tags: ["javascript", "mcp", "ai agents", "developer tooling", "prompt engineering"],
        },
      ],
    },
    {
      title: "Ultimate-SWE",
      link: "github.com/SamuelH98/Ultimate-SWE",
      stack: ["Prompt Engineering", "Technical Writing"],
      tags: ["technical writing", "process", "requirements engineering", "ai agents", "documentation", "software architecture", "workflow"],
      bullets: [
        {
          text: "Designed a production-grade software engineering workflow adopted by a research group, standardizing how AI coding agents approach requirements, architecture, testing, and handoff.",
          tags: ["requirements engineering", "software architecture", "ai agents", "workflow", "technical writing"],
        },
        {
          text: "Provided a repeatable, disciplined process that improved code quality and reduced rework by enforcing structured validation before commits, with documentation accessible to both humans and agents.",
          tags: ["documentation", "process", "technical writing", "ai agents", "workflow"],
        },
      ],
    },
    {
      title: "MoveDex",
      link: "github.com/SamuelH98/MoveDex",
      stack: ["HTML", "JavaScript", "PokéAPI"],
      tags: ["javascript", "vanilla js", "rest api", "frontend", "web app", "html", "css"],
      bullets: [
        {
          text: "Built a full-stack Pokémon lookup application integrating the live PokéAPI, delivering curated competitive data that helps players make informed team-building decisions.",
          tags: ["javascript", "rest api", "api integration", "frontend", "web app"],
        },
        {
          text: "Shipped with zero-framework vanilla JavaScript on GitHub Pages, demonstrating that complex interactivity and clean UI are achievable without heavy dependencies.",
          tags: ["javascript", "vanilla js", "html", "css", "frontend"],
        },
      ],
    },
    {
      title: "RestaurantWebApplication",
      link: "",
      stack: ["Python", "Flask", "Azure"],
      tags: ["flask", "python", "azure", "cloud", "web application", "deployment", "backend"],
      bullets: [
        {
          text: "Built and deployed a cloud-hosted restaurant web application on Azure App Service, gaining hands-on experience with cloud deployment, networking, and production hosting.",
          tags: ["azure", "cloud", "flask", "python", "deployment"],
        },
        {
          text: "Implemented the full backend in Flask with a focus on clean API design and reliable deployment, ensuring the application was accessible and maintainable in a production environment.",
          tags: ["flask", "python", "backend", "web application", "deployment"],
        },
      ],
    },
    {
      title: "Clank-Westgear",
      link: "",
      stack: ["C#"],
      tags: ["c#", "game development", "unity", "physics", "team project", "game design"],
      bullets: [
        {
          text: "Collaborated on a Unity game project, applying game design patterns and physics simulation while practicing team-based development workflows and version control discipline.",
          tags: ["c#", "game development", "unity", "team project", "game design"],
        },
        {
          text: "Contributed gameplay features and physics interactions, strengthening skills in object-oriented design, real-time systems, and cross-discipline team coordination.",
          tags: ["c#", "unity", "physics", "game development", "game design"],
        },
      ],
    },
  ],
};
