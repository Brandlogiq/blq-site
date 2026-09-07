"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Magnetic from "@/components/ui/Magnetic";

export default function Header({
  brandName,
  workLabel,
  contactLabel,
}: {
  brandName: string;
  workLabel: string;
  contactLabel: string;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-transparent backdrop-blur-sm border-b border-neutral-200/10">
        <div className="text-2xl font-bold tracking-tighter uppercase mix-blend-difference text-white">
            {brandName}
        </div>
        <div className="w-10 h-10" />
      </header>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-transparent backdrop-blur-sm border-b border-neutral-500/10">
      <Link href="/" className="text-2xl font-bold tracking-tighter uppercase text-foreground transition-colors">
        {brandName}
      </Link>
      <nav className="flex gap-8 items-center text-foreground font-sans font-medium">
        <Magnetic>
          <Link href="/work" className="hover:text-accent transition-colors uppercase text-sm tracking-widest font-medium p-2">{workLabel}</Link>
        </Magnetic>
        <Magnetic>
          <Link href="/contact" className="hover:text-accent transition-colors uppercase text-sm tracking-widest font-medium p-2">{contactLabel}</Link>
        </Magnetic>
        <Magnetic>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative rounded-full hover:bg-neutral-500/10 transition-all duration-300 w-10 h-10 flex items-center justify-center border border-neutral-500/20"
            aria-label="Toggle theme"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Sun 
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ${
                  isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`} 
              />
              <Moon 
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ${
                  isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`} 
              />
            </div>
          </button>
        </Magnetic>
      </nav>
    </header>
  );
}
