import React from "react";
import ProfileImage from "../pages/portfolio/images/meholdinglaptop.png"
import { FaWhatsapp, FaPhone } from "react-icons/fa";

function Home() {
  const whatsappNumber = "254745801435"; // e.g. 254712345678

  return (
    <section id="home" className="min-h-4xl flex flex-col items-center px-6 md:px-16">
      <div className="w-full h-28"></div>
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6 text-center md:text-left">
          
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Hey! 👋 <br />
            I am a <span className="text-blue-400">Web Developer</span>
          </h1>

          <h2 className="text-lg md:text-xl text-gray-300 font-medium">
            Full-Stack Web Developer | MERN Specialist
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-xl">
            I specialize in building scalable, high-performance web applications 
            using MongoDB, Express.js, React, and Node.js. I develop secure, 
            maintainable systems ranging from internal dashboards to 
            customer-facing platforms that solve real business problems.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center md:justify-start pt-4">
          <a href="#projects">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300">
              View Projects              
            </button>
            </a>
            <a href="#contact">
            <button className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-xl transition duration-300">
              Contact Me
            </button>
            </a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              <button className="border border-blue-400 hover:bg-blue-100 cursor-pointer text-white px-6 py-3 rounded-xl shadow-lg transition duration-300">
                <FaWhatsapp w={40} h={40} className="text-blue-400 text-xl" />
              </button>
            </a>

            {/* call phone number */}
            <a href={`tel:${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              <button className="border border-blue-400 hover:bg-blue-100 cursor-pointer text-white px-6 py-3 rounded-xl shadow-lg transition duration-300">
                <FaPhone className="text-blue-400 text-xl" />
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT - PROFILE IMAGE */}
        <div className="flex justify-center md:justify-end">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl">
            <img
              src={ProfileImage}
              alt="Profile"
              className="w-72 h-90 object-cover rounded-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Home;