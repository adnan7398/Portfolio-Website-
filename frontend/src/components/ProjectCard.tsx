
import { useState } from 'react';
import { cn, buildApiUrl } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies?: string[];
  techStack?: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  _id?: string;
  createdAt?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  techStack,
  imageUrl,
  githubUrl,
  liveUrl,
  _id,
  createdAt
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Use technologies or techStack, whichever is available, and ensure it's an array
  const techArray = Array.isArray(technologies) ? technologies : 
                   Array.isArray(techStack) ? techStack : 
                   typeof techStack === 'string' ? techStack.split(',').map(t => t.trim()) :
                   typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()) :
                   [];
  
  // Handle image URL - if it's a relative path, prepend the API URL
  const getImageUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url; // Already a full URL
    if (url.startsWith('/')) {
      return buildApiUrl(url); // Relative path from backend
    }
    return url; // Fallback
  };
  
  const finalImageUrl = getImageUrl(imageUrl);
  
  // Truncate description if it's too long
  const truncatedDescription = description && description.length > 120 
    ? description.substring(0, 120) + '...' 
    : description || 'No description available';
  
  // Format date if available
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };
  
  return (
    <div 
      className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 border-2 border-gray-600/40 hover:border-blue-400/80 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Project Image */}
      <div className="h-48 overflow-hidden relative">
        {finalImageUrl && !imageError ? (
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
            }}
          />
        ) : null}
        
        {/* Fallback placeholder */}
        <div className={`w-full h-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 flex items-center justify-center text-gray-300 ${finalImageUrl && !imageError ? 'hidden' : ''}`}>
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 00-2-2V5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-base text-gray-300 font-semibold">{title}</p>
          </div>
        </div>
        
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Date badge */}
        {createdAt && (
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
            {formatDate(createdAt)}
          </div>
        )}
      </div>
      
      {/* Project Details */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors duration-300 leading-tight">
          {title || 'Untitled Project'}
        </h3>
        <p className="text-gray-200 mb-6 text-sm leading-relaxed font-normal">
          {truncatedDescription}
        </p>
        
        {/* Technologies */}
        {techArray.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {techArray.slice(0, 4).map((tech, index) => (
              <span 
                key={index} 
                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 rounded-full border border-blue-400/40 hover:bg-blue-500/50 hover:border-blue-300/60 hover:text-white transition-all duration-300 shadow-md"
              >
                {tech}
              </span>
            ))}
            {techArray.length > 4 && (
              <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-orange-500/30 to-red-500/30 text-orange-200 rounded-full border border-orange-400/40 hover:bg-orange-500/50 hover:border-orange-300/60 hover:text-white transition-all duration-300 shadow-md">
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
              className="group/link flex items-center space-x-2 text-gray-300 hover:text-blue-200 transition-all duration-300 cursor-pointer font-semibold text-sm"
              aria-label="View on GitHub"
            >
              <svg className="w-5 h-5 group-hover/link:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>Code</span>
            </a>
          )}
          
          {liveUrl && (
            <a 
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center space-x-2 text-gray-300 hover:text-blue-200 transition-all duration-300 cursor-pointer font-semibold text-sm"
              aria-label="View live project"
            >
              <svg className="w-5 h-5 group-hover/link:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              <span>Live Demo</span>
            </a>
          )}
          
          {/* Show message if no links available */}
          {!githubUrl && !liveUrl && (
            <span className="text-gray-500 text-sm italic">
              No links available
            </span>
          )}
        </div>
      </div>
      
      {/* Hover effect - positioned behind content */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-blue-500/15 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none",
        isHovered && "opacity-100"
      )} />
      
      {/* Top-right corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg shadow-blue-500/50" />
      
      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100"></div>
      <div className="absolute bottom-4 right-4 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100"></div>
    </div>
  );
};

export default ProjectCard;
