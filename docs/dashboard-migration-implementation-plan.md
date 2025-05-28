# Dashboard Migration Implementation Plan

This document outlines the comprehensive implementation plan for migrating the dashboard functionality from the NextJS Google Maps project to the new multi-tenant application.

## 1. Package Installation and Initial Setup

### Required Packages

```bash
# Install Shadcn UI CLI
npm install -D @shadcn/ui

# Install Shadcn UI dependencies
npm install class-variance-authority clsx tailwind-merge lucide-react

# Install Google Maps packages
npm install @react-google-maps/api @googlemaps/js-api-loader

# Install data fetching and state management
npm install @tanstack/react-query zustand

# Install date handling
npm install date-fns

# Install UI utilities
npm install react-datepicker tailwindcss-animate

# Install table components
npm install @tanstack/react-table
```

### Shadcn UI Setup

1. Initialize Shadcn UI in the project:

```bash
npx shadcn-ui@latest init
```

2. Configure with the following options:
   - Style: Default (or match your design system)
   - Base color: Slate
   - CSS variables: Yes
   - React Server Components: No (since we need client components for Google Maps)
   - Components location: libs/ui/src/lib/components
   - Tailwind CSS config: apps/web/tailwind.config.js
   - Tailwind CSS base styles: apps/web/src/app/global.css

3. Add the necessary Shadcn UI components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add date-picker
```

## 2. Project Structure

Following the established multi-tenant architecture, we'll organize the dashboard components as follows:

```
libs/
  ├── feature/
  │   └── dashboard/
  │       ├── src/
  │       │   ├── lib/
  │       │   │   ├── dashboard-layout.tsx       # Main dashboard layout
  │       │   │   ├── sidebar/                   # Sidebar components
  │       │   │   │   ├── sidebar.tsx            # Main sidebar component
  │       │   │   │   ├── sidebar-item.tsx       # Sidebar navigation item
  │       │   │   │   └── sidebar-section.tsx    # Sidebar section
  │       │   │   ├── trips/                     # Trip management components
  │       │   │   │   ├── trips-table.tsx        # Trips table component
  │       │   │   │   ├── trip-filters.tsx       # Trip filtering component
  │       │   │   │   └── trip-details.tsx       # Trip details component
  │       │   │   └── map/                       # Map components
  │       │   │       ├── map-container.tsx      # Map container component
  │       │   │       ├── map-controls.tsx       # Map controls component
  │       │   │       └── map-markers.tsx        # Map markers component
  │       │   └── index.ts                       # Public API
  │       └── project.json                       # Nx project configuration
  ├── ui/
  │   └── src/
  │       └── lib/
  │           └── components/
  │               ├── atoms/                     # Basic UI elements
  │               │   ├── tenant-logo.tsx        # Already implemented
  │               │   └── ...
  │               ├── molecules/                 # Composite components
  │               │   ├── search-bar.tsx         # Search bar component
  │               │   ├── date-range-picker.tsx  # Date range picker
  │               │   └── ...
  │               └── organisms/                 # Complex UI sections
  │                   ├── header.tsx             # Header component
  │                   ├── data-table.tsx         # Reusable data table
  │                   └── ...
  ├── data-access/
  │   └── src/
  │       └── lib/
  │           ├── api/                           # API clients
  │           │   ├── trips-api.ts               # Trips API client
  │           │   └── ...
  │           └── store/                         # State management
  │               ├── trips-store.ts             # Trips state store
  │               ├── map-store.ts               # Map state store
  │               └── ...
  └── shared/
      └── src/
          └── lib/
              ├── types/                         # Shared types
              │   ├── trip.ts                    # Trip type definitions
              │   └── ...
              └── constants/                     # Shared constants
                  ├── routes.ts                  # Route definitions
                  └── ...
```

## 3. Application Routes

Create the following routes in the Next.js application:

```
apps/web/src/app/
  ├── (dashboard)/                   # Dashboard routes group
  │   ├── dashboard/                 # Main dashboard route
  │   │   ├── page.tsx               # Dashboard page
  │   │   └── layout.tsx             # Dashboard layout
  │   ├── trips/                     # Trips management routes
  │   │   ├── page.tsx               # Trips list page
  │   │   ├── [id]/                  # Trip details route
  │   │   │   └── page.tsx           # Trip details page
  │   │   └── layout.tsx             # Trips layout
  │   └── layout.tsx                 # Shared layout for dashboard routes
  └── layout.tsx                     # Root layout (already implemented)
```

## 4. Component Implementation

### Dashboard Layout

The dashboard layout will consist of a sidebar on the left and the main content area on the right.

```tsx
// libs/feature/dashboard/src/lib/dashboard-layout.tsx
'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar/sidebar';
import { Header } from '@nx-workspace/ui';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### Sidebar Component

```tsx
// libs/feature/dashboard/src/lib/sidebar/sidebar.tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
  ChevronRight
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`bg-primary text-primary-foreground flex flex-col h-full transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-primary/10">
        {!collapsed && <TenantLogo showName />}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 rounded-full hover:bg-primary-foreground/10"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          <SidebarItem 
            href="/dashboard" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={pathname === '/dashboard'} 
            collapsed={collapsed}
          />
          <SidebarItem 
            href="/trips" 
            icon={<Car size={20} />} 
            label="Trip Center" 
            active={pathname.startsWith('/trips')} 
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
          <SidebarItem 
            href="/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={pathname === '/settings'} 
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
```

### Sidebar Item Component

```tsx
// libs/feature/dashboard/src/lib/sidebar/sidebar-item.tsx
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
### Header Component

```tsx
// libs/ui/src/lib/components/organisms/header.tsx
'use client';

import { useState } from 'react';
import { useTheme } from '@nx-workspace/multi-tenant';
import { SearchBar } from '../molecules/search-bar';
import { DateRangePicker } from '../molecules/date-range-picker';
import { Button } from '../atoms/button';
import { 
  Filter, 
  Bell, 
  HelpCircle, 
  Settings,
  User
} from 'lucide-react';

export function Header() {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <header 
      className="border-b border-border p-4 bg-background"
      style={{ borderColor: `${theme.primaryColor}20` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SearchBar placeholder="Search trip" />
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter size={16} className="mr-2" />
              <span>Filters</span>
            </Button>
            
            <DateRangePicker 
              value={dateRange}
              onChange={setDateRange}
              startPlaceholder="From"
              endPlaceholder="To"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
```

### Search Bar Component

```tsx
// libs/ui/src/lib/components/molecules/search-bar.tsx
'use client';

import { useState } from 'react';
import { Input } from '../atoms/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ 
  placeholder = 'Search...', 
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search 
        size={18} 
        className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
      />
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 w-[300px]"
      />
    </form>
  );
}
```

### Date Range Picker Component

```tsx
// libs/ui/src/lib/components/molecules/date-range-picker.tsx
'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '../atoms/button';
import { Calendar } from '../atoms/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../atoms/popover';

interface DateRangePickerProps {
  value: [Date | null, Date | null];
  onChange: (value: [Date | null, Date | null]) => void;
  startPlaceholder?: string;
  endPlaceholder?: string;
}

export function DateRangePicker({
  value,
  onChange,
  startPlaceholder = 'Start date',
  endPlaceholder = 'End date',
}: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: value[0],
    to: value[1],
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      onChange([date.from, date.to]);
    }
  }, [date, onChange]);

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center"
          >
            <CalendarIcon size={16} className="mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yyyy')} - {format(date.to, 'dd/MM/yyyy')}
                </>
              ) : (
                format(date.from, 'dd/MM/yyyy')
              )
            ) : (
              <span>
                {startPlaceholder} - {endPlaceholder}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
```
    </li>
  );
}
### Trips Table Component

```tsx
// libs/feature/dashboard/src/lib/trips/trips-table.tsx
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Trip } from '@nx-workspace/shared';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@nx-workspace/ui';
import { Badge } from '@nx-workspace/ui';
import { Eye, Info } from 'lucide-react';

interface TripsTableProps {
  data: Trip[];
  onViewTrip?: (trip: Trip) => void;
}

export function TripsTable({ data, onViewTrip }: TripsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Trip>[] = [
    {
      accessorKey: 'date',
      header: 'Date/Time',
      cell: ({ row }) => {
        const date = new Date(row.getValue('date'));
        return (
          <div>
            <div>{format(date, 'dd/MM/yyyy')}</div>
            <div className="text-xs text-muted-foreground">
              {format(date, 'h:mm a')}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'pickup',
      header: 'Pickup',
      cell: ({ row }) => {
        const pickup = row.getValue('pickup') as { location: string, address: string };
        return (
          <div>
            <div>{pickup.location}</div>
            <div className="text-xs text-muted-foreground">{pickup.address}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'dropoff',
      header: 'Dropoff',
      cell: ({ row }) => {
        const dropoff = row.getValue('dropoff') as { location: string, address: string };
        return (
          <div>
            <div>{dropoff.location}</div>
            <div className="text-xs text-muted-foreground">{dropoff.address}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Trip status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge variant={
            status === 'Completed' ? 'default' :
            status === 'Pending' ? 'secondary' :
            'outline'
          }>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'bookingId',
      header: 'Booking #',
      cell: ({ row }) => row.getValue('bookingId'),
    },
    {
      accessorKey: 'fleet',
      header: 'Fleet',
      cell: ({ row }) => row.getValue('fleet'),
    },
    {
      accessorKey: 'driver',
      header: 'Driver details',
      cell: ({ row }) => {
        const driver = row.getValue('driver') as { name: string, id: string };
        return (
          <div>
            <div>{driver.name}</div>
            <div className="text-xs text-muted-foreground">ID: {driver.id}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'passenger',
      header: 'Passenger',
      cell: ({ row }) => row.getValue('passenger'),
    },
    {
      accessorKey: 'tickets',
      header: 'Tickets',
      cell: ({ row }) => row.getValue('tickets'),
    },
    {
      accessorKey: 'settlementStatus',
      header: 'Settlement status',
      cell: ({ row }) => {
        const status = row.getValue('settlementStatus') as string;
        return (
          <Badge variant={
            status === 'Settled' ? 'default' :
            status === 'Pending' ? 'secondary' :
            'outline'
          }>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'pricing',
      header: 'Pricing',
      cell: ({ row }) => {
        const pricing = row.getValue('pricing') as { amount: number, type: string };
        return (
          <div>
            <div>${pricing.amount.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">{pricing.type}</div>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <button 
              className="p-1 rounded-full hover:bg-muted"
              onClick={() => onViewTrip?.(row.original)}
            >
              <Eye size={16} />
            </button>
            <button className="p-1 rounded-full hover:bg-muted">
              <Info size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.header}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.columnDef.cell({ row, column: cell.column, table })}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
```

### Map Container Component

```tsx
// libs/feature/dashboard/src/lib/map/map-container.tsx
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useTheme } from '@nx-workspace/multi-tenant';

interface MapContainerProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: Array<{
    id: string;
    position: google.maps.LatLngLiteral;
    title?: string;
    icon?: string;
    info?: React.ReactNode;
  }>;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  onMarkerClick?: (markerId: string) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

export function MapContainer({
  center = { lat: -33.8688, lng: 151.2093 }, // Sydney default
  zoom = 12,
  markers = [],
  onMapClick,
  onMarkerClick,
}: MapContainerProps) {
  const theme = useTheme();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    setMap(null);
  }, []);

  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(markerId);
    if (onMarkerClick) {
      onMarkerClick(markerId);
    }
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'all',
        elementType: 'all',
        stylers: [
          { saturation: -100 },
          { lightness: 0 }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          { color: theme.primaryColor + '20' }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          { color: theme.secondaryColor + '40' }
        ]
      }
    ]
  };

  return isLoaded ? (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={mapOptions}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            icon={marker.icon}
            onClick={() => handleMarkerClick(marker.id)}
          />
        ))}
        
        {selectedMarker && (
          <InfoWindow
            position={markers.find(m => m.id === selectedMarker)?.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              {markers.find(m => m.id === selectedMarker)?.info || 
                <div>{markers.find(m => m.id === selectedMarker)?.title}</div>
              }
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      Loading Maps...
    </div>
  );
}
## 5. State Management

For state management, we'll use a hybrid approach:

1. **Server State**: React Query for data fetching, caching, and synchronization
2. **Client State**: Zustand for global application state
3. **UI State**: React Context for UI-specific state

### Trip Store (Zustand)

```tsx
// libs/data-access/src/lib/store/trips-store.ts
import { create } from 'zustand';
import { Trip } from '@nx-workspace/shared';

interface TripsState {
  trips: Trip[];
  selectedTripId: string | null;
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  setTrips: (trips: Trip[]) => void;
  selectTrip: (tripId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useTripsStore = create<TripsState>((set) => ({
  trips: [],
  selectedTripId: null,
  isLoading: false,
  error: null,
  
  setTrips: (trips) => set({ trips }),
  selectTrip: (tripId) => set({ selectedTripId: tripId }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
```

### Map Store (Zustand)

```tsx
// libs/data-access/src/lib/store/map-store.ts
import { create } from 'zustand';

interface MapState {
  center: google.maps.LatLngLiteral;
  zoom: number;
  selectedMarkerId: string | null;
  
  // Actions
  setCenter: (center: google.maps.LatLngLiteral) => void;
  setZoom: (zoom: number) => void;
  selectMarker: (markerId: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: { lat: -33.8688, lng: 151.2093 }, // Sydney default
  zoom: 12,
  selectedMarkerId: null,
  
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  selectMarker: (markerId) => set({ selectedMarkerId: markerId }),
}));
```

### API Client (React Query)

```tsx
// libs/data-access/src/lib/api/trips-api.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTenant } from '@nx-workspace/multi-tenant';
import { Trip } from '@nx-workspace/shared';

// Base API URL
const API_URL = '/api/trips';

// Helper function to include tenant ID in requests
const createHeaders = (tenantId: string) => ({
  'Content-Type': 'application/json',
  'X-Tenant-ID': tenantId,
});

// Fetch trips
export const useTrips = (filters?: Record<string, any>) => {
  const { tenant } = useTenant();
  
  return useQuery({
    queryKey: ['trips', tenant.id, filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await fetch(
        `${API_URL}?${queryParams.toString()}`,
        {
          headers: createHeaders(tenant.id),
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch trips');
      }
      
      return response.json() as Promise<Trip[]>;
    },
  });
};

// Fetch a single trip
export const useTrip = (tripId: string) => {
  const { tenant } = useTenant();
  
  return useQuery({
    queryKey: ['trip', tenant.id, tripId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/${tripId}`, {
        headers: createHeaders(tenant.id),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch trip');
      }
      
      return response.json() as Promise<Trip>;
    },
    enabled: !!tripId,
  });
};
```
```
## 6. Data Types

Define the following data types in the shared library:

```tsx
// libs/shared/src/lib/types/trip.ts
export interface Location {
  location: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Driver {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  licenseNumber?: string;
}

export interface Passenger {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface Pricing {
  amount: number;
  type: 'Fixed Price' | 'Metered';
  currency?: string;
}

export type TripStatus = 'Pending' | 'Completed' | 'Cancelled';
export type SettlementStatus = 'Pending' | 'Settled' | 'Failed';

export interface Trip {
  id: string;
  date: string;
  pickup: Location;
  dropoff: Location;
  status: TripStatus;
  bookingId: string;
  fleet: string;
  driver: Driver;
  passenger: Passenger;
  tickets: number;
  settlementStatus: SettlementStatus;
  pricing: Pricing;
  route?: google.maps.LatLngLiteral[];
  notes?: string;
  tenantId: string;
}
```

## 7. Migration Steps

Follow these steps to migrate the dashboard functionality from the NextJS Google Maps project to the new multi-tenant application:

### Step 1: Set up the Project Structure

1. Create the necessary libraries:

```bash
# Create the dashboard feature library
npx nx g @nx/next:library dashboard --directory=libs/feature/dashboard

# Create the UI components library (if not already created)
npx nx g @nx/next:library ui --directory=libs/ui

# Create the data-access library (if not already created)
npx nx g @nx/next:library data-access --directory=libs/data-access

# Create the shared library (if not already created)
npx nx g @nx/next:library shared --directory=libs/shared
```

2. Set up path aliases in `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@nx-workspace/feature/dashboard": ["libs/feature/dashboard/src/index.ts"],
      "@nx-workspace/ui": ["libs/ui/src/index.ts"],
      "@nx-workspace/data-access": ["libs/data-access/src/index.ts"],
      "@nx-workspace/shared": ["libs/shared/src/index.ts"],
      "@nx-workspace/multi-tenant": ["libs/multi-tenant/src/index.ts"]
    }
  }
}
```

### Step 2: Install Dependencies

Install all the required packages as listed in the Package Installation section.

### Step 3: Set up Shadcn UI

Follow the Shadcn UI setup instructions to initialize and add the necessary components.

### Step 4: Create Data Types

Create the shared data types in the shared library.

### Step 5: Implement State Management

Implement the Zustand stores and React Query hooks for data fetching.

### Step 6: Create UI Components

Implement the UI components in the following order:

1. Basic UI components (atoms)
2. Composite components (molecules)
3. Complex UI sections (organisms)

### Step 7: Implement Feature Components

Implement the feature components in the following order:

1. Sidebar components
2. Map components
3. Trips table components
4. Dashboard layout

### Step 8: Create Application Routes

Set up the Next.js application routes as outlined in the Application Routes section.

### Step 9: Connect to APIs

Update the API client to connect to your backend services.

### Step 10: Test and Refine

Test the application thoroughly and refine as needed.

## 8. Conclusion

This implementation plan provides a comprehensive approach to migrating the dashboard functionality from the NextJS Google Maps project to the new multi-tenant application. By following this plan, you'll create a scalable, maintainable, and feature-rich dashboard that supports multiple tenants.

The plan focuses on:

1. Using Shadcn UI and Tailwind CSS for styling
2. Implementing a clean component architecture with atomic design principles
3. Setting up efficient state management with React Query and Zustand
4. Properly integrating Google Maps
5. Supporting multi-tenancy from the beginning

By following this structured approach, you'll be able to successfully migrate the dashboard functionality while ensuring the new implementation is robust, scalable, and maintainable.