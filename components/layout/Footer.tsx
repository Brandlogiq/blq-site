export default function Footer({
  brandName,
  location,
  copyright,
}: {
  brandName: string;
  location: string;
  copyright: string;
}) {
  return (
    <footer className="p-6 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col md:flex-row justify-between items-end">
        <h2 className="text-[12vw] leading-none font-bold uppercase tracking-tighter opacity-10 select-none">
          {brandName}
        </h2>
        <div className="text-sm uppercase tracking-widest text-right mt-4 md:mt-0">
          <p>{location}</p>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
