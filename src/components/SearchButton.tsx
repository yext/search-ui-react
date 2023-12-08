import { MagnifyingGlassIcon } from '../icons/MagnifyingGlassIcon';
import React from 'react';

interface Props {
  handleClick: () => void,
  className?: string
}

export function SearchButton({ handleClick, className }: Props): JSX.Element {
  return (
    <button
      className={className}
      onClick={handleClick}
      aria-label='Submit Search'
    >
      <MagnifyingGlassIcon />
    </button>
  );
}