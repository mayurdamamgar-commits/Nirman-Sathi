import React from 'react';

const PipeWrenchIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5-7.5-7.5 7.5-7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l-3.75 3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25L11.25 12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 4.5l-1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l1.5-1.5" />
    </svg>
);

export default PipeWrenchIcon;