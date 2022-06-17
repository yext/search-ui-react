import { render, screen, within } from '@testing-library/react';
import { State } from '@yext/answers-headless-react';

import { AlternativeVerticals } from '../../src/components/AlternativeVerticals';
import { mockAnswersHooks } from '../__utils__/mocks';
import { verticalNoResults } from '../__fixtures__/data/noresults';
import { VerticalLink } from '../../src/models/verticalLink';
import { UniversalLink } from '../../src/models/universalLink';

const mockedState: Partial<State> = {
  query: {
    mostRecentSearch: 'sometext'
  },
  vertical: {
    ...verticalNoResults,
    verticalKey: 'jobs',
  },
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'vertical'
  }
};

jest.mock('@yext/answers-headless-react');

describe('AlternativeVerticals', () => {
  const verticalConfigMap = {
    faqs: { label: 'FAQs' },
    events: { label: 'Events' },
    locations: { label: 'Locations' }
  };

  const alternativeVerticalsProps = {
    currentVerticalLabel: 'Jobs',
    verticalConfigMap
  };

  beforeEach(() => {
    mockAnswersHooks({ mockedState });
  });

  it('links are formatted properly', () => {
    render(<AlternativeVerticals {...alternativeVerticalsProps}/>);
    const expectedLinkResults = {
      '/events': {
        label: 'Events',
        href: 'http://localhost/events?query=sometext'
      },
      '/faqs': {
        label: 'FAQs',
        href: 'http://localhost/faqs?query=sometext'
      },
      '/': {
        label: 'all search categories.',
        href: 'http://localhost/?query=sometext'
      }
    };

    const links = screen.getAllByRole('link');
    expect(links.map(link => (link as HTMLAnchorElement).pathname))
      .toEqual(Object.keys(expectedLinkResults));

    links.forEach(element => {
      const link = (element as HTMLAnchorElement);
      const expectedResult = expectedLinkResults[link.pathname];
      expect(within(link).getByText(expectedResult.label)).toBeDefined();
      expect(link.href).toEqual(expectedResult.href);
    });
  });

  it('getSuggestionUrl works as expected', () => {
    const getSuggestionUrl = (data: VerticalLink | UniversalLink) => {
      return data.query + '+' + ((data as VerticalLink).verticalKey ?? 'universal');
    };
    render(
      <AlternativeVerticals
        {...alternativeVerticalsProps}
        getSuggestionUrl={getSuggestionUrl}
      />
    );
    const expectedLinkHrefs = [
      'http://localhost/sometext+events',
      'http://localhost/sometext+faqs',
      'http://localhost/sometext+universal'
    ];
    const actualLinkHrefs = screen.getAllByRole('link')
      .map(link => (link as HTMLAnchorElement).href);
    expect(actualLinkHrefs).toEqual(expectedLinkHrefs);
  });

  it('an empty dom is rendered when there\'s no vertical suggestions', () => {
    mockAnswersHooks({
      mockedState: {
        ...mockedState,
        vertical: { verticalKey: 'jobs' }
      }
    });
    const { container } = render(<AlternativeVerticals {...alternativeVerticalsProps} />);
    expect(container).toBeEmptyDOMElement();
  });
});