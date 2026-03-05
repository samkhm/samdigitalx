import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

function Main() {
  return (
    <>
      <div className="bg-gradient-to-b from-[rgb(3,3,26)] to-[rgb(10,10,71)] min-h-screen
       flex flex-col items-center px-4 sm:px-3 lg:px-8">
        <Navbar />
        <div className="flex-1 w-full lg:w-[80%] flex flex-col">
          <Home />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Pricing />
          <Testimonials />
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
