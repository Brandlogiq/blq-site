"use client";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import type { Capability } from "@/lib/site";

export default function Capabilities({ items }: { items: Capability[] }) {
  return (
    <section className="px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((cap, index) => (
          <Magnetic key={`${cap.title}-${index}`} strength={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-[40vh] lg:h-[60vh] group overflow-hidden cursor-pointer rounded-sm"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                style={{ backgroundImage: `url(${cap.image})` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out mix-blend-multiply" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <h3 className="text-3xl font-bold uppercase mb-2 text-white group-hover:translate-y-[-10px] transition-transform duration-300">
                  {cap.title}
                </h3>
                <p className="text-sm text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all duration-300 delay-100 max-w-[80%]">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          </Magnetic>
        ))}
      </div>
    </section>
  );
}
