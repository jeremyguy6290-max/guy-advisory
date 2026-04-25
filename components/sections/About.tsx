import Image from "next/image";

const team = [
  {
    name: "Erica Guy",
    image: "/images/Erica Guy.webp",
    email: "erica@guyadvisory.com",
    // Face sits naturally in the upper-centre of her photo
    imagePosition: "center center",
    imageScale: "",
    bio: [
      "Erica is a highly experienced government relations, strategic communications and public relations practitioner. She provides tailored engagement and communications advice to support companies and organisations to build and protect their reputation with all stakeholders.",
      "Joining Lillis Clark in 2019, Erica led multiple campaigns for clients across challenging sectors, including those facing critical licence-to-operate questions. Her work has included mining, building and construction, healthcare and primary production.",
      "A trained journalist, Erica has a background in provincial, daily and rural journalism before transitioning to public relations consulting. She has worked with clients including Fonterra, Ballance Agri-Nutrients, Contact Energy and the Chiefs rugby team, handling media relations, crisis communication, stakeholder engagement and event management.",
    ],
    tags: [
      "Government Relations",
      "Strategic Communications",
      "Public Relations",
      "Crisis Management",
    ],
  },
  {
    name: "Nathan Guy",
    image: "/images/Nathan Guy.jpg",
    email: "nathan@guyadvisory.com",
    // Pull the crop upward so face is centred; slight scale brings it closer
    imagePosition: "center 30%",
    imageScale: "scale-105",
    bio: [
      "Nathan brings deep experience in public life, government relations and practical problem-solving. After 15 years in Parliament, he understands how decisions are made, how relationships are built and how organisations can engage effectively with government and stakeholders.",
      "He combines political experience with a grounded, practical style shaped by his farming background and long-standing connections across New Zealand.",
      "Nathan helps clients understand the landscape, sharpen their message and work toward clear, achievable outcomes.",
    ],
    tags: [
      "Government Relations",
      "Stakeholder Engagement",
      "Primary Industries",
      "Strategy",
    ],
  },
];

export default function About() {
  return (
    <section id="team" className="scroll-mt-24 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <span className="text-xs tracking-[0.2em] uppercase text-[#0ea5a4] font-medium">
            Our team
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-light tracking-wide text-[#0f4c5c]">
            Experience you can trust.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {team.map((person) => (
            <div key={person.name} className="flex flex-col">
              {/* Portrait ratio + overflow-hidden so scale-105 crops cleanly */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-8 shadow-md">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className={`object-cover ${person.imageScale}`}
                  style={{ objectPosition: person.imagePosition }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <h3 className="text-2xl font-medium tracking-wide text-[#0f4c5c] mb-1">
                {person.name}
              </h3>

              <a
                href={`mailto:${person.email}`}
                className="text-sm text-[#0ea5a4] hover:text-[#0f4c5c] transition-colors mb-6"
              >
                {person.email}
              </a>

              <div className="space-y-4 mb-8">
                {person.bio.map((paragraph, i) => (
                  <p key={i} className="text-[#0f4c5c]/70 leading-relaxed text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {person.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs tracking-wide rounded-full border border-[#0ea5a4]/30 text-[#0ea5a4] font-medium bg-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
