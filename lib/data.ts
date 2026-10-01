// Single source of truth for portfolio content (taken from the CV + old site).

export const profile = {
  name: ["Chris William", "Kurniawan"],
  shortName: "CHRIS.WK",
  tagline: "Software that runs real operations.",
  subline: "Computer Science student at BINUS University. I build management software, POS systems, and the automation behind them.",
  email: "chriswk2103@gmail.com",
  location: "Jakarta, Indonesia",
  cvPath: "/cv.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/chriswk21" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/chris-william-kurniawan-674a43321/" },
    { label: "Instagram", href: "https://instagram.com/chriswk2103" },
  ],
  focus: ["Software Engineering", "Web Development", "Mobile Apps", "Backend & Databases", "Workflow Automation"],
};

export const intro =
  "Hi, I'm Chris — a Computer Science student who likes problems with real people on the other end. I turn paper receipts, manual stock counts, and late-night reconciliations into software that just works. Clean backends, fast interfaces, and systems that stay out of the way.";

export const facts = [
  { label: "Study", value: "Computer Science, BINUS University" },
  { label: "GPA", value: "3.71 / 4.00" },
  { label: "Graduating", value: "2028" },
  { label: "Based in", value: "Jakarta, Indonesia" },
];

export type Project = {
  title: string;
  summary: string;
  type: string;
  stack: string;
  year: string;
  platform: string;
  image?: string;
  href?: string;
};

export const projects: Project[] = [
  {
    title: "ParentPal",
    summary: "Parenting hub with learning content, community forums, and an AI companion that answers questions in real time.",
    type: "Full Stack · AI",
    stack: "Next.js · Flutter · Node.js · LLM",
    year: "2025",
    platform: "Web & Mobile",
    image: "/images/projects/parentpal.png",
    href: "https://github.com/chriswk21/ParentPal",
  },
  {
    title: "TutorYuk",
    summary: "Booking platform for finding tutors and managing student-tutor schedules.",
    type: "Web App · Booking",
    stack: "Vue.js · Node.js · SQL",
    year: "2025",
    platform: "Web",
    image: "/images/projects/tutoryuk.png",
    href: "https://github.com/chriswk21/TutorYuk",
  },
  {
    title: "LaundryMamiMarie",
    summary: "Paperless cashier for a working laundry: checkout, order tracking, and automated revenue records.",
    type: "Point of Sale",
    stack: "JavaScript · POS Architecture",
    year: "2025",
    platform: "Mobile",
    image: "/images/projects/laundrymamimarie.png",
    href: "https://github.com/chriswk21/LaundryMamiMarie",
  },
  {
    title: "ProofIT",
    summary: "Project management system for organizing workflows, task dependencies, and project status in one dashboard.",
    type: "Project Management",
    stack: "Dart · Flutter",
    year: "2025",
    platform: "Mobile",
    image: "/images/projects/proofit.png",
    href: "https://github.com/chriswk21/ProofIT",
  },
  {
    title: "GymBrok",
    summary: "Fitness companion for workout tracking, body metrics, and gym program management.",
    type: "Fitness Tracker",
    stack: "Flutter · Dart · Android",
    year: "2025",
    platform: "Mobile",
    image: "/images/projects/gymbrok.png",
    href: "https://github.com/chriswk21/GymBrok",
  },
  {
    title: "GenshinImport",
    summary: "Data utility for syncing and analyzing in-game profiles and statistics for Genshin Impact.",
    type: "Data Utility · API",
    stack: "JavaScript · REST API",
    year: "—",
    platform: "Tool",
    image: "/images/projects/genshinimport.png",
    href: "https://github.com/chriswk21/GenshinImport",
  },
];

export const experience = [
  {
    role: "Operations & Logistics App Developer",
    org: "Kopi Tubruk Gajah — Pekan Raya Jakarta",
    kind: "Contract",
    period: "Jun 2026 — Jul 2026",
    note: "Fleet and logistics app for cart dispatchers and sales teams. Automated sales reconciliation and stock tracking, cutting night-closing time.",
  },
  {
    role: "Software Developer — Laundry Management",
    org: "Independent Project",
    kind: "Freelance",
    period: "Jan 2025 — Now",
    note: "End-to-end POS replacing paper receipts. Automated revenue, order tracking, and financial reports.",
  },
];

export const volunteering = [
  {
    role: "Math Tutor",
    org: "Teach For Indonesia",
    kind: "Volunteer",
    period: "Feb 2026 — Apr 2026",
    note: "Taught math to middle school, high school, and college students in small groups, twice a week for five weeks. Turned abstract quantitative concepts into intuitive explanations for very different backgrounds.",
  },
];

export const education = [
  {
    role: "BINUS University",
    org: "Bachelor of Computer Science (B28) · GPA 3.71 / 4.00",
    kind: "Jakarta",
    period: "Expected 2028",
    note: "Data Structures, Algorithm Design & Analysis, OOP, Database Systems, Artificial Intelligence, Web Programming, Software Engineering, Computer Networks, Operating Systems, HCI.",
  },
  {
    role: "Tarsisius 1 High School",
    org: "Science Track",
    kind: "Jakarta",
    period: "2021 — 2024",
    note: "Mathematics, Physics, Chemistry, Computer Studies.",
  },
];

// From the CV's Technical Skills block.
export const tools = [
  "Python", "C/C++", "Java", "SQL", "Next.js", "React", "HTML/CSS", "REST APIs",
  "Flutter", "Node.js", "Supabase", "PostgreSQL", "MySQL", "Vercel", "Railway", "Git",
];

export const skills = [
  {
    title: "Software Engineering",
    desc: "Data structures, algorithms, and OOP turned into systems that are easy to change.",
    tools: "Python · C/C++ · Java · System Testing",
  },
  {
    title: "Web Development",
    desc: "Fast, accessible interfaces built with the modern React stack.",
    tools: "Next.js · React · TypeScript · HTML/CSS",
  },
  {
    title: "Mobile Development",
    desc: "Cross-platform apps for people working on their feet.",
    tools: "Flutter · Dart · Android",
  },
  {
    title: "Backend & Databases",
    desc: "REST APIs and data models that keep the numbers right.",
    tools: "Node.js · Supabase · PostgreSQL · MySQL",
  },
  {
    title: "Workflow Automation",
    desc: "Replacing manual counts and paper trails with reliable, auditable flows.",
    tools: "POS Systems · Reporting · Vercel · Railway",
  },
];
