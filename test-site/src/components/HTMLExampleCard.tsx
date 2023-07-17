import { CardProps, useCardAnalyticsCallback, useCardFeedbackCallback } from '@yext/search-ui-react';
import { useCallback } from 'react';
import '../styles/resetStyles.css'

const builtInCssClasses = {
    container: 'flex flex-col justify-between border border-gray-200 rounded-lg mb-4 p-4 shadow-sm',
    header: 'flex text-neutral-dark',
    title: 'text-lg font-medium',
    thumbsFeedbackContainer: 'flex justify-end mt-4 text-sm text-gray-500 font-medium',
};

// change to the field name that contains html string
const htmlFieldName = "c_richTextV2Data";
interface CustomRawDataType {
    name: string,
    description: string
    [htmlFieldName]: any
}

function renderRichTextDescription(richTextHTML: string | undefined) {
    if ( richTextHTML )
    {
        return <div className={"reset-style"} dangerouslySetInnerHTML={{ __html: richTextHTML }} />;
    }
    return null;
}

export function HTMLExampleCard(props: CardProps<CustomRawDataType>): JSX.Element {
    const { result } = props;
    const onClickTitle = useCardAnalyticsCallback(result, 'TITLE_CLICK');
    const cardFeedbackCallback = useCardFeedbackCallback(result);
    const onClick = useCallback(() => {
        cardFeedbackCallback('THUMBS_UP');
    }, [cardFeedbackCallback]);
    return (
        <div className={builtInCssClasses.container}>
            <p className={builtInCssClasses.header}>HTML Card</p>
            <button onClick={onClickTitle} className={builtInCssClasses.title}>{result.rawData.name}</button>
            {renderRichTextDescription(result.rawData?.[htmlFieldName]?.html)}
            <button onClick={onClick} className={builtInCssClasses.thumbsFeedbackContainer}>Feedback</button>
        </div>
    );
}