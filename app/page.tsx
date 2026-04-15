import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import GeometricBackground from "./components/GeometricBackground";
import FadeIn from "./components/FadeIn";

export default function Home() {
  return (
    <>
      <LoadingScreen />

      {/* Geometric background behind entire page */}
      <div className="fixed inset-0 z-0">
        <GeometricBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />

          <FadeIn>
            <About />
          </FadeIn>

          <Experience />

          <Projects />

          <Skills />

          <FadeIn>
            <Education />
          </FadeIn>

          {/* <Certifications /> */}

          <FadeIn>
            <Contact />
          </FadeIn>
        </main>

        <Footer />
      </div>
    </>
  );
}
