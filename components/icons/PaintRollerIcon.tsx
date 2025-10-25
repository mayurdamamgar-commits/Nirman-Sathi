import React from 'react';

const PaintRollerIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0-6.75h3.75m-3.75 0H8.25m0 0l3.75 3.75M8.25 9.75 4.5 6m3.75 3.75-3.75-3.75m14.25 9.75-3.75-3.75m3.75 3.75-3.75 3.75M15.75 9.75l3.75 3.75m-3.75-3.75-3.75-3.75" />
        <rect x="3" y="14" width="18" height="5" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default PaintRollerIcon;