import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "error";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed elevated",
        // Variants
        variant === "primary" && "bg-accent text-text-on-accent hover:bg-accent-hover shadow-sm hover:shadow-md",
        variant === "secondary" && "bg-surface-elevated text-text-primary hover:bg-zinc-700 border border-border",
        variant === "ghost" && "text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
        variant === "outline" && "border border-border text-text-primary hover:bg-surface-elevated",
        variant === "error" && "bg-error text-text-on-error hover:bg-error-hover shadow-sm hover:shadow-md",
        // Sizes
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
