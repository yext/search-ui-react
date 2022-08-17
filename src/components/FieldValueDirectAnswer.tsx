import {
  FieldValueDirectAnswer as FieldValueDirectAnswerType,
  BuiltInFieldType
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
      return <a href={`https://www.instagram.com/${result.value}`}>{result.value}</a>;
    case BuiltInFieldType.TwitterHandle:
      return <a href={`https://twitter.com/${result.value}`}>@{result.value}</a>;
    case BuiltInFieldType.FacebookURL:
    case BuiltInFieldType.AndroidAppURL:
    case BuiltInFieldType.IOSAppURL:
      return <a href={result.value}>{result.value}</a>;
    case BuiltInFieldType.ComplexURL:
      const url = result.value.url;
      return <a href={url}>{result.value.preferDisplayUrl ? result.value.displayUrl : url}</a>;
    case BuiltInFieldType.URL:
      return Array.isArray(result.value)
        ? <div>{result.value.map((url, i) => <a href={url} key={i}>{url}</a>)}</div>
        : <a href={result.value}>{result.value}</a>;
    case BuiltInFieldType.Phone:
      return <a href={`tel:${result.value}`}>{result.value}</a>;
    case BuiltInFieldType.Email:
      return <div>{result.value.map((email, i) => <a href={`mailto:${email}`} key={i}>{email}</a>)}</div>;
    case BuiltInFieldType.Address:
      return <p>{result.value}</p>; //TODO: components__address__i18n__addressForCountry in theme (2500 lines)
    case BuiltInFieldType.RichText:
      return <p>{result.value}</p>; //TODO: require formatter? RtfConverter for rich text.
    case 'unknown':
      console.warn('unknown type');
      return <div>unknown</div>; //TODO: future item
    default:
      /**
       * DecimalDirectAnswer (string | string[])
       * IntegerDirectAnswer (number)
       * TextDirectAnswer (string | string[])
       */
      return Array.isArray(result.value)
        ? <div>{result.value.map((val, i) => <p key={i}>{val}</p>)}</div>
        : <p>{result.value}</p>;
  }
}
