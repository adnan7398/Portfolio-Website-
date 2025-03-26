
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  className?: string;
}

const SkillBadge = ({ name, icon, className }: SkillBadgeProps) => {
  return (
    <div 
      className={cn(
        "flex items-center px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-brand-blue/20",
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
};

export default SkillBadge;
