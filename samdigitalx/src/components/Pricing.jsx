import React from "react";
import { FaGlobe, FaPaintBrush, FaMobileAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function Pricing() {
  const whatsappNumber = "YOUR_NUMBER"; // e.g 254712345678

  const plans = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom business websites and scalable web systems.",
      features: [
        "Responsive Design",
        "Modern UI/UX",
        "SEO Optimization",
        "Admin Dashboard (Optional)",
        "Deployment & Support",
      ],
      icon: <FaGlobe />,
    },
    {
      id: 2,
      title: "Graphic Design",
      description: "Professional branding and visual identity solutions.",
      features: [
        "Logo Design",
        "Brand Identity",
        "Marketing Graphics",
        "Social Media Assets",
        "Custom Visual Systems",
      ],
      icon: <FaPaintBrush />,
    },
    {
      id: 3,
      title: "App Development",
      description: "Custom web and mobile applications built for performance.",
      features: [
        "Full-Stack Development",
        "Authentication Systems",
        "API Integration",
        "Database Architecture",
        "Maintenance & Scaling",
      ],
      icon: <FaMobileAlt />,
    },
  ];

  const PricingCard = ({ plan }) => {
    const message = `Hello, I'm interested in your ${plan.title} service. I would like to discuss pricing and project details.`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    return (
      <div id="pricing" className="relative group w-full md:w-[48%] lg:w-[30%] rounded-3xl p-[2px]">
        
        {/* 🔥 Animated Gradient Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r 
                        from-cyan-400 via-blue-500 to-purple-500 
                        animate-gradient-border opacity-70 
                        group-hover:opacity-100 transition duration-500"></div>

        <div className="relative bg-[#0f172a] rounded-3xl p-8 border border-white/10 
                        backdrop-blur-xl">

          {/* Icon */}
          <div className="text-4xl text-cyan-400 mb-6">
            {plan.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-white mb-4">
            {plan.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-6">
            {plan.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, index) => (
              <li key={index} className="text-gray-300 text-sm">
                • {feature}
              </li>
            ))}
          </ul>

          {/* WhatsApp CTA */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3 
                       rounded-xl bg-green-500 text-white font-medium
                       hover:bg-green-600 transition duration-300"
          >
            <FaWhatsapp className="text-xl" />
            Request Custom Quote
          </a>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#0C193B] to-[#0f172a] px-6 md:px-16 py-28 overflow-hidden">

      {/* <div className="h-32"></div> */}
      {/* Floating Background Shapes */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl bottom-[-150px] right-[-150px] animate-pulse"></div>

      {/* Header */}
      
      <div className="relative z-10 text-center mb-20">
        <h4 className="text-sm uppercase tracking-widest text-cyan-400 font-semibold">
          Pricing
        </h4>
        <h2 className="text-4xl font-bold text-white mt-4">
          Custom Project Pricing
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-4">
          Select a service and let’s discuss your project requirements.
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 flex flex-wrap justify-between gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}