import {render, screen} from '@testing-library/react';
import {DirectAnswerState} from '@yext/search-headless-react';
import {useAnalytics} from '../../src/hooks/useAnalytics';
import {DirectAnswer} from '../../src/components/DirectAnswer';
import {RecursivePartial, ignoreLinkClickErrors, mockAnswersState} from '../__utils__/mocks';
import {fieldValueDAState, featuredSnippetDAState} from '../__fixtures__/data/directanswers';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('@yext/search-headless-react');

jest.mock('../../src/hooks/useAnalytics', () => {
    const report = jest.fn();
    return {
        useAnalytics: () => ({report})
    };
});

it('renders null when there is no direct answer in state', () => {
    mockState({result: undefined});
    const {container} = render(<DirectAnswer/>);
    expect(container).toBeEmptyDOMElement();
});

describe('Field value direct answer analytics', () => {
    beforeEach(() => mockState(fieldValueDAState));
    runAnalyticsTestSuite();
});

describe('Featured snippet direct answer analytics', () => {
    beforeEach(() => mockState(featuredSnippetDAState));
    runAnalyticsTestSuite();
});

function runAnalyticsTestSuite() {
    it('reports link click analytics', async () => {
        render(<DirectAnswer/>);
        ignoreLinkClickErrors();
        const link = screen.getByRole('link');
        await userEvent.click(link);
        expect(useAnalytics()?.report).toHaveBeenCalledTimes(1);
        expect(useAnalytics()?.report).toHaveBeenCalledWith(expect.objectContaining(
            {
                "action": "CTA_CLICK",
                "destinationUrl": "[relatedResult.link]",
                "entity": "[relatedResult.id]",
                "locale": "en",
                "search": {
                    "experienceKey": "experienceKey",
                    "isDirectAnswer": true,
                    "isGenerativeDirectAnswer": false,
                    "queryId": "[queryId]",
                    "searchId": "searchId",
                    "verticalKey": ''
                }
            }));
    });

    it('reports THUMBS_UP feedback', async () => {
        render(<DirectAnswer/>);
        const thumbsUp = screen.queryAllByRole('button')[0];
        await userEvent.click(thumbsUp);
        expect(useAnalytics()?.report).toHaveBeenCalledTimes(1);
        expect(useAnalytics()?.report).toHaveBeenCalledWith(expect.objectContaining({
            "action": "THUMBS_UP",
            "entity": "[relatedResult.id]",
            "locale": "en",
            "search": {
                "experienceKey": "experienceKey",
                "isDirectAnswer": true,
                "isGenerativeDirectAnswer": false,
                "queryId": "[queryId]",
                "searchId": "searchId",
                "verticalKey": ''
            }
        }));
    });

    it('reports THUMBS_DOWN feedback', async () => {
        render(<DirectAnswer/>);
        const thumbsDown = screen.queryAllByRole('button')[1];
        await userEvent.click(thumbsDown);
        expect(useAnalytics()?.report).toHaveBeenCalledTimes(1);
        expect(useAnalytics()?.report).toHaveBeenCalledWith(expect.objectContaining({
                "action": "THUMBS_DOWN",
                "entity": "[relatedResult.id]",
                "locale": "en",
                "search": {
                    "experienceKey": "experienceKey",
                    "isDirectAnswer": true,
                    "isGenerativeDirectAnswer": false,
                    "queryId": "[queryId]",
                    "searchId": "searchId",
                    "verticalKey": ''
                }
            }
        ));
    });
}

function mockState(
    directAnswer: RecursivePartial<DirectAnswerState>,
    isLoading?: boolean
) {
    return mockAnswersState({
        directAnswer,
        searchStatus: {isLoading},
        vertical: {},
        query: {
            queryId: '[queryId]'
        },
        meta: {
            experienceKey: 'experienceKey',
            locale: 'en',
            uuid: 'searchId'
        },
    });
}
