"use client";

import Image from "next/image";
import { useState } from "react";

const team = [
  {
    name: "Erica Guy",
    image: "/images/Erica Guy.webp",
    email: "erica@guyadvisory.com",
    phone: "021 894 123",
    imagePosition: "center 10%",
    preview:
      "Erica is a highly experienced government relations, strategic communications and public relations practitioner. She provides tailored engagement and communications advice to support companies and organisations to build and protect their reputation with all stakeholders.",
    bio: [
      "While she established Guy Advisory in 2003, Erica has been an Associate at government relations specialist agency, Lillis Clark, since 2019 leading multiple campaigns for clients, including those in highly challenging sectors facing critical licence-to-operate questions. This has included work across the mining, building and construction, healthcare, and primary production sectors.",
      "A trained journalist, Erica has a background in provincial, daily and rural journalism before transitioning to public relations consulting more than 20 years ago. She has worked mainly in the private sector and handled a variety of communications needs from media relations to crisis, stakeholder and event management.",
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
    phone: null,
    imagePosition: "center 30%",
    preview:
      "Nathan is an experienced governor and politician, who holds a variety of roles that ensure he has regular engagement with government Ministers, officials and decision-makers.",
    bio: [
      "Nathan is currently the Special Agricultural Trade Envoy, Chair of the Meat Industry Association, Chair of Apiculture New Zealand, Chair of Barenbrug Advisory Board and Managing Director of Kereru Farm, a family dairy farming business in the Horowhenua.",
      "He was a Minister in the John Key-led National government, after being elected to Parliament in 2005 and becoming the MP for Otaki in 2008 and holding the seat until his retirement in 2020. His Ministerial portfolios included the Minister for Primary Industries, Immigration, Racing, Veterans Affairs and Internal Affairs.",
      "Prior to entering Parliament, Nathan was a Councillor on the Horowhenua District Council.",
      "Nathan is known for his open communication style and for being an honest broker.",
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (name: string) =>
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <section id="team" className="scroll-mt-24 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 lg:mb-14">
          <span className="text-xs tracking-[0.2em] uppercase text-[#0ea5a4] font-medium">
            Our team
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-light tracking-wide text-[#0f4c5c]">
            Experience you can trust.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {team.map((person) => {
            const isExpanded = expanded[person.name] ?? false;
            return (
              <div
                key={person.name}
                className="bg-white/65 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                {/* Image — fills card width, clipped by rounded top corners */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover scale-[1.12]"
                    style={{ objectPosition: person.imagePosition }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Name + email + phone */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold tracking-wide text-[#0f4c5c]">
                      {person.name}
                    </h3>
                    <a
                      href={`mailto:${person.email}`}
                      className="text-sm text-[#0ea5a4] hover:text-[#0f4c5c] transition-colors"
                    >
                      {person.email}
                    </a>
                    {person.phone && (
                      <p className="text-sm text-[#0ea5a4]">{person.phone}</p>
                    )}
                  </div>

                  {/* Preview — always visible */}
                  <p className="text-sm text-[#0f4c5c]/70 leading-relaxed">
                    {person.preview}
                  </p>

                  {/* Expanded bio — revealed on toggle */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-[600px]" : "max-h-0"
                    }`}
                  >
                    <div className="space-y-3">
                      {person.bio.map((para, i) => (
                        <p key={i} className="text-sm text-[#0f4c5c]/70 leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Read more / Read less */}
                  <button
                    onClick={() => toggle(person.name)}
                    className="text-xs font-medium tracking-[0.1em] uppercase text-[#0ea5a4] hover:text-[#0f4c5c] transition-colors"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
