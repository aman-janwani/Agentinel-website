import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "dark";
  className?: string;
}

export function Badge({ children, variant = "accent", className }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    accent:
      "bg-[rgba(0,229,204,0.08)] text-teal-700 border-[rgba(0,229,204,0.2)]",
    dark: "bg-white/10 text-white border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
