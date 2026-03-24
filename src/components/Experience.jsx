import React, { useRef } from 'react'; // Ensure useRef is here
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const internships = [
  {
    id: 1,
    title: 'Web Developer Intern',
    company: 'Vanillakart',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-dW3lWxuo5TPVCHdPlTYbAnX6DOeqXrhSg&s', 
    duration: 'Sep 2025 - Nov 2025',
    description: [
      'Finished web development training and managed 5+ client websites using WordPress, performing customization, plugin integration, content updates, and routine maintenance to ensure reliable performance.',
      'Enhanced user experience by implementing responsive design improvements, optimizing layouts, and reducing page load time by 20%, ensuring seamless cross-device compatibility across desktop and mobile platforms.',
      'Collaborated with the development team to and maintain MERN stack applications, supporting backend APIs, deploying updates, and resolving 5+ production issues to ensure smooth and stable system operation.'
    ],
    technologies: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
    certificateUrl: 'https://drive.google.com/file/d/1NMs5SXih7STJ-djZ-tOg9r0WSiOX-SHp/view?usp=sharing' 
  },
  {
    id: 2,
    title: 'Artificial Intelligence Intern',
    company: 'Infosys Springboard', 
    logo: 'https://portfolio-nine-steel-s2h9b2yyb3.vercel.app/logos/infosys.png',
    duration: 'Feb 2026 - Present',
    description: [
      'Designed and developed a machine learning–driven dynamic pricing system to optimize product prices based on historical sales and inventory data, improving revenue potential and market competitiveness.',
      'Built an end-to-end data pipeline by collecting and processing datasets from Kaggle and case studies, performing data cleaning, aggregation, and feature engineering (demand elasticity, seasonality, competitor pricing, inventory health).',
      'Trained and evaluated advanced machine learning models including XGBoost and LightGBM, achieving improved pricing accuracy using metrics such as revenue lift, conversion rate, and profit margin.'
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Docker'],
    certificateUrl: 'https://drive.google.com/file/d/18iNOX5LwcK8TqmruzwJ6V3nmJCB9Ub4U/view?usp=sharing' 
  }
];

const TiltCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

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

const Experience = () => {
  const containerRef = useRef(null);

  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] 
  });

  // Transform scroll progress into visual properties for the line
  const lineWidth = useTransform(scrollYProgress, [0, 0.4], ["0px", "120px"]);
  const lineColor = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.8],
    ["#2563eb", "#4f46e5", "#10b981"] // Blue -> Indigo -> Emerald
  );

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative py-24 px-6 w-full overflow-hidden text-center"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight"
          >
            Work <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">Experience</span>
          </motion.h2>
          
          {/* THE DYNAMIC SCROLL LINE */}
          <motion.div 
            style={{ 
              width: lineWidth, 
              backgroundColor: lineColor,
            }}
            className="h-2 mx-auto rounded-full shadow-lg" 
          />
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {internships.map((intern, index) => (
            <motion.div 
              key={intern.id}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <TiltCard>
                <div className="group relative flex flex-col h-full p-10 rounded-[3rem] border border-slate-200/60 bg-slate-50/50 shadow-xl hover:shadow-2xl hover:z-50 hover:bg-sky-50/90 transition-all duration-150 ease-out">
                  
                  {/* ID Badge */}
                  <div className="absolute -top-4 -right-2 w-12 h-12 bg-slate-950 text-white flex items-center justify-center rounded-2xl font-black shadow-lg z-20 group-hover:rotate-6 transition-transform">
                    0{intern.id}
                  </div>

                  {/* Logo & Info */}
                  <div className="flex items-start gap-6 mb-10" style={{ transform: "translateZ(30px)" }}>
                    <div className="w-20 h-20 p-4 bg-white rounded-[1.5rem] shadow-md border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                      <img src={intern.logo} alt="company" className="w-full h-full object-contain" />
                    </div>
                    <div className="pt-2 text-left">
                      <h3 className="text-2xl font-bold text-slate-800 leading-tight mb-1">{intern.title}</h3>
                      <p className="text-blue-600 font-black text-xs uppercase tracking-widest mb-1">{intern.company}</p>
                      <p className="text-slate-400 text-[11px] font-bold">{intern.duration}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-5 mb-10 flex-grow text-left" style={{ transform: "translateZ(20px)" }}>
                    {intern.description.map((point, i) => (
                      <li key={i} className="flex gap-4 text-slate-700 text-sm leading-relaxed group/item">
                        <div className="mt-2 min-w-[8px] h-[8px] rounded-full border-2 border-blue-600/30 group-hover/item:border-blue-600 transition-colors duration-150" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags & Button */}
                  <div className="pt-8 border-t border-slate-200/60" style={{ transform: "translateZ(10px)" }}>
                    <div className="flex flex-wrap gap-2 mb-10">
                      {intern.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-white text-slate-500 text-[10px] font-black uppercase tracking-tighter rounded-xl border border-slate-200 group-hover:text-blue-600 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <motion.a 
                      href={intern.certificateUrl} 
                      target="_blank" 
                      className="relative group/btn flex items-center justify-center gap-4 w-full py-5 rounded-2xl bg-[#0a0a0a] border border-slate-800 text-white font-bold text-xs uppercase tracking-widest transition-all duration-150 hover:border-[#34d399] hover:text-[#34d399] shadow-2xl"
                    >
                      <span className="relative z-10">View Internship Certificate</span>
                      <ExternalLink size={18} />
                    </motion.a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;