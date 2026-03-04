import React from "react";
import { useState, useEffect } from "react";
import API from "@/service/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await API.get('/portfolio/project')
      setProjects(res.data)
    } catch (error) {
      console.log("Error fetching projects", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  console.log(projects)

 //database data

// description : "Role-based management dashboard with analytics, reporting, and notification system."
// githubLink : "http://hdfdf"
// image : "https://res.cloudinary.com/dxjutjucz/image/upload/v1772618260/portfolio_projects/x8gmijrlot6nbewyfjzc.png"
// liveLink : "http://ouw"
// tech : (3) ['React', 'Tailwind', 'Express']
// title : "Admin Dashboard"
// _id : "69a80137a499b09028542b8d"

const ProjectSkeleton = () => {
  return (
    <div className="w-full md:w-[48%] bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
      <div className="w-full h-60 bg-gray-700/40" />
      <div className="p-6 space-y-4">
        <div className="h-5 w-3/4 bg-gray-700/40 rounded" />
        <div className="h-4 w-full bg-gray-700/30 rounded" />
        <div className="h-4 w-5/6 bg-gray-700/30 rounded" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-gray-700/40 rounded-full" />
          <div className="h-6 w-16 bg-gray-700/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};


  const ProjectItem = ({ project }) => {
    return (
      <div className="group relative w-full md:w-[48%] bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
        
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-60 object-cover 
                      transform group-hover:scale-110 
                      transition-all duration-700 
                      opacity-0 animate-fadeIn"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-[rgb(66,153,170)]/20 text-[rgb(66,153,170)] rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <a
              href={project.liveLink}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 text-sm bg-[rgb(66,153,170)] text-white rounded-lg hover:bg-[rgba(20,46,51,1)] transition"
            >
              Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 text-sm border border-gray-400 text-gray-300 rounded-lg hover:bg-white hover:text-black transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="w-full min-h-screen bg-gradient-to-br from-[#03031a] to-[#0a0a47] px-6 md:px-16 py-24">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h4 className="text-sm uppercase tracking-widest text-[rgb(66,153,170)] font-semibold">
          Projects
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Featured Work
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Selected projects demonstrating full-stack architecture,
          scalability, and clean system design.
        </p>
      </div>

      {/* Projects Flex Layout */}
      <div className="flex flex-wrap justify-between gap-8 max-w-6xl mx-auto">
        {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <ProjectSkeleton key={i} />
          ))
        : projects.map((project) => (
            <ProjectItem key={project._id} project={project} />
          ))}
      </div>
    </section>
  );
}