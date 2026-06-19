'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { Magnetic } from './ui/magnetic';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Specialties', href: '#specialties' },
  { name: 'Projects', href: '#projects' },
  { name: 'Connect', href: '#connect' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking logic
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const offsetTop = targetEl.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
      setIsOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090d16]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-[#090d16]/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Magnetic range={50} strength={0.3}>
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group font-mono text-sm tracking-widest text-white font-bold"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-glow to-violet-glow flex items-center justify-center shadow-md shadow-cyan-500/10 group-hover:shadow-cyan-500/30 transition-shadow">
              <Terminal size={16} className="text-black" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:from-cyan-glow group-hover:to-violet-glow transition-all duration-300">
              CWK.DEV
            </span>
          </a>
        </Magnetic>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <Magnetic key={item.name} range={40} strength={0.35}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors duration-300 ${
                    isActive ? 'text-cyan-glow font-bold' : 'text-slate-text hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-cyan-glow to-violet-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </Magnetic>
            );
          })}
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-text hover:text-white p-2"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#090d16]/95 border-b border-white/5 backdrop-blur-lg"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-mono text-sm tracking-widest uppercase py-2 border-b border-white/5 ${
                      isActive
                        ? 'text-cyan-glow font-bold pl-2 border-l-2 border-cyan-glow'
                        : 'text-slate-text hover:text-white'
                    } transition-all`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
