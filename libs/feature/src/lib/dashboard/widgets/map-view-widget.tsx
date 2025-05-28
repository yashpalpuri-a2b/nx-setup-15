'use client';

import { useState, useEffect } from 'react';
import { BaseWidget } from './base-widget';
import { GoogleMapsProvider } from '../map/google-maps-provider';
import { MapContainer, MarkerData } from '../map/map-container';

interface MapViewWidgetProps {
  apiKey: string;
  markers?: MarkerData[];
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  height?: string | number;
  className?: string;
}

export function MapViewWidget({
  apiKey,
  markers = [],
  center = { lat: -33.865143, lng: 151.209900 }, // Sydney default
  zoom = 13,
  height = '300px',
  className = '',
}: MapViewWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isApiKeyValid, setIsApiKeyValid] = useState(true);

  useEffect(() => {
    // Check if API key is valid (not the placeholder)
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      setIsApiKeyValid(false);
      setError(new Error('Google Maps API key is missing or invalid'));
      setIsLoading(false);
      return;
    }

    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [apiKey]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate checking API key again
    setTimeout(() => {
      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        setIsApiKeyValid(false);
        setError(new Error('Google Maps API key is missing or invalid'));
      }
      setIsLoading(false);
    }, 1000);
  };

  // Error handler for Google Maps
  const handleMapError = (error: Error) => {
    console.error('Google Maps error:', error);
    setError(error);
    setIsLoading(false);
  };

  return (
    <BaseWidget
      title="Map View"
      isLoading={isLoading}
      error={error}
      onRetry={handleRetry}
      className={className}
    >
      {isApiKeyValid ? (
        <div style={{ height }}>
          <GoogleMapsProvider 
            apiKey={apiKey}
          >
            <MapContainer
              height="100%"
              markers={markers}
              center={center}
              zoom={zoom}
            />
          </GoogleMapsProvider>
          <p className="mt-2 text-sm text-gray-500">
            Click on a marker to see more information.
          </p>
        </div>
      ) : (
        <div className="p-4 text-center">
          <p className="text-amber-600">Google Maps API key is not configured correctly.</p>
          <p className="text-sm text-gray-500 mt-2">
            Please check your environment variables and ensure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set properly.
          </p>
        </div>
      )}
    </BaseWidget>
  );
}

export default MapViewWidget;