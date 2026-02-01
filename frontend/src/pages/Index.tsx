import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { buildApiUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, Globe, Layers, Server } from "lucide-react";
import { motion } from "framer-motion";
import CodingProfiles from "@/components/CodingProfiles";

const Index = () => {
  // Project data state
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dummy projects as fallback
  const dummyProjects = [
    {
      title: "E-Commerce Website",
      description: "A full-featured e-commerce platform with payment integration using the MERN stack.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      githubUrl: "#",
    },
    {
      title: "Chess Application",
      description: "Real-time chess game with multiplayer support and interactive gameplay.",
      techStack: ["TypeScript", "WebSocket", "Node.js", "Canvas API"],
      githubUrl: "#",
    },
    {
      title: "Second Brain App",
      description: "Knowledge management system to store and categorize Twitter posts and YouTube videos.",
      techStack: ["React", "Express", "MongoDB", "OAuth"],
      githubUrl: "https://github.com/adnan7398/Draw-App",
    },
  ];

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(buildApiUrl('/api/projects'));
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(Array.isArray(data) && data.length > 0 ? data : dummyProjects);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setProjects(dummyProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Display only top 3 projects
  const displayProjects = projects.slice(0, 3);

  const skills = [
    { name: "Frontend", icon: <Globe className="w-6 h-6" />, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { name: "Backend", icon: <Server className="w-6 h-6" />, items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Prisma"] },
    { name: "Tools", icon: <Layers className="w-6 h-6" />, items: ["Docker", "Git", "AWS", "Redis", "Linux"] },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />

      {/* Featured Projects */}
      <section className="py-24 border-t border-border/40 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Featured Projects</h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                A selection of my recent work, ranging from web applications to complex systems.
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-2 group">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CodingProfiles />

      {/* Skills Section */}
      <section className="py-24 bg-secondary/20 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground text-lg">
              I solve problems using modern tools and best practices. Here is a snapshot of my technical arsenal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-6">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <SkillBadge key={skill} name={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 bg-primary/5 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-16 bg-indigo-500/5 rounded-full blur-3xl opacity-20 -ml-20 -mb-20 pointer-events-none"></div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Have a project in mind?</h2>
            <p className="text-lg text-muted-foreground mb-8 relative z-10">
              Whether you need a full-stack application, a landing page, or just some consulting, I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/contact">Let's Talk</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/projects">See More Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AdminDashboardLink />
    </div>
  );
};

// Admin Dashboard Link (for admin use only, remove in production)
export const AdminDashboardLink = () => (
  <div className="fixed bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity z-50">
    <Link to="/admin" className="text-xs text-muted-foreground/30 hover:text-muted-foreground">Admin</Link>
  </div>
);

export default Index;
