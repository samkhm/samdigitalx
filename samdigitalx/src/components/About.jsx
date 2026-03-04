import React from "react";
import { Button } from "./ui/button";
import Image from "../pages/portfolio/images/laptop.jpg"

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-1 flex-col md:flex-row items-center justify-center px-6 md:px-16 py-20"
    >
      {/* LEFT - IMAGE */}
      <div className="flex justify-center md:justify-start w-full md:w-1/2 mb-10 md:mb-0">
        <div className="relative">
          <div className="absolute -inset-4 bg-[rgb(66,153,170)]/20 rounded-3xl blur-xl"></div>
          <img
            src={Image}
            alt="My image"
            className="relative w-80 md:w-96 rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>

      {/* RIGHT - CONTENT */}
      <div className="flex flex-col justify-center w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h4 className="text-sm uppercase tracking-widest text-[rgb(66,153,170)] font-semibold">
          About Me
        </h4>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight">
          Full-Stack Web Developer <br />
          <span className="text-[rgb(66,153,170)]">MERN Stack Specialist</span>
        </h2>

        <p className="text-gray-400 leading-relaxed max-w-xl">
          I build modern, scalable web systems and mobile apps that solve real
          business challenges. From dashboards and client portals to automation
          systems, I focus on performance, clean architecture, and long-term
          maintainability.
        </p>

        <p className="text-gray-400 leading-relaxed max-w-xl">
          Through <strong>SamdigitalX</strong>, I provide freelance development
          services for startups, small businesses, and agencies — delivering
          production-ready code with precision and efficiency.
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
          {[
            "React",
            "React Native",
            "Node.js",
            "Express",
            "Python",
            "MongoDB",
            "Git",
            "Vercel",
            "Render",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-1 text-sm bg-white shadow rounded-full text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        <Button
          className="mt-6 px-8 py-3 bg-blue-500 hover:bg-[rgba(20,46,51,1)]
         text-white rounded-xl shadow-lg transition duration-300"
        >
          <a href="#contact">Let's Work Together</a>
        </Button>
      </div>
    </section>
  );
}
