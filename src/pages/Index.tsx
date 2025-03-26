
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  // For intersection observer to trigger animations
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

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
  }, []);

  // Add elements to the reveal refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // Featured projects
  const featuredProjects = [
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
  ];

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
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded" />
            <p className="mt-4 max-w-2xl text-gray-600">
              Explore some of my recent work. These projects showcase my skills
              and experience in building modern web applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
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

      {/* About Me Preview Section */}
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
                I'm a Computer Science student at Jamia Millia Islamia, passionate about building modern web applications. With expertise in the MERN stack and a focus on creating accessible, user-friendly interfaces, I strive to deliver high-quality code and exceptional user experiences.
              </p>
              <p className="mt-4 text-gray-600">
                I've solved over 350 DSA problems on LeetCode, which has significantly improved my problem-solving abilities and algorithmic thinking. My journey in tech is driven by curiosity and a continuous desire to learn and grow.
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
    </div>
  );
};

export default Index;
