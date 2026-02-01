
import { useState } from 'react';
import { cn, buildApiUrl } from "@/lib/utils";
import { ArrowUpRight, Github } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies?: string[];
  techStack?: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  _id?: string;
  onClick?: () => void;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  techStack,
  imageUrl,
  githubUrl,
  liveUrl,
  onClick
}: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Normalize tech stack
  const techArray = Array.isArray(technologies) ? technologies :
    Array.isArray(techStack) ? techStack : [];

  const getImageUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return buildApiUrl(url);
    return url;
  };

  const finalImageUrl = getImageUrl(imageUrl);

  return (
    <div
      className="group flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer h-full"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="aspect-video relative overflow-hidden bg-muted">
        {finalImageUrl && !imageError ? (
          <img
            src={finalImageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 font-bold text-4xl select-none">
            {title.charAt(0)}
          </div>
        )}

        {/* Overlay with Quick Actions (visible on hover) */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-background text-foreground hover:text-primary hover:scale-110 transition-all"
              title="View Live"
            >
              <ArrowUpRight size={20} />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-background text-foreground hover:text-primary hover:scale-110 transition-all"
              title="View Code"
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">{description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {techArray.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="px-2 py-0.5 text-xs font-normal">
              {tech}
            </Badge>
          ))}
          {techArray.length > 3 && (
            <Badge variant="outline" className="px-2 py-0.5 text-xs font-normal text-muted-foreground">
              +{techArray.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
