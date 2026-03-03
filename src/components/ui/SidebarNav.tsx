import { Link, useLocation } from "react-router";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: string | number;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <SidebarNavItem
            key={item.path}
            to={item.path}
            icon={Icon}
            isActive={isActive}
            badge={item.badge}
          >
            {item.label}
          </SidebarNavItem>
        );
      })}
    </nav>
  );
}

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  isActive?: boolean;
  badge?: string | number;
  children: React.ReactNode;
}

export function SidebarNavItem({
  to,
  icon: Icon,
  isActive,
  badge,
  children,
}: SidebarNavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "bg-surface-elevated text-text-primary"
          : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 flex-shrink-0 transition-colors",
          isActive ? "text-accent" : "text-text-tertiary group-hover:text-text-secondary"
        )}
      />
      <span className="flex-1">{children}</span>
      {badge && (
        <span
          className={cn(
            "px-2 py-0.5 text-xs font-medium rounded-full",
            isActive
              ? "bg-accent text-text-on-accent"
              : "bg-surface-elevated text-text-secondary"
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

interface SidebarNavGroupProps {
  title: string;
  children: React.ReactNode;
}

export function SidebarNavGroup({ title, children }: SidebarNavGroupProps) {
  return (
    <div className="space-y-2">
      <h4 className="px-3 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
        {title}
      </h4>
      {children}
    </div>
  );
}
