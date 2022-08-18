import {
  FieldValueDirectAnswer as FieldValueDirectAnswerType,
  BuiltInFieldType,
  Address
} from '@yext/search-headless-react';
import { useMemo } from 'react';

/**
 * Props for FieldValueDirectAnswer.
 */
interface FieldValueDirectAnswerProps {
  /** A field value direct answer result. */
  result: FieldValueDirectAnswerType,
  /** Handle onClick event for "View Details" link. */
  viewDetailsClickHandler?: () => void,
  /** CSS classes for customizing the component styling. */
  cssClasses?: FieldValueDirectAnswerCssClasses
}

/**
 *  The CSS class interface for FieldValueDirectAnswer.
 */
interface FieldValueDirectAnswerCssClasses {
  header?: string,
  body?: string,
  content?: string,
  answerContainer?: string
}

/**
 * Renders a field value direct answer provided by the Search API.
 */
export function FieldValueDirectAnswer({
  result,
  viewDetailsClickHandler,
  cssClasses = {}
}: FieldValueDirectAnswerProps): JSX.Element {
  const title = `${result.entityName} / ${result.fieldName}`;
  const link = result.relatedResult.link;
  const description = useMemo(() => getResultContent(result), [result]);

  return (
    <div className={cssClasses.answerContainer}>
      {title &&
      <div className={cssClasses.header}>{title}</div>}
      <div className={cssClasses.content}>
        <div className={cssClasses.body}>{description}</div>
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

function getResultContent(result: FieldValueDirectAnswerType): JSX.Element {
  switch (result.fieldType) {
    case BuiltInFieldType.InstagramHandle:
      return getUrlJsxElement(`https://www.instagram.com/${result.value}`, result.value);
    case BuiltInFieldType.TwitterHandle:
      return getUrlJsxElement(`https://twitter.com/${result.value}`, `@${result.value}`);
    case BuiltInFieldType.FacebookURL:
    case BuiltInFieldType.AndroidAppURL:
    case BuiltInFieldType.IOSAppURL:
      return getUrlJsxElement(result.value);
    case BuiltInFieldType.ComplexURL:
      const url = result.value.url;
      const displayUrl = result.value.preferDisplayUrl ? result.value.displayUrl : url;
      return getUrlJsxElement(url, displayUrl);
    case BuiltInFieldType.URL:
      return Array.isArray(result.value)
        ? getListJsxElement(result.value, url => getUrlJsxElement(url))
        : getUrlJsxElement(result.value);
    case BuiltInFieldType.Phone:
      return getUrlJsxElement(`tel:${result.value}`, result.value);
    case BuiltInFieldType.Email:
      return getListJsxElement(result.value, e => getUrlJsxElement(`mailto:${e}`, e));
    case BuiltInFieldType.Address:
      return getAddressJsxElement(result.value);
    case BuiltInFieldType.RichText:
      return <div>rich text</div>; //TODO: use react-markdown
    case 'unknown':
      return <div>unknown</div>; //TODO: SLAP-2337
    default:
      return Array.isArray(result.value)
        ? getListJsxElement(result.value, val => <p className='whitespace-pre-wrap'>{val}</p>)
        : <p className='whitespace-pre-wrap'>{result.value}</p>;
  }
}

function getListJsxElement<T>(
  value: T[],
  getItemJsxElement: (el: T) => JSX.Element
): JSX.Element {
  return (<ul className='list-disc list-inside'>
    {value.map((el, i) =>
      <li key={i}>
        {getItemJsxElement(el)}
      </li>)}
  </ul>);
}

function getUrlJsxElement(href: string, displayText?: string): JSX.Element {
  return <a href={href} className='text-primary'>{displayText ?? href}</a>;
}

function getAddressJsxElement(address: Address): JSX.Element {
  // user specified display Address in KM
  if (address.extraDescription) {
    return <div>{address.extraDescription}</div>;
  }
  return <div>
    {address.line1 && <p>{address.line1}</p>}
    {address.line2 && <p>{address.line2}</p>}
    {address.line3 && <p>{address.line3}</p>}
    <p>{address.city}, {address.region} {address.postalCode}</p>
    <p>{address.countryCode}</p>
  </div>;
}
