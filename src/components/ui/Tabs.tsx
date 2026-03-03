"use client";
import { createContext, useContext, useState, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs");
  }
  return context;
};

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  children,
  className,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value = controlledValue ?? uncontrolledValue;
  const onValueChange = controlledOnValueChange ?? setUncontrolledValue;

  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("space-y-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 border-b border-border w-full",
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({
  value,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabsContext();
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => onValueChange(value)}
      className={cn(
        "relative px-4 py-3 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        isSelected
          ? "text-text-primary"
          : "text-text-secondary hover:text-text-primary",
        className
      )}
      {...props}
    >
      {children}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
      )}
    </button>
  );
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  value,
  className,
  ...props
}: TabsContentProps) {
  const { value: selectedValue } = useTabsContext();

  if (selectedValue !== value) {
    return null;
  }

  return <div className={cn("mt-4", className)} {...props} />;
}
