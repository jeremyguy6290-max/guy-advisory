const pillars = [
  {
    title: "Strategic counsel",
    description:
      "Experienced advice that draws on deep knowledge of government, media and stakeholder environments.",
  },
  {
    title: "Trusted relationships",
    description:
      "Built over decades across politics, journalism, government and industry.",
  },
  {
    title: "Practical outcomes",
    description:
      "Grounded, real-world guidance that helps organisations move forward with confidence.",
  },
];

export default function Intro() {
  return (
    <section id="about" className="scroll-mt-24 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xl lg:text-2xl text-[#0f4c5c]/80 leading-relaxed font-light">
            Guy Advisory helps organisations build trust, protect reputation and
            navigate complex stakeholder environments. We work alongside leaders
            who need practical advice, clear communication and strong
            relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-8 bg-white/65 backdrop-blur-sm border border-white/60 rounded-2xl hover:border-[#0ea5a4]/30 hover:bg-white/80 transition-all duration-200 shadow-sm"
            >
              <div className="w-10 h-0.5 bg-[#0ea5a4] mb-6" />
              <h3 className="text-lg font-medium tracking-wide text-[#0f4c5c] mb-3">
                {pillar.title}
              </h3>
              <p className="text-[#0f4c5c]/65 leading-relaxed text-sm">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
