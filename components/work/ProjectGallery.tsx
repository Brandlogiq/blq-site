"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ImageModal from "@/components/ui/ImageModal";
import PlayButton from "@/components/ui/PlayButton";
import { youtubeFallbackThumbnail, type GalleryItem } from "@/lib/youtube";

interface ProjectGalleryProps {
  items: GalleryItem[];
  heading: string;
}

const ITEMS_PER_PAGE = 4;

export default function ProjectGallery({ items, heading }: ProjectGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const openModal = (index: number) => {
    setCurrentImageIndex(startIndex + index);
    setModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % items.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="px-6 md:px-12 py-20 border-t border-neutral-200 dark:border-neutral-800">
      <h3 className="text-sm uppercase tracking-widest opacity-50 mb-12">{heading}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {currentItems.map((item, index) => (
            <motion.div
              key={`${item.type}-${item.src}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative aspect-video overflow-hidden group cursor-pointer bg-neutral-100 dark:bg-neutral-900 rounded-sm"
              onClick={() => openModal(index)}
            >
              <img 
                src={item.thumbnail} 
                alt={item.alt || `Gallery item ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                onError={(event) => {
                  if (item.type !== "youtube") return;
                  const id = item.thumbnail.split("/vi/")[1]?.split("/")[0];
                  if (id) event.currentTarget.src = youtubeFallbackThumbnail(id);
                }}
              />
              <div className={`absolute inset-0 transition-colors duration-300 ${item.type === "youtube" ? "bg-black/35 group-hover:bg-black/50" : "bg-black/0 group-hover:bg-black/20"}`} />
              {item.type === "youtube" ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayButton />
                </div>
              ) : null}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <button 
            onClick={prevPage}
            disabled={currentPage === 1}
            className="group flex items-center gap-4 text-sm uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Prev
          </button>

          <span className="text-sm font-mono tracking-widest opacity-50">
            {String(currentPage).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
          </span>

          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="group flex items-center gap-4 text-sm uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:text-accent transition-colors"
          >
            Next
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      <ImageModal 
        isOpen={modalOpen}
        items={items}
        currentIndex={currentImageIndex}
        onClose={() => setModalOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}
