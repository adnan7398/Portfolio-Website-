
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { useEffect, useRef, useState } from "react";
import { Star } from 'lucide-react';
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Index = () => {
  // For intersection observer to trigger animations
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Project data state
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dummy projects as fallback
  const dummyProjects = [
    {
      title: "E-Commerce Website",
      description: "A full-featured e-commerce platform with payment integration using the MERN stack.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Redux", "JWT"],
      githubUrl: "#",
    },
    {
      title: "Chess Application",
      description: "Real-time chess game with multiplayer support and interactive gameplay.",
      techStack: ["TypeScript", "WebSocket", "Node.js", "HTML", "CSS", "Canvas API"],
      githubUrl: "#",
    },
    {
      title: "Second Brain App",
      description: "Knowledge management system to store and categorize Twitter posts and YouTube videos.",
      techStack: ["MERN Stack", "OAuth", "REST API", "MongoDB", "Express"],
      githubUrl: "https://github.com/adnan7398/Draw-App",
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Tailwind CSS.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and user authentication.",
      techStack: ["React", "Node.js", "Socket.IO", "MongoDB", "JWT", "Redis"],
      githubUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description: "A weather application that displays current weather and forecasts using external APIs.",
      techStack: ["React", "TypeScript", "OpenWeather API", "Chart.js", "Axios"],
      githubUrl: "#",
    },
  ];

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching projects from: ${API_URL}/api/projects`);
        const res = await fetch(`${API_URL}/api/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        console.log("Projects fetched successfully:", data);
        console.log("First project techStack:", data[0]?.techStack);
        setProjects(data);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Unknown error");
        // Use dummy projects if API fails
        console.log("Using dummy projects as fallback");
        setProjects(dummyProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
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
  }, [projects]);

  // Add elements to the reveal refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // Use real projects if available, otherwise use dummy projects
  const displayProjects = projects.length > 0 ? projects : dummyProjects;

  // Skill categories
  const skillCategories = [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "TailwindCSS"],
      icon: "🎨",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-900/30 to-rose-900/20",
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma"],
      icon: "⚙️",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-900/30 to-cyan-900/20",
    },
    {
      name: "Others",
      skills: ["Docker", "Socket.IO", "Redis", "AWS", "C++", "Python"],
      icon: "🛠️",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-900/30 to-indigo-900/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 via-slate-800 to-slate-900">
      <Hero />
      
      {/* Projects Section */}
      <section className="py-20 relative">
        {/* Background glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div
          className="container mx-auto px-6 reveal-animation relative z-10"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30">
              ✨ Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              {projects.length > 0 ? "My Projects" : "Featured Projects"}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 mt-6 rounded-full shadow-lg shadow-blue-500/50" />
            <p className="mt-8 max-w-3xl text-lg text-gray-200 leading-relaxed font-normal">
              {projects.length > 0 
                ? "Explore my recent work. These projects showcase my skills and experience in building modern web applications."
                : "Explore some of my recent work. These projects showcase my skills and experience in building modern web applications."
              }
            </p>
            {loading && (
              <div className="mt-6 flex items-center space-x-3 text-blue-300 font-medium">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-base">Loading projects...</span>
              </div>
            )}
            {error && projects.length === 0 && (
              <div className="mt-6 px-5 py-2.5 bg-gradient-to-r from-orange-900/40 to-red-900/40 border border-orange-500/50 rounded-xl backdrop-blur-sm shadow-lg">
                <p className="text-orange-200 text-base font-medium">Showing sample projects (API connection issue)</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <div
                key={project._id || index}
                className="reveal-animation transform hover:scale-105 transition-all duration-300"
                style={{ transitionDelay: `${0.1 * index}s` }}
                ref={addToRefs}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link
              to="/projects"
              className="group inline-flex items-center space-x-3 text-blue-300 hover:text-cyan-200 transition-all duration-300 font-semibold text-lg"
            >
              <span className="border-b-2 border-transparent group-hover:border-cyan-300 transition-all duration-300 pb-1">
                View all projects
              </span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative">
        {/* Background glow effects */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div
          className="container mx-auto px-6 reveal-animation relative z-10"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 border border-green-400/30">
              🚀 Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 mt-6 rounded-full shadow-lg shadow-green-500/50" />
            <p className="mt-8 max-w-3xl text-lg text-gray-200 leading-relaxed font-normal">
              I work with a variety of technologies to create robust and
              scalable applications. Here are some of the tools and languages I
              specialize in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="reveal-animation group"
                style={{ transitionDelay: `${0.2 * categoryIndex}s` }}
                ref={addToRefs}
              >
                <div className={`text-center p-8 rounded-3xl bg-gradient-to-br ${category.bgGradient} border border-gray-600/40 hover:border-${category.gradient.split('-')[1]}-400/60 hover:shadow-xl transition-all duration-500 group-hover:scale-105 backdrop-blur-sm relative overflow-hidden`}>
                  {/* Background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="text-5xl mb-4 relative z-10">{category.icon}</div>
                  <h3 className={`text-2xl font-bold mb-6 text-white group-hover:bg-gradient-to-r ${category.gradient} bg-clip-text group-hover:text-transparent transition-all duration-500 relative z-10`}>
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBadge
                        key={skillIndex}
                        name={skill}
                        className="animate-fade-in transform hover:scale-110 transition-all duration-300"
                        style={{ animationDelay: `${0.1 * skillIndex}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-20 relative">
        {/* Background glow effects */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div
          className="container mx-auto px-6 reveal-animation relative z-10"
          ref={addToRefs}
        >
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30">
              💬 Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Let's Work Together
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 mt-6 rounded-full mx-auto shadow-lg shadow-blue-500/50" />
            <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-200 leading-relaxed font-normal">
              Interested in collaborating or have a project in mind? Feel free to reach out.
              I'm always open to discussing new opportunities and challenges.
            </p>
            <div className="mt-12">
              <Link
                to="/contact"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-10 py-4 rounded-full hover:shadow-xl transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25 text-lg"
              >
                <span>Contact Me</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Admin Dashboard Link (for admin use only, remove in production) */}
      <AdminDashboardLink />
    </div>
  );
};

// Admin Dashboard Link (for admin use only, remove in production)
export const AdminDashboardLink = () => (
  <div style={{ textAlign: 'center', marginTop: 40 }}>
    <a href="/admin" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Admin Dashboard</a>
  </div>
);

export default Index;
