
import React from 'react';

const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 0 1-2.25 2.25H5.92a2.25 2.25 0 0 1-2.25-2.25v-4.07a2.25 2.25 0 0 1 2.25-2.25h1.5a2.25 2.25 0 0 1 2.25 2.25v.64a.75.75 0 0 0 1.5 0v-.64a2.25 2.25 0 0 1 2.25-2.25h1.5a2.25 2.25 0 0 1 2.25 2.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 21v-6.375a2.25 2.25 0 0 0-2.25-2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25V21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.375a2.25 2.25 0 0 1 2.25-2.25h10.5a2.25 2.25 0 0 1 2.25 2.25V7.5" />
    </svg>
);

export default BriefcaseIcon;
