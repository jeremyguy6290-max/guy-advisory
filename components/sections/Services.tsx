import {
  Landmark,
  MessageSquare,
  Newspaper,
  Users,
  ShieldAlert,
  Radio,
} from "lucide-react";

const services = [
  {
    icon: Landmark,
    title: "Government Relations",
    description:
      "Clear advice on engaging with decision-makers, understanding policy environments and building productive relationships.",
  },
  {
    icon: MessageSquare,
    title: "Strategic Communications",
    description:
      "Messaging, planning and communications support that helps organisations speak clearly and confidently.",
  },
  {
    icon: Newspaper,
    title: "Public Relations",
    description:
      "Reputation-focused advice across media, stakeholders and public-facing communications.",
  },
  {
    icon: Users,
    title: "Stakeholder Engagement",
    description:
      "Practical support for building trust with the people and organisations that matter.",
  },
  {
    icon: ShieldAlert,
    title: "Crisis and Issues Management",
    description:
      "Calm, experienced guidance when reputation, trust or licence-to-operate is under pressure.",
  },
  {
    icon: Radio,
    title: "Media Advice",
    description:
      "Media strategy, preparation and support from people who understand how the news cycle works.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <span className="text-xs tracking-[0.2em] uppercase text-[#0ea5a4] font-medium">
            What we do
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-light tracking-wide text-[#0f4c5c]">
            Our services.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-8 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm hover:border-[#0ea5a4]/30 hover:bg-white/85 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0ea5a4]/10 flex items-center justify-center mb-6 group-hover:bg-[#0ea5a4]/20 transition-colors duration-200">
                  <Icon className="w-5 h-5 text-[#0ea5a4]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-medium tracking-wide text-[#0f4c5c] mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-[#0f4c5c]/65 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
