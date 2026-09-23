import React, { useEffect, useState } from 'react';

const announcementDelayMs = 800;

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
  const [renderedAnnouncement, setRenderedAnnouncement] = useState('');

  useEffect(() => {
    setRenderedAnnouncement('');
    if (!announcementText) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setRenderedAnnouncement(announcementText);
    }, announcementDelayMs);
    return () => clearTimeout(timeoutId);
  }, [announcementText]);

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
        {renderedAnnouncement}
      </div>
    </>
  );
}
