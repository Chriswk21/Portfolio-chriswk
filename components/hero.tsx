'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Magnetic } from './ui/magnetic';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#090d16] py-20 px-6"
    >
      {/* 3D Parallax Glowing Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Glow Blob 1 */}
        <motion.div
          animate={{
            x: mousePosition.x * -40,
            y: mousePosition.y * -40,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 25 }}
          className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-cyan-glow/10 mix-blend-screen animate-glow-slow-1 pointer-events-none"
        />

        {/* Glow Blob 2 */}
        <motion.div
          animate={{
            x: mousePosition.x * -60,
            y: mousePosition.y * -60,
          }}
          transition={{ type: 'spring', stiffness: 40, damping: 20 }}
          className="absolute bottom-1/4 right-1/4 w-[280px] md:w-[500px] h-[280px] md:h-[500px] rounded-full bg-violet-glow/10 mix-blend-screen animate-glow-slow-2 pointer-events-none"
        />

        {/* Grid Overlay with Parallax */}
        <motion.div
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 30 }}
          className="absolute inset-0 bg-grid-pattern opacity-40"
        />

        {/* Dynamic Connected Dots Layer (Simulated SVG Network) */}
        <motion.svg
          animate={{
            x: mousePosition.x * 35,
            y: mousePosition.y * 35,
          }}
          transition={{ type: 'spring', stiffness: 70, damping: 25 }}
          className="absolute inset-0 w-full h-full opacity-30"
        >
          <defs>
            <radialGradient id="dotGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="1" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dotGradViolet" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8a2be2" stopOpacity="1" />
              <stop offset="100%" stopColor="#8a2be2" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Static dots acting as network nodes */}
          <circle cx="10%" cy="15%" r="1.5" fill="url(#dotGrad)" />
          <circle cx="85%" cy="20%" r="2" fill="url(#dotGradViolet)" />
          <circle cx="75%" cy="75%" r="1.5" fill="url(#dotGrad)" />
          <circle cx="20%" cy="80%" r="2" fill="url(#dotGradViolet)" />
          <circle cx="45%" cy="30%" r="1" fill="url(#dotGrad)" />
          <circle cx="60%" cy="65%" r="2.5" fill="url(#dotGrad)" />
          
          {/* Connecting lines */}
          <line x1="10%" y1="15%" x2="45%" y2="30%" stroke="rgba(0, 242, 254, 0.05)" strokeWidth="0.5" />
          <line x1="85%" y1="20%" x2="60%" y2="65%" stroke="rgba(138, 43, 226, 0.05)" strokeWidth="0.5" />
          <line x1="75%" y1="75%" x2="60%" y2="65%" stroke="rgba(0, 242, 254, 0.05)" strokeWidth="0.5" />
          <line x1="20%" y1="80%" x2="45%" y2="30%" stroke="rgba(138, 43, 226, 0.05)" strokeWidth="0.5" />
        </motion.svg>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none mb-6 select-none bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent py-2"
          >
            CHRIS WILLIAM
            <br />
            KURNIAWAN
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-slate-text text-base sm:text-lg md:text-xl leading-relaxed mb-12 font-light"
          >
            Software Engineering student building high-performance web experiences, 
            cross-platform mobile apps, and robust backend ecosystems.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full"
          >
            {/* Explore Projects Button */}
            <Magnetic range={60} strength={0.35}>
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="w-full sm:w-auto relative px-8 py-4 rounded-xl border border-cyan-glow/30 bg-[#090d16]/40 backdrop-blur-md text-white font-mono text-xs tracking-widest uppercase overflow-hidden group shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 hover:border-cyan-glow/85 transition-all duration-500 text-center block"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-glow/15 to-violet-glow/15 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="relative z-10 text-cyan-glow group-hover:text-white transition-colors duration-300">
                  [ Explore Projects ]
                </span>
              </a>
            </Magnetic>

            {/* Connect Button */}
            <Magnetic range={60} strength={0.35}>
              <a
                href="#connect"
                onClick={(e) => handleScrollTo(e, 'connect')}
                className="w-full sm:w-auto relative px-8 py-4 rounded-xl border border-white/10 bg-[#090d16]/10 backdrop-blur-sm text-white font-mono text-xs tracking-widest uppercase overflow-hidden group shadow-lg hover:shadow-white/5 hover:border-white/40 transition-all duration-500 text-center block"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/5 to-white/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="relative z-10 text-slate-300 group-hover:text-white transition-colors duration-300">
                  [ Connect ]
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer pointer-events-none"
      >
        <ArrowDown size={20} className="text-slate-text/60" />
      </motion.div>
    </section>
  );
}
