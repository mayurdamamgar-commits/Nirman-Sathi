
import React from 'react';
import type { Vendor, Equipment, LaborTeam } from '../types';
import XIcon from './icons/XIcon';

interface DetailsModalProps {
  item: Vendor | Equipment | LaborTeam;
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ item, onClose }) => {
  // Type guards to determine the item type
  const isVendor = (item: any): item is Vendor => 'materials' in item;
  const isEquipment = (item: any): item is Equipment => 'specs' in item;
  const isLaborTeam = (item: any): item is LaborTeam => 'teamLeader' in item;

  const renderContent = () => {
    if (isVendor(item)) {
      return (
        <>
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-gray-700 mb-2">Contact Details</h4>
            <p className="text-sm text-gray-600"><strong>Contact Person:</strong> {item.contactPerson}</p>
            <p className="text-sm text-gray-600"><strong>Phone:</strong> {item.phoneNumber}</p>
          </div>
        </>
      );
    }
    if (isEquipment(item)) {
      return (
        <>
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-gray-700 mb-2">Specifications</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {item.specs.map((spec, i) => <li key={i}>{spec}</li>)}
            </ul>
            <p className="text-sm text-gray-600 mt-3"><strong>Operator Included:</strong> {item.operatorIncluded ? 'Yes' : 'No'}</p>
          </div>
        </>
      );
    }
    if (isLaborTeam(item)) {
      return (
        <>
          <h3 className="text-xl font-semibold text-gray-800">{item.trade} Team</h3>
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-gray-700 mb-2">Team Details</h4>
            <p className="text-sm text-gray-600"><strong>Team Leader:</strong> {item.teamLeader}</p>
            <p className="text-sm text-gray-600"><strong>Contact Number:</strong> {item.contactNumber}</p>
            <p className="text-sm text-gray-600"><strong>Team Size:</strong> {item.teamSize} members</p>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <XIcon className="w-6 h-6" />
        </button>
        {renderContent()}
        <button 
          onClick={onClose} 
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsModal;