const testimonials = [
  {
    quote:
      "Erica provided first class advice and recommendations, and her contacts and access to decision-makers where required are excellent. We faced some trying moments and she always took the positive approach and kept her humour and common sense, which made those times much easier to deal with.",
    author: "Alan",
    organisation: "Executive Chairman",
  },
  {
    quote:
      "Erica has played an important role in making sure the industry's voice is heard, particularly where policy and regulation come into play, and has a knack for cutting through complexity to get to practical solutions.",
    author: "Greg",
    organisation: "Chief Executive",
  },
  {
    quote:
      "Since I started collaborating with Erica, her proactive approach and unwavering support have made a significant impact. Efforts in helping us connect with relevant Ministers have opened doors to exciting opportunities and her insider knowledge has consistently guided us.",
    author: "Mike",
    organisation: "Chief Executive",
  },
];

export default function Testimonials() {
  return (
    // Dark zone of the gradient — headings use white, cards use glass-white
    <section id="testimonials" className="scroll-mt-24 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 lg:mb-14">
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
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-sm flex flex-col"
            >
              <div className="w-8 h-0.5 bg-[#0ea5a4] mb-5" />
              <p className="text-[#0f4c5c] text-base leading-relaxed flex-1 mb-5">
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
