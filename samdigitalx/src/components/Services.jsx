import React, { useEffect, useState } from "react";
import { FaCode, FaLaptopCode, FaServer, FaPaintBrush } from "react-icons/fa";
import API from "@/service/api";

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    
    setVisibleCount((prev) => prev + 4);
  };

  const visibleServices = services.slice(0, visibleCount);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await API.get("/portfolio/services");
      setServices(res.data);
    } catch (error) {
      console.log("Error fetching services", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const ServiceSkeleton = () => {
    return (
      <div className="w-full md:w-[48%] lg:w-[23%] p-[1px] rounded-3xl">
        <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/10 animate-pulse">
          <div className="w-12 h-12 bg-gray-600/40 rounded mb-6" />
          <div className="h-5 w-3/4 bg-gray-600/40 rounded mb-3" />
          <div className="h-4 w-full bg-gray-600/30 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-600/30 rounded" />
        </div>
      </div>
    );
  };

  const ServiceCard = ({ service }) => {
    return (
      <div
        onClick={() => setActiveService(service)}
        className="relative group w-full md:w-[48%] lg:w-[23%] p-[1px] rounded-3xl cursor-pointer"
      >
        {/* Animated Gradient Border */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r 
                        from-cyan-400 via-blue-500 to-purple-500 
                        opacity-0 group-hover:opacity-100 
                        blur-md transition duration-500 animate-pulse"
        ></div>

        <div
          className="relative bg-[#0f172a] rounded-3xl p-8 border border-white/10 
                        hover:border-transparent transition duration-500"
        >
          <div className="mb-6">
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              decoding="async"
              className="w-12 h-12 object-contain 
                      group-hover:scale-110 group-hover:rotate-6 
                      transition-transform duration-300"
            />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">
            {service.title}
          </h3>

          <p className="text-gray-400 text-sm">{service.short}</p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="services"
      className="relative w-full bg-gradient-to-br from-[#07103D] to-[#0C193B] px-6 md:px-16 py-28 overflow-hidden"
    >
      {/* Floating Background Shapes */}
      <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <h4 className="text-sm uppercase tracking-widest text-cyan-400 font-semibold">
          Services
        </h4>
        <h2 className="text-4xl font-bold text-white mt-4">
          Professional Solutions
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-4">
          Modern development services engineered for scalability, performance,
          and long-term maintainability.
        </p>
      </div>

      {/* Services Flex Layout */}
      <div className="flex flex-wrap items-center justify-center gap-8 relative z-10">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ServiceSkeleton key={i} />)
          : visibleServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
      </div>

     

      {/* Modal */}
      {activeService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#0f172a] max-w-lg w-full p-8 rounded-3xl border border-white/10 relative">
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <img
              src={activeService.image}
              alt={activeService.title}
              loading="lazy"
              className="w-14 h-14 object-contain mb-6"
            />

            <h3 className="text-2xl font-bold text-white mb-4">
              {activeService.title}
            </h3>

            <p className="text-gray-400 leading-relaxed">
              {activeService.description}
            </p>
          </div>
        </div>
      )}


   <div className="flex items-center w-full">
        { visibleCount < services.length && (
          <button
            className="text-white text-sm italic hover:text-gray-400"
            onClick={handleLoadMore}
          >
            Load more...
          </button>
        )}
      </div>
    </section>
  );
}
