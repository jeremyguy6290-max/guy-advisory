import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Single gradient wrapper — creates one cohesive background after the hero */}
        <div className="page-gradient">
          <Intro />
          <About />
          <Services />
          <Experience />
          <Testimonials />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
