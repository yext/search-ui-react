import {
  FieldValueDirectAnswer as FieldValueDirectAnswerType,
  BuiltInFieldType,
  Address,
  UnknownFieldValueDirectAnswer
} from '@yext/search-headless-react';
import { useMemo } from 'react';
import { UnknownFieldTypeDisplayComponent } from './DirectAnswer';

/**
 * Props for FieldValueDirectAnswer.
 */
interface FieldValueDirectAnswerProps {
  /** A field value direct answer result. */
  result: FieldValueDirectAnswerType,
  /** Handle onClick event for "View Details" link. */
  viewDetailsClickHandler?: () => void,
  /** {@inheritDoc DirectAnswerProps.UnknownFieldTypeDisplay} */
  UnknownFieldTypeDisplay?: UnknownFieldTypeDisplayComponent,
  /** CSS classes for customizing the component styling. */
  cssClasses?: FieldValueDirectAnswerCssClasses
}

/**
 * The CSS class interface for FieldValueDirectAnswer.
 */
interface FieldValueDirectAnswerCssClasses {
  header?: string,
  body?: string,
  content?: string,
  answerContainer?: string
}

/**
 * Renders a field value direct answer provided by the Search API.
 *
 * @internal
 */
export function FieldValueDirectAnswer({
  result,
  viewDetailsClickHandler,
  UnknownFieldTypeDisplay,
  cssClasses = {}
}: FieldValueDirectAnswerProps): JSX.Element {
  const title = `${result.entityName} / ${result.fieldName}`;
  const link = result.relatedResult.link ?? result.relatedResult.rawData.landingPageUrl as string;
  const resultContent = useMemo(() => {
    return getResultContent(result, UnknownFieldTypeDisplay);
  }, [result, UnknownFieldTypeDisplay]);

  return (
    <div className={cssClasses.answerContainer}>
      {title &&
      <div className={cssClasses.header}>{title}</div>}
      <div className={cssClasses.content}>
        <div className={cssClasses.body}>{resultContent}</div>
        {link && <div className='mt-4'>
          <a href={link} className='text-primary' onClick={viewDetailsClickHandler}>
            View Details
          </a>
        </div>
        }
      </div>
    </div>
  );
}

function DefaultUnknownFieldTypeDisplay({ result }: { result: UnknownFieldValueDirectAnswer }): JSX.Element {
  let val: string | number;
  if (typeof result.value !== 'string' && typeof result.value !== 'number') {
    console.warn(`Unknown field type for direct answer with "${result.fieldApiName}" fieldApiName. Rendering result's value as a string.`
      + '\nConsider using prop "UnknownFieldTypeDisplay" in DirectAnswer component to properly render result of unknown field type.');
    val = JSON.stringify(result.value);
  } else {
    val = result.value;
  }
  return getTextJsxElement(val);
}

function getResultContent(
  result: FieldValueDirectAnswerType,
  UnknownFieldTypeDisplay: UnknownFieldTypeDisplayComponent = DefaultUnknownFieldTypeDisplay
): JSX.Element {
  switch (result.fieldType) {
    case BuiltInFieldType.InstagramHandle:
      return getAnchorTagJsxElement(`https://www.instagram.com/${result.value}`, result.value);
    case BuiltInFieldType.TwitterHandle:
      return getAnchorTagJsxElement(`https://twitter.com/${result.value}`, `@${result.value}`);
    case BuiltInFieldType.FacebookURL:
    case BuiltInFieldType.AndroidAppURL:
    case BuiltInFieldType.IOSAppURL:
      return getAnchorTagJsxElement(result.value);
    case BuiltInFieldType.ComplexURL:
      const url = result.value.url;
      const displayUrl = result.value.preferDisplayUrl ? result.value.displayUrl : url;
      return getAnchorTagJsxElement(url, displayUrl);
    case BuiltInFieldType.URL:
      return Array.isArray(result.value)
        ? getListJsxElement(result.value, url => getAnchorTagJsxElement(url))
        : getAnchorTagJsxElement(result.value);
    case BuiltInFieldType.Phone:
      return getAnchorTagJsxElement(`tel:${result.value}`, result.value);
    case BuiltInFieldType.Email:
      return getListJsxElement(result.value, e => getAnchorTagJsxElement(`mailto:${e}`, e));
    case BuiltInFieldType.Address:
      return getAddressJsxElement(result.value);
    case BuiltInFieldType.RichText:
      //TODO: SLAP-2340
      console.warn('Rendering markdown for rich text direct answer is currently not supported. Displaying the unrendered markdown string(s) as is.');
      return Array.isArray(result.value)
        ? getListJsxElement(result.value, val => getTextJsxElement(val))
        : getTextJsxElement(result.value);
    case BuiltInFieldType.Hours:
      return <div>{JSON.stringify(result.value)}</div>;
    case 'unknown':
      return <UnknownFieldTypeDisplay result={result}/>;
    default:
      return Array.isArray(result.value)
        ? getListJsxElement(result.value as (string | number)[], val => getTextJsxElement(val))
        : getTextJsxElement(result.value as string | number);
  }
}

function getListJsxElement<T>(
  list: T[],
  getItemJsxElement: (el: T) => JSX.Element
): JSX.Element {
  return (<ul className='list-disc list-inside'>
    {list.map((el, i) =>
      <li key={i}>
        {getItemJsxElement(el)}
      </li>)}
  </ul>);
}

function getTextJsxElement(text: string | number): JSX.Element {
  return <p className='whitespace-pre-wrap'>{text}</p>;
}

function getAnchorTagJsxElement(href: string, displayText?: string): JSX.Element {
  return <a href={href} className='text-primary'>{displayText ?? href}</a>;
}

function getAddressJsxElement(address: Address): JSX.Element {
  // user specified display Address in KM
  if (address.extraDescription) {
    return <div>{address.extraDescription}</div>;
  }
  const formattedCity = address.city ? address.city + ',' : '';
  const formattedCityRegionPostalCode = [formattedCity, address.region, address.postalCode].join(' ').trim();

  return <div>
    {address.line1 && <p>{address.line1}</p>}
    {address.line2 && <p>{address.line2}</p>}
    {address.line3 && <p>{address.line3}</p>}
    {formattedCityRegionPostalCode && <p>{formattedCityRegionPostalCode}</p>}
    <p>{address.countryCode}</p>
  </div>;
}
