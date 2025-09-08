
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Hero = () => {
  const [profileImage, setProfileImage] = useState('/uploads/profile.svg');
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
      className: "inline-flex items-center py-2 px-4 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30 animate-fade-in",
      style: { animationDelay: "0.2s" },
      content: "👋 Hello!"
    },
    {
      className: "text-3xl md:text-4xl lg:text-5xl font-bold mt-6 animate-fade-in text-white leading-tight bg-gradient-to-r from-blue-100 via-white to-cyan-100 bg-clip-text text-transparent drop-shadow-lg",
      style: { animationDelay: "0.4s" },
      content: "I'm Mohd Adnan,"
    },
    {
      className: "text-3xl md:text-4xl lg:text-5xl font-bold mt-2 animate-fade-in text-white leading-tight bg-gradient-to-r from-blue-100 via-white to-cyan-100 bg-clip-text text-transparent drop-shadow-lg",
      style: { animationDelay: "0.6s" },
      content: "Full Stack Developer"
    },
    {
      className: "mt-6 max-w-2xl text-base text-gray-200 leading-relaxed font-normal animate-fade-in",
      style: { animationDelay: "0.8s" },
      content: "Passionate developer specializing in building exceptional digital experiences. Currently focused on creating accessible, human-centered products at the intersection of design and technology."
    }
  ];

  return (
    <section className="min-h-screen pt-24 pb-16 relative overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0" />
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
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
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "1s" }}>
              <Link 
                to="/contact" 
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-center text-base shadow-lg shadow-blue-500/25"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Hire Me</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/about" 
                className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-center text-base shadow-lg shadow-purple-500/25"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>More About Me</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/projects" 
                className="group border-2 border-gray-400 text-gray-200 font-medium px-8 py-3 rounded-full hover:border-blue-400 hover:text-blue-200 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-center text-base bg-gray-900/50 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>View Projects</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Social links */}
            <div className="mt-12 flex items-center space-x-6 animate-fade-in" style={{ animationDelay: "1.2s" }}>
              <a 
                href="https://github.com/adnan7398" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group text-gray-300 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <div className="p-2.5 rounded-full bg-gray-800/50 border border-gray-600/30 group-hover:border-blue-400/50 group-hover:bg-gray-800/80 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
              <a 
                href="https://www.linkedin.com/in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group text-gray-300 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <div className="p-2.5 rounded-full bg-gray-800/50 border border-gray-600/30 group-hover:border-blue-400/50 group-hover:bg-gray-800/80 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
              </a>
              <a 
                href="mailto:123adnansiddiqui@gmail.com" 
                className="group text-gray-300 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <div className="p-2.5 rounded-full bg-gray-800/50 border border-gray-600/30 group-hover:border-blue-400/50 group-hover:bg-gray-800/80 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative flex justify-center">
            {/* Profile picture with enhanced styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative p-2.5">
                <div className="rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-800 to-gray-700 w-64 h-64 md:w-80 md:h-80 transform group-hover:scale-105 transition-transform duration-500 border border-gray-500/40 group-hover:border-purple-400/60">
                  <img 
                    src={profileImage} 
                    alt="Mohd Adnan" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Profile image failed to load:', profileImage);
                      setImageError(true);
                      // Fallback to default image
                      const target = e.target as HTMLImageElement;
                      target.src = '/uploads/profile.svg';
                    }}
                    onLoad={() => {
                      setImageError(false);
                    }}
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
