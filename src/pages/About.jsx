import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Assets
const ceoImg = "/ceo.jpg";
const team1 = "/team1.webp";
const team2 = "/team2.png";
const team3 = "/team3.jpg";
const factory1 = "/factory1.jpg";
const factory2 = "/factory2.jpg";
const catalogPDF = "/anthem_catalog.pdf";

const About = () => {
  const team = [
    { name: "Rajesh Awasthi", role: "CEO & Founder", img: ceoImg },
    { name: "Sneha Rao", role: "Design Head", img: team1 },
    { name: "Aman Shah", role: "Production Manager", img: team2 },
    { name: "Divya Kulkarni", role: "Marketing Lead", img: team3 },
  ];

  const [ceoRef, inViewCeo] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, inViewTeam] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [catalogRef, inViewCatalog] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-black text-white min-h-0 py-10 w-full">
      {/* Page Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-4 px-4 md:px-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-white">Our </span>
        <span className="bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent">Story</span>
        <span className="text-white"> 🚀</span>
      </motion.h1>
      <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8 px-4 md:px-12 text-lg">
        In 1991, Emsquare began not as manufacturers, but as passionate technicians. Today, we are a fully integrated design and manufacturing powerhouse, building fans that are as beautiful as they are functional.
      </p>

      {/* Timeline Section */}
      <section className="py-16 bg-black text-white w-full px-4 md:px-12 rounded-3xl shadow-2xl my-6" id="timeline">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white">Milestones </span>
          <span className="bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent">Through Time</span>
          <span className="text-white"> ⏳</span>
        </motion.h2>

        {/* Timeline Enhanced Section */}
        <div className="relative px-4 md:px-12 py-10 bg-black">
          {/* Line Connector */}
          <div className="absolute md:top-7 top-0 left-1/2 md:left-0 md:right-0 w-1 md:h-1 h-full bg-black z-0 mx-auto md:mx-0 hidden md:block" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-0 relative z-10">
            {[
              {
                year: "1991",
                text: "Started as an OEM supplier during India's liberalization era.",
                status: "done",
              },
              {
                year: "2010",
                text: "Opened a modern integrated factory in Goa with in-house painting, winding, and testing.",
                status: "done",
              },
              {
                year: "2024",
                text: "Exporting to UAE, Iraq, Oman, Nepal, Bahrain, and parts of Africa.",
                status: "done",
              },
              {
                year: "2025",
                text: "Expanding production capacity with automation and AI-based testing.",
                status: "upcoming",
              },
              {
                year: "2030",
                text: "Becoming a leading global supplier with presence in 30+ countries.",
                status: "upcoming",
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center text-center p-4 md:w-1/5"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Dot */}
                <div className="relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full shadow-lg border-4 border-[#111111] ${
                      milestone.status === "done"
                        ? "bg-[#e49385] animate-pulse glow"
                        : "bg-[#ba6a5a] animate-ping"
                    }`}
                  />
                </div>

                {/* Card */}
                <motion.div
                  className={`mt-4 p-6 rounded-xl shadow-xl border ${
                    milestone.status === "done"
                      ? "bg-black border-[#ba6a5a]/30"
                      : "bg-[#111111] border-[#ff8f7a]/40"
                  } max-w-xs hover:scale-105 transition-transform duration-300`}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      milestone.status === "done" ? "bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent" : "text-[#efb4a5]"
                    }`}
                  >
                    {milestone.year}
                  </h3>
                  <p className="text-gray-400 text-sm">{milestone.text}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Factory Images */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.img
            src={factory1}
            alt="Old Factory"
            className="rounded-xl shadow-xl object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          />
          <motion.img
            src={factory2}
            alt="New Factory"
            className="rounded-xl shadow-xl object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* CEO Message */}
      <motion.div
        ref={ceoRef}
        className="mt-20 px-4 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inViewCeo ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="text-white">From the </span>
          <span className="bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent">CEO</span>
          <span className="text-white"> 💬</span>
        </h2>
        <div className="flex flex-col items-center text-center">
          <img src={ceoImg} alt="CEO" className="w-40 h-40 object-cover rounded-full shadow-lg mb-4" />
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Design is not skin-deep. At Anthem, it moves air silently, saves energy intelligently, and enhances your space effortlessly.
          </p>
          <span className="bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent mt-3 font-semibold text-lg">— Elone Musk</span>
        </div>
      </motion.div>

      {/* Team Section */}
      <div
        ref={teamRef}
        className={`transition-opacity duration-1000 ease-in-out mt-20 ${inViewTeam ? "opacity-100" : "opacity-0"} px-4 md:px-12`}
      >
        <motion.h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-white">Meet Our </span>
          <span className="bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent">Team</span>
          <span className="text-white"> 👥</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center mx-auto max-w-6xl">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-[#111111]/70 p-6 rounded-xl shadow-lg border border-[#ba6a5a]/30 backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border border-white/10 shadow-md"
              />
              <h3 className="text-xl font-semibold bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Catalog Download */}
      <motion.div
        ref={catalogRef}
        className="mt-20 text-center px-4 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inViewCatalog ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          <span className="text-white">Download Our </span>
          <span className="bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent">Product Catalog</span>
          <span className="text-white"> 📘</span>
        </h2>
        <a
          href={catalogPDF}
          download="Anthem_Fan_Catalog.pdf"
          className="inline-block bg-gradient-to-r from-[#e49385] to-[#d87c6a] hover:from-[#d87c6a] hover:to-[#e49385] text-white font-semibold px-6 py-3 rounded-full transition shadow-md"
        >
          📎 Download Catalog
        </a>
      </motion.div>
    </div>
  );
};

export default About;