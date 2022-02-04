import '../sass/ScreenReader.scss';

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
        className='ScreenReader__instructions'
      >
        {instructions}
      </div>
      <div
        className='ScreenReader__announcementText'
        key={announcementKey}
        aria-live='assertive'
      >
        {announcementText}
      </div>
    </>
  );
};
