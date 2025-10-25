
import React from 'react';

const CraneIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662m14.662 0c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 1-3.7 3.7 48.656 48.656 0 0 1-7.324 0 4.006 4.006 0 0 1-3.7-3.7c.092-1.21.138-2.43.138-3.662m14.662 0h-14.662" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 16.5h16.5" />
    </svg>
);

export default CraneIcon;