import {
  FieldValueDirectAnswer as FieldValueDirectAnswerType,
  BuiltInFieldType,
  Address
} from '@yext/search-headless-react';
import { useMemo } from 'react';

interface FieldValueDirectAnswerProps {
  result: FieldValueDirectAnswerType,
  handleClickViewDetails: () => void,
  cssClasses?: FieldValueDirectAnswerCssClasses
}

interface FieldValueDirectAnswerCssClasses {
  header?: string,
  body?: string,
  content?: string,
  answerContainer?: string
}

export function FieldValueDirectAnswer({
  result,
  handleClickViewDetails,
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
        {link && <a
          href={link}
          className='text-primary pt-4 text-neutral'
          onClick={handleClickViewDetails}
        >
          View Details
        </a>}
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
        ? <div>{result.value.map((url, i) => getUrlJsxElement(url, url, i))}</div>
        : getUrlJsxElement(result.value);
    case BuiltInFieldType.Phone:
      return getUrlJsxElement(`tel:${result.value}`, result.value);
    case BuiltInFieldType.Email:
      return <div>{result.value.map((email, i) => getUrlJsxElement(`mailto:${email}`, email, i))}</div>;
    case BuiltInFieldType.Address:
      return getAddressJsxElement(result.value);
    case BuiltInFieldType.RichText:
      return <div>rich text</div>; //TODO: use react-markdown
    case 'unknown':
      return <div>unknown</div>; //TODO: SLAP-2337
    default:
      return Array.isArray(result.value)
        ? <div>{result.value.map((val, i) => <p key={i} className='block'>{val}</p>)}</div>
        : <p>{result.value}</p>;
  }
}

function getUrlJsxElement(href: string, displayText?: string, key?: number) {
  return <a {...{ href, key }} className='text-primary block'>{displayText ?? href}</a>;
}

function getAddressJsxElement(address: Address): JSX.Element {
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
