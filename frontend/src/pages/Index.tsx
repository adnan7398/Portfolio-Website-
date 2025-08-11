
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
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      githubUrl: "#",
    },
    {
      title: "Chess Application",
      description: "Real-time chess game with multiplayer support and interactive gameplay.",
      technologies: ["TypeScript", "WebSocket", "Node.js", "HTML", "CSS"],
      githubUrl: "#",
    },
    {
      title: "Second Brain App",
      description: "Knowledge management system to store and categorize Twitter posts and YouTube videos.",
      technologies: ["MERN Stack", "OAuth", "REST API"],
      githubUrl: "https://github.com/adnan7398/Draw-App",
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Tailwind CSS.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and user authentication.",
      technologies: ["React", "Node.js", "Socket.IO", "MongoDB", "JWT"],
      githubUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description: "A weather application that displays current weather and forecasts using external APIs.",
      technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
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
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma"],
    },
    {
      name: "Others",
      skills: ["Docker", "Socket.IO", "Redis", "AWS", "C++", "Python"],
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50">
        <div
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-brand-blue font-medium">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
              {projects.length > 0 ? "My Projects" : "Featured Projects"}
            </h2>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded" />
            <p className="mt-4 max-w-2xl text-gray-600">
              {projects.length > 0 
                ? "Explore my recent work. These projects showcase my skills and experience in building modern web applications."
                : "Explore some of my recent work. These projects showcase my skills and experience in building modern web applications."
              }
            </p>
            {loading && (
              <p className="mt-2 text-sm text-gray-500">Loading projects...</p>
            )}
            {error && projects.length === 0 && (
              <p className="mt-2 text-sm text-orange-500">Showing sample projects (API connection issue)</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <div
                key={project._id || index}
                className="reveal-animation"
                style={{ transitionDelay: `${0.2 * index}s` }}
                ref={addToRefs}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to="/projects"
              className="flex items-center space-x-2 text-brand-blue hover:underline transition-all"
            >
              <span>View all projects</span>
              <svg
                className="w-4 h-4"
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
      <section className="py-20">
        <div
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-brand-blue font-medium">Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded" />
            <p className="mt-4 max-w-2xl text-gray-600">
              I work with a variety of technologies to create robust and
              scalable applications. Here are some of the tools and languages I
              specialize in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="reveal-animation"
                style={{ transitionDelay: `${0.2 * categoryIndex}s` }}
                ref={addToRefs}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skillIndex}
                      name={skill}
                      className="animate-fade-in"
                      style={{ animationDelay: `${0.1 * skillIndex}s` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <span className="text-brand-blue font-medium">About Me</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
                Computer Science Student & Full Stack Developer
              </h2>
              <div className="w-20 h-1 bg-brand-blue mt-4 rounded" />
              <p className="mt-6 text-gray-600">
                I'm a Computer Science student at G B Pant DSEU Okhla 1 Campus, passionate about building modern web applications. With expertise in the MERN stack and a focus on creating accessible, user-friendly interfaces, I strive to deliver high-quality code and exceptional user experiences.
              </p>
              <p className="mt-4 text-gray-600">
                I've solved over 400 DSA problems on LeetCode 9& gfg. <br />
                <span className="inline-flex items-center space-x-1">
                <span>3</span>
                <Star className="w-6 h-6 text-yellow-500" />
              </span>
                 at CodeChef,
                 1200+ rating at Codeforces.
                  <br />which has significantly improved my problem-solving abilities and algorithmic thinking. My journey in tech is driven by curiosity and a continuous desire to learn and grow.
              </p>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="bg-brand-blue text-white font-medium px-6 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105 active:scale-95 inline-block"
                >
                  More About Me
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 bg-brand-blue rounded-2xl absolute -bottom-4 -right-4 opacity-20"></div>
                <div className="rotating-border p-1">
                  <div className="rounded-xl overflow-hidden shadow-xl bg-white w-72 h-72 md:w-80 md:h-80">
                    <img 
                      src={`${API_URL}/uploads/profile.png`}
                      alt="Mohd Adnan" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div className="hidden w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-sm text-gray-500">Profile Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-20">
        <div
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center">
            <span className="text-brand-blue font-medium">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
              Let's Work Together
            </h2>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded" />
            <p className="mt-4 max-w-2xl text-gray-600">
              Interested in collaborating or have a project in mind? Feel free to reach out.
              I'm always open to discussing new opportunities and challenges.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="bg-brand-blue text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105 active:scale-95 inline-block"
              >
                Contact Me
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
    <a href="/admin" style={{ color: '#2563eb', textDecoration: 'underline' }}>Admin Dashboard</a>
  </div>
);

export default Index;
