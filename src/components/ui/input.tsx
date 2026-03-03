import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, fullWidth, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 rounded-lg border px-3 py-2 text-sm transition-colors",
          "bg-input-bg border-input-border text-text-primary placeholder:text-text-tertiary",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-error focus:ring-error",
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export const InputGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));

InputGroup.displayName = "InputGroup";

export const InputLabel = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, required, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("block text-sm font-medium text-text-primary", className)}
    {...props}
  >
    {children}
    {required && <span className="text-error ml-1">*</span>}
  </label>
));

InputLabel.displayName = "InputLabel";

export const InputHelperText = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xs",
      error ? "text-error" : "text-text-secondary",
      className
    )}
    {...props}
  />
));

InputHelperText.displayName = "InputHelperText";

interface HTMLAttributes<T> extends React.HTMLAttributes<T> {}
