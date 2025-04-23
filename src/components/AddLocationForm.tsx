import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Location } from '../types';

interface AddLocationFormProps {
  onAddLocation: (location: Omit<Location, 'id'>) => void;
  onClose: () => void;
  isOpen: boolean;
  nextId: number;
}

const AddLocationForm: React.FC<AddLocationFormProps> = ({ onAddLocation, onClose, isOpen, nextId }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    lat: '',
    lng: '',
    imageUrl: '',
    learnMoreUrl: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    
    if (!formData.lat.trim()) {
      newErrors.lat = 'La latitude est requise';
    } else if (isNaN(Number(formData.lat)) || Number(formData.lat) < -90 || Number(formData.lat) > 90) {
      newErrors.lat = 'La latitude doit être entre -90 et 90';
    }
    
    if (!formData.lng.trim()) {
      newErrors.lng = 'La longitude est requise';
    } else if (isNaN(Number(formData.lng)) || Number(formData.lng) < -180 || Number(formData.lng) > 180) {
      newErrors.lng = 'La longitude doit être entre -180 et 180';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'L\'URL de l\'image est requise';
    } else if (!formData.imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
      newErrors.imageUrl = 'L\'URL doit être une image valide';
    }
    
    if (formData.learnMoreUrl && !formData.learnMoreUrl.match(/^https?:\/\/.+/i)) {
      newErrors.learnMoreUrl = 'L\'URL doit être valide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddLocation({
        name: formData.name,
        title: formData.title,
        description: formData.description,
        coordinates: [Number(formData.lat), Number(formData.lng)],
        imageUrl: formData.imageUrl,
        learnMoreUrl: formData.learnMoreUrl || undefined,
        isCustom: true
      });
      
      setFormData({
        name: '',
        title: '',
        description: '',
        lat: '',
        lng: '',
        imageUrl: '',
        learnMoreUrl: ''
      });
      
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white relative max-w-md w-full rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-800">Ajouter une nouvelle étape</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nom du lieu</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="ex: Troie"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Titre</label>
              <input 
                type="text" 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="ex: Le départ"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lat" className="block text-gray-700 font-medium mb-1">Latitude</label>
                <input 
                  type="text" 
                  id="lat"
                  name="lat"
                  value={formData.lat}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.lat ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="ex: 39.9578"
                />
                {errors.lat && <p className="text-red-500 text-sm mt-1">{errors.lat}</p>}
              </div>
              
              <div>
                <label htmlFor="lng" className="block text-gray-700 font-medium mb-1">Longitude</label>
                <input 
                  type="text" 
                  id="lng"
                  name="lng"
                  value={formData.lng}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.lng ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="ex: 26.2389"
                />
                {errors.lng && <p className="text-red-500 text-sm mt-1">{errors.lng}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-1">URL de l'image</label>
              <input 
                type="text" 
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
            </div>
            
            <div>
              <label htmlFor="learnMoreUrl" className="block text-gray-700 font-medium mb-1">
                URL "En savoir plus" (optionnel)
              </label>
              <input 
                type="text" 
                id="learnMoreUrl"
                name="learnMoreUrl"
                value={formData.learnMoreUrl}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.learnMoreUrl ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="https://example.com/article"
              />
              {errors.learnMoreUrl && <p className="text-red-500 text-sm mt-1">{errors.learnMoreUrl}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Décrivez ce qui s'est passé à cet endroit..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Ajouter l'étape
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationForm;
