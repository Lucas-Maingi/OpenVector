import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "error";
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<string, string> = {
  primary: "bg-accent text-text-on-accent hover:bg-accent-hover shadow-sm hover:shadow-md",
  secondary: "bg-surface-elevated text-text-primary hover:bg-zinc-700 border border-border",
  ghost: "text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
  outline: "border border-border text-text-primary hover:bg-surface-elevated",
  error: "bg-error text-text-on-error hover:bg-error-hover shadow-sm hover:shadow-md",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function buttonVariants({ variant = "primary", size = "md" }: { variant?: ButtonProps["variant"]; size?: ButtonProps["size"] } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed elevated",
    variant && variantClasses[variant],
    size && sizeClasses[size]
  );
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
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
