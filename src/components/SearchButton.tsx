import LoadingIndicator from './LoadingIndicator';
import { ReactComponent as MagnifyingGlassIcon } from '../icons/magnifying_glass.svg';

interface Props {
  handleClick: () => void,
  isLoading: boolean,
  className?: string
}

export default function SearchButton ({ handleClick, isLoading, className }: Props) {
  return (
    <button
      className={className}
      onClick={handleClick}
      aria-label='Submit Search'
    >
      {isLoading
        ? <LoadingIndicator />
        : <MagnifyingGlassIcon />}
    </button>
  )
}