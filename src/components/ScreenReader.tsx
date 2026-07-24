import React, { useEffect, useState } from 'react';

interface Props {
  announcementText: string,
  announcementDelayMs?: number
}

export function ScreenReader({
  announcementText,
  announcementDelayMs = 0
}: Props): React.JSX.Element {
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
  }, [announcementDelayMs, announcementText]);

  return (
    <div
      className='sr-only'
      role='status'
      aria-live='polite'
      aria-atomic='true'
    >
      {renderedAnnouncement}
    </div>
  );
}
