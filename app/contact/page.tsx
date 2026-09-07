import ContactForm from "@/components/contact/ContactForm";
import { getContactContent } from "@/lib/site";

export default async function ContactPage() {
  const contact = await getContactContent();

  return (
    <div className="pt-20 px-6 md:px-12 pb-20 min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-[10vw] font-bold uppercase tracking-tighter leading-none mb-12">
          {contact.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <p className="text-xl uppercase tracking-widest mb-8">{contact.intro}</p>
            <div className="space-y-4 text-sm opacity-70 uppercase tracking-widest">
              <p>{contact.location}</p>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-accent transition-colors block"
              >
                {contact.email}
              </a>
            </div>
          </div>
          <ContactForm
            submitLabel={contact.submitLabel}
            namePlaceholder={contact.namePlaceholder}
            emailPlaceholder={contact.emailPlaceholder}
            briefPlaceholder={contact.briefPlaceholder}
          />
        </div>
      </div>
    </div>
  );
}
