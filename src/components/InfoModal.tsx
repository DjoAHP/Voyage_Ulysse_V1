import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white relative max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">L'Odyssée d'Ulysse</h2>
          
          <div className="prose prose-amber max-w-none">
            <p>
              L'<strong>Odyssée</strong> est l'une des plus grandes œuvres de la littérature grecque antique, 
              attribuée au poète Homère. Ce poème épique raconte le voyage de retour d'Ulysse 
              (Odysseus en grec) vers son île natale d'Ithaque après la guerre de Troie.
            </p>
            
            <p>
              Cette carte interactive vous permet de suivre l'itinéraire légendaire d'Ulysse 
              à travers la Méditerranée, un voyage qui dura dix ans et fut semé d'embûches, 
              de monstres et de prodiges.
            </p>
            
            <h3 className="text-xl font-semibold mt-4">Comment utiliser cette carte</h3>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Explorer les étapes :</strong> Cliquez sur les marqueurs pour découvrir 
                les différentes aventures d'Ulysse.
              </li>
              <li>
                <strong>Voir les détails :</strong> Pour chaque lieu, vous pouvez ouvrir une fenêtre 
                avec des informations détaillées.
              </li>
              <li>
                <strong>Ajouter vos propres étapes :</strong> Enrichissez la carte avec vos propres 
                connaissances ou interprétations du voyage d'Ulysse.
              </li>
              <li>
                <strong>Navigation :</strong> Utilisez les contrôles de zoom pour vous rapprocher 
                ou vous éloigner de la carte.
              </li>
            </ul>

            <p className="mt-4 text-sm text-gray-600 italic">
              Note : Les emplacements géographiques exacts des lieux mentionnés dans l'Odyssée 
              font l'objet de débats parmi les spécialistes. Cette carte représente une interprétation 
              possible du voyage d'Ulysse basée sur les connaissances actuelles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
