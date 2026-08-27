"use client";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

const capabilities = [
  { 
    title: "Global Strategy", 
    desc: "High-end work for foreign clients.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    color: "bg-accent"
  },
  { 
    title: "Nepal Execution", 
    desc: "Dominant local campaigns.",
    image: "https://images.unsplash.com/photo-1544735038-179ad682ee5d?q=80&w=2070&auto=format&fit=crop",
    color: "bg-accent"
  },
  { 
    title: "Venture & IP", 
    desc: "Acquiring and developing original assets in Media, Sports, and Tech.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop",
    color: "bg-accent"
  },
];

export default function Capabilities() {
  return (
    <section className="px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((cap, index) => (
          <Magnetic key={index} strength={0.1}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-[40vh] lg:h-[60vh] group overflow-hidden cursor-pointer rounded-sm"
            >
              {/* Default Image State */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                style={{ backgroundImage: `url(${cap.image})` }}
              />
              
              {/* Overlay for contrast */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />

              {/* Hover Color State */}
              <div className={`absolute inset-0 ${cap.color} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out mix-blend-multiply`} />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <h3 className="text-3xl font-bold uppercase mb-2 text-white group-hover:translate-y-[-10px] transition-transform duration-300">
                  {cap.title}
                </h3>
                <p className="text-sm text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all duration-300 delay-100 max-w-[80%]">
                  {cap.desc}
                </p>
              </div>
            </motion.div>
          </Magnetic>
        ))}
      </div>
    </section>
  );
}
