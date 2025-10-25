
import React from 'react';

const MixerIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v1.5m-5.25-1.5v1.5m-5.25-1.5v1.5m3 3.75l-1.5-1.5-1.5 1.5m6.75 0l-1.5-1.5-1.5 1.5m5.25 0l-1.5-1.5-1.5 1.5M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
);

export default MixerIcon;