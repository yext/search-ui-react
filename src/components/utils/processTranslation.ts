export function processTranslation(args: {
  phrase: string,
  pluralForm?: string,
  count?: number
}) {
  if (args.count != null && args.pluralForm && args.count !== 1) {
    return args.pluralForm
  } else {
    return args.phrase;
  }
}