'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
}

export function SidebarItem({ 
  href, 
  icon, 
  label, 
  active, 
  collapsed 
}: SidebarItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
          active 
            ? 'bg-primary-foreground/20 text-primary-foreground' 
            : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
        }`}
      >
        <span className="mr-3">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Link>
    </li>
  );
}

export default SidebarItem;