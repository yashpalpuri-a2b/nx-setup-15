'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTheme } from '@nx-workspace/multi-tenant';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

interface MapContainerProps {
  height?: string | number;
  width?: string | number;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: MarkerData[];
  onMapError?: (error: Error) => void;
}

export interface MarkerData {
  id: string;
  position: google.maps.LatLngLiteral;
  title?: string;
  icon?: string;
  content?: React.ReactNode;
}

export function MapContainer({
  height = '100%',
  width = '100%',
  center = { lat: -33.865143, lng: 151.209900 }, // Sydney default
  zoom = 12,
  markers = [],
  onMapError
}: MapContainerProps) {
  const theme = useTheme();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<Error | null>(null);
  
  // Map options with basic controls
  const mapOptions = useMemo(() => ({
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: theme.backgroundColor }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: theme.primaryColor + '40' }]
      }
    ]
  }), [theme]);

  // Callback when map loads
  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Map loaded successfully');
    setMap(map);
    setMapLoaded(true);
    
    // Fit bounds to markers if there are any
    if (markers.length > 0 && map) {
      const bounds = new google.maps.LatLngBounds();
      markers.forEach(marker => {
        bounds.extend(marker.position);
      });
      map.fitBounds(bounds);
      
      // Don't zoom in too far
      if (map.getZoom() && map.getZoom()! > 15) {
        map.setZoom(15);
      }
    }
  }, [markers]);

  // Callback when map unmounts
  const onUnmount = useCallback(() => {
    console.log('Map unmounted');
    setMap(null);
    setMapLoaded(false);
  }, []);

  // Handle map load error
  const handleLoadError = useCallback((error: Error) => {
    console.error('Error loading map:', error);
    setMapError(error);
    if (onMapError) {
      onMapError(error);
    }
  }, [onMapError]);

  // Resize handler to make map responsive
  useEffect(() => {
    const handleResize = () => {
      if (map) {
        google.maps.event.trigger(map, 'resize');
        
        // Re-center the map
        map.setCenter(center);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map, center]);

  if (mapError) {
    return (
      <div
        className="rounded-lg overflow-hidden bg-red-50 flex items-center justify-center"
        style={{
          height,
          width,
          border: `1px solid ${theme.primaryColor}20`,
        }}
      >
        <div className="text-center p-4">
          <p className="text-red-500 font-medium">Failed to load map</p>
          <p className="text-sm text-red-400">{mapError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        height,
        width,
        border: `1px solid ${theme.primaryColor}20`,
        position: 'relative',
      }}
    >
      <GoogleMap
        mapContainerClassName="w-full h-full"
        mapContainerStyle={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {mapLoaded && (
          <>
            {/* Render markers */}
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
                icon={marker.icon}
                onClick={() => setSelectedMarker(marker)}
              />
            ))}

            {/* Info window for selected marker */}
            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  {selectedMarker.content || (
                    <div>
                      <h3 className="font-medium">{selectedMarker.title}</h3>
                      <p>Latitude: {selectedMarker.position.lat}</p>
                      <p>Longitude: {selectedMarker.position.lng}</p>
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </>
        )}
      </GoogleMap>
    </div>
  );
}

export default MapContainer;