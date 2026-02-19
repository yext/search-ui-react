import React from 'react';

interface Props {
  instructionsId?: string,
  instructions: string,
  announcementKey: number,
  announcementText: string
}

export function ScreenReader({
  instructionsId,
  instructions,
  announcementKey,
  announcementText,
}: Props): React.JSX.Element | null {

  return (
    <>
      <div
        id={instructionsId}
        className='sr-only'
      >
        {instructions}
      </div>
      <div
        className='sr-only'
        key={announcementKey}
        aria-live='polite'
        aria-atomic='true'
      >
        {announcementText}
      </div>
    </>
  );
}
