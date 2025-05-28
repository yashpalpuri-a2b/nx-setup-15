'use client';

import React, { ReactNode, useState, useCallback } from 'react';
import { LoadScript, Libraries } from '@react-google-maps/api';

// Define the libraries we want to load
// https://react-google-maps-api-docs.netlify.app/#loadscript
const libraries: Libraries = ['places'];

interface GoogleMapsProviderProps {
  children: ReactNode;
  apiKey: string;
  onError?: (error: Error) => void;
}

/**
 * GoogleMapsProvider component
 *
 * This component provides the Google Maps API context to its children.
 * It handles loading the Google Maps script with the provided API key.
 *
 * @param {ReactNode} children - Child components that will use Google Maps
 * @param {string} apiKey - Google Maps API key
 * @param {Function} onError - Optional callback for handling load errors
 */
export function GoogleMapsProvider({
  children,
  apiKey,
  onError
}: GoogleMapsProviderProps) {
  const [loadError, setLoadError] = useState<Error | null>(null);

  const handleError = useCallback((error: Error) => {
    console.error('Error loading Google Maps API:', error);
    setLoadError(error);
    if (onError) {
      onError(error);
    }
  }, [onError]);

  const handleLoad = useCallback(() => {
    console.log('Google Maps API loaded successfully');
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500 p-4 text-center">
        <div>
          <p className="font-semibold">Failed to load Google Maps</p>
          <p className="text-sm mt-2">{loadError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={libraries}
      onLoad={handleLoad}
      onError={handleError}
      loadingElement={
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading Google Maps...</span>
        </div>
      }
    >
      {children}
    </LoadScript>
  );
}

export default GoogleMapsProvider;