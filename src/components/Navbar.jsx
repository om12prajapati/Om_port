import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme(); 
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeTab, setActiveTab] = useState("Home");

  // Nav items including 'Skills'
  const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Achievements', 'Certificates', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Active Section Detection Logic
      const current = navItems.find(item => {
        const el = document.getElementById(item.toLowerCase().replace(' ', '-'));
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveTab(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <motion.header 
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <nav className={`
        mt-4 transition-all duration-500 ease-in-out
        flex items-center gap-1 px-2 py-1 rounded-full border
        
        /* UPDATED: bg-black/50 for 50% transparency */
        bg-black/50 backdrop-blur-lg border-white/10 shadow-2xl
        
        ${scrolled ? 'scale-90 translate-y-[-5px]' : 'scale-100'}
      `}>
        
        <ul className="flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <li 
                key={item} 
                onMouseEnter={() => setHoveredTab(item)}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative"
              >
                <a 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className={`
                    relative z-10 px-2.5 py-1.5 text-[11px] md:text-xs font-bold tracking-tight transition-colors duration-300
                    ${isActive || hoveredTab === item ? 'text-white' : 'text-white/50'}
                  `}
                >
                  {item}
                </a>
                
                {/* Magnetic Active Pill */}
                <AnimatePresence>
                  {(hoveredTab === item || isActive) && (
                    <motion.span
                      layoutId="nav-pill-50"
                      className="absolute inset-0 z-0 rounded-full bg-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Compact Vertical Divider */}
        <div className="w-[1px] h-3 mx-1 bg-white/20" />

        {/* Theme Toggle Button */}
        <motion.button
          onClick={() => toggleTheme()} 
          whileHover={{ scale: 1.15, rotate: 12 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 shadow-inner"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={darkMode ? "sun" : "moon"}
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {darkMode ? (
                <Sun size={14} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" strokeWidth={2.5} />
              ) : (
                <Moon size={14} className="text-blue-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.5)]" strokeWidth={2.5} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </nav>
    </motion.header>
  );
}

export default Navbar;