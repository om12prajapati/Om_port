import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCrown,
  FaMedal,
  FaLaptopCode,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const Achievements = () => {
  const achievements = [
    {
      title: "Oracle Race to Certification",
      description:
        "Earned Oracle Race to Certification 2025 Level 1 and Level 2 Digital Badges achievement.",
      tags: ["Certification", "Oracle", "Badge"],
      link: "https://drive.google.com/file/d/18zwokpGPl5KODwur0C7hOdo7C_hXbkxx/view?usp=sharing",
      icon: <FaCrown className="text-4xl" />,
      color: "from-yellow-400/20 to-yellow-600/10",
      button: "bg-yellow-500 hover:bg-yellow-600",
      // NEW: Explicit icon color and background tint
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-50",
    },
    {
      title: "Leetcode 250+ Problem Solved",
      description:
        "Regular participation in LeetCode practice problem ranking 556,880 globally.",
      tags: ["Coding", "DSA", "Logic"],
      link: "https://leetcode.com/u/Om-_-sd/",
      icon: <FaMedal className="text-4xl" />,
      color: "from-red-400/20 to-red-600/10",
      button: "bg-red-500 hover:bg-red-600",
      // NEW: Explicit icon color and background tint
      iconColor: "text-red-500",
      iconBg: "bg-red-50",
    },
    {
      title: "Hack Quest CTF – LPU",
      description:
        "Secured 26th rank out of 100+ teams in the CyberSecurity Hackathon held at Lovely Professional University.",
      tags: ["Cybersecurity", "CTF", "Ranking"],
      link: "https://drive.google.com/file/d/1iZE5NKJwgZPd_Axw4alBNNUmwYv5C9Zu/view?usp=sharing",
      icon: <FaLaptopCode className="text-4xl" />,
      color: "from-blue-400/20 to-blue-600/10",
      button: "bg-blue-500 hover:bg-blue-600",
      // NEW: Explicit icon color and background tint
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) =>
      prev < achievements.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: (direction) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case "Certification": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Coding": return "bg-red-100 text-red-800 border border-red-200";
      case "Cybersecurity": return "bg-blue-100 text-blue-800 border border-blue-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <section id="achievements" className="relative py-24 overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-yellow-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 mb-16">
        <div className="max-w-4xl ml-auto text-right">
          <motion.h1
            className="text-4xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-blue-500 bg-clip-text text-transparent italic">Achievements</span>
          </motion.h1>
          <motion.div
            className="h-1.5 bg-gradient-to-l from-yellow-500 to-transparent ml-auto max-w-xs rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="relative overflow-hidden min-h-[550px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 absolute w-full"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {achievements
                .slice(currentIndex, currentIndex + 3)
                .map((achievement) => (
                  <motion.div
                    key={achievement.title}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    className={`bg-gradient-to-br ${achievement.color} rounded-[2rem] shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden flex flex-col border border-white/40 backdrop-blur-sm`}
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                    <div className="mb-8 flex justify-center">
                      {/* FIXED: The Icon Container is now white but the symbol is vibrant */}
                      <div className={`p-5 bg-white rounded-3xl shadow-lg relative flex items-center justify-center`}>
                        <motion.div
                          className={`${achievement.iconColor} filter drop-shadow-md`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {achievement.icon}
                        </motion.div>
                        {/* Optional: Add a very faint tinted glow behind the icon */}
                        <div className={`absolute inset-0 ${achievement.iconBg} opacity-20 rounded-3xl -z-10`} />
                      </div>
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-800 mb-4 tracking-tight">
                      {achievement.title}
                    </h2>

                    <p className="text-slate-600 mb-6 leading-relaxed flex-grow text-sm">
                      {achievement.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {achievement.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <motion.a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center w-full py-4 font-bold text-white ${achievement.button} rounded-2xl shadow-lg transition-all active:scale-95`}
                      whileHover={{ scale: 1.02 }}
                    >
                      View Details
                    </motion.a>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-8 mt-12">
            <div className="flex gap-4">
              <motion.button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-white p-4 rounded-full shadow-xl hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-100"
              >
                <FaArrowLeft className="text-xl text-slate-700" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={currentIndex >= achievements.length - 3}
                className="bg-white p-4 rounded-full shadow-xl hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-100"
              >
                <FaArrowRight className="text-xl text-slate-700" />
              </motion.button>
            </div>

            <div className="flex gap-2">
              {achievements.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-slate-200'}`} 
                />
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;