'use client';

import { useState } from 'react';
import { useTheme } from '@nx-workspace/multi-tenant';
import { 
  Filter, 
  Bell, 
  HelpCircle, 
  Settings,
  User,
  Search
} from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
  actions?: React.ReactNode;
}

export function Header({ onSearch, actions }: HeaderProps) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <Search 
            size={18} 
            className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="search"
            placeholder="Search trip"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-[300px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          />
        </form>
        
        {actions}
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-muted">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-muted">
          <HelpCircle size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-muted">
          <Settings size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-muted">
          <User size={20} />
        </button>
      </div>
    </div>
  );
}

export default Header;