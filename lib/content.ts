// All site copy lives here so it stays consistent with the resume and LinkedIn.

export const site = {
  name: "Rahul Tiwari",
  role: "AI-native backend engineer",
  email: "tiwarirahul0809@gmail.com",
  location: "Pune, India",
  github: "https://github.com/Rahu09",
  linkedin: "https://www.linkedin.com/in/rahultiwaridev",
  resume: "/Rahul_Tiwari_Resume.pdf",
};

export const nav = [
  { label: "Impact", href: "#impact" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export type ImpactRow = { figure: string; text: string };
export type ImpactGroup = { title: string; summary: string; rows: ImpactRow[] };

export const impact: ImpactGroup[] = [
  {
    title: "AI in the delivery pipeline",
    summary: "LLM tooling the team relies on every day, not a side demo.",
    rows: [
      {
        figure: "32%",
        text: "faster code reviews after I built an AI pull-request review pipeline for the team, live since February 2026.",
      },
      {
        figure: "18%",
        text: "fewer syntax bugs reaching review, caught by the same pipeline before a human looks at the change.",
      },
    ],
  },
  {
    title: "Reliability",
    summary: "On a card platform, a dropped call can mean a failed customer transaction.",
    rows: [
      {
        figure: "35%",
        text: "fewer timeout failures from a Recovery-as-a-Service framework with state tracking and exponential backoff.",
      },
      {
        figure: "88%",
        text: "of timed-out inter-service calls now recover automatically, saving 14 hours a week of incident response.",
      },
      {
        figure: "48%",
        text: "faster P1/P2 resolution after I built Splunk dashboards and multi-tier logging for root-cause analysis.",
      },
    ],
  },
  {
    title: "Performance",
    summary: "Measured, then tuned.",
    rows: [
      {
        figure: "26.3%",
        text: "lower retrieval latency, and 22.5% less database CPU, from distributed Redis caching and restructured SQL indexes.",
      },
      {
        figure: "<55 ms",
        text: "anomaly detection on an async Kafka pipeline, through partition and consumer-group tuning.",
      },
    ],
  },
  {
    title: "Safe change",
    summary: "Large changes shipped without customers noticing.",
    rows: [
      {
        figure: "3.5M",
        text: "financial accounts migrated with zero downtime and 99.9% accuracy.",
      },
      {
        figure: "90%+",
        text: "test coverage through TDD and an automated BDD (Gherkin) pipeline, cutting manual QA effort by 60%.",
      },
    ],
  },
];

export type Project = {
  name: string;
  summary: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
  image?: { src: string; alt: string };
  status?: string;
};

export const featuredProject: Project = {
  name: "AI PR Reviewer",
  summary:
    "A GitHub App that reviews pull requests with an LLM and posts inline comments on the exact lines that need attention.",
  points: [
    "Model-agnostic: Gemini or OpenAI, chosen by configuration. A custom diff parser maps each finding to a real line in the diff, so no comment lands on a line that doesn't exist.",
    "Duplicate-safe publishing. HMAC-verified webhooks, delivery-ID dedup, hidden markers and head-commit checks mean redeliveries, lost responses and new pushes never produce duplicate or stale reviews.",
    "Treats model output as untrusted input. The model has no tools, and Java validates every finding before anything is posted to GitHub.",
    "162 network-free tests in CI, and 20 architecture decision records explaining the trade-offs.",
  ],
  stack: ["Java 25", "Spring Boot 4", "Spring AI", "PostgreSQL + pgvector", "Kafka"],
  links: [{ label: "Source on GitHub", href: "https://github.com/Rahu09/ai-pr-reviewer" }],
  status: "Live on a demo repository, with more review features in progress.",
};

export const projects: Project[] = [
  {
    name: "PEN.AI",
    summary:
      "Upload a PDF, ask questions about it, and get answers grounded in its content.",
    points: [
      "Retrieval-augmented generation: PDFs uploaded through Uploadthing (S3) are embedded and indexed in Pinecone, with around 120 ms vector-search retrieval.",
      "Full-stack Next.js with PostgreSQL via Prisma, and Stripe subscriptions for paid plans.",
    ],
    stack: ["Next.js", "TypeScript", "Pinecone", "Prisma", "PostgreSQL", "Stripe"],
    links: [
      { label: "Open the app", href: "https://pen-ai.vercel.app/" },
      { label: "Source", href: "https://github.com/Rahu09/pen.AI" },
    ],
    image: { src: "/penAI.png", alt: "PEN.AI chat interface beside an uploaded PDF" },
  },
  {
    name: "Board",
    summary:
      "A real-time collaborative whiteboard where a team draws, adds shapes and sticky notes, and edits the same board at once.",
    points: [
      "Multiplayer sync with Liveblocks and a Convex real-time database, holding 60 FPS canvas rendering with 50+ people on one board.",
      "Rectangles, ellipses, sticky notes and freehand drawing built from scratch as vector tools.",
    ],
    stack: ["Next.js", "TypeScript", "Liveblocks", "Convex", "Clerk"],
    links: [
      { label: "Open the app", href: "https://drew-board.vercel.app/" },
      { label: "Source", href: "https://github.com/Rahu09/drew_board" },
    ],
    image: { src: "/board.png", alt: "Board whiteboard with shapes and sticky notes" },
  },
];

export type Role = {
  title: string;
  org: string;
  period: string;
  place: string;
  points: string[];
};

export const experience: Role[] = [
  {
    title: "Software Engineer",
    org: "Hexaware Technologies, on Citi's branded cards platform",
    period: "Aug 2024 – present",
    place: "Chennai (remote)",
    points: [
      "Promoted from Associate Software Engineer in July 2026.",
      "Build card-processing and transaction microservices in Java 21 and Spring Boot that sustain 1,200 requests per second and stay available through partial outages.",
      "Develop REST APIs with OpenAPI for cross-team integration: 80+ APIs across 20+ microservices, in a team of 12.",
      "Delivered the 3.5M-account migration, the Recovery-as-a-Service framework, the Kafka anomaly pipeline and the AI review pipeline listed above.",
    ],
  },
  {
    title: "Associate Software Engineer",
    org: "Hexaware Technologies, enterprise learning platform",
    period: "Sep 2023 – Jul 2024",
    place: "Chennai (remote)",
    points: [
      "Built REST services and frontend features. Lazy loading and async state management raised the Lighthouse score by 24% and cut 140 KB from the JavaScript bundle.",
      "Built an AI onboarding chatbot that deflected 38% of tier-1 onboarding tickets.",
    ],
  },
  {
    title: "B.Tech, Electronics and Communication Engineering",
    org: "LNCT Excellence, Bhopal",
    period: "2019 – 2023",
    place: "CGPA 7.9",
    points: [],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Backend",
    items: ["Java", "Spring Boot", "Microservices", "REST and OpenAPI", "Kafka", "Redis", "PostgreSQL", "MySQL", "MongoDB", "Clean Architecture"],
  },
  {
    group: "Generative AI",
    items: ["Spring AI", "RAG", "AI agents", "Model Context Protocol", "LangChain", "Prompt engineering", "LLM evaluation", "pgvector", "Pinecone"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    group: "Cloud and delivery",
    items: ["AWS", "Docker", "GitHub Actions", "Jenkins", "Splunk"],
  },
  {
    group: "Testing",
    items: ["JUnit", "Testcontainers", "TDD", "BDD with Cucumber"],
  },
];

export const certifications = [
  { name: "Claude Certified Architect – Professional", issuer: "Anthropic" },
  { name: "Claude Certified Architect – Foundations", issuer: "Anthropic" },
  { name: "Claude Certified Developer – Foundations", issuer: "Anthropic" },
  { name: "Claude Certified Associate – Foundations", issuer: "Anthropic" },
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services" },
];
