import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Send, RefreshCw, Mail } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

// FEATURE: 3D Tilt Wrapper
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
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/mzdjkybk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* HEADING */}
        <div className="relative z-10 mb-20 text-right">
          <div className="max-w-4xl ml-auto">
            <motion.h1
              className="text-4xl md:text-6xl font-black mb-4 text-slate-900 tracking-tight"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Get In{" "}
              <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent italic">
                Touch
              </span>
            </motion.h1>

            <motion.div
              className="h-1.5 bg-gradient-to-l from-orange-500 to-transparent ml-auto max-w-xs rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* LEFT: Intro Text and Clickable Info */}
          <motion.div 
            className="lg:w-1/2 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <h3 className="text-3xl font-black text-slate-800 mb-6 leading-tight">Let's Create Something Remarkable</h3>
            <p className="text-slate-500 text-lg leading-relaxed max-w-md mb-10">
              Have a project in mind or just want to say hi? Feel free to reach out and let's start a conversation.
            </p>
            
            {/* CLICKABLE CONTACT INFO */}
            <div className="space-y-4">
              {/* Email */}
              <motion.a 
                href="mailto:prajapatiom423@email.com"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-slate-600 font-bold group transition-colors hover:text-orange-600"
              >
                <div className="p-3 bg-orange-50 rounded-xl text-orange-500 group-hover:bg-orange-100 transition-colors">
                    <Mail size={20}/>
                </div>
                <span>prajapatiom423@email.com</span>
              </motion.a>

              {/* LinkedIn */}
              <motion.a 
                href="https://linkedin.com/in/om12prajapati"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-slate-600 font-bold group transition-colors hover:text-blue-600"
              >
                <div className="p-3 bg-blue-50 rounded-xl text-blue-500 group-hover:bg-blue-100 transition-colors">
                    <FaLinkedin size={20} />
                </div>
                <span>linkedin.com/in/om12prajapati</span>
              </motion.a>

              {/* GitHub */}
              <motion.a 
                href="https://github.com/om12prajapati"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-slate-600 font-bold group transition-colors hover:text-slate-900"
              >
                <div className="p-3 bg-slate-100 rounded-xl text-slate-800 group-hover:bg-slate-200 transition-colors">
                    <FaGithub size={20} />
                </div>
                <span>github.com/om12prajapati</span>
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT: The Form Card */}
          <motion.div 
            className="lg:w-1/2 w-full max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealVariants}
          >
            <TiltCard>
              <div className="bg-slate-50/50 rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-100 p-10">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100">
                        <Check size={40} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Message Delivered!</h3>
                      <button onClick={() => setStatus("idle")} className="text-orange-600 font-black text-xs uppercase tracking-widest mt-4">Send Another</button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-slate-800 placeholder-slate-400"
                          placeholder="First Name"
                          required
                        />
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-slate-800 placeholder-slate-400"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-slate-800 placeholder-slate-400"
                        placeholder="Email Address"
                        required
                      />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-slate-800 placeholder-slate-400"
                        placeholder="Your Message..."
                        rows="5"
                        required
                      />

                      {/* SONAR BUTTON */}
                      <motion.button
                        type="submit"
                        disabled={status !== "idle"}
                        whileTap={{ scale: 0.98 }}
                        className="relative group/btn w-full py-5 bg-[#0a0a0a] rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 hover:text-orange-400 flex items-center justify-center gap-4 overflow-hidden"
                      >
                        <span className="relative z-10">
                          {status === "sending" ? "Processing..." : "Deploy Message"}
                        </span>
                        
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <div className="absolute opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                            <motion.div animate={{ scale: [1, 2.2], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute w-8 h-8 rounded-full border border-orange-400 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
                          </div>
                          <div className="relative z-10">
                            {status === "sending" ? (
                              <RefreshCw size={16} className="animate-spin" />
                            ) : (
                              <>
                                <Send size={16} className="group-hover/btn:opacity-0 transition-opacity" />
                                <div className="absolute inset-0 m-auto opacity-0 group-hover/btn:opacity-100 w-2.5 h-2.5 bg-orange-400 rounded-full shadow-[0_0_15px_#f97316]" />
                              </>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;