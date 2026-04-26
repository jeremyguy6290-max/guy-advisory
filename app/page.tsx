import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import BeehiveScroll from "@/components/sections/BeehiveScroll";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/*
          Single gradient wrapper — BeehiveScroll sits at the top so the
          building animates over the white-to-green opening of the gradient,
          then the content sections flow through the deeper teal below.
        */}
        <div className="page-gradient">
          <BeehiveScroll />
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
