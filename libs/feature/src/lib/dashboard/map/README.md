# Google Maps Integration

This directory contains components for integrating Google Maps into the dashboard using the `@react-google-maps/api` library.

## Components

### GoogleMapsProvider

The `GoogleMapsProvider` component handles the Google Maps API key and configuration. It wraps the Google Maps components and provides the necessary context.

### MapContainer

The `MapContainer` component displays a Google Map with customizable options and markers.

### MapExample

The `MapExample` component demonstrates how to use the `GoogleMapsProvider` and `MapContainer` components together.

## Setup

### 1. API Key

To use Google Maps, you need to obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/).

1. Create a project in the Google Cloud Console
2. Enable the Google Maps JavaScript API
3. Create an API key
4. Add the API key to your environment variables

For Next.js applications, add the API key to your `.env.local` file:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_ACTUAL_API_KEY
```

### 2. Usage

#### Basic Usage

```tsx
import { GoogleMapsProvider, MapContainer } from '@nx-workspace/feature';

// In your component
function MyComponent() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  
  return (
    <GoogleMapsProvider apiKey={apiKey}>
      <MapContainer 
        height={400} 
        width="100%" 
        center={{ lat: -33.865143, lng: 151.209900 }}
        zoom={12}
      />
    </GoogleMapsProvider>
  );
}
```

#### With Markers

```tsx
import { GoogleMapsProvider, MapContainer, MarkerData } from '@nx-workspace/feature';

// In your component
function MyComponent() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  
  // Define markers
  const markers: MarkerData[] = [
    {
      id: '1',
      position: { lat: -33.865143, lng: 151.209900 },
      title: 'Sydney Opera House',
      content: (
        <div>
          <h3>Sydney Opera House</h3>
          <p>A famous landmark in Sydney</p>
        </div>
      )
    }
  ];
  
  return (
    <GoogleMapsProvider apiKey={apiKey}>
      <MapContainer 
        height={400} 
        width="100%" 
        center={{ lat: -33.865143, lng: 151.209900 }}
        zoom={12}
        markers={markers}
      />
    </GoogleMapsProvider>
  );
}
```

## Props

### GoogleMapsProvider Props

| Prop | Type | Description |
|------|------|-------------|
| apiKey | string | Google Maps API key |
| children | ReactNode | Child components |

### MapContainer Props

| Prop | Type | Description |
|------|------|-------------|
| height | string \| number | Height of the map container |
| width | string \| number | Width of the map container |
| center | LatLngLiteral | Center coordinates of the map |
| zoom | number | Zoom level of the map |
| markers | MarkerData[] | Array of markers to display on the map |

### MarkerData Interface

```tsx
interface MarkerData {
  id: string;
  position: google.maps.LatLngLiteral;
  title?: string;
  icon?: string;
  content?: React.ReactNode;
}
```

## Customization

The map appearance can be customized by modifying the `mapOptions` in the `MapContainer` component. The current implementation includes theme-based styling that uses the tenant's primary color.