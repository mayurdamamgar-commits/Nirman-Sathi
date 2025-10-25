import React from 'react';

const TrowelIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21v-5.25M7.5 21v-5.25m-3 0h3m4.5 0v5.25m-3-5.25h3m4.5 0v5.25m-3-5.25h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.75l-4.5 4.5h9l-4.5-4.5zM12.75 3.75v9" />
    </svg>
);

export default TrowelIcon;