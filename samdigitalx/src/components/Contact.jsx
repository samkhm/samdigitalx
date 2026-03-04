import React, { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "emailjs-com"; // Install: npm install emailjs-com

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const whatsappNumber = "254745801435"; // e.g. 254712345678

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      // Send email using EmailJS
      // await emailjs.send(
      //   "service_i4uta7i", // service id from EmailJS dashboard
      //   "service_i4uta7i", //temp id
      //   {
      //     from_name: form.name,
      //     from_email: form.email,
      //     message: form.message,
      //   },
      //   "FFTgIlY0u0zp6ZBVo" //public key
      // );

      // Redirect to WhatsApp with pre-filled message
      const whatsappMessage = `Hello, I'm ${form.name} (${form.email}) and I would like to discuss: ${form.message}`;
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappLink, "_blank");

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-br from-[#09163B]/40 to-[#0f172a]/50 px-6 md:px-16 py-28 overflow-hidden"
    >
      {/* Floating Background Shapes */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl bottom-[-150px] right-[-150px] animate-pulse"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <h4 className="text-sm uppercase tracking-widest text-cyan-400 font-semibold">
          Contact
        </h4>
        <h2 className="text-4xl font-bold text-white mt-4">Get in Touch</h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-4">
          Have a project, idea, or question? Reach out and let's collaborate!
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
        {/* Left - Info */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4 text-gray-300">
            <FaEnvelope className="text-cyan-400 text-xl" />
            <a
              href="mailto:info@qimtech.com"
              className="hover:text-cyan-400 transition"
            >
              samuelkimanthi02@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <FaWhatsapp className="text-cyan-400 text-xl" />
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <FaMapMarkerAlt className="text-cyan-400 text-xl" />
            <span>Nairobi, Kenya</span>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex-1 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="bg-[#020617] border border-white/20 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="bg-[#020617] border border-white/20 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              className="bg-[#020617] border border-white/20 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            ></textarea>
            <button
              type="submit"
              disabled={sending}
              className="flex items-center justify-center gap-3 py-3 bg-cyan-500 text-white rounded-xl font-medium hover:bg-cyan-600 transition duration-300"
            >
              <FaWhatsapp className="text-xl" />
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}