
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Hero = () => {
  const [profileImage, setProfileImage] = useState('/public/lovable-uploads/4efcce86-ee77-4aaf-8efc-e3579b1d0d2b.png');
  const [imageError, setImageError] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Fetch profile image from backend
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`${API_URL}/api/profile/image`);
        if (response.ok) {
          const data = await response.json();
          if (data.profileImageUrl) {
            const fullImageUrl = `${API_URL}${data.profileImageUrl}`;
            setProfileImage(fullImageUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
        // Keep the default image if fetch fails
      }
    };

    fetchProfileImage();
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
     
      backgroundRef.current.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Elements that will animate in
  const animatedElements = [
    {
      className: "py-1 px-4 border border-brand-blue/30 rounded-full text-brand-blue text-sm font-medium bg-brand-blue/5 animate-fade-in",
      style: { animationDelay: "0.2s" },
      content: "Hello!"
    },
    {
      className: "text-4xl md:text-5xl lg:text-6xl font-bold mt-4 animate-fade-in text-gray-900",
      style: { animationDelay: "0.4s" },
      content: "I'm Mohd Adnan,"
    },
    {
      className: "text-4xl md:text-5xl lg:text-6xl font-bold mt-1 animate-fade-in text-gray-900",
      style: { animationDelay: "0.6s" },
      content: "Full Stack Developer"
    },
    {
      className: "mt-6 max-w-2xl text-lg text-gray-600 animate-fade-in",
      style: { animationDelay: "0.8s" },
      content: "Passionate developer specializing in building exceptional digital experiences. Currently focused on creating accessible, human-centered products at the intersection of design and technology."
    }
  ];

  // Tech labels that float around the profile picture
  const techLabels = [
    { text: 'React', className: 'blue-pill absolute top-2 -left-16 animate-float', style: { animationDelay: "0s" } },
    { text: 'Node.js', className: 'blue-pill absolute -top-10 right-20 animate-float', style: { animationDelay: "0.5s" } },
    { text: 'TypeScript', className: 'blue-pill absolute top-20 -right-20 animate-float', style: { animationDelay: "1s" } },
    { text: 'MongoDB', className: 'blue-pill absolute -bottom-5 left-10 animate-float', style: { animationDelay: "1.5s" } },
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0" />
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-brand-blue/10 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-brand-blue/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            {/* Animated text elements */}
            {animatedElements.map((element, index) => (
              <div 
                key={index}
                className={element.className}
                style={element.style}
              >
                {element.content}
              </div>
            ))}
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "1s" }}>
              <Link 
                to="/contact" 
                className="bg-brand-blue text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-center"
              >
                Hire Me
              </Link>
              <Link 
                to="/projects" 
                className="border border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-full hover:border-brand-blue hover:text-brand-blue transition-all hover:shadow hover:scale-105 active:scale-95 text-center"
              >
                View Projects
              </Link>
            </div>
            
            {/* Social links */}
            <div className="mt-12 flex items-center space-x-6 animate-fade-in" style={{ animationDelay: "1.2s" }}>
              <a 
                href="https://github.com/adnan7398" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-blue transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-blue transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a 
                href="mailto:123adnansiddiqui@gmail.com" 
                className="text-gray-600 hover:text-brand-blue transition-colors"
                aria-label="Email"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative flex justify-center">
            {/* Profile picture with animated border */}
            <div className="rotating-border p-1">
              <div className="relative rounded-xl overflow-hidden bg-white w-72 h-72 md:w-80 md:h-80 shadow-xl animate-scale-in">
                <img 
                  src={profileImage} 
                  alt="Mohd Adnan" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Profile image failed to load:', profileImage);
                    setImageError(true);
                    // Fallback to default image
                    const target = e.target as HTMLImageElement;
                    target.src = '/public/lovable-uploads/4efcce86-ee77-4aaf-8efc-e3579b1d0d2b.png';
                  }}
                  onLoad={() => {
                    setImageError(false);
                  }}
                />
                
                {/* Tech labels */}
                {techLabels.map((label, index) => (
                  <div 
                    key={index}
                    className={label.className}
                    style={label.style}
                  >
                    {label.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
