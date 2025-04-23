import React from 'react';
import { Plus, Info } from 'lucide-react';

interface HeaderProps {
  onOpenAddForm: () => void;
  onToggleInfo: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAddForm, onToggleInfo }) => {
  return (
    <header className="bg-gradient-to-r from-amber-800 to-amber-950 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Le Voyage d'Ulysse
          </h1>
          <p className="text-amber-200 italic">
            L'Odyssée à travers la Méditerranée antique
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={onToggleInfo}
            className="flex items-center gap-2 px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-md transition-colors duration-200"
          >
            <Info size={18} />
            <span>À propos</span>
          </button>
          
          <button 
            onClick={onOpenAddForm}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors duration-200"
          >
            <Plus size={18} />
            <span>Ajouter une étape</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
