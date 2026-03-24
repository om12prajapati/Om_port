import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ExternalLink } from "lucide-react"; // Added for the button icon

const Certificates = () => {
  const certificates = [
    {
      title: "Oracle: Java SE 17 Developer",
      companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIP5KTNtwE18A_XpYzFj5Usn-x2j0ZsyED2A&s",
      description:
        "Successfully completed the Oracle Certified Java SE 17 Developer certification, demonstrating proficiency in Java programming and modern application development.",
      tags: ["Oracle", "Completion", "Java"],
      link: "https://drive.google.com/file/d/1J77deyjHyOTcrAiHePBrXJZqt6CsLY3s/view?usp=sharing",
    },
    {
      title: "MongoDB Associate Developer",
      companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEN6fDm89O6g-B0h3eEPmVlxQyhlU1cNS7tQ&s",
      description:
        "Successfully completed the MongoDB Associate Developer certification, covering data modeling, CRUD operations, and indexing.",
      tags: ["Database", "Developement", "Achievement"],
      link: "https://drive.google.com/file/d/1w9jCJFYW-UoSVVnf6xxp-8KPaK9xQMrk/view?usp=sharing",
    },
    {
      title: "Harvard University: CS50's Python Programming",
      companyLogo: "https://images.seeklogo.com/logo-png/25/2/harvard-university-logo-png_seeklogo-258835.png",
      description:
        "Built a strong foundation in programming concepts, strengthening my understanding of core python concepts and logical problem-solving.",
      tags: ["Achievement", "Excellence", "Recognition"],
      link: "https://drive.google.com/file/d/1K89Ga4UOVaW6_gcQ9T7eTRn2E_yk6tIM/view?usp=sharing",
    },
    {
      title: "Oracle: Linux 8 Administrator",
      companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIP5KTNtwE18A_XpYzFj5Usn-x2j0ZsyED2A&s",
      description:
        "Successfully completed the Oracle Linux 8 Administrator certification, gaining hands-on experience in networking and security administration.",
      tags: ["Ubuntu", "Online Learning", "Skill Development"],
      link: "https://drive.google.com/file/d/1MpXLSjROLmMNxphvjKGf1mVtX6RmDzVW/view?usp=drivesdk",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) =>
      prev < certificates.length - 1 ? prev + 1 : prev
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
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    exit: (direction) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.4 },
    }),
  };

  const getTagStyle = (tag) => {
    switch (tag) {
      case "Completion": return "bg-green-50 text-green-600 border-green-100";
      case "Java": return "bg-orange-50 text-orange-600 border-orange-100";
      case "Database": return "bg-blue-50 text-blue-600 border-blue-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  return (
    <section id="certificates" className="py-24 overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 mb-16">
        <div className="max-w-4xl">
          {/* FEATURE: Colorful Header Text */}
          <motion.h1
            className="text-4xl md:text-5xl font-black text-left mb-4 text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent italic">Certificates</span>
          </motion.h1>

          {/* FEATURE: Colorful Animated Line */}
          <motion.div
            className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-transparent rounded-full max-w-xs"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="relative overflow-hidden min-h-[580px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 absolute w-full"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {certificates
                .slice(currentIndex, currentIndex + 3)
                .map((cert) => (
                  <motion.div
                    key={cert.title}
                    className="bg-slate-50/50 rounded-[2.5rem] shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full border border-slate-200/60"
                  >
                    <div className="mb-8 flex justify-center">
                      <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center w-24 h-24 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={cert.companyLogo} 
                          alt="logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mb-4 h-14 overflow-hidden leading-tight">
                      {cert.title}
                    </h2>

                    <p className="text-slate-600 mb-8 leading-relaxed flex-grow text-sm">
                      {cert.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {cert.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border tracking-wider ${getTagStyle(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* FEATURE: The Sonar Pulse Button (Image 2 Style) */}
                    <motion.a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="relative group/btn flex items-center justify-center gap-4 w-full py-4.5 rounded-2xl bg-[#0a0a0a] border border-slate-800 text-white font-bold text-sm transition-all duration-150 hover:border-[#34d399] hover:text-[#34d399] shadow-2xl"
                    >
                      <span className="relative z-10">View Certificate</span>
                      
                      <div className="relative flex items-center justify-center w-6 h-6">
                        {/* Pulse Rings */}
                        <div className="absolute opacity-0 group-hover/btn:opacity-100 transition-opacity duration-150">
                          <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute w-10 h-10 rounded-full border border-[#34d399] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
                        </div>

                        {/* Icon to Dot Transition */}
                        <div className="relative z-10 flex items-center justify-center">
                           <ExternalLink size={18} className="group-hover/btn:opacity-0 transition-all duration-100" />
                           <div className="absolute opacity-0 group-hover/btn:opacity-100 w-3.5 h-3.5 bg-[#34d399] rounded-full shadow-[0_0_10px_#34d399] transition-all duration-100" />
                        </div>
                      </div>
                    </motion.a>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-14 h-14 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-20 transition-all"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= certificates.length - 3}
            className="w-14 h-14 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-20 transition-all"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certificates;