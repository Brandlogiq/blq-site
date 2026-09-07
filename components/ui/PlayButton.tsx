export default function PlayButton({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-accent text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7 translate-x-[1px]" fill="currentColor">
        <path d="M8 5.14v13.72L19.12 12 8 5.14z" />
      </svg>
    </span>
  );
}
