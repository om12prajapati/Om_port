import React, { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock
} from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [time, setTime] = useState(new Date());
  let scrollTimeout;

  // Clock Logic
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    setShowScrollButton(window.scrollY > 200);
    setIsScrolling(true);
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => setIsScrolling(false), 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <footer className="relative bg-[#0a0f1a] text-gray-300 pt-20 pb-12 border-t border-gray-800/50">
      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: showScrollButton && !isScrolling ? 1 : 0,
          y: showScrollButton && !isScrolling ? 0 : 100,
        }}
        transition={{ type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiArrowUp className="text-2xl text-white" />
      </motion.button>

      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-center"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {/* Left: Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4 text-left">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tighter">
              Om Prajapati
            </h3>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Full-stack developer passionate about creating impactful solutions
              and open-source contributions.
            </p>
            <div className="flex space-x-4 text-xl">
              <motion.a
                href="https://www.linkedin.com/in/om12prajapati"
                target="_blank"
                className="p-2 bg-gray-800/50 rounded-lg text-gray-300 hover:text-blue-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <FaLinkedin size={18} />
              </motion.a>
              <motion.a
                href="https://github.com/om12prajapati"
                target="_blank"
                className="p-2 bg-gray-800/50 rounded-lg text-gray-300 hover:text-white transition-colors"
                whileHover={{ y: -3 }}
              >
                <FaGithub size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Center: Live Running Clock */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col items-center justify-center p-6 rounded-3xl bg-gray-800/20 border border-gray-700/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              <FaClock className="animate-pulse" />
              <span>Local Time (IST)</span>
            </div>
            <div className="text-4xl font-mono font-bold text-white tracking-widest bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <p className="text-[10px] text-gray-500 mt-2 font-medium">Currently Available for Work</p>
          </motion.div>

          {/* Right: Contact Info (Aligned Right) */}
          <motion.div variants={itemVariants} className="space-y-4 md:text-right">
            <h4 className="text-lg font-bold text-white tracking-tight">Get in Touch</h4>
            <div className="space-y-3 flex flex-col md:items-end">
              <div className="flex items-center gap-3 hover:text-blue-400 transition-colors cursor-default">
                <span className="text-sm font-medium">Phagwara, Punjab, INDIA</span>
                <FaMapMarkerAlt className="text-blue-500" />
              </div>
              <a href="tel:+919696556599" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                <span className="text-sm font-medium">+91 9696556599</span>
                <FaPhone className="text-blue-500" />
              </a>
              <a href="mailto:prajapatiom423@gmail.com" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                <span className="text-sm font-medium">prajapatiom423@gmail.com</span>
                <FaEnvelope className="text-blue-500" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="pt-8 border-t border-gray-800/50 text-center text-gray-500 text-[11px]"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.1em]">
            © {new Date().getFullYear()} Om Prajapati. Built with <span className="text-blue-500 transition-pulse inline-block">React & Tailwind</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;