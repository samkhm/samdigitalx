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
import React from "react";

function Main() {
  return (
    <>
      <div
        className="bg-gradient-to-b from-[rgb(3,3,26)] to-[rgb(10,10,71)] 
    min-h-screen flex items-center flex-col lg:p-5 sm:p-1 gap-2"
      >
        <Navbar />
        <div className="flex-1 flex-col sm:w-[90%] lg:w-[80%]">
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
