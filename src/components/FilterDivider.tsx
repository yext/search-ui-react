import { twMerge } from '../hooks/useComposedCssClasses';
/**
 * A divider component for NumericalFacets, HierarchicalFacets, and StandardFacets.
 *
 * @param props - A customizable className for filter divider
 * @returns A React component for filter divider
 *
 * @public
 */
export function FilterDivider({ className }: { className?: string }): JSX.Element {
  return <div className={twMerge('w-full h-px bg-gray-200 my-4', className)} />;
}