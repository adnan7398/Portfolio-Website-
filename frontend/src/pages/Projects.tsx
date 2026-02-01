import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { cn, buildApiUrl } from "@/lib/utils";
import { Loader2, AlertCircle, X, Github, ExternalLink, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Projects = () => {
  // State
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(buildApiUrl('/api/projects'));
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filtering
  const filters = [
    { value: "all", label: "All Projects" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Full Stack" },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(project => {
      const techStack = project.techStack || project.technologies || [];
      const category = project.category || "";
      return techStack.some((tech: string) =>
        tech.toLowerCase().includes(activeFilter.toLowerCase())
      ) || category.toLowerCase() === activeFilter.toLowerCase();
    });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] opacity-50" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-6">
                Portfolio
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                My <span className="text-primary">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A collection of projects showcasing my journey and technical capabilities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-red-500">
            <AlertCircle size={32} className="mb-4" />
            <p>{error}</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='wait'>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={item}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    {...project}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
          {selectedProject && (
            <div className="flex flex-col h-[85vh] md:h-auto md:max-h-[85vh]">

              {/* Image Header */}
              <div className="relative h-48 md:h-64 bg-muted shrink-0">
                {selectedProject.imageUrl ? (
                  <img
                    src={selectedProject.imageUrl.startsWith('http') ? selectedProject.imageUrl : buildApiUrl(selectedProject.imageUrl)}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-6xl font-bold">
                    {selectedProject.title.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <DialogClose className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                  <X size={20} />
                </DialogClose>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-6 md:p-8 space-y-6">
                  <DialogHeader>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <DialogTitle className="text-2xl md:text-3xl font-bold">{selectedProject.title}</DialogTitle>
                      {selectedProject.createdAt && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1 shrink-0">
                          <Calendar size={14} />
                          {new Date(selectedProject.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <DialogDescription className="text-base text-muted-foreground leading-relaxed text-left">
                      {selectedProject.description}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.techStack || selectedProject.technologies || []).map((tech: string) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                    {selectedProject.liveUrl && (
                      <Button asChild className="rounded-full">
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button asChild variant="outline" className="rounded-full">
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github size={16} className="mr-2" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
