
import React from 'react';

const RoadRollerIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-8.25V15M12 4.5A.75.75 0 0 1 12.75 3h.5A.75.75 0 0 1 14 3.75v1.5c0 .414-.336.75-.75.75h-1.5A.75.75 0 0 1 11 6V4.5a.75.75 0 0 1 1-1.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM12 19.5h.008v.008H12v-.008Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
);

export default RoadRollerIcon;