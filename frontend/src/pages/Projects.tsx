
import { useState, useEffect, useRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";



const Projects = () => {
  // For intersection observer to trigger animations
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Filters for project categories
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Project data from backend
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching projects from: ${API_URL}/api/projects`);
        
        // Add timeout to the fetch request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const res = await fetch(`${API_URL}/api/projects`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Projects fetched successfully:", data);
        
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        
        // Handle specific error types
        let errorMessage = "Unknown error";
        if (err.name === 'AbortError') {
          errorMessage = "Request timeout - server took too long to respond";
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = "Network error - unable to connect to server";
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
        setProjects([]);
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
  }, [projects]);
  
  // Add elements to the reveal refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  
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
    : projects.filter(project => {
        const techStack = project.techStack || project.technologies || [];
        return techStack.some((tech: string) => 
          tech.toLowerCase().includes(activeFilter.toLowerCase())
        ) || project.category === activeFilter;
      });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 via-slate-800 to-slate-900 pt-20 pb-20 overflow-x-hidden">
      {/* Projects Hero Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30 animate-fade-in">
              ✨ My Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Projects & Case Studies
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 mt-6 rounded-full mx-auto shadow-lg shadow-blue-500/50 animate-fade-in" style={{ animationDelay: "0.3s" }} />
            <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-200 leading-relaxed font-normal animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Explore my portfolio of web applications and development projects. Each project represents my problem-solving approach and technical skills in action.
            </p>
          </div>
        </div>
      </section>
      

      
      {/* Projects Showcase Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-6 py-3 rounded-full font-medium transition-all duration-300 border-2",
                  activeFilter === filter.value
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-400 shadow-lg shadow-blue-500/25"
                    : "bg-transparent text-gray-300 border-gray-600 hover:border-blue-400 hover:text-blue-300"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>



          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center space-x-3 text-blue-300 font-medium">
                <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xl">Loading projects...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto px-6 py-8 bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/50 rounded-2xl backdrop-blur-sm shadow-xl">
                <p className="text-red-200 text-lg font-medium mb-4">Failed to load projects</p>
                <p className="text-red-300 text-base">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
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
          )}

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-300 mb-4">No projects found in this category</h3>
              <p className="text-gray-400 text-lg">Try selecting a different category from the filter options above.</p>
              {projects.length === 0 && (
                <div className="mt-8 max-w-md mx-auto px-6 py-6 bg-gradient-to-r from-orange-900/40 to-red-900/40 border border-orange-500/50 rounded-2xl backdrop-blur-sm shadow-xl">
                  <p className="text-orange-200 text-base">
                    No projects are currently available. Please check back later or contact me for more information about my work.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Project Process Section */}
      <section className="py-20 relative">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 border border-green-400/30">
                🚀 My Approach
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
                Development Process
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 mt-6 rounded-full mx-auto shadow-lg shadow-green-500/50" />
            </div>
            
            <div className="space-y-12">
              {/* Process Steps */}
              <div 
                className="flex flex-col md:flex-row gap-8 items-center reveal-animation p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-600/40 backdrop-blur-sm"
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center border border-green-400/40">
                    <span className="text-green-400 text-3xl font-bold">1</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-3 text-white text-center md:text-left">Planning & Research</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I begin by thoroughly understanding the project requirements and conducting research on the best approaches. This includes analyzing similar solutions, identifying potential challenges, and planning the architecture.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-col md:flex-row gap-8 items-center reveal-animation p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-600/40 backdrop-blur-sm"
                style={{ transitionDelay: "0.2s" }}
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center border border-green-400/40">
                    <span className="text-green-400 text-3xl font-bold">2</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-3 text-white text-center md:text-left">Design & Prototyping</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Next, I create wireframes and prototypes to visualize the solution. This step helps in identifying usability issues early and ensuring the final product meets user expectations.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-col md:flex-row gap-8 items-center reveal-animation p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-600/40 backdrop-blur-sm"
                style={{ transitionDelay: "0.4s" }}
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center border border-green-400/40">
                    <span className="text-green-400 text-3xl font-bold">3</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-3 text-white text-center md:text-left">Development</h3>
                  <p className="text-gray-300 leading-relaxed">
                    During development, I focus on writing clean, maintainable code following best practices. I break down complex features into manageable components and use version control for collaborative work.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-col md:flex-row gap-8 items-center reveal-animation p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-600/40 backdrop-blur-sm"
                style={{ transitionDelay: "0.6s" }}
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center border border-green-400/40">
                    <span className="text-green-400 text-3xl font-bold">4</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-3 text-white text-center md:text-left">Testing & Optimization</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Rigorous testing ensures the application works correctly across different devices and browsers. I also optimize for performance, accessibility, and SEO to deliver a high-quality product.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-col md:flex-row gap-8 items-center reveal-animation p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-600/40 backdrop-blur-sm"
                style={{ transitionDelay: "0.8s" }}
                ref={addToRefs}
              >
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center border border-green-400/40">
                    <span className="text-green-400 text-3xl font-bold">5</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-3 text-white text-center md:text-left">Deployment & Maintenance</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Finally, I deploy the application to a production environment and provide ongoing maintenance and support. I'm committed to the long-term success of every project I work on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Collaboration CTA */}
      <section className="py-20 relative">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-3xl p-8 md:p-12 border border-blue-500/40 backdrop-blur-sm shadow-2xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Have a project in mind?
              </h2>
              <p className="mt-6 text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
                I'm currently available for freelance projects and open to collaboration.
                Let's discuss how we can work together to bring your ideas to life.
              </p>
              <a 
                href="/contact" 
                className="mt-8 inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
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
