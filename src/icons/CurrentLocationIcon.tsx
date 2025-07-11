import React from 'react';

export function CurrentLocationIcon(): JSX.Element {
  return (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="2" x2="5" y1="12" y2="12"/>
      <line x1="19" x2="22" y1="12" y2="12"/>
      <line x1="12" x2="12" y1="2" y2="5"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
      <circle cx="12" cy="12" r="7"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

