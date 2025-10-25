
import React from 'react';
import { INTERIOR_DESIGNERS } from '../constants';

const BuildingInteriors: React.FC = () => {

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

  return (
    <div className="animate-fade-in">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Building Interiors</h1>
        <p className="text-lg text-gray-500 mt-2">Discover verified interior designers to bring your vision to life.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {INTERIOR_DESIGNERS.map(designer => (
          <div key={designer.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img src={designer.imageUrl} alt={designer.name} className="w-full h-40 object-cover" />
            
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-md font-bold text-gray-800">{designer.name}</h3>
                    <StarRating rating={designer.rating} />
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                    {designer.specialties.map(spec => (
                    <span key={spec} className="px-2 py-1 bg-gray-100 text-gray-700 text-[10px] font-medium rounded-full">
                        {spec}
                    </span>
                    ))}
                </div>

                <div className="mt-auto">
                    <button className="w-full bg-blue-500 text-white font-semibold py-2 px-3 text-sm rounded-lg hover:bg-blue-600 transition-colors duration-300">
                        View Portfolio
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingInteriors;
