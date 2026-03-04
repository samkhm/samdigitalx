import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="relative bg-[#020617] text-gray-300 px-6 md:px-16 py-16 overflow-hidden">

<a
      href="https://wa.me/254745801435"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3
       rounded-full shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </a>

    {/* Scroll To Top Button */}
    {showScroll && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-6 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    )}

      {/* Floating Background Shapes */}
      <div className="absolute w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl top-[-50px] left-[-50px] animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Column 1 - About */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold text-white">SamdigitalX</h3>
          <p className="text-gray-400 text-sm">
            Full-Stack Web Development | MERN Stack Specialist. Building scalable, modern, and maintainable web systems.
          </p>

          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-cyan-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-cyan-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-cyan-400 transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-cyan-400 transition"><FaGithub /></a>
            <a href="#" className="hover:text-cyan-400 transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "About", "Services", "Projects", "Skills", "Pricing", "Contact", "Testimonials"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="hover:text-cyan-400 transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Email: <a href="mailto:samuelkimanthi02@gmail.com" className="hover:text-cyan-400 transition">samuelkimanthi02@gmail.com</a></li>
            <li>Phone: <a href="tel:+254745801435" className="hover:text-cyan-400 transition">+2547 4580 1435</a></li>
            <li>Location: Nairobi, Kenya</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SamdigitalX. All rights reserved.
      </div>
    </footer>
  );
}