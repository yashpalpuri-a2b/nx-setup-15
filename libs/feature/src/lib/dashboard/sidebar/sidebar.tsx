'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { TenantLogo } from '@nx-workspace/ui';
import { SidebarItem } from './sidebar-item';
import {
  LayoutDashboard,
  Car,
  Calendar,
  Clock,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart,
  User
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  
  // Memoize the toggle function to prevent it from being recreated on each render
  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  return (
    <div 
      className={`bg-primary text-primary-foreground flex flex-col h-full transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-primary/10">
        {!collapsed && <TenantLogo showName />}
        <button
          onClick={toggleCollapsed}
          className="p-2 rounded-full hover:bg-primary-foreground/10"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {/* Main Navigation */}
          <li className="px-3 py-2 text-xs font-semibold text-primary-foreground/50 uppercase">
            {!collapsed && "Main"}
          </li>
          <SidebarItem
            href="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={pathname === '/dashboard'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/dashboard/users"
            icon={<Users size={20} />}
            label="Users"
            active={pathname === '/dashboard/users'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/dashboard/reports"
            icon={<BarChart size={20} />}
            label="Reports"
            active={pathname === '/dashboard/reports'}
            collapsed={collapsed}
          />
          
          {/* Trip Management */}
          <li className="mt-6 px-3 py-2 text-xs font-semibold text-primary-foreground/50 uppercase">
            {!collapsed && "Trip Management"}
          </li>
          <SidebarItem
            href="/trips"
            icon={<Car size={20} />}
            label="Trip Center"
            active={pathname.startsWith('/trips') && !pathname.includes('/completed') && !pathname.includes('/inactive')}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/bookings/new"
            icon={<Calendar size={20} />}
            label="New bookings"
            active={pathname === '/bookings/new'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/bookings/current"
            icon={<Clock size={20} />}
            label="Current bookings"
            active={pathname === '/bookings/current'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/bookings/upcoming"
            icon={<Calendar size={20} />}
            label="Upcoming bookings"
            active={pathname === '/bookings/upcoming'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/trips/completed"
            icon={<Clock size={20} />}
            label="Completed trips"
            active={pathname === '/trips/completed'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/trips/inactive"
            icon={<Clock size={20} />}
            label="Inactive trips"
            active={pathname === '/trips/inactive'}
            collapsed={collapsed}
          />
          
          {/* Fleet Management */}
          <li className="mt-6 px-3 py-2 text-xs font-semibold text-primary-foreground/50 uppercase">
            {!collapsed && "Fleet Management"}
          </li>
          <SidebarItem
            href="/vehicles"
            icon={<Car size={20} />}
            label="Vehicles"
            active={pathname === '/vehicles'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/drivers"
            icon={<Users size={20} />}
            label="Drivers"
            active={pathname === '/drivers'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/operators"
            icon={<Users size={20} />}
            label="Operators"
            active={pathname === '/operators'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/robotaxis"
            icon={<Car size={20} />}
            label="Robotaxis"
            active={pathname === '/robotaxis'}
            collapsed={collapsed}
          />
          
          {/* Customer Management */}
          <li className="mt-6 px-3 py-2 text-xs font-semibold text-primary-foreground/50 uppercase">
            {!collapsed && "Customer Management"}
          </li>
          <SidebarItem
            href="/accounts"
            icon={<Users size={20} />}
            label="Accounts"
            active={pathname === '/accounts'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/passengers"
            icon={<Users size={20} />}
            label="Passengers"
            active={pathname === '/passengers'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/calls"
            icon={<Users size={20} />}
            label="Calls"
            active={pathname === '/calls'}
            collapsed={collapsed}
          />
          
          {/* Settings & Profile */}
          <li className="mt-6 px-3 py-2 text-xs font-semibold text-primary-foreground/50 uppercase">
            {!collapsed && "Settings"}
          </li>
          <SidebarItem
            href="/dashboard/settings"
            icon={<Settings size={20} />}
            label="Settings"
            active={pathname === '/dashboard/settings'}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/dashboard/profile"
            icon={<User size={20} />}
            label="Profile"
            active={pathname === '/dashboard/profile'}
            collapsed={collapsed}
          />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-primary/10 text-xs">
        {!collapsed && (
          <div>
            <p>Powered by Phoenix Pro</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;