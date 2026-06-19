'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export function Magnetic({ children, range = 70, strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < range) {
      // Calculate pull relative to distance
      const force = (range - distance) / range; // 1 at center, 0 at range limit
      setPosition({ 
        x: distanceX * strength * force, 
        y: distanceY * strength * force 
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x, y }}
        transition={{ type: 'spring', stiffness: 120, damping: 12, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
