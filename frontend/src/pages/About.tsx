
import { useEffect, useRef } from "react";
import SkillBadge from "@/components/SkillBadge";
import { Link } from "react-router-dom";

const About = () => {
  // For intersection observer to trigger animations
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    
    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Add elements to the reveal refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  
  // Education data
  const education = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Jamia Millia Islamia",
      duration: "2022-2026",
      gpa: "8.0/10 CGPA",
    },
    {
      degree: "12th Standard",
      institution: "Jamia Millia Islamia",
      duration: "2021",
    },
  ];
  
  // Skills data
  const skills = {
    languages: ["JavaScript", "TypeScript", "C", "C++", "Python (basic)"],
    frontend: ["React", "Next.js", "HTML", "CSS", "TailwindCSS"],
    backend: ["Node.js", "Express.js"],
    databases: ["MongoDB", "PostgreSQL", "Prisma"],
    tools: ["Docker", "Socket.IO", "Redis", "Postman", "VS Code", "GitHub", "Xcode"],
    cloud: ["AWS"],
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 via-slate-800 to-slate-900 pt-20 pb-20 overflow-x-hidden">
      {/* About Hero Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 order-2 md:order-1">
              <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30 animate-fade-in">
                👨‍💻 About Me
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-purple-400 via-pink-300 to-purple-500 bg-clip-text text-transparent drop-shadow-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Computer Science Student & Developer
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 via-pink-400 to-purple-600 mt-6 rounded-full shadow-lg shadow-purple-500/50 animate-fade-in" style={{ animationDelay: "0.3s" }} />
              <p className="mt-8 text-lg text-gray-200 leading-relaxed font-normal animate-fade-in" style={{ animationDelay: "0.4s" }}>
                Hello! I'm Mohd Adnan, a passionate full-stack developer and Computer Science student. I specialize in building modern web applications using the MERN stack and other cutting-edge technologies.
              </p>
              <p className="mt-6 text-lg text-gray-200 leading-relaxed font-normal animate-fade-in" style={{ animationDelay: "0.5s" }}>
                My journey in programming started with curiosity and has evolved into a deep passion for creating efficient, elegant solutions to complex problems. I'm constantly learning and experimenting with new technologies to expand my skill set.
              </p>
            </div>
            
            <div className="md:w-1/2 flex justify-center order-1 md:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative p-3">
                  <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-700 w-64 h-64 md:w-80 md:h-80 transform group-hover:scale-110 transition-transform duration-500 border border-gray-500/40 group-hover:border-purple-400/60">
                    <img 
                      src="public/lovable-uploads/4efcce86-ee77-4aaf-8efc-e3579b1d0d2b.png" 
                      alt="Mohd Adnan" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="py-20 relative">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30">
              🎓 My Background
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Education
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 mt-6 rounded-full shadow-lg shadow-blue-500/50" />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {education.map((item, index) => (
                <div 
                  key={index}
                  className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 transition-all hover:shadow-2xl hover:border-blue-400/60 backdrop-blur-sm"
                  style={{ transitionDelay: `${0.2 * index}s` }}
                  ref={addToRefs}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                      <p className="text-gray-300 mt-2">{item.institution}</p>
                      {item.gpa && <p className="text-blue-400 font-medium mt-2">{item.gpa}</p>}
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 rounded-full text-sm font-semibold border border-blue-400/40">
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-20 relative">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 border border-green-400/30">
              🚀 What I Know
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 mt-6 rounded-full shadow-lg shadow-green-500/50" />
            <p className="mt-8 max-w-3xl text-lg text-gray-200 leading-relaxed font-normal">
              Throughout my journey, I've acquired a diverse set of skills and technologies.
              Here's an overview of what I bring to the table.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 backdrop-blur-sm"
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill, index) => (
                  <SkillBadge 
                    key={index} 
                    name={skill}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  />
                ))}
              </div>
            </div>
            
            <div 
              className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 backdrop-blur-sm"
              style={{ transitionDelay: "0.2s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill, index) => (
                  <SkillBadge 
                    key={index} 
                    name={skill}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  />
                ))}
              </div>
            </div>
            
            <div 
              className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 backdrop-blur-sm"
              style={{ transitionDelay: "0.4s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill, index) => (
                  <SkillBadge 
                    key={index} 
                    name={skill}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  />
                ))}
              </div>
            </div>
            
            <div 
              className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 backdrop-blur-sm"
              style={{ transitionDelay: "0.6s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {skills.databases.map((skill, index) => (
                  <SkillBadge 
                    key={index} 
                    name={skill}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  />
                ))}
              </div>
            </div>
            
            <div 
              className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 backdrop-blur-sm"
              style={{ transitionDelay: "0.8s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, index) => (
                  <SkillBadge 
                    key={index} 
                    name={skill}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  />
                ))}
              </div>
            </div>
            
            <div 
              className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 backdrop-blur-sm"
              style={{ transitionDelay: "1s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {skills.cloud.map((skill, index) => (
                  <SkillBadge 
                    key={index} 
                    name={skill}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      

      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-3xl p-8 md:p-12 border border-blue-500/40 backdrop-blur-sm shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
                Want to work together?
              </h2>
              <p className="mt-6 text-lg text-gray-200 leading-relaxed font-normal max-w-2xl mx-auto">
                I'm always interested in new opportunities and challenges.
                Let's create something amazing together!
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/projects" 
                  className="bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold px-8 py-4 rounded-xl border border-gray-500/40 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-center shadow-lg"
                >
                  View My Work
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-center shadow-lg shadow-blue-500/25"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Coding Achievements Section */}
      <section className="py-20 relative">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25 border border-yellow-400/30">
              🏆 Coding Achievements
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
              Problem Solving & Competitions
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-600 mt-6 rounded-full shadow-lg shadow-yellow-500/50" />
            <p className="mt-8 max-w-3xl text-lg text-gray-200 leading-relaxed font-normal">
              I'm passionate about competitive programming and problem-solving. Here are some of my achievements across various platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div 
              className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 backdrop-blur-sm text-center"
              ref={addToRefs}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border border-blue-400/40">
                <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">LeetCode & GFG</h3>
              <p className="text-4xl font-bold text-blue-400 mb-2">400+</p>
              <p className="text-gray-300">Problems Solved</p>
              <p className="text-sm text-gray-400 mt-3">Building strong problem-solving skills and algorithmic thinking</p>
            </div>
            
            <div 
              className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 backdrop-blur-sm text-center"
              style={{ transitionDelay: "0.2s" }}
              ref={addToRefs}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-full flex items-center justify-center border border-yellow-400/40">
                <svg className="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">CodeChef</h3>
              <p className="text-4xl font-bold text-yellow-400 mb-2">3⭐</p>
              <p className="text-gray-300">Rating</p>
              <p className="text-sm text-gray-400 mt-3">Consistent performance in competitive programming contests</p>
            </div>
            
            <div 
              className="reveal-animation bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 shadow-xl border border-gray-600/40 backdrop-blur-sm text-center"
              style={{ transitionDelay: "0.4s" }}
              ref={addToRefs}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center border border-purple-400/40">
                <svg className="w-10 h-10 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Codeforces</h3>
              <p className="text-4xl font-bold text-purple-400 mb-2">1200+</p>
              <p className="text-gray-300">Rating</p>
              <p className="text-sm text-gray-400 mt-3">Participating in global programming competitions</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Personal Story Section */}
      <section className="py-20 relative">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
                📖 My Story
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
                The Journey So Far
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-600 mt-6 rounded-full shadow-lg shadow-indigo-500/50" />
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-3xl p-8 md:p-12 border border-gray-600/40 backdrop-blur-sm shadow-2xl">
              <div className="space-y-8 text-lg text-gray-200 leading-relaxed font-normal">
                <p>
                  I'm a Computer Science student at G B Pant DSEU Okhla 1 Campus, passionate about building modern web applications. With expertise in the MERN stack and a focus on creating accessible, user-friendly interfaces, I strive to deliver high-quality code and exceptional user experiences.
                </p>
                <p>
                  My journey in programming started with curiosity and has evolved into a deep passion for creating efficient, elegant solutions to complex problems. I'm constantly learning and experimenting with new technologies to expand my skill set.
                </p>
                <p>
                  I've solved over 400 DSA problems on LeetCode & GFG, achieved 
                  <span className="inline-flex items-center space-x-2 mx-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-base font-semibold shadow-lg shadow-yellow-500/25">
                    <span>3⭐</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </span>
                  at CodeChef, and maintain a 1200+ rating at Codeforces.
                </p>
                <p>
                  My journey in tech is driven by curiosity and a continuous desire to learn and grow. I believe in the power of technology to solve real-world problems and create meaningful impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
