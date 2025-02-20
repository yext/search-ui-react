import React from 'react';

export function ThumbIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10.6667 7.33333H14.6366C15.8756 7.33333 16.6814 8.63719 16.1273 9.74536L13.2107 15.5787C12.9283 16.1433 12.3512 16.5 11.7199 16.5H8.37184C8.23557 16.5 8.09982 16.4833 7.96762 16.4502L4.83333 15.6667M10.6667 7.33333V3.16667C10.6667 2.24619 9.92047 1.5 9 1.5H8.92044C8.50414 1.5 8.16667 1.83748 8.16667 2.25377C8.16667 2.84903 7.99047 3.43096 7.66028 3.92624L4.83333 8.16667V15.6667M10.6667 7.33333H9M4.83333 15.6667H3.16667C2.24619 15.6667 1.5 14.9205 1.5 14V9C1.5 8.07953 2.24619 7.33333 3.16667 7.33333H5.25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}