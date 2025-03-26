
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
  
  // Achievements
  const achievements = [
    "Solved 350+ DSA problems on LeetCode, building strong problem-solving skills",
    "Learned scalable system design and deployment practices from industry professionals",
    "Built multiple full-stack applications with clean, maintainable code",
  ];

  return (
    <div className="pt-20 pb-20 overflow-x-hidden">
      {/* About Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 order-2 md:order-1">
              <span className="text-brand-blue font-medium animate-fade-in">About Me</span>
              <h1 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Computer Science Student & Developer
              </h1>
              <div className="w-20 h-1 bg-brand-blue mt-4 rounded animate-fade-in" style={{ animationDelay: "0.3s" }} />
              <p className="mt-6 text-gray-600 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                Hello! I'm Mohd Adnan, a passionate full-stack developer and Computer Science student. I specialize in building modern web applications using the MERN stack and other cutting-edge technologies.
              </p>
              <p className="mt-4 text-gray-600 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                My journey in programming started with curiosity and has evolved into a deep passion for creating efficient, elegant solutions to complex problems. I'm constantly learning and experimenting with new technologies to expand my skill set.
              </p>
            </div>
            
            <div className="md:w-1/2 flex justify-center order-1 md:order-2">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-brand-blue rounded-full absolute -bottom-4 -right-4 opacity-10 animate-pulse-slow"></div>
                <div className="rotating-border p-1 animate-fade-in">
                  <div className="rounded-xl overflow-hidden shadow-xl bg-white w-64 h-64 md:w-80 md:h-80">
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
      <section className="py-16">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-brand-blue font-medium">My Background</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
              Education
            </h2>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded" />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {education.map((item, index) => (
                <div 
                  key={index}
                  className="reveal-animation bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-brand-blue/20"
                  style={{ transitionDelay: `${0.2 * index}s` }}
                  ref={addToRefs}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.degree}</h3>
                      <p className="text-gray-600 mt-1">{item.institution}</p>
                      {item.gpa && <p className="text-brand-blue font-medium mt-1">{item.gpa}</p>}
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-block px-4 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium">
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
      <section className="py-16 bg-gray-50">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-brand-blue font-medium">What I Know</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded" />
            <p className="mt-4 max-w-2xl text-gray-600">
              Throughout my journey, I've acquired a diverse set of skills and technologies.
              Here's an overview of what I bring to the table.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              className="reveal-animation bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Languages</h3>
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
              className="reveal-animation bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              style={{ transitionDelay: "0.2s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Frontend</h3>
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
              className="reveal-animation bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              style={{ transitionDelay: "0.4s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Backend</h3>
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
              className="reveal-animation bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              style={{ transitionDelay: "0.6s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Databases</h3>
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
              className="reveal-animation bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              style={{ transitionDelay: "0.8s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Tools</h3>
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
              className="reveal-animation bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              style={{ transitionDelay: "1s" }}
              ref={addToRefs}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Cloud</h3>
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
      
      {/* Achievements Section */}
      <section className="py-16">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-brand-blue font-medium">Proud Moments</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
              Achievements
            </h2>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded" />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="reveal-animation flex items-start gap-4"
                  style={{ transitionDelay: `${0.2 * index}s` }}
                  ref={addToRefs}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-brand-blue/10 p-2 rounded-full">
                      <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-brand-blue/5">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Want to work together?
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              I'm always interested in new opportunities and challenges.
              Let's create something amazing together!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/projects" 
                className="bg-white text-brand-blue font-medium px-8 py-3 rounded-full border border-brand-blue/30 hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-center"
              >
                View My Work
              </Link>
              <Link 
                to="/contact" 
                className="bg-brand-blue text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-center"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
