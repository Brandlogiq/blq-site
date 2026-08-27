"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-[50vh] lg:h-[70vh] flex flex-col justify-center items-center text-center px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[9vw] md:text-[7vw] font-bold uppercase tracking-tighter leading-none"
      >
        Visions Scaled. <br />
        <span className="text-accent">Legacies Owned.</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 text-lg md:text-xl uppercase tracking-widest max-w-2xl font-light"
      >
        We build the brands that define the world and own the assets that define the culture.
      </motion.p>
    </section>
  );
}
