export type Project = {
  slug: "voxo" | "journal-app" | "transit-ops" | "smart-spend";
  title: string;
  year: string;
  summary: string;
  description: string;
  showcaseDescription: string;
  focus: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  imageAlt: string;
  systemNotes: string[];
  layout: "portrait" | "landscape" | "square" | "tall";
};

export const profile = {
  name: "Kush Vyas",
  role: "Java backend developer and product-minded builder",
  location: "Indore, India",
  email: "kushv619@gmail.com",
  phone: "+91 7566891057",
  github: "https://github.com/kush2439p",
  linkedin: "https://www.linkedin.com/in/kushvyas2439p/",
  leetcode: "https://leetcode.com/u/kushv619/",
  resume: "https://raw.githubusercontent.com/kush2439p/kush-vyas-portfolio/master/public/assets/documents/Kush-Vyas-Resume.pdf",
};

export const projects: Project[] = [
  {
    slug: "voxo",
    title: "Voxo",
    year: "2026",
    summary: "Private, offline speech to text for the desktop.",
    description: "A Java 21 desktop application for transcription without sending audio to a cloud API. Voxo runs local whisper.cpp inference, supports microphone and audio-file transcription, and exports timestamped SRT files.",
    showcaseDescription: "I built a Java desktop app that runs whisper.cpp locally, transcribes a microphone or audio file, and exports SRT subtitles.",
    focus: "Privacy-first local inference, desktop interaction design, and a frictionless path from audio to usable text.",
    technologies: ["Java 21", "Swing", "whisper.cpp", "Speech to Text"],
    githubUrl: "https://github.com/kush2439p/voxo",
    image: "/assets/images/projects/voxo-v2.webp",
    imageAlt: "Editorial technical illustration of a local microphone signal becoming timestamped transcript segments",
    systemNotes: ["Local whisper.cpp inference", "Microphone and audio-file input", "Timestamped SRT export"],
    layout: "tall",
  },
  {
    slug: "journal-app",
    title: "JournalApp",
    year: "2026",
    summary: "A secure, reflective place for daily writing.",
    description: "A Spring Boot journal platform with JWT authentication, role-based access control, MongoDB persistence, Redis caching, and weekly sentiment email summaries.",
    showcaseDescription: "I built a secure Spring Boot journal with JWT, role-based access, Redis caching, MongoDB storage, and weekly sentiment summaries.",
    focus: "Secure API design, custom Spring Security filtering, and thoughtful data handling for a personal product.",
    technologies: ["Spring Boot", "JWT", "Spring Security", "MongoDB", "Redis"],
    githubUrl: "https://github.com/kush2439p/JournalApp",
    image: "/assets/images/projects/journal-app-v2.webp",
    imageAlt: "Editorial technical illustration of a journal data path protected by authentication, cache, and document storage nodes",
    systemNotes: ["JWT and role-based access", "Custom Spring Security filtering", "MongoDB persistence with Redis caching"],
    layout: "portrait",
  },
  {
    slug: "transit-ops",
    title: "TransitOps",
    year: "2026",
    summary: "Operational clarity for fleets in motion.",
    description: "A logistics and fleet management platform for dispatch, trips, drivers, maintenance, and cost tracking, built around Spring and REST APIs.",
    showcaseDescription: "I modeled a logistics platform for dispatch, trips, drivers, maintenance, and cost tracking through practical Spring REST APIs.",
    focus: "Domain modelling for real operations and a practical foundation for dispatch and fleet workflows.",
    technologies: ["Java", "Spring", "REST APIs", "Fleet Operations"],
    githubUrl: "https://github.com/kush2439p/TransitOps",
    image: "/assets/images/projects/transit-ops-v2.webp",
    imageAlt: "Editorial technical illustration of fleet routes connecting dispatch, drivers, maintenance, and cost signals",
    systemNotes: ["Fleet-domain REST APIs", "Dispatch, trips, drivers, and maintenance", "Operational cost tracking"],
    layout: "landscape",
  },
  {
    slug: "smart-spend",
    title: "Smart Spend",
    year: "2026",
    summary: "A clearer, calmer view of everyday spending.",
    description: "A full-stack personal finance and expense-tracking application with authentication, spending insights, a React interface, and a Spring Boot and MySQL backend.",
    showcaseDescription: "I built a React and Spring Boot expense tracker with JWT authentication, spending insights, and MySQL-backed records.",
    focus: "Making financial data approachable through dependable APIs and focused product decisions.",
    technologies: ["React", "Spring Boot", "MySQL", "JWT", "Vercel"],
    githubUrl: "https://github.com/kush2439p/Smart_Spend_fullStack_webapp",
    image: "/assets/images/projects/smart-spend-v2.webp",
    imageAlt: "Editorial technical illustration of expense tokens flowing through a ledger and MySQL store",
    systemNotes: ["JWT authentication", "React client with Spring Boot API", "MySQL-backed expense records"],
    layout: "square",
  },
];

export const openSource = [
  { name: "Redis", reference: "Merged PR #15491", href: "https://github.com/redis/redis/pull/15491" },
  { name: "Apache StreamPipes", reference: "Merged PR #4724", href: "https://github.com/apache/streampipes/pull/4724" },
  { name: "Hazelcast", reference: "#26606", href: "https://github.com/hazelcast/hazelcast/pull/26606" },
  { name: "Apache Spark", reference: "#57356", href: "https://github.com/apache/spark/pull/57356" },
  { name: "Appwrite", reference: "#12946", href: "https://github.com/appwrite/appwrite/pull/12946" },
];

export const experience = [
  {
    organisation: "Modern Age Coders",
    role: "Coding Tutor and Hackathon Judge",
    period: "Mar 2026 - Jun 2026",
    detail: "Taught more than 100 students across Python, Java, Scratch, DSA, and OOP. Evaluated hackathon projects and contributed to frontend website work.",
  },
  {
    organisation: "Infosys Springboard",
    role: "Java Backend Developer Intern",
    period: "Dec 2025 - Feb 2026",
    detail: "Built backend features, persistence flows, and REST APIs for a Smart Procurement and Vendor Management System with Java, Spring Boot, Hibernate, and React.",
  },
];

export const capabilities = [
  ["Backend", "Java", "Spring Boot", "Spring Security", "Hibernate", "JPA", "REST APIs", "JWT"],
  ["Data and cloud", "MySQL", "MongoDB", "Redis", "Docker", "Aiven", "Railway"],
  ["Product surface", "React", "React Native", "JavaScript", "API design", "Postman"],
];
