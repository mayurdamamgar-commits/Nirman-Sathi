import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center animate-fade-in">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-800">Welcome to NirmanSathi</h1>
      <p className="text-lg text-gray-500 mt-2">
        Your intelligent construction platform.
      </p>
      <p className="text-md text-gray-600 mt-8">
        Please select an option from the sidebar to get started.
      </p>
    </div>
  );
};

export default Welcome;
