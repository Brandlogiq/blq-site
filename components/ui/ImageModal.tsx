"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import PlayButton from "@/components/ui/PlayButton";
import {
  parseYouTubeId,
  youtubeEmbedSrc,
  youtubeFallbackThumbnail,
  type GalleryItem,
} from "@/lib/youtube";

interface ImageModalProps {
  isOpen: boolean;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageModal({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageModalProps) {
  const [playing, setPlaying] = useState(false);
  const item = items[currentIndex];
  const youtubeId = item?.type === "youtube" ? parseYouTubeId(item.src) : null;

  useEffect(() => {
    setPlaying(false);
  }, [currentIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-md"
        >
          <div className="absolute inset-0 z-0" onClick={onClose} />

          <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
            <div className="text-xs font-mono tracking-[0.3em] uppercase opacity-50">
              {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </div>
            <button 
              onClick={onClose} 
              className="group pointer-events-auto flex items-center gap-4 text-xs font-mono tracking-[0.3em] uppercase hover:text-accent transition-colors"
            >
              Close <X size={14} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 pointer-events-none z-40">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="group pointer-events-auto w-32 h-screen flex items-center justify-start text-white/20 hover:text-white transition-colors"
            >
              <ArrowLeft size={40} className="group-hover:-translate-x-2 transition-transform duration-500 font-thin" strokeWidth={1} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="group pointer-events-auto w-32 h-screen flex items-center justify-end text-white/20 hover:text-white transition-colors"
            >
              <ArrowRight size={40} className="group-hover:translate-x-2 transition-transform duration-500 font-thin" strokeWidth={1} />
            </button>
          </div>

          <div className="relative z-10 w-full h-full flex items-center justify-center p-8 md:p-24 lg:p-32 pointer-events-none">
            {youtubeId && playing ? (
              <div className="w-full max-w-6xl aspect-video pointer-events-auto shadow-2xl">
                <iframe
                  key={youtubeId}
                  src={youtubeEmbedSrc(youtubeId)}
                  title={item.alt || "YouTube video"}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : youtubeId ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPlaying(true);
                }}
                className="group relative w-full max-w-6xl aspect-video pointer-events-auto overflow-hidden"
              >
                <img
                  src={item.thumbnail}
                  alt={item.alt || "Video"}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = youtubeFallbackThumbnail(youtubeId);
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <PlayButton />
                </span>
              </button>
            ) : (
              <motion.img
                key={item.src}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src={item.src}
                alt={item.alt || "Gallery Preview"}
                className="max-h-full max-w-full object-contain select-none shadow-2xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
