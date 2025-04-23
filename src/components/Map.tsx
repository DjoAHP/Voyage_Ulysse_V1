import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import { Location } from '../types';

interface MapProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
}

// Component to set view when locations change
const MapController: React.FC<{ locations: Location[] }> = ({ locations }) => {
  const map = useMap();
  
  useEffect(() => {
    if (locations.length > 0) {
      // Calculate bounds for all locations
      const bounds = locations.reduce((bounds, location) => {
        return bounds.extend([location.coordinates[0], location.coordinates[1]]);
      }, map.getBounds());
      
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);
  
  return null;
};

const Map: React.FC<MapProps> = ({ locations, onSelectLocation }) => {
  // Extract coordinates for the polyline
  const pathCoordinates = locations.map(loc => loc.coordinates);
  
  return (
    <MapContainer 
      center={[37.0, 20.0]} 
      zoom={5} 
      className="h-full w-full z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController locations={locations} />
      
      {/* Draw path between locations */}
      <Polyline 
        positions={pathCoordinates}
        color="#7e57c2"
        weight={3}
        dashArray="5, 10"
        opacity={0.7}
      />
      
      {/* Add markers for each location */}
      {locations.map(location => (
        <CustomMarker 
          key={`${location.id}-${location.name}`}
          location={location} 
          onClick={onSelectLocation}
        />
      ))}
    </MapContainer>
  );
};

export default Map;
