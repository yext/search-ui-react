interface Props {
  instructionsId: string,
  instructions: string,
  announcementKey: number,
  announcementText: string
}

export default function ScreenReader({
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
        //TODO: Investigate tailwindcss 'sr-only'
        className='absolute p-0 -m-px w-px h-px overflow-hidden whitespace-nowrap border-0'
        key={announcementKey}
        aria-live='assertive'
      >
        {announcementText}
      </div>
    </>
  );
}
