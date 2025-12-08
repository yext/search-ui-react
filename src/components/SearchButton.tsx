import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '../icons/MagnifyingGlassIcon';
import React from 'react';

interface Props {
  handleClick: () => void,
  className?: string
}

export function SearchButton({ handleClick, className }: Props): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <button
      className={className}
      onClick={handleClick}
      aria-label={t('submitSearch')}
    >
      <MagnifyingGlassIcon />
    </button>
  );
}