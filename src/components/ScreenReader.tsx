import React, { useEffect, useState } from 'react';

const announcementDelayMs = 800;

interface Props {
  announcementText: string
}

export function ScreenReader({
  announcementText
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
  }, [announcementText]);

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