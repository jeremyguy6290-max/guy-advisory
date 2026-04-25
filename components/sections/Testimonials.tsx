// PLACEHOLDER TESTIMONIALS — replace quotes and attribution before launch

const testimonials = [
  {
    quote:
      "Guy Advisory brought clarity to a complex environment and helped us understand the path forward.",
    author: "Chief Executive",
    organisation: "Organisation name",
  },
  {
    quote:
      "Their advice was practical, calm and grounded in real experience.",
    author: "General Manager",
    organisation: "Organisation name",
  },
  {
    quote:
      "Erica and Nathan understand relationships, reputation and how to get things moving.",
    author: "Board Chair",
    organisation: "Organisation name",
  },
];

export default function Testimonials() {
  return (
    // Dark zone of the gradient — headings use white, cards use glass-white
    <section id="testimonials" className="scroll-mt-24 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <span className="text-xs tracking-[0.2em] uppercase text-[#7ed957] font-medium">
            What clients say
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-light tracking-wide text-white">
            Trusted by leaders who need results.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-sm flex flex-col"
            >
              <div className="w-8 h-0.5 bg-[#0ea5a4] mb-8" />
              <p className="text-[#0f4c5c] text-base leading-relaxed flex-1 mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-[#0f4c5c]">{t.author}</p>
                <p className="text-xs text-[#0f4c5c]/50 mt-0.5">{t.organisation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
