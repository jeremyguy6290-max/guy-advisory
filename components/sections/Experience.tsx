const sectors = [
  "Government",
  "Primary industries",
  "Infrastructure",
  "Healthcare",
  "Energy",
  "Construction",
  "Sport and community organisations",
];

export default function Experience() {
  return (
    /*
      The section itself is transparent — it sits over the page gradient.
      The content lives inside a contained dark panel with rounded corners
      so it reads as an intentional design moment rather than an abrupt block.
    */
    <section id="experience" className="scroll-mt-24 py-10 lg:py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0f4c5c] rounded-3xl px-8 py-10 lg:px-12 lg:py-12">
          <div className="mb-8">
            <span className="text-xs tracking-[0.2em] uppercase text-[#7ed957] font-medium">
              Sectors
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-light tracking-wide text-white">
              Experience across complex sectors.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {sectors.map((sector) => (
              <span
                key={sector}
                className="px-5 py-2.5 rounded-full text-sm tracking-wide text-white/80 border border-white/20 hover:border-[#7ed957]/60 hover:text-[#7ed957] transition-colors duration-200 cursor-default"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
