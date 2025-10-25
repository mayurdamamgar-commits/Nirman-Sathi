
import React, { useState } from 'react';
import { VENDORS, EQUIPMENT_CATEGORIES, LABOR_CATEGORIES } from '../constants';
import type { Vendor, Equipment, LaborTeam } from '../types';
import BriefcaseIcon from './icons/BriefcaseIcon';
import Spinner from './Spinner';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CraneIcon from './icons/CraneIcon';
import ExcavatorIcon from './icons/ExcavatorIcon';
import MixerIcon from './icons/MixerIcon';
import RoadRollerIcon from './icons/RoadRollerIcon';
import TruckIcon from './icons/TruckIcon';
import RebarIcon from './icons/RebarIcon';
import WoodFrameIcon from './icons/WoodFrameIcon';
import TrowelIcon from './icons/TrowelIcon';
import TileIcon from './icons/TileIcon';
import PaintRollerIcon from './icons/PaintRollerIcon';
import PipeWrenchIcon from './icons/PipeWrenchIcon';
import LightningBoltIcon from './icons/LightningBoltIcon';
import DetailsModal from './DetailsModal';

type Tab = 'materials' | 'equipment' | 'labor';
type Step = 'location' | 'phase' | 'resources';


const PHASES = [
    {
      category: '1. Substructure (Below Ground Level)',
      description: 'This is everything from the ground level down.',
      items: ['Site Clearing & Excavation', 'Foundation Footings', 'Foundation Walls / Columns', 'Plinth Beam']
    },
    {
      category: '2. Superstructure (Above Ground Level)',
      description: 'This is the visible part of the building that sits on top of the substructure.',
      items: ['Columns', 'Beams and Slab (Framing)', 'Walls', 'Staircases', 'Roof']
    },
    {
      category: '3. Finishing Works',
      description: 'After the main structure is complete, the finishing work begins.',
      items: ['Masonry and Plastering', 'MEP (Mechanical, Electrical, Plumbing)', 'Doors, Windows & Flooring', 'Painting & Fixtures']
    }
];

const ResourceHub: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('location');
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [isLocationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('materials');
  const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState<string | null>(null);
  const [selectedLaborCategory, setSelectedLaborCategory] = useState<string | null>(null);
  const [detailsItem, setDetailsItem] = useState<Vendor | Equipment | LaborTeam | null>(null);

  const handleGetLocation = () => {
    setLocationLoading(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationLoading(false);
        setCurrentStep('phase');
      },
      (error) => {
        setLocationError('Could not get location. Please enable location services and try again.');
        setLocationLoading(false);
        console.error('Geolocation error:', error);
      }
    );
  };

  const handlePhaseSelect = (phase: string) => {
    setSelectedPhase(phase);
    setCurrentStep('resources');
  };

  const resetToPhaseSelection = () => {
    setCurrentStep('phase');
    setSelectedPhase('');
  };

  const handleTabChange = (tabName: Tab) => {
    setActiveTab(tabName);
    setSelectedEquipmentCategory(null);
    setSelectedLaborCategory(null);
  };

  const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => handleTabChange(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        activeTab === tabName
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1.5">{rating.toFixed(1)}</span>
    </div>
  );
  
  const equipmentCategoryIcons: { [key: string]: React.ReactNode } = {
    "Earthmoving Equipment": <ExcavatorIcon className="w-8 h-8 text-blue-600" />,
    "Transportation": <TruckIcon className="w-8 h-8 text-blue-600" />,
    "Compaction Equipment": <RoadRollerIcon className="w-8 h-8 text-blue-600" />,
    "Concrete Equipment": <MixerIcon className="w-8 h-8 text-blue-600" />,
    "Lifting Equipment": <CraneIcon className="w-8 h-8 text-blue-600" />,
  };
  
  const laborCategoryIcons: { [key: string]: React.ReactNode } = {
      "Bar Bending & Fixing": <RebarIcon className="w-8 h-8 text-blue-600" />,
      "Shuttering & Formwork": <WoodFrameIcon className="w-8 h-8 text-blue-600" />,
      "Masonry": <TrowelIcon className="w-8 h-8 text-blue-600" />,
      "Tiling": <TileIcon className="w-8 h-8 text-blue-600" />,
      "Painting": <PaintRollerIcon className="w-8 h-8 text-blue-600" />,
      "Plumbing": <PipeWrenchIcon className="w-8 h-8 text-blue-600" />,
      "Electrical Work": <LightningBoltIcon className="w-8 h-8 text-blue-600" />,
  };


  const renderLocationStep = () => (
    <div className="text-center bg-white p-10 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Find Resources Near You</h2>
        <p className="text-gray-600 mt-2 mb-6">To find hyperlocal vendors, equipment, and labor, please share your current location.</p>
        {isLocationLoading ? <Spinner /> : (
             <button 
                onClick={handleGetLocation}
                className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md">
                Share My Location
            </button>
        )}
        {locationError && <p className="text-red-500 mt-4 text-sm">{locationError}</p>}
    </div>
  );

  const renderPhaseStep = () => (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Select Construction Phase</h1>
            <p className="text-md text-gray-500 mt-1">Choose the current phase of your project to see relevant resources.</p>
        </header>
        <div className="space-y-8">
            {PHASES.map(phaseCat => (
                <div key={phaseCat.category}>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">{phaseCat.category}</h3>
                    <p className="text-sm text-gray-500 mb-4">{phaseCat.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {phaseCat.items.map(item => (
                            <button key={item} onClick={() => handlePhaseSelect(item)} className="text-left bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-200">
                                <span className="font-medium text-gray-800">{item}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderResourcesStep = () => (
    <>
      <header className="mb-8 flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-bold text-gray-800">Resource Hub</h1>
              <p className="text-md text-gray-500 mt-1">
                  Showing resources for: <span className="font-semibold text-blue-600">{selectedPhase}</span>
              </p>
          </div>
          <button 
              onClick={resetToPhaseSelection} 
              className="flex items-center text-sm text-blue-600 hover:underline">
              <ChevronLeftIcon className="w-4 h-4 mr-1"/>
              Change Phase
          </button>
      </header>
      
      <div className="flex space-x-2 p-1 bg-white rounded-lg shadow-sm w-min mb-6">
        <TabButton tabName="materials" label="Materials" />
        <TabButton tabName="equipment" label="Equipment" />
        <TabButton tabName="labor" label="Labor" />
      </div>

      <div>
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VENDORS.map((vendor) => (
              <div key={vendor.id} className="bg-white p-5 rounded-lg shadow-md flex flex-col">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold text-gray-800">{vendor.name}</h4>
                  <StarRating rating={vendor.rating} />
                </div>
                <div className="mt-4 border-t pt-4 flex-grow">
                  <h5 className="text-sm font-medium text-gray-500 mb-2">Available Materials</h5>
                  <ul className="space-y-2">
                    {vendor.materials.map((mat) => (
                      <li key={mat.name} className="flex justify-between text-sm">
                        <span className="text-gray-700">{mat.name}</span>
                        <span className="font-medium text-gray-900">{mat.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t">
                    <button onClick={() => setDetailsItem(vendor)} className="w-full text-sm text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-50 transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'equipment' && (
           <div>
            {!selectedEquipmentCategory ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Equipment Category</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(EQUIPMENT_CATEGORIES).map(category => (
                    <button 
                      key={category} 
                      onClick={() => setSelectedEquipmentCategory(category)} 
                      className="flex flex-col items-center justify-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-200"
                    >
                      {equipmentCategoryIcons[category]}
                      <span className="font-semibold text-gray-800 mt-3">{category}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                 <div className="flex items-center mb-6">
                    <button onClick={() => setSelectedEquipmentCategory(null)} className="flex items-center text-sm text-blue-600 hover:underline mr-4">
                        <ChevronLeftIcon className="w-4 h-4 mr-1"/>
                        Back to Categories
                    </button>
                    <h3 className="text-xl font-semibold text-gray-700">{selectedEquipmentCategory}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {EQUIPMENT_CATEGORIES[selectedEquipmentCategory].map((item) => (
                    <div key={item.id} className="bg-white p-5 rounded-lg shadow-md flex flex-col">
                      <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                       <div className="mt-4 flex justify-between items-center flex-grow">
                        <span className="text-lg font-bold text-blue-600">{item.rate}</span>
                        <button className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600">Book Now</button>
                      </div>
                       <div className="mt-4 pt-4 border-t">
                         <button onClick={() => setDetailsItem(item)} className="w-full text-sm text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-50 transition-colors">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'labor' && (
           <div>
            {!selectedLaborCategory ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Trade / Skill</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(LABOR_CATEGORIES).map(category => (
                    <button 
                      key={category} 
                      onClick={() => setSelectedLaborCategory(category)} 
                      className="flex flex-col items-center justify-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-200"
                    >
                      {laborCategoryIcons[category]}
                      <span className="font-semibold text-gray-800 mt-3">{category}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                 <div className="flex items-center mb-6">
                    <button onClick={() => setSelectedLaborCategory(null)} className="flex items-center text-sm text-blue-600 hover:underline mr-4">
                        <ChevronLeftIcon className="w-4 h-4 mr-1"/>
                        Back to Trades
                    </button>
                    <h3 className="text-xl font-semibold text-gray-700">{selectedLaborCategory}</h3>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {LABOR_CATEGORIES[selectedLaborCategory].map((team) => (
                      <div key={team.id} className="bg-white p-5 rounded-lg shadow-md flex flex-col">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                    <BriefcaseIcon className="w-6 h-6 text-blue-500"/>
                                    <h4 className="text-lg font-semibold text-gray-800 ml-3">{team.trade} Team</h4>
                                </div>
                                <StarRating rating={team.rating} />
                            </div>
                            <div className="mt-4 border-t pt-4 flex justify-between items-center">
                                <p className="text-sm text-gray-600">Team Size: <span className="font-medium text-gray-800">{team.teamSize}</span></p>
                                <span className="text-lg font-bold text-blue-600">{team.rate}</span>
                            </div>
                        </div>
                         <button className="w-full mt-4 px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600">Hire Team</button>
                          <div className="mt-2 pt-2 border-t">
                            <button onClick={() => setDetailsItem(team)} className="w-full text-sm text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-50 transition-colors">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="animate-fade-in">
      {currentStep === 'location' && renderLocationStep()}
      {currentStep === 'phase' && renderPhaseStep()}
      {currentStep === 'resources' && renderResourcesStep()}

      {detailsItem && (
        <DetailsModal item={detailsItem} onClose={() => setDetailsItem(null)} />
      )}
    </div>
  );
};

export default ResourceHub;