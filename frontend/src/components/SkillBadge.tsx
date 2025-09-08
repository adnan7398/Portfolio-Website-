
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const SkillBadge = ({ name, icon, className, style }: SkillBadgeProps) => {
  return (
    <div 
      className={cn(
        "flex items-center px-3 py-1.5 rounded-lg bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-brand-blue/20",
        className
      )}
      style={style}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="text-xs font-medium text-gray-700">{name}</span>
    </div>
  );
};

export default SkillBadge;
