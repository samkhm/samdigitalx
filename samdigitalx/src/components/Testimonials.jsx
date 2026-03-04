import React from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Testimonials() {
  const testimonies = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Founder, Startup XYZ",
      message:
        "SamdigitalX delivered our web platform faster than expected. The code quality and UX design were top-notch!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Mark Thompson",
      role: "CEO, Tech Innovations",
      message:
        "Professional and efficient. The MERN stack expertise really shows. Highly recommended for any modern web project.",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "Product Manager, Creative Labs",
      message:
        "The attention to detail, clean architecture, and timely delivery were impressive. Our dashboards now look amazing!",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },    
    {
      id: 4,
      name: "Sarah Williams",
      role: "Product Manager, Creative Labs",
      message:
        "The attention to detail, clean architecture, and timely delivery were impressive. Our dashboards now look amazing!",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
      
    {
      id: 5,
      name: "Sarah Williams",
      role: "Product Manager, Creative Labs",
      message:
        "The attention to detail, clean architecture, and timely delivery were impressive. Our dashboards now look amazing!",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  const TestimonyCard = ({ testimony }) => (
    <div className="relative bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-lg w-full md:w-80 transition-transform transform hover:scale-105 hover:shadow-2xl">
      <FaQuoteLeft className="text-cyan-400 text-3xl mb-4" />
      <p className="text-gray-300 mb-6">{testimony.message}</p>
      <div className="flex items-center gap-4">
        <img
          src={testimony.avatar}
          alt={testimony.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
        />
        <div>
          <h4 className="text-white font-semibold">{testimony.name}</h4>
          <span className="text-gray-400 text-sm">{testimony.role}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="testimonials"
      className="relative w-full bg-gradient-to-br from-[#020617]/40 to-[#0f172a]/30 px-6 md:px-16 py-28 overflow-hidden"
    >
      {/* Floating shapes */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl top-[-50px] left-[-50px] animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <h4 className="text-sm uppercase tracking-widest text-cyan-400 font-semibold">
          Testimonials
        </h4>
        <h2 className="text-4xl font-bold text-white mt-4">
          What Clients Say
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-4">
          Hear from our satisfied clients who trusted Qimtech Solutions.
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="relative z-10">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonies.map((t) => (
            <SwiperSlide key={t.id}>
              <TestimonyCard testimony={t} />
            </SwiperSlide>
          ))}

          {/* Navigation Arrows */}
          <div className="swiper-button-prev text-white text-2xl absolute top-1/2 -left-6 z-20 cursor-pointer hover:text-cyan-400 transition">
            <FaChevronLeft />
          </div>

          <div className="swiper-button-next text-white text-2xl absolute top-1/2 -right-6 z-20 cursor-pointer hover:text-cyan-400 transition">
            <FaChevronRight />
          </div>
        </Swiper>
      </div>
    </section>
  );
}