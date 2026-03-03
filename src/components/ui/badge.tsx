import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-surface-elevated text-text-primary border border-border",
      accent: "bg-accent-subtle text-accent border border-accent-border",
      success: "bg-success-subtle text-success border border-success-border",
      warning: "bg-warning-subtle text-warning border border-warning-border",
      error: "bg-error-subtle text-error border border-error-border",
      outline: "bg-transparent text-text-secondary border border-border",
    };

    const sizes = {
      sm: "px-1.5 py-0.5 text-xs",
      md: "px-2 py-1 text-xs",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded font-medium",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
