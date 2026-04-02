import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

import ecosyncImg from "../assets/ecosyncsmart.png";
import screenshotImg from "../assets/Screenshot 2026-03-17 105421.png";

const projects = [
  {
    title: "NutryHealth Fitness Platform",
    description: "A high-performance eCommerce platform for fitness supplements. Features include a custom-built product catalog, secure user authentication, and a streamlined cart system. Optimized for conversion with a clean, modern UI inspired by top-tier supplement brands.",
    tech: ["React JS", "Node JS", "MySQL", "Tailwind CSS"],
    link: "https://nutryhealth-frontend.onrender.com/",
    image: ecosyncImg,
    accent: "#00ab66", 
  },
  {
    title: "E-Learning Dashboard",
    description: "A comprehensive learning management system handling 100+ courses. Features real-time instructor chat and a progress tracking dashboard. Reduced navigation friction by 30% through a custom-tailored UX design.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    link: "https://github.com/GovindKumar04/e-learning-dashboard",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/d2e21d165015155.640046fb9fc22.jpg",
    accent: "#6366f1",
  },
  {
    title: "Smart Waste Management",
    description: "An IoT-integrated platform for real-time monitoring of waste levels. Utilizes automated routing algorithms to optimize collection schedules, significantly reducing operational costs and carbon footprint.",
    tech: ["React", "Node.js", "MongoDB", "JWT"],
    link: "https://github.com/om12prajapati/ecoSync",
    image: screenshotImg,
    accent: "#06b6d4",
  },
  {
    title: "Retro Pong Game",
    description: "A polished recreation of the classic Pong game using Python. Focuses on smooth physics calculation, collision detection logic, and a responsive scoring system with an interactive UI.",
    tech: ["Python", "Turtle Module"],
    link: "https://github.com/GovindKumar04/pong-game",
    image: "https://tse2.mm.bing.net/th?id=OIP.ZJteWv0dV0NDQFE5rXuDsAHaFj&pid=Api&P=0&h=180",
    accent: "#f59e0b",
  },
];

const TiltCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

const Projects = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const navigate = (dir) => {
    setDirection(dir);
    setIndex((prev) =>
      dir === "right" ? (prev + 1) % projects.length : (prev - 1 + projects.length) % projects.length
    );
  };

  const project = projects[index];

  return (
    <section id="projects" className="relative min-h-screen flex items-center py-20 px-6 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ backgroundColor: project.accent }}
          className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.05] transition-colors duration-500"
        />
        <motion.div 
          animate={{ backgroundColor: project.accent }}
          className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.03] transition-colors duration-500"
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* RESTORED: Header Section */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-black tracking-[0.4em] text-slate-400 uppercase mb-3"
          >
            Selected Works
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
          >
            Featured <span style={{ color: project.accent }} className="transition-colors duration-500 italic">Projects</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            className="h-1.5 bg-slate-200 mx-auto rounded-full mt-4" 
          />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction === "right" ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "right" ? -40 : 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <TiltCard>
              <div className="flex flex-col lg:flex-row bg-white rounded-[3rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
                
                {/* Left: Scrolling Mockup */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-slate-950 flex items-center justify-center relative group/mockup overflow-hidden">
                   <div 
                    className="absolute inset-0 opacity-40"
                    style={{ background: `radial-gradient(circle at center, ${project.accent} 0%, transparent 75%)` }}
                   />
                   
                   <div className="relative z-10 w-full max-w-[440px] rounded-3xl overflow-hidden shadow-2xl border-[8px] border-slate-900 bg-slate-900">
                      <div className="bg-slate-900 px-4 py-3 flex gap-1.5 items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <div className="w-2 h-2 rounded-full bg-green-500/80" />
                      </div>
                      <div className="h-[300px] w-full overflow-hidden relative">
                         <motion.img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-auto object-top absolute top-0 left-0"
                            whileHover={{ top: "-100%" }}
                            transition={{ duration: 4, ease: "linear" }}
                         />
                      </div>
                   </div>
                </div>

                {/* Right: Content */}
                <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                       <div className="h-px w-8 bg-slate-200" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Case Study</span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-500 text-lg leading-relaxed mb-10 text-left">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-12">
                      {project.tech.map((t) => (
                        <span 
                          key={t} 
                          className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border"
                          style={{ backgroundColor: `${project.accent}10`, color: project.accent, borderColor: `${project.accent}20` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* SONAR BUTTON */}
                    <motion.a 
                      href={project.link} 
                      target="_blank" 
                      className="relative group/btn flex items-center justify-center gap-4 w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#0a0a0a] border border-slate-800 text-white font-bold text-xs uppercase tracking-widest transition-all duration-150 hover:border-[#34d399] hover:text-[#34d399] shadow-2xl"
                    >
                      <span className="relative z-10">Live Preview</span>
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <div className="absolute opacity-0 group-hover/btn:opacity-100 transition-opacity duration-150">
                          <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute w-8 h-8 rounded-full border border-[#34d399] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
                        </div>
                        <div className="relative z-10 flex items-center justify-center">
                           <FaExternalLinkAlt size={14} className="group-hover/btn:opacity-0 transition-opacity" />
                           <div className="absolute inset-0 m-auto w-3 h-3 bg-[#34d399] rounded-full opacity-0 group-hover/btn:opacity-100 shadow-[0_0_15px_#34d399]" />
                        </div>
                      </div>
                    </motion.a>
                    
                    <motion.a 
                      href={project.link} 
                      target="_blank" 
                      className="flex items-center justify-center p-5 rounded-2xl border border-slate-100 text-slate-400 hover:text-slate-900 transition-all bg-white"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <FaGithub size={20} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex gap-3">
            {projects.map((_, i) => (
              <motion.div 
                key={i}
                className="cursor-pointer rounded-full transition-all duration-300"
                animate={{ width: i === index ? 40 : 10, height: 10, backgroundColor: i === index ? project.accent : "#e2e8f0" }}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button onClick={() => navigate("left")} className="w-16 h-16 rounded-full border border-slate-100 bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all active:scale-90"><FaArrowLeft /></button>
            <button onClick={() => navigate("right")} className="w-16 h-16 rounded-full border border-slate-100 bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all active:scale-90"><FaArrowRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;