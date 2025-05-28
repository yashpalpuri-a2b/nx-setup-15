'use client';

import React from 'react';
import { GoogleMapsProvider } from './google-maps-provider';
import { MapContainer, MarkerData } from './map-container';

interface MapExampleProps {
  apiKey: string;
}

/**
 * MapExample component
 * 
 * This is a sample implementation of the Google Maps integration.
 * It demonstrates how to use the GoogleMapsProvider and MapContainer components.
 * 
 * @param {string} apiKey - Google Maps API key
 */
export function MapExample({ apiKey }: MapExampleProps) {
  // Sample marker data
  const sampleMarkers: MarkerData[] = [
    {
      id: '1',
      position: { lat: -33.865143, lng: 151.209900 },
      title: 'Sydney Opera House',
      content: (
        <div className="p-2">
          <h3 className="font-bold text-lg">Sydney Opera House</h3>
          <p className="text-sm">A famous performing arts center in Sydney, Australia.</p>
          <a 
            href="https://www.sydneyoperahouse.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Visit website
          </a>
        </div>
      )
    },
    {
      id: '2',
      position: { lat: -33.856784, lng: 151.215297 },
      title: 'Sydney Harbour Bridge',
      content: (
        <div className="p-2">
          <h3 className="font-bold text-lg">Sydney Harbour Bridge</h3>
          <p className="text-sm">A steel through arch bridge across Sydney Harbour.</p>
        </div>
      )
    }
  ];

  return (
    <GoogleMapsProvider apiKey={apiKey}>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Google Maps Example</h2>
        
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">Map with Markers</h3>
          <MapContainer 
            height={400} 
            markers={sampleMarkers}
            center={{ lat: -33.865143, lng: 151.209900 }}
            zoom={13}
          />
          <p className="mt-2 text-sm text-gray-500">
            Click on a marker to see more information.
          </p>
        </div>
      </div>
    </GoogleMapsProvider>
  );
}

export default MapExample;