import React from 'react';

const TileIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75h18M3 12h18m-9 5.25h9M3 17.25h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 3v18" />
    </svg>
);

export default TileIcon;