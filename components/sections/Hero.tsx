import Image from "next/image";
import BackgroundGradientAnimation from "@/components/ui/background-gradient-animation";

export default function Hero() {
  return (
    <section id="hero">
      <BackgroundGradientAnimation>
        {/*
          pt-24 / pb-32 means the flex centering lands ~16px above true centre —
          the "heavier bottom" feel that reads as optically centred.
          pb-32 also keeps buttons well clear of the 180px bottom fade.
        */}
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24 pb-24">

          <div className="mb-4">
            <Image
              src="/images/Guy Advisory Icon Logo Transparent copy.png"
              alt="Guy Advisory"
              width={120}
              height={120}
              className="w-[100px] lg:w-[120px] h-auto mx-auto"
              priority
            />
          </div>

          <h1 className="max-w-[820px] text-4xl lg:text-6xl font-light tracking-[0.02em] text-[#0f4c5c] leading-tight mb-3">
            Strategic advice for complex environments.
          </h1>

          <p className="max-w-2xl text-lg lg:text-xl text-[#0f4c5c]/65 leading-relaxed mb-6 font-light">
            Government relations, public relations and strategic communications
            for organisations that need clarity, credibility and trusted support.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:erica@guyadvisory.com"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium tracking-wide text-white bg-[#0ea5a4] hover:bg-[#0f4c5c] transition-colors duration-200 shadow-sm"
            >
              Contact Erica
            </a>
            <a
              href="mailto:nathan@guyadvisory.com"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium tracking-wide text-[#0f4c5c] bg-white/80 hover:bg-white border border-[#0f4c5c]/20 transition-colors duration-200 shadow-sm"
            >
              Contact Nathan
            </a>
          </div>

        </div>
      </BackgroundGradientAnimation>
    </section>
  );
}
