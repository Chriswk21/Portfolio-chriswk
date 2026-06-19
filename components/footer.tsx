'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, Github, Send, Terminal, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './ui/magnetic';

export function Footer() {
  const socialLinks = [
    {
      name: 'Email',
      value: 'chriswk2103@gmail.com',
      href: 'mailto:chriswk2103@gmail.com',
      icon: <Mail className="text-cyan-glow" size={20} />,
      color: 'from-cyan-glow/20 to-cyan-glow/5',
    },
    {
      name: 'Instagram',
      value: '@chriswk2103',
      href: 'https://instagram.com/chriswk2103',
      icon: <Instagram className="text-violet-glow" size={20} />,
      color: 'from-violet-glow/20 to-violet-glow/5',
    },
    {
      name: 'LinkedIn',
      value: 'Chris William Kurniawan',
      href: 'https://www.linkedin.com/in/chris-william-kurniawan-674a43321/',
      icon: <Linkedin className="text-blue-500" size={20} />,
      color: 'from-blue-500/20 to-blue-500/5',
    },
    {
      name: 'GitHub',
      value: 'chriswk21',
      href: 'https://github.com/chriswk21',
      icon: <Github className="text-white" size={20} />,
      color: 'from-white/10 to-white/5',
    },
  ];

  return (
    <footer 
      id="connect" 
      className="relative py-24 px-6 bg-[#090d16] border-t border-white/5 overflow-hidden"
    >
      {/* Background glow decoration */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-violet-glow/5 mix-blend-screen blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Connect Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 items-start">
          
          {/* Left Column: Heading and Contact Links */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="font-mono text-cyan-glow text-xs uppercase tracking-[0.2em] mb-3">
                // Collaborate
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6">
                LET'S CONNECT
              </h2>
              <p className="text-slate-text font-light text-sm leading-relaxed mb-8 max-w-sm">
                Have a project idea, code question, or just want to chat about Web Dev, Flutter, or NestJS? Drop a message.
              </p>
            </div>

            {/* Social List */}
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <Magnetic key={link.name} range={45} strength={0.25}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#090d16]/30 backdrop-blur-sm hover:border-white/20 transition-all duration-300 w-full min-w-[280px]"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${link.color} border border-white/5`}>
                        {link.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                          {link.name}
                        </div>
                        <div className="text-white text-sm font-medium group-hover:text-cyan-glow transition-colors duration-300">
                          {link.value}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition-colors duration-300" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Right Column: GitHub Stats Widget */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="font-mono text-slate-500 text-[10px] uppercase tracking-widest text-center lg:text-left mb-2">
              // GitHub Activity Overview
            </div>

            {/* Outer Container with Glowing Border */}
            <div className="relative p-6 rounded-2xl border border-white/5 bg-[#090d16]/40 backdrop-blur-md shadow-lg shadow-black/30 overflow-hidden group hover:border-cyan-glow/20 transition-all duration-500">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
                {/* Main Stats Card */}
                <div className="w-full sm:w-1/2 flex justify-center">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=chriswk21&show_icons=true&theme=tokyonight&bg_color=090d16&title_color=00f2fe&icon_color=00f2fe&text_color=94a3b8&hide_border=true"
                    alt="Chris William's GitHub Stats"
                    className="w-full max-w-[320px] h-auto object-contain select-none group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Top Langs Card */}
                <div className="w-full sm:w-1/2 flex justify-center border-t sm:border-t-0 sm:border-l border-white/5 pt-6 sm:pt-0 sm:pl-6">
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=chriswk21&layout=compact&theme=tokyonight&bg_color=090d16&title_color=8a2be2&text_color=94a3b8&hide_border=true"
                    alt="Chris William's Top Languages"
                    className="w-full max-w-[280px] h-auto object-contain select-none group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6 text-center md:text-left">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <Terminal size={14} className="text-cyan-glow" />
            <span>&copy; {new Date().getFullYear()} CHRIS WILLIAM KURNIAWAN. All rights reserved.</span>
          </div>
          
          <div className="font-mono text-xs text-slate-500">
            Designed & Built with <span className="text-violet-glow">✦</span> Kinetic Scrollytelling
          </div>
        </div>

      </div>
    </footer>
  );
}
