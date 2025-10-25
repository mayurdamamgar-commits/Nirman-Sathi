import React from 'react';

const RebarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3.75v16.5M8.25 3.75v16.5M12 3.75v16.5M15.75 3.75v16.5M19.5 3.75v16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25h18M3 15.75h18" />
    </svg>
);

export default RebarIcon;