import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import SkillBadge from "@/components/SkillBadge";
import { Link } from "react-router-dom";
import { Award, BookOpen, Code, Trophy } from 'lucide-react';
import { buildApiUrl } from "@/lib/utils";

const About = () => {
  const [profileImage, setProfileImage] = useState('/placeholder.svg');

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/profile/image'));
        if (response.ok) {
          const data = await response.json();
          if (data.profileImageUrl) {
            setProfileImage(buildApiUrl(data.profileImageUrl));
          }
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    fetchProfileImage();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
    languages: ["JavaScript", "TypeScript", "C", "C++", "Python"],
    frontend: ["React", "Next.js", "HTML5", "CSS3", "TailwindCSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "REST APIs"],
    databases: ["MongoDB", "PostgreSQL", "Prisma"],
    tools: ["Docker", "Git/GitHub", "VS Code", "Postman", "Xcode"],
    cloud: ["AWS (Basic)"],
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] opacity-50" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-6">
                About Me
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Computer Science Student <span className="text-muted-foreground">&</span> <br />
                <span className="text-primary">Full Stack Developer</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Building digital products with a focus on experience, aesthetics, and performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 space-y-24">

        {/* Story & Image */}
        <section>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 md:order-1 space-y-6 text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p>
                Hello! I'm <strong className="text-foreground">Mohd Adnan</strong>. My journey in programming started with curiosity and has evolved into a deep passion for creating efficient, elegant solutions to complex problems.
              </p>
              <p>
                I specialize in the <strong className="text-foreground">MERN stack</strong> and modern web technologies. I believe that good code is not just about functionality, but also about readability, maintainability, and scalability.
              </p>
              <p>
                When I'm not coding, you can find me solving algorithmic challenges on LeetCode or exploring the latest trends in technology.
              </p>
            </motion.div>

            <motion.div
              className="order-1 md:order-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-secondary/50">
                {/* Real Image or Placeholder */}
                <img
                  src={profileImage}
                  alt="Mohd Adnan"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats / Achievements */}
        <section>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: <Code size={32} />, value: "1200+", label: "Problems Solved on LeetCode, Codeforces & GFG", color: "text-blue-500" },
              { icon: <Trophy size={32} />, value: "3⭐", label: "CodeChef Rating", color: "text-yellow-500" },
              { icon: <Award size={32} />, value: "1580", label: "Specialist on Codeforces", color: "text-purple-500" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={item}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary/20 transition-all hover:shadow-lg text-center group"
              >
                <div className={`mb - 4 inline - flex p - 3 rounded - full bg - secondary ${stat.color} group - hover: scale - 110 transition - transform`}>
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Skills */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground">The tools and technologies I work with.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="text-lg font-semibold capitalize mb-4 text-primary">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <SkillBadge key={skill} name={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Education</h2>
          </div>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row justify-between items-start gap-4 p-6 rounded-xl bg-secondary/30 border border-border"
              >
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-primary/10 rounded-lg text-primary">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm font-medium text-primary mt-1">{edu.gpa}</p>}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {edu.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work together?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always interested in new opportunities and challenges. Let's create something amazing together!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/projects" className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors">
                View Projects
              </Link>
              <Link to="/contact" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;

