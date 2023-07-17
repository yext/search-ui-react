import { CardProps, useCardAnalyticsCallback, useCardFeedbackCallback } from '@yext/search-ui-react';
import { useCallback } from 'react';
import '../styles/resetStyles.css'
import MDEditor from "@uiw/react-md-editor";



const builtInCssClasses = {
    container: 'flex flex-col justify-between border border-gray-200 rounded-lg mb-4 p-4 shadow-sm',
    header: 'flex text-neutral-dark',
    title: 'text-lg font-medium',
    thumbsFeedbackContainer: 'flex justify-end mt-4 text-sm text-gray-500 font-medium',
};


const markdownFieldName  = "c_markdownData";

interface CustomRawDataType {
    name: string,
    description: string,
    [markdownFieldName]: any
}

export function MarkdownExampleCard(props: CardProps<CustomRawDataType>): JSX.Element {
    const { result } = props;
    const onClickTitle = useCardAnalyticsCallback(result, 'TITLE_CLICK');
    const cardFeedbackCallback = useCardFeedbackCallback(result);
    const onClick = useCallback(() => {
        cardFeedbackCallback('THUMBS_UP');
    }, [cardFeedbackCallback]);

    return (
        <div className={`${builtInCssClasses.container} `}>
            <p className={builtInCssClasses.header}>Markdown Render Card</p>
            <button onClick={onClickTitle} className={builtInCssClasses.title}>{result.rawData.name}</button>
            <div className="container reset-style" data-color-mode="light">
                <MDEditor.Markdown source={result.rawData?.[markdownFieldName]?.markdown} />
            </div>
            <button onClick={onClick} className={builtInCssClasses.thumbsFeedbackContainer}>Feedback</button>
        </div>
    );
}