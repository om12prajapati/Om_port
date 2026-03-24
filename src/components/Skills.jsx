import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { FiCode, FiBook, FiUsers, FiLayers } from "react-icons/fi";
import { TbBrandReact, TbTool } from "react-icons/tb";

const skillsData = [
  {
    title: "Languages",
    icon: <FiCode />,
    skills: ["C++", "Java", "Python", "JavaScript", "PHP", "SQL"],
    level: 95,
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.5)",
  },
  {
    title: "Frameworks",
    icon: <TbBrandReact />,
    skills: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "Next.js"],
    level: 90,
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.5)",
  },
  {
    title: "Tools & Platforms",
    icon: <TbTool />,
    skills: ["Git", "GitHub", "Docker", "Postman", "Firebase"],
    level: 85,
    color: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.5)",
  },
  {
    title: "Databases",
    icon: <FiLayers />,
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
    level: 82,
    color: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.5)",
  },
  {
    title: "Coursework",
    icon: <FiBook />,
    skills: ["DSA", "OS", "DBMS", "Networking", "Stats"],
    level: 80,
    color: "#ec4899",
    glow: "rgba(236, 72, 153, 0.5)",
  },
  {
    title: "Soft Skills",
    icon: <FiUsers />,
    skills: ["Problem-Solving", "Teamwork", "Leadership", "Adaptability"],
    level: 88,
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.5)",
  },
];

// FEATURE: 3D Tilt Card Component
const SkillCard = ({ skill, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative h-full bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] transition-shadow group"
    >
      {/* Background Glow on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[2rem]"
        style={{ backgroundColor: skill.color }}
      />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        {/* Progress Circle Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="42"
                stroke="#f1f5f9"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50" cy="50" r="42"
                stroke={skill.color}
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: skill.level / 100 }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
                style={{ filter: `drop-shadow(0 0 6px ${skill.glow})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-800">{skill.level}%</span>
                <span className="text-[10px] uppercase font-bold tracking-tighter text-slate-400">Mastery</span>
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 rounded-2xl text-2xl mb-2" style={{ color: skill.color }}>
            {skill.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800">{skill.title}</h3>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {skill.skills.map((item, idx) => (
            <motion.span
              key={idx}
              whileHover={{ y: -2, backgroundColor: skill.color, color: "#fff" }}
              className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-500 text-xs font-bold border border-slate-100 transition-all cursor-default"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* FEATURE: Tech Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            Capabilities
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Expertise</span>
          </motion.h2>
          <p className="text-slate-500 text-lg">
            A comprehensive overview of my digital arsenal and the core competencies I've mastered.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>

      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default SkillsSection;