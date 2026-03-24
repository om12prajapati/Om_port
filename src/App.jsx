import React from "react";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import About from "./components/About";
import Achievements from "./components/Achievements.jsx";
import Certificates from "./components/Certificate.jsx";
import Experience from "./components/Experience.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col scroll-smooth bg-white text-gray-900">
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Certificates />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
