import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-20 px-6 md:px-12 pb-20 min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-[10vw] font-bold uppercase tracking-tighter leading-none mb-12">Partner With Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <p className="text-xl uppercase tracking-widest mb-8">
              We build brands for the world and own the stories that define them.
            </p>
            <div className="space-y-4 text-sm opacity-70 uppercase tracking-widest">
              <p>Kathmandu / Global Remote</p>
              <a href="mailto:hello@brandlogiq.net" className="hover:text-accent transition-colors block">hello@brandlogiq.net</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
