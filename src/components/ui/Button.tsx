import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  as: Tag = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 cursor-pointer shrink-0";

  const variants = {
    primary:
      "bg-[#0A0A0A] text-white hover:bg-gray-800 shadow-lg shadow-black/10",
    secondary:
      "bg-white text-[#0A0A0A] border border-gray-200 hover:border-gray-300 shadow-sm",
    ghost: "text-gray-600 hover:text-black hover:bg-gray-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <Tag className={cn(base, variants[variant], sizes[size], className)} {...(props as any)}>
      {children}
    </Tag>
  );
}
