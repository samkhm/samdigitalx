import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaNetworkWired,
  FaSearch
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress
} from "react-icons/si";
import { useState, useEffect } from 'react'
import API from "@/service/api";

export default function Skills() {

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(4)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  const visibleSkills = skills.slice(0, visibleCount)

  const fetchSkills = async () => {
    setLoading(true)
    try {

      const res = await API.get('/portfolio/skills')

      setSkills(res.data);
      
    } catch (error) {
      console.log("Error fetching skills", error)      
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])


  const SkillBadge = ({ title, image }) => {
    return (
      <div
        className="group flex items-center gap-3 px-6 py-3 rounded-full 
                   bg-white/5 backdrop-blur-md border border-white/10
                   hover:border-[rgb(66,153,170)] 
                   hover:shadow-[0_0_25px_rgba(66,153,170,0.5)]
                   transition-all duration-300 cursor-pointer"
      >
          <img
        src={image}
        alt={title}
        className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300"
      />
        <span className="text-gray-200 font-medium tracking-wide">{title}</span>
      </div>
    );
  };

  const SkillSkeleton = () => {
    return (
      <div
        className="flex items-center gap-3 px-6 py-3 rounded-full 
                   bg-white/5 border border-white/10
                   animate-pulse"
      >
        <div className="w-6 h-6 rounded-full bg-gray-600/40" />
        <div className="w-20 h-4 rounded bg-gray-600/40" />
      </div>
    );
  };

  return (
    <section
      id="skills"
      className="relative w-full flex flex-col items-center justify-center px-6 md:px-16 py-28 
                 bg-gradient-to-br from-[#03031a] to-[#0a0a47] overflow-hidden"
    >
      {/* Floating Background Shapes */}
      <div className="absolute w-72 h-72 bg-[rgb(66,153,170)]/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Header */}
      <div className="text-center mb-14 space-y-4 relative z-10">
        <h4 className="text-sm uppercase tracking-widest text-[rgb(66,153,170)] font-semibold">
          Skills
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Tech Stack & Expertise
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Technologies and tools I use to design and build scalable,
          high-performance web systems.
        </p>
      </div>

      {/* Skills Flex Container */}
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl relative z-10">

      {loading
    ? Array.from({ length: 8 }).map((_, index) => (
        <SkillSkeleton key={index} />
      ))
    : visibleSkills.map((skill) => (
        <SkillBadge
          key={skill._id}
          title={skill.title}
          image={skill.image}
        />
      ))}

<div className="flex items-center justify-end w-full">
  {
    visibleCount < skills.length && (
      <button className="text-white text-sm italic hover:text-gray-400"
      onClick={handleLoadMore}>
        Load more...
      </button>
    )
  }
</div>
      </div>
    </section>
  );
}
