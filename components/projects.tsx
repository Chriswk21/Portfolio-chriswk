'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, Cpu, Smartphone, Database, Terminal, ShieldCheck, FolderKanban } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  github: string;
  icon: React.ReactNode;
  image: string;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'ParentPal',
    category: 'Full Stack / AI Companion',
    desc: 'A digital parenting platform featuring Content Learning (educational articles & videos), an interactive Community hub for discussion/expert consultation, and an AI Chatbot companion designed to answer real-time parenting queries.',
    tags: ['Next.js', 'Flutter', 'Node.js', 'AI'],
    github: 'https://github.com/chriswk21/ParentPal',
    icon: <Terminal size={20} className="text-cyan-glow" />,
    image: '/images/projects/parentpal.png',
  },
  {
    id: '02',
    title: 'TutorYuk',
    category: 'Web Application / Booking',
    desc: 'A comprehensive web platform designed for seamless tutor discovery, booking, and managing interactive student-tutor learning schedules.',
    tags: ['Web App', 'Node.js', 'Database'],
    github: 'https://github.com/chriswk21/TutorYuk',
    icon: <Code2 size={20} className="text-violet-glow" />,
    image: '/images/projects/tutoryuk.png',
  },
  {
    id: '03',
    title: 'LaundryMamiMarie',
    category: 'Mobile Cashier App',
    desc: 'A cashier and point-of-sale application designed for Laundry Mami Marie, featuring easy transaction checkout, laundry order status tracking, and database records.',
    tags: ['Mobile App', 'Cashier', 'Database'],
    github: 'https://github.com/chriswk21/LaundryMamiMarie',
    icon: <Database size={20} className="text-emerald-400" />,
    image: '/images/projects/laundrymamimarie.png',
  },
  {
    id: '04',
    title: 'GymBrok',
    category: 'Mobile Fitness Tracker',
    desc: 'A mobile fitness companion application featuring workout activity tracking, personal metrics logging, and gym facility program managers.',
    tags: ['Flutter', 'Android', 'UI/UX'],
    github: 'https://github.com/chriswk21/GymBrok',
    icon: <Smartphone size={20} className="text-fuchsia-400" />,
    image: '/images/projects/gymbrok.png',
  },
  {
    id: '05',
    title: 'ProofIT',
    category: 'Project Management Platform',
    desc: 'A structured enterprise project management platform designed to help companies organize workflows, assign tasks, and track project status in a centralized dashboard.',
    tags: ['Software Engineering', 'Project Management'],
    github: 'https://github.com/chriswk21/ProofIT',
    icon: <FolderKanban size={20} className="text-cyan-glow" />,
    image: '/images/projects/proofit.png',
  },
  {
    id: '06',
    title: 'GenshinImport',
    category: 'Data Utility / API Sync',
    desc: 'A data integration utility designed for tracking, syncing, and analyzing user components, statistics, and in-game data profiles for Genshin Impact.',
    tags: ['Tools', 'JavaScript', 'API'],
    github: 'https://github.com/chriswk21/GenshinImport',
    icon: <Cpu size={20} className="text-yellow-400" />,
    image: '/images/projects/genshinimport.png',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Alternating gradient themes for cards
  const themeColor = index % 2 === 0 ? 'rgba(0, 242, 254, 0.3)' : 'rgba(138, 43, 226, 0.3)';
  const shadowGlow = index % 2 === 0 ? 'hover:shadow-cyan-500/10' : 'hover:shadow-violet-500/10';
  const borderHover = index % 2 === 0 ? 'hover:border-cyan-glow/30' : 'hover:border-violet-glow/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className={`group relative p-8 rounded-2xl bg-[#090d16]/30 backdrop-blur-md border border-white/5 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/20 transition-all duration-500 ${borderHover} ${shadowGlow}`}
    >
      {/* Background glow snippet */}
      <div 
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-5 group-hover:opacity-15 blur-2xl transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: themeColor.includes('0, 242, 254') ? '#00f2fe' : '#8a2be2' }}
      />

      <div>
        {/* Card Header: Project Number, Icon, & Link */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-slate-500 tracking-wider">
              [{project.id}]
            </span>
            <div className="p-2 rounded-lg bg-white/2 border border-white/5">
              {project.icon}
            </div>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-white/5 bg-white/2 text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github size={18} />
          </a>
        </div>

        {/* Project Image Header with Zoom Hover */}
        <div className="relative w-full h-44 mb-6 rounded-xl overflow-hidden bg-slate-950/40 border border-white/5 transition-all duration-500 ease-[0.16, 1, 0.3, 1] group-hover:scale-[1.06] group-hover:border-cyan-glow/20 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16]/90 via-transparent to-transparent opacity-85 group-hover:opacity-40 transition-opacity duration-500" />
        </div>

        {/* Category Tag */}
        <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-glow mb-2">
          {project.category}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-text text-sm font-light leading-relaxed mb-8">
          {project.desc}
        </p>
      </div>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {project.tags.map((tag, tIndex) => (
          <span
            key={tIndex}
            className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider bg-white/2 border border-white/5 text-slate-400 group-hover:text-white transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section 
      id="projects" 
      className="relative py-28 px-6 bg-[#090d16] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-cyan-glow text-xs uppercase tracking-[0.2em] mb-3">
              // Selected Works
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              PROJECT SHOWCASE
            </h2>
          </div>
          <p className="max-w-md text-slate-text font-light text-sm leading-relaxed text-center md:text-left">
            A comprehensive list of engineering projects demonstrating secure data validation, automated DevOps systems, cross-platform mobile frameworks, and full-stack environments.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
