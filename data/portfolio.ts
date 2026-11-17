export interface ExperienceItem {
  id: string;
  role: string;
  company?: string;
  period: string;
  accent: "emerald" | "gold";
  highlights: string[];
}

export interface SkillItem {
  name: string;
  icon?: string;
  wide?: boolean;
  glyph?: "api" | "shield" | "lock" | "bug" | "layers";
}

export interface SkillCategory {
  id: string;
  label: string;
  shortLabel: string;
  accent: "emerald" | "gold" | "coral";
  description: string;
  skills: SkillItem[];
}

export interface PersonalProject {
  id: string;
  title: string;
  category: "Backend & APIs" | "Frontend" | "AI Skill Sets";
  accent: "emerald" | "gold" | "coral";
  description: string;
  focusPoints: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  previewImage?: string;
  previewAlt?: string;
}

export interface ClientProject {
  id: string;
  title: string;
  domain: string;
  websiteUrl: string;
  accent: "gold" | "emerald" | "coral";
  description?: string;
  previewImage: string;
  previewAlt: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  detail?: string;
  period?: string;
  accent: "emerald" | "gold" | "coral";
}

export interface CertificationItem {
  id: string;
  title: string;
  provider?: string;
  icon?: string;
  accent: "coral" | "emerald" | "gold";
}

export const PERSONAL_INFO = {
  fullName: "Savindu Shiranjaya Warnakulasooriya",
  shortName: "Savindu",
  professionalTitle: "Software Engineer | Backend Engineer | AI Developer",
  heroHeadline: "Building Scalable Software. Engineering Intelligent Solutions.",
  heroDescription:
    "I'm a Software Engineer passionate about building reliable backend systems, scalable web applications, and intelligent software solutions. I turn complex requirements into practical, efficient, and secure applications.",
  professionalSummary:
    "Results-driven Software Engineer specializing in software development, backend engineering, and secure application development, with experience building scalable systems, robust APIs, and business-focused software solutions. Skilled in designing efficient architectures, developing reliable applications, implementing secure backend systems, and integrating AI-powered capabilities to enhance functionality and automation.",
  aboutParagraphs: [
    "I'm a Software Engineer with experience in freelance software development and professional backend development. My work includes building custom websites, e-commerce platforms, RESTful APIs, inventory management systems, and business-oriented applications.",
    "I enjoy solving complex technical problems, designing efficient backend architectures, and exploring how AI can improve modern software development workflows.",
    "My technical interests include backend engineering, API development, database architecture, cloud platforms, cybersecurity, and AI-powered development.",
  ],
  email: "savindushiranjaya@gmail.com",
  phone: "+94 74 376 7512",
  phoneHref: "tel:+94743767512",
  githubUrl: "https://github.com/savindu19990928",
  linkedinUrl: "https://linkedin.com/in/savindu-warnakulasooriya-94593a265",
  cvUrl: "/Savindu-Shiranjaya-Warnakulasooriya-CV.pdf",
  cvFileName: "Savindu-Shiranjaya-Warnakulasooriya-CV.pdf",
};

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "freelance",
    role: "Freelance Software Developer",
    period: "2019 – Present",
    accent: "emerald",
    highlights: [
      "Delivered custom websites and e-commerce platforms.",
      "Developed solutions that strengthened clients' online presence.",
      "Worked on projects ranging from business websites to more complex web applications.",
    ],
  },
  {
    id: "pengo",
    role: "Backend Developer",
    company: "Pengo Solutions",
    period: "2022 – 2024",
    accent: "gold",
    highlights: [
      "Developed and maintained secure, scalable backend systems to meet business requirements.",
      "Implemented data validation, error handling, and security controls to improve system reliability.",
      "Collaborated with development teams to deliver reliable software solutions.",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    shortLabel: "Languages",
    accent: "emerald",
    description: "Core general-purpose and object-oriented languages used across backend and application systems.",
    skills: [
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Java", icon: "/icons/java.svg" },
      { name: "C#", icon: "/icons/c-sharp.svg" },
    ],
  },
  {
    id: "backend",
    label: "Backend Development",
    shortLabel: "Backend",
    accent: "emerald",
    description: "API architecture, real-time communication, and service frameworks for scalable backends.",
    skills: [
      { name: "Django", icon: "/icons/django.svg" },
      { name: "Django REST Framework (DRF)", icon: "/icons/django.svg" },
      { name: "RESTful API Development", glyph: "api" },
      { name: "GraphQL API Development", icon: "/icons/graphql.svg" },
      { name: "WebSockets", icon: "/icons/websocket.svg" },
      { name: "Spring Boot", icon: "/icons/spring.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend Development",
    shortLabel: "Frontend",
    accent: "gold",
    description: "Responsive, component-driven web interfaces and modern styling systems.",
    skills: [
      { name: "React.js", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "HTML", icon: "/icons/html-5.svg" },
      { name: "CSS", icon: "/icons/css.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    shortLabel: "Databases",
    accent: "gold",
    description: "Relational and document data modeling for transactional and business applications.",
    skills: [
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "PostgreSQL", icon: "/icons/postgres.svg" },
      { name: "Microsoft SQL Server", icon: "/icons/sql.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
    ],
  },
  {
    id: "tools-cloud",
    label: "Tools & Cloud Platforms",
    shortLabel: "Cloud & Tools",
    accent: "emerald",
    description: "Version control, containerization, and multi-cloud infrastructure platforms.",
    skills: [
      { name: "Git", icon: "/icons/git.svg" },
      { name: "GitHub", icon: "/icons/github.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "AWS", icon: "/icons/aws.svg" },
      { name: "Google Cloud Platform (GCP)", icon: "/icons/google-cloud.svg" },
      { name: "Oracle Cloud Infrastructure (OCI)", icon: "/icons/oracle.svg", wide: true },
      { name: "Microsoft Azure", icon: "/icons/azure.svg" },
    ],
  },
  {
    id: "security",
    label: "Security",
    shortLabel: "Security",
    accent: "coral",
    description: "Security-minded software design, validation controls, and defensive foundations.",
    skills: [
      { name: "Secure Software Development", glyph: "shield" },
      { name: "Cybersecurity Fundamentals", glyph: "lock" },
      { name: "Ethical Hacking Fundamentals", glyph: "bug" },
    ],
  },
];

export const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    id: "devcommerce-api",
    title: "DevCommerce API",
    category: "Backend & APIs",
    accent: "emerald",
    description:
      "A complete e-commerce REST API developed to demonstrate backend engineering capabilities and comprehensive e-commerce functionality.",
    focusPoints: [
      "Designed as a full e-commerce backend service showcasing structured REST API architecture.",
      "Built with Django and Django REST Framework backed by MySQL relational storage.",
      "Containerized with Docker for consistent local and deployment environments.",
    ],
    technologies: ["Django", "Django REST Framework", "MySQL", "Docker"],
    githubUrl: "https://github.com/savindu19990928/DevCommerce-API",
  },
  {
    id: "flexcore",
    title: "FlexCore – E-commerce Frontend",
    category: "Frontend",
    accent: "gold",
    description:
      "Developed a modern e-commerce frontend associated with the DevCommerce API portfolio project.",
    focusPoints: [
      "Interactive React.js and TypeScript storefront built to pair with the DevCommerce REST API.",
      "Bundled with Vite and styled using Tailwind CSS and PostCSS.",
      "Deployed as a live web application alongside an open public repository.",
    ],
    technologies: ["React.js", "Vite", "TypeScript", "Tailwind CSS", "PostCSS"],
    liveUrl: "https://flexcore-fe-727633019198.us-central1.run.app",
    githubUrl: "https://github.com/savindu19990928/FlexCore-FE-Public",
    previewImage: "/previews/flexcore.webp",
    previewAlt: "Live homepage preview of the FlexCore e-commerce frontend application",
  },
  {
    id: "django-drf-skill",
    title: "AI Skill Set for Django REST Framework API Development",
    category: "AI Skill Sets",
    accent: "coral",
    description:
      "Created a reusable AI skill set designed to support API implementation and Django REST Framework development workflows.",
    focusPoints: [
      "Packages structured guidance for AI-assisted Django REST Framework API engineering.",
      "Focuses on consistent API workflow execution and repeatable backend conventions.",
    ],
    technologies: ["Django REST Framework", "AI Workflows"],
    githubUrl: "https://github.com/savindu19990928/Django-DRF-Skill",
  },
  {
    id: "django-ecommerce-skill",
    title: "AI Skill Set for Django E-commerce API Development",
    category: "AI Skill Sets",
    accent: "coral",
    description:
      "Created a reusable AI development skill set supporting e-commerce API implementation workflows using Django REST Framework.",
    focusPoints: [
      "Tailored reusable AI skill set built around e-commerce domain workflows in Django REST Framework.",
      "Supports structured planning and API implementation for commerce backends.",
    ],
    technologies: ["Django REST Framework", "E-commerce APIs", "AI Workflows"],
    githubUrl: "https://github.com/savindu19990928/Django-ecommerce-pro-skill",
  },
  {
    id: "inventory-api",
    title: "Inventory Management REST API",
    category: "Backend & APIs",
    accent: "emerald",
    description:
      "Developed a RESTful API for an inventory management system where users can create accounts and manage their own inventory.",
    focusPoints: [
      "Supports user account creation and per-user inventory management over REST endpoints.",
      "Implemented using Django, Django REST Framework, and MySQL.",
    ],
    technologies: ["Django", "Django REST Framework", "MySQL"],
    githubUrl: "https://github.com/savindu19990928/devInventory",
  },
  {
    id: "finbuddy-api",
    title: "FinBuddy – Personal Finance Management API",
    category: "Backend & APIs",
    accent: "emerald",
    description:
      "Developed an API for FinBuddy, a personal finance management application designed for registered users.",
    focusPoints: [
      "Account-scoped REST API built for registered users managing personal finance records.",
      "Built on Django, Django REST Framework, and MySQL with Docker containerization.",
    ],
    technologies: ["Django", "Django REST Framework", "MySQL", "Docker"],
    githubUrl: "https://github.com/savindu19990928/FinBuddyAPI",
  },
];

export const CLIENT_PROJECTS: ClientProject[] = [
  {
    id: "avenor-apparel",
    title: "Avenor Apparel",
    domain: "avenorapparel.lk",
    websiteUrl: "https://avenorapparel.lk",
    accent: "gold",
    description:
      "Developed a website for Avenor Apparel as part of real-world client website development work.",
    previewImage: "/previews/avenor.webp",
    previewAlt: "Website preview of Avenor Apparel (PVT) LTD",
  },
  {
    id: "zevora-custom",
    title: "Zevora Custom",
    domain: "zevoracustom.lk",
    websiteUrl: "https://zevoracustom.lk",
    accent: "emerald",
    description:
      "Developed a website for Zevora Custom, including backend and database functionality.",
    previewImage: "/previews/zevora.webp",
    previewAlt: "Website preview of Zevora Custom",
  },
  {
    id: "universal-tool-depot",
    title: "Universal Tool Depot",
    domain: "universaltooldepot.lk",
    websiteUrl: "https://www.universaltooldepot.lk",
    accent: "coral",
    previewImage: "/previews/universal.webp",
    previewAlt: "Website preview of Universal Tool Depot",
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: "nibm",
    institution: "NIBM University",
    detail: "Undergraduate in Software Engineering",
    accent: "emerald",
  },
  {
    id: "cicra",
    institution: "CICRA Campus",
    accent: "coral",
  },
];

export const CERTIFICATION_ITEMS: CertificationItem[] = [
  {
    id: "cyber-ethical",
    title: "Certificate in Cyber Security and Ethical Hacking",
    accent: "coral",
  },
  {
    id: "google-cyber",
    title: "Google Cybersecurity Professional Certificate",
    provider: "Google",
    icon: "/icons/google-icon.svg",
    accent: "emerald",
  },
  {
    id: "meta-backend",
    title: "Meta Back-End Developer Professional Certificate",
    provider: "Meta",
    icon: "/icons/meta.svg",
    accent: "gold",
  },
];

export const SOFT_SKILLS = [
  "Ability to work effectively in high-pressure and fast-paced environments.",
  "Quick learner with a willingness to develop new skills.",
  "Strong teamwork and collaboration skills.",
  "Exceptional planning skills.",
];

export const LANGUAGES = [
  { language: "Sinhala", level: "Native" },
  { language: "English", level: "Fluent" },
];
