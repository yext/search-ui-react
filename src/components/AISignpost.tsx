import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useId } from '../hooks/useId';
import { AISignpostIcon } from '../icons/AISignpostIcon';
import { CloseIcon } from '../icons/CloseIcon';

/**
 * Props for the built-in AI signpost component.
 *
 * @public
 */
export interface AISignpostProps {
  /** Icon displayed before the signpost label. Defaults to the SDK's AI signpost icon. */
  icon?: React.JSX.Element,
  /** Label displayed in the signpost button. */
  label?: string,
  /** Header displayed in the signpost popover. */
  popoverHeader?: string,
  /** Body displayed in the signpost popover. */
  popoverBody?: string
}

interface InternalAISignpostProps {
  icon?: React.JSX.Element,
  label?: string,
  ariaLabel: string,
  popoverHeader: string,
  popoverBody: string,
  popoverAlignment?: 'left' | 'right'
}

/**
 * Displays AI signpost content.
 */
export function AISignpost({
  icon,
  label,
  ariaLabel,
  popoverHeader,
  popoverBody,
  popoverAlignment = 'left'
}: InternalAISignpostProps): React.JSX.Element {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverId = useId('ai-signpost-popover');
  const popoverHeaderId = useId('ai-signpost-popover-header');
  const popoverDescriptionId = useId('ai-signpost-popover-description');
  const handleSignpostClick = useCallback(() => {
    setIsOpen(current => !current);
  }, []);
  const onSignpostClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const popoverAlignmentClass = popoverAlignment === 'right' ? 'right-0' : 'left-0';

  return (
    <div className='relative text-sm text-gray-700'>
      <button
        type='button'
        aria-expanded={isOpen}
        aria-controls={popoverId}
        aria-label={ariaLabel}
        className='inline-flex gap-1.5 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-1.5 h-8 min-w-8 text-sm font-medium text-gray-700 transition-colors hover:bg-slate-100'
        onClick={handleSignpostClick}
      >
        {icon ?? <AISignpostIcon className='h-4 w-4' />}
        {label && <span>{label}</span>}
      </button>
      {isOpen && (
        <div
          id={popoverId}
          role='dialog'
          aria-labelledby={popoverHeaderId}
          aria-describedby={popoverDescriptionId}
          className={`absolute ${popoverAlignmentClass} top-full z-10 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg`}
        >
          <div className='flex flex-col px-4 py-3 gap-3'>
            <div className='flex items-center justify-between'>
              <div id={popoverHeaderId} className='text-sm font-semibold text-gray-900'>
                {popoverHeader}
              </div>
              <button
                type='button'
                className='inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                aria-label={t('dismiss')}
                onClick={onSignpostClose}
              >
                <CloseIcon className='h-3 w-3' />
              </button>
            </div>
            <div id={popoverDescriptionId} className='text-sm text-gray-700'>
              {popoverBody}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
