
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
        "flex items-center px-4 py-2 rounded-md bg-secondary text-secondary-foreground border border-border/50 transition-all hover:bg-secondary/80 hover:scale-105 cursor-default",
        className
      )}
      style={style}
    >
      {icon && <span className="mr-2 text-primary">{icon}</span>}
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default SkillBadge;
