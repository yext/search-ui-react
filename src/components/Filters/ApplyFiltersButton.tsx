import { useAnswersActions } from '@yext/answers-headless-react';

export interface ApplyFiltersButtonProps {
  /** The css classes for the button */
  className?: string
  /** The label for the button, defaults to 'Apply Filters' */
  label?: string
}

/**
 * Runs a vertical search.
 * By default has `position: sticky` styling that anchors it to the bottom of the page.
 */
export function ApplyFiltersButton({
  className = 'border border-gray-300 px-2.5 py-1 rounded-md text-primary-600 bg-white shadow-md sticky bottom-3',
  label = 'Apply Filters'
}: ApplyFiltersButtonProps): JSX.Element {
  const answersActions = useAnswersActions();

  return (
    <button
      onClick={() => answersActions.executeVerticalQuery()}
      className={className}
    >
      {label}
    </button>
  );
}