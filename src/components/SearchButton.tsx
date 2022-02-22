import { MagnifyingGlassIcon } from '../icons/MagnifyingGlassIcon';

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