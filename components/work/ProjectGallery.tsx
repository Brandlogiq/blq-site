"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ImageModal from "@/components/ui/ImageModal";

interface ProjectGalleryProps {
  images: string[];
  heading: string;
}

const ITEMS_PER_PAGE = 4;

export default function ProjectGallery({ images, heading }: ProjectGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const openModal = (index: number) => {
    setCurrentImageIndex(startIndex + index);
    setModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  if (!images || images.length === 0) return null;

  return (
    <section className="px-6 md:px-12 py-20 border-t border-neutral-200 dark:border-neutral-800">
      <h3 className="text-sm uppercase tracking-widest opacity-50 mb-12">{heading}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {currentImages.map((img, index) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative aspect-video overflow-hidden group cursor-pointer bg-neutral-100 dark:bg-neutral-900 rounded-sm"
              onClick={() => openModal(index)}
            >
              <img 
                src={img} 
                alt={`Gallery image ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sleek Pagination */}
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
        image={images[currentImageIndex]}
        currentIndex={currentImageIndex}
        totalImages={images.length}
        onClose={() => setModalOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}
