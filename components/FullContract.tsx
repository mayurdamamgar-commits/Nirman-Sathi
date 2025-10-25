
import React from 'react';
import { CONTRACTORS } from '../constants';

const FullContract: React.FC = () => {

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-2">{rating.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Full Building Contracts</h1>
        <p className="text-lg text-gray-500 mt-2">Find and connect with top-rated, verified contractors for your end-to-end project needs.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CONTRACTORS.map(contractor => (
          <div key={contractor.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{contractor.name}</h3>
              <StarRating rating={contractor.rating} />
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {contractor.specialties.map(spec => (
                  <span key={spec} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6">
                <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Contact Now
                </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default FullContract;
