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
}: Props): JSX.Element | null {

  return (
    <>
      <div
        id={instructionsId}
        className='hidden'
      >
        {instructions}
      </div>
      <div
        className='sr-only'
        key={announcementKey}
        aria-live='assertive'
      >
        {announcementText}
      </div>
    </>
  );
}
