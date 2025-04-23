import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Location } from '../types';
import { toRoman } from '../utils/romanNumerals';

interface ModalProps {
  location: Location;
  onClose: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ location, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-parchment relative max-w-lg w-full rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#f5f1e4',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/parchment.png")'
        }}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-800">
                <img 
                  src={location.imageUrl} 
                  alt={location.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white font-semibold">
                {toRoman(location.id)}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-amber-900">{location.title}</h2>
              <h3 className="text-lg text-amber-700">{location.name}</h3>
              <p className="text-sm text-gray-600">
                Coordonnées: {location.coordinates[0].toFixed(4)}, {location.coordinates[1].toFixed(4)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 border-t border-amber-200 pt-4">
            <p className="text-gray-800 leading-relaxed">{location.description}</p>
            
            {location.learnMoreUrl && (
              <a
                href={location.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 transition-colors"
              >
                En savoir plus <ExternalLink size={16} />
              </a>
            )}
          </div>
          
          {location.isCustom && (
            <div className="mt-4 text-sm text-gray-500 italic">
              Étape personnalisée
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
