/**
 * A component that displays numerical facets applicable to the current vertical search.
 *
 * @param props - A customizable className for facet divider
 * @returns A React component for facets
 *
 * @public
 */

export function FilterDivider({ className ='w-full h-px bg-gray-200 my-4' }: { className?: string }): JSX.Element {
  return <div className={className} />;
}