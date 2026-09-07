"use client";
import { motion } from "framer-motion";
import VideoBackground from "@/components/ui/VideoBackground";

export default function Hero({
  title,
  accent,
  subtitle,
  videoSrc,
}: {
  title: string;
  accent: string;
  subtitle: string;
  videoSrc?: string;
}) {
  return (
    <section className="relative h-[50vh] lg:h-[70vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <VideoBackground src={videoSrc} />
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative z-10 text-[9vw] md:text-[7vw] font-bold uppercase tracking-tighter leading-none ${videoSrc ? "text-white" : ""}`}
      >
        {title} <br />
        <span className="text-accent">{accent}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`relative z-10 mt-8 text-lg md:text-xl uppercase tracking-widest max-w-2xl font-light ${videoSrc ? "text-white/90" : ""}`}
      >
        {subtitle}
      </motion.p>
    </section>
  );
}
