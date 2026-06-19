'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Monitor, Smartphone, Server, Database, GitBranch, Github, Layers, Compass, HardDrive } from 'lucide-react';

interface BentoCardProps {
  title: string;
  desc: string;
  highlights: string[];
  icon: React.ReactNode;
  accent: string;
  className?: string;
}

function BentoCard({ title, desc, highlights, icon, accent, className = '' }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates relative to card center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const maxTilt = 5; // Moderate tilt for subtle effect
    const rX = -(mouseY / (height / 2)) * maxTilt;
    const rY = (mouseX / (width / 2)) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: rotateX !== 0 ? 1.015 : 1,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`bento-card-glow cursor-pointer relative p-8 rounded-2xl bg-[#090d16]/40 backdrop-blur-md border border-white/5 flex flex-col justify-between min-h-[260px] overflow-hidden group shadow-lg shadow-black/20 ${className}`}
    >
      {/* Background glow vignette */}
      <div 
        className="absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-10 group-hover:opacity-20 blur-3xl transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      <div style={{ transform: 'translateZ(20px)' }} className="transition-transform duration-300">
        {/* Icon & Title */}
        <div className="flex items-center justify-between mb-6">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300"
            style={{ 
              borderColor: `${accent}33`, 
              backgroundColor: `${accent}0a`,
              boxShadow: `0 4px 20px ${accent}05`
            }}
          >
            {icon}
          </div>
          <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase group-hover:text-slate-400 transition-colors">
            // Specialty
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-glow transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-slate-text text-sm font-light leading-relaxed mb-6">
          {desc}
        </p>
      </div>

      {/* Highlights / Badges */}
      <div 
        style={{ transform: 'translateZ(10px)' }} 
        className="flex flex-wrap gap-2 mt-auto transition-transform duration-300"
      >
        {highlights.map((highlight, index) => (
          <span 
            key={index} 
            className="px-3 py-1 rounded-md text-[10px] font-mono tracking-wider border border-white/5 bg-white/2 text-slate-300 group-hover:border-cyan-glow/10 group-hover:text-white transition-all duration-300"
          >
            {highlight}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const subrowItems = [
    { name: 'Supabase', icon: <Database size={16} className="text-emerald-400" /> },
    { name: 'PostgreSQL', icon: <Database size={16} className="text-blue-400" /> },
    { name: 'MySQL', icon: <HardDrive size={16} className="text-orange-400" /> },
    { name: 'Git', icon: <GitBranch size={16} className="text-red-400" /> },
    { name: 'GitHub', icon: <Github size={16} className="text-white" /> },
    { name: 'Vercel', icon: <Compass size={16} className="text-cyan-400" /> },
  ];

  return (
    <section 
      id="specialties" 
      className="relative py-28 px-6 bg-[#090d16] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-cyan-glow text-xs uppercase tracking-[0.2em] mb-3">
              // Focus Areas
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              CORE SPECIALTIES
            </h2>
          </div>
          <p className="max-w-md text-slate-text font-light text-sm leading-relaxed text-center md:text-left">
            Bridging structured algorithms with immersive interfaces. Building clean, high-performance systems from backend to frontend.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <BentoCard
            title="Software Engineering"
            desc="Focused on SOLID design principles, algorithmic optimization, and clean system architecture to build maintainable enterprise programs."
            highlights={['SOLID Design', 'Algorithms', 'Design Patterns', 'System Architecture']}
            icon={<Cpu size={22} className="text-cyan-glow" />}
            accent="#00f2fe"
            className="md:col-span-2"
          />

          <BentoCard
            title="Web Development"
            desc="Building responsive, accessible frontend layouts using core web languages and modern systems like Next.js."
            highlights={['HTML5 / CSS3', 'JavaScript ES6+', 'React', 'TypeScript', 'Next.js']}
            icon={<Monitor size={22} className="text-violet-glow" />}
            accent="#8a2be2"
            className="md:col-span-1"
          />

          <BentoCard
            title="Mobile Development"
            desc="Architecting beautiful cross-platform applications with native performance using Flutter & Dart frameworks."
            highlights={['Flutter', 'Dart', 'State Management', 'Android Studio']}
            icon={<Smartphone size={22} className="text-fuchsia-400" />}
            accent="#d946ef"
            className="md:col-span-1"
          />

          <BentoCard
            title="Backend Development"
            desc="Creating scalable backend frameworks, modular server services, and efficient REST API routers using Node.js and NestJS."
            highlights={['Node.js', 'NestJS', 'REST APIs', 'GraphQL', 'Microservices']}
            icon={<Server size={22} className="text-emerald-400" />}
            accent="#10b981"
            className="md:col-span-2"
          />

        </div>

        {/* Database & Deployment Sub-row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border border-white/5 bg-[#090d16]/30 backdrop-blur-md p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
        >
          {/* Subtle line background decoration inside */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-2xl pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <Database size={18} className="text-cyan-glow" />
            <span className="font-mono text-xs text-white uppercase tracking-wider">
              Integration Ecosystem
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            {subrowItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 242, 254, 0.3)' }}
                className="px-4 py-2 border border-white/5 bg-white/2 rounded-xl flex items-center gap-2 hover:bg-[#090d16]/60 transition-all duration-300 shadow-md shadow-black/5"
              >
                {item.icon}
                <span className="font-mono text-xs text-slate-300 hover:text-white transition-colors">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
