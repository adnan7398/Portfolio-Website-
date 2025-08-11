
import { useState } from 'react';
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies?: string[];
  techStack?: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  techStack,
  imageUrl,
  githubUrl,
  liveUrl
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Use technologies or techStack, whichever is available
  const techArray = technologies || techStack || [];
  
  // Handle image URL - if it's a relative path, prepend the API URL
  const getImageUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url; // Already a full URL
    if (url.startsWith('/')) {
      return `${API_URL}${url}`; // Relative path from backend
    }
    return url; // Fallback
  };
  
  const finalImageUrl = getImageUrl(imageUrl);
  
  // Create a placeholder image with the project title
  const getPlaceholderImage = (title: string) => {
    const encodedTitle = encodeURIComponent(title);
    return `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodedTitle}`;
  };

  // Truncate description if it's too long
  const truncatedDescription = description.length > 120 
    ? description.substring(0, 120) + '...' 
    : description;
  
  return (
    <div 
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="h-48 overflow-hidden">
        {imageUrl && !imageError ? (
          <img 
            src={finalImageUrl} 
            alt={title} 
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered && "scale-110"
            )}
            onError={(e) => {
              console.error(`Failed to load image for ${title}:`, finalImageUrl);
              setImageError(true);
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        {/* Fallback placeholder */}
        <div className={`w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 ${imageUrl && !imageError ? 'hidden' : ''}`}>
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 00-2-2V5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-500">{title}</p>
          </div>
        </div>
      </div>
      
      {/* Project Details */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{truncatedDescription}</p>
        
        {/* Technologies */}
        {techArray.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {techArray.slice(0, 4).map((tech, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-xs font-medium bg-brand-blue/10 text-brand-blue rounded-full"
              >
                {tech}
              </span>
            ))}
            {techArray.length > 4 && (
              <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                +{techArray.length - 4} more
              </span>
            )}
          </div>
        )}
        
        {/* Links */}
        <div className="flex items-center space-x-4">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 hover:text-brand-blue transition-colors cursor-pointer"
              aria-label="View on GitHub"
              onClick={(e) => {
                e.stopPropagation();
                window.open(githubUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Code</span>
            </a>
          )}
          
          {liveUrl && (
            <a 
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 hover:text-brand-blue transition-colors cursor-pointer"
              aria-label="View live project"
              onClick={(e) => {
                e.stopPropagation();
                window.open(liveUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              <span className="text-sm">Live Demo</span>
            </a>
          )}
        </div>
      </div>
      
      {/* Hover effect - positioned behind content */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-brand-blue to-transparent opacity-0 transition-opacity duration-300 pointer-events-none",
        isHovered && "opacity-10"
      )} />
    </div>
  );
};

export default ProjectCard;
