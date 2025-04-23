import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Modal from './components/Modal';
import Header from './components/Header';
import AddLocationForm from './components/AddLocationForm';
import InfoModal from './components/InfoModal';
import { Location } from './types';
import { initialLocations } from './data/locations';
import './styles/map.css';

function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  // Load locations from localStorage on initial render or use default data
  useEffect(() => {
    const savedLocations = localStorage.getItem('odysseyLocations');
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations));
    } else {
      setLocations(initialLocations);
    }
    
    // Show info modal on first visit
    const hasVisited = localStorage.getItem('hasVisitedOdyssey');
    if (!hasVisited) {
      setIsInfoOpen(true);
      localStorage.setItem('hasVisitedOdyssey', 'true');
    }
  }, []);
  
  // Save locations to localStorage when they change
  useEffect(() => {
    if (locations.length > 0) {
      localStorage.setItem('odysseyLocations', JSON.stringify(locations));
    }
  }, [locations]);
  
  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };
  
  const handleAddLocation = (newLocation: Omit<Location, 'id'>) => {
    const nextId = locations.length > 0 ? Math.max(...locations.map(loc => loc.id)) + 1 : 1;
    const locationToAdd = { ...newLocation, id: nextId };
    setLocations(prev => [...prev, locationToAdd as Location]);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLocation(null), 300);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header 
        onOpenAddForm={() => setIsAddFormOpen(true)}
        onToggleInfo={() => setIsInfoOpen(true)} 
      />
      
      <main className="flex-1 relative">
        <Map 
          locations={locations} 
          onSelectLocation={handleSelectLocation} 
        />
      </main>
      
      {selectedLocation && (
        <Modal 
          location={selectedLocation} 
          onClose={closeModal}
          isOpen={isModalOpen}
        />
      )}
      
      <AddLocationForm 
        onAddLocation={handleAddLocation}
        onClose={() => setIsAddFormOpen(false)}
        isOpen={isAddFormOpen}
        nextId={locations.length > 0 ? Math.max(...locations.map(loc => loc.id)) + 1 : 1}
      />
      
      <InfoModal 
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}

export default App;
