import React, { useState } from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { DivIcon, Icon, point } from 'leaflet';
import { Location } from '../types';
import { toRoman } from '../utils/romanNumerals';

interface CustomMarkerProps {
  location: Location;
  onClick: (location: Location) => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ location, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  let imageUrl = location.imageUrl;
  if (imageError) {
    imageUrl = 'https://via.placeholder.com/40?text=Error';
  }

  const customIcon = new DivIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-container">
        <div class="marker-image">
          <img src="${imageUrl}" alt="${location.name}" onError="this.onerror=null;this.src='https://via.placeholder.com/40?text=Error';" />
        </div>
        <div class="marker-number">${toRoman(location.id)}</div>
      </div>
    `,
    iconSize: point(40, 40),
    iconAnchor: point(20, 20),
  });

  return (
    <Marker 
      position={location.coordinates} 
      icon={customIcon}
      eventHandlers={{
        click: () => onClick(location)
      }}
    >
      <Tooltip 
        direction="top" 
        offset={[0, -10]}
        opacity={1}
        permanent={false}
        className="custom-tooltip"
      >
        <div className="font-semibold">{location.name}</div>
        <div className="text-sm text-gray-600">{location.title}</div>
      </Tooltip>
    </Marker>
  );
};

export default CustomMarker;
