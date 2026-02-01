import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buildApiUrl } from "@/lib/utils";
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="container px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-background shadow-xl ring-2 ring-primary/20">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
              />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border backdrop-blur-sm text-sm font-medium text-foreground/80 hover:bg-secondary/80 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for new projects
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]"
          >
            Crafting <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-primary animate-gradient-x">digital experiences</span> with purpose.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl leading-relaxed font-light"
          >
            I'm <span className="font-medium text-foreground">Mohd Adnan</span>, a Full Stack Developer passionate about building accessible, pixel-perfect, and performant web applications.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all w-full sm:w-auto">
              <Link to="/projects">
                View Recent Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:bg-secondary/50 w-full sm:w-auto">
              <a href="https://drive.google.com/file/d/1mwBD1FkqEi5YWtd7dlytqMFXC4WR897h/view?usp=sharing" target="_blank" rel="noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Tech Specs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-24 w-full max-w-screen-lg border-t border-border/40 pt-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left md:text-center">
              {[
                { label: "Experience", value: "2+ Years" },
                { label: "Projects", value: "20+ Completed" },
                { label: "Stack", value: "MERN & Next.js" },
                { label: "Focus", value: "Performance" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-2xl md:text-3xl font-bold font-heading">{stat.value}</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
