import { cleanup, render, screen } from '@testing-library/react';
import { FieldValueDirectAnswer } from '../../src/components/FieldValueDirectAnswer';
import { Address, BuiltInFieldType, FieldValueDirectAnswer as FieldValueDirectAnswerType, Source } from '@yext/search-headless-react';
import { userEvent } from '@storybook/testing-library';
import { fieldValueDAState } from '../__fixtures__/data/directanswers';

const fieldValueDAResult = fieldValueDAState.result as FieldValueDirectAnswerType;

describe('FieldValue direct answer', () => {

  it('executes viewDetailsClickHandler when click on "View Details" link', () => {
    const viewDetailsClickHandler = jest.fn();
    render(<FieldValueDirectAnswer
      result={fieldValueDAResult}
      viewDetailsClickHandler={viewDetailsClickHandler}/>
    );
    userEvent.click(screen.getByRole('link', { name: 'View Details' }));
    expect(viewDetailsClickHandler).toHaveBeenCalledTimes(1);
  });

  it('use relatedResult.link url for "View Details" link', () => {
    render(<FieldValueDirectAnswer result={fieldValueDAResult} />);
    expect(screen.getByRole('link', { name: 'View Details' })).toHaveAttribute('href', '[relatedResult.link]');
  });

  it('uses landingPageUrl as fallback url for "View Details" link', () => {
    render(<FieldValueDirectAnswer
      result={{
        ...fieldValueDAResult,
        relatedResult: {
          rawData: {
            landingPageUrl: '[landingPageUrl]'
          },
          source: Source.KnowledgeManager
        }
      }}
    />);
    expect(screen.getByRole('link', { name: 'View Details' })).toHaveAttribute('href', '[landingPageUrl]');
  });

  it('contains proper url href for simple URL field types', () => {
    const urlTypes = [
      BuiltInFieldType.IOSAppURL,
      BuiltInFieldType.AndroidAppURL,
      BuiltInFieldType.FacebookURL,
      BuiltInFieldType.URL
    ];
    urlTypes.forEach((fieldType) => {
      const value = `https://www.${fieldType}.com/`;
      const result = { ...fieldValueDAResult, fieldType, value } as FieldValueDirectAnswerType;
      render(<FieldValueDirectAnswer result={result}/>);
      expect(screen.getByRole('link', { name: value })).toHaveAttribute('href', value);
      cleanup();
    });
  });

  it('contains proper url href for field type "InstagramHandle"', () => {
    const result = {
      ...fieldValueDAResult,
      fieldType: BuiltInFieldType.InstagramHandle
    } as FieldValueDirectAnswerType;
    render(<FieldValueDirectAnswer result={result}/>);
    expect(screen.getByRole('link', { name: '[value]' }))
      .toHaveAttribute('href', 'https://www.instagram.com/[value]');
  });

  it('contains proper url href for field type "TwitterHandle"', () => {
    const result = {
      ...fieldValueDAResult,
      fieldType: BuiltInFieldType.TwitterHandle
    } as FieldValueDirectAnswerType;
    render(<FieldValueDirectAnswer result={result}/>);
    expect(screen.getByRole('link', { name: '@[value]' }))
      .toHaveAttribute('href', 'https://twitter.com/[value]');
  });

  it('contains proper url href for field type "ComplexURL"', () => {
    const result = {
      ...fieldValueDAResult,
      fieldType: BuiltInFieldType.ComplexURL,
      value: {
        url: '[url]',
        displayUrl: '[preferUrl]',
        preferDisplayUrl: false,
      }
    } as FieldValueDirectAnswerType;
    render(<FieldValueDirectAnswer result={result}/>);
    expect(screen.getByRole('link', { name: '[url]' }))
      .toHaveAttribute('href', '[url]');
  });

  it('displays the preferred displayUrl for field type "ComplexURL"', () => {
    const result = {
      ...fieldValueDAResult,
      fieldType: BuiltInFieldType.ComplexURL,
      value: {
        url: '[url]',
        displayUrl: '[preferUrl]',
        preferDisplayUrl: true,
      }
    } as FieldValueDirectAnswerType;
    render(<FieldValueDirectAnswer result={result}/>);
    expect(screen.getByRole('link', { name: '[preferUrl]' }))
      .toHaveAttribute('href', '[url]');
  });

  it('contains proper url href for field type "Phone"', () => {
    const result = {
      ...fieldValueDAResult,
      fieldType: BuiltInFieldType.Phone,
      value: '123-456-7890'
    } as FieldValueDirectAnswerType;
    render(<FieldValueDirectAnswer result={result}/>);
    expect(screen.getByRole('link', { name: '123-456-7890' }))
      .toHaveAttribute('href', 'tel:123-456-7890');
  });

  it('contains proper url href for field type "Email"', () => {
    const result = {
      ...fieldValueDAResult,
      fieldType: BuiltInFieldType.Email,
      value: [
        'email1@yext.com',
        'email2@yext.com'
      ]
    } as FieldValueDirectAnswerType;
    render(<FieldValueDirectAnswer result={result}/>);
    expect(screen.getByRole('link', { name: 'email1@yext.com' }))
      .toHaveAttribute('href', 'mailto:email1@yext.com');
    expect(screen.getByRole('link', { name: 'email2@yext.com' }))
      .toHaveAttribute('href', 'mailto:email2@yext.com');
  });

  it('displays the preferred address for field type "Address"', () => {
    const extraDescription = 'This is the preferred address to display';
    const address: Address = {
      line1: '61 Ninth Avenue',
      line2: '14th Floor',
      city: 'New York',
      region: 'NY',
      postalCode: '10011',
      countryCode: 'US',
      extraDescription
    };
    const result = {
      ...fieldValueDAResult,
      fieldType: BuiltInFieldType.Address,
      value: address
    } as FieldValueDirectAnswerType;
    render(<FieldValueDirectAnswer result={result}/>);
    expect(screen.getByText(extraDescription)).toBeDefined();
  });
});