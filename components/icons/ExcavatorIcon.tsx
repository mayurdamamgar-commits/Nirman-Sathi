
import React from 'react';

const ExcavatorIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 15.5l-6-6m0 0l-3 3m3-3l3.75-3.75M9.5 12l-6 6M3 21h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    </svg>
);

export default ExcavatorIcon;