
import { useState, useEffect, useRef } from "react";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  // For intersection observer to trigger animations
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Filters for project categories
  const [activeFilter, setActiveFilter] = useState("all");
  
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
  
  // Project data
  const projects = [
    {
      title: "E-Commerce Website",
      description: "A full-featured e-commerce platform with payment integration using the MERN stack.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      githubUrl: "#",
      liveUrl: "#",
      category: "fullstack",
    },
    {
      title: "Chess Application",
      description: "Real-time chess game with multiplayer support and interactive gameplay.",
      technologies: ["TypeScript", "WebSocket", "Node.js", "HTML", "CSS"],
      githubUrl: "#",
      category: "frontend",
    },
    {
      title: "Second Brain App",
      description: "Knowledge management system to store and categorize Twitter posts and YouTube videos.",
      technologies: ["MERN Stack", "OAuth", "REST API"],
      githubUrl: "https://github.com/adnan7398/Draw-App",
      category: "fullstack",
    },
    {
      title: "Drawing App",
      description: "A drawing application inspired by Excalidraw with collaborative features.",
      technologies: ["React", "Canvas API", "WebSockets"],
      githubUrl: "https://github.com/adnan7398/Draw-App",
      liveUrl: "#",
      category: "frontend",
    },
    {
      title: "Blog API",
      description: "RESTful API for blog management with authentication and authorization.",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      githubUrl: "#",
      category: "backend",
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website built with modern web technologies.",
      technologies: ["React", "TailwindCSS", "Framer Motion"],
      githubUrl: "#",
      liveUrl: "#",
      category: "frontend",
    },
  ];
  
  // Filter categories
  const filters = [
    { value: "all", label: "All Projects" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Full Stack" },
  ];
  
  // Filtered projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="pt-20 pb-20 overflow-x-hidden">
      {/* Projects Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-brand-blue font-medium animate-fade-in">My Work</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Projects & Case Studies
            </h1>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }} />
            <p className="mt-6 text-gray-600 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Explore my portfolio of web applications and development projects. Each project represents my problem-solving approach and technical skills in action.
            </p>
          </div>
        </div>
      </section>
      
      {/* Projects Showcase Section */}
      <section className="py-16">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          {/* Filter Buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {filters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeFilter === filter.value
                    ? "bg-brand-blue text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="reveal-animation"
                style={{ transitionDelay: `${0.1 * index}s` }}
                ref={addToRefs}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No projects found in this category</h3>
              <p className="text-gray-500 mt-2">Try selecting a different category from the filter options above.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Project Process Section */}
      <section className="py-16 bg-gray-50">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand-blue font-medium">My Approach</span>
              <h2 className="text-3xl font-bold mt-2 text-gray-900">
                Development Process
              </h2>
              <div className="w-20 h-1 bg-brand-blue mt-4 rounded mx-auto" />
            </div>
            
            <div className="space-y-12">
              {/* Process Steps */}
              <div 
                className="flex flex-col md:flex-row gap-6 items-center reveal-animation"
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <span className="text-brand-blue text-3xl font-bold">1</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center md:text-left">Planning & Research</h3>
                  <p className="text-gray-600">
                    I begin by thoroughly understanding the project requirements and conducting research on the best approaches. This includes analyzing similar solutions, identifying potential challenges, and planning the architecture.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-col md:flex-row gap-6 items-center reveal-animation"
                style={{ transitionDelay: "0.2s" }}
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <span className="text-brand-blue text-3xl font-bold">2</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center md:text-left">Design & Prototyping</h3>
                  <p className="text-gray-600">
                    Next, I create wireframes and prototypes to visualize the solution. This step helps in identifying usability issues early and ensuring the final product meets user expectations.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-col md:flex-row gap-6 items-center reveal-animation"
                style={{ transitionDelay: "0.4s" }}
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <span className="text-brand-blue text-3xl font-bold">3</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center md:text-left">Development</h3>
                  <p className="text-gray-600">
                    During development, I focus on writing clean, maintainable code following best practices. I break down complex features into manageable components and use version control for collaborative work.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-col md:flex-row gap-6 items-center reveal-animation"
                style={{ transitionDelay: "0.6s" }}
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <span className="text-brand-blue text-3xl font-bold">4</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center md:text-left">Testing & Optimization</h3>
                  <p className="text-gray-600">
                    Rigorous testing ensures the application works correctly across different devices and browsers. I also optimize for performance, accessibility, and SEO to deliver a high-quality product.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-col md:flex-row gap-6 items-center reveal-animation"
                style={{ transitionDelay: "0.8s" }}
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <span className="text-brand-blue text-3xl font-bold">5</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center md:text-left">Deployment & Maintenance</h3>
                  <p className="text-gray-600">
                    Finally, I deploy the application to a production environment and provide ongoing maintenance and support. I'm committed to the long-term success of every project I work on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Collaboration CTA */}
      <section className="py-16">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="max-w-4xl mx-auto bg-brand-blue/5 rounded-2xl p-8 md:p-12 border border-brand-blue/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                I'm currently available for freelance projects and open to collaboration.
                Let's discuss how we can work together to bring your ideas to life.
              </p>
              <a 
                href="/contact" 
                className="mt-8 inline-block bg-brand-blue text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
