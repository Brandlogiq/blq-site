"use client";

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-8">
      <div className="border-b border-neutral-200 dark:border-neutral-800 focus-within:border-accent transition-colors">
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full bg-transparent py-4 outline-none placeholder:uppercase placeholder:tracking-widest focus:placeholder:text-accent transition-colors"
        />
      </div>
      <div className="border-b border-neutral-200 dark:border-neutral-800 focus-within:border-accent transition-colors">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full bg-transparent py-4 outline-none placeholder:uppercase placeholder:tracking-widest focus:placeholder:text-accent transition-colors"
        />
      </div>
      <div className="border-b border-neutral-200 dark:border-neutral-800 focus-within:border-accent transition-colors">
        <textarea 
          placeholder="Brief" 
          rows={1}
          className="w-full bg-transparent py-4 outline-none placeholder:uppercase placeholder:tracking-widest focus:placeholder:text-accent transition-colors resize-none"
        />
      </div>
      <button type="submit" className="self-start mt-8 px-8 py-3 border border-current rounded-full uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
        Submit Request
      </button>
    </form>
  );
}
