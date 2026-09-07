"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

export default function AboutNarrative({
  text,
  ctaLabel,
  ctaHref,
}: {
  text: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Magnetic effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (max 30px movement)
    const distanceX = (clientX - centerX) * 0.2;
    const distanceY = (clientY - centerY) * 0.2;
    
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="px-6 md:px-12 pb-12 lg:pb-24 pt-10 lg:pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] normal-case"
          >
            {text}
          </motion.p>
        </div>
        
        <div className="md:col-span-4 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <Link 
              href={ctaHref} 
              className="group inline-flex items-center gap-6"
            >
              <motion.div 
                style={{ x: springX, y: springY }}
                className="flex items-center gap-6"
              >
                <span className="text-xl uppercase tracking-widest font-medium text-accent">
                  {ctaLabel}
                </span>
                
                <div className="relative">
                  {/* Expanding Background Circle */}
                  <motion.div 
                    className="absolute inset-0 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-[0.22,1,0.36,1]"
                  />
                  
                  {/* Main Bordered Circle */}
                  <div className="w-16 h-16 rounded-full border border-accent flex items-center justify-center relative z-10 group-hover:border-transparent transition-colors duration-300">
                    <motion.div
                      animate={{ 
                        rotate: [0, 45, 0],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "easeInOut" 
                      }}
                      className="group-hover:text-white transition-colors"
                    >
                      <ArrowUpRight size={32} strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
