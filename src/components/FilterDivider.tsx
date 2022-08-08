import { twMerge } from "../hooks/useComposedCssClasses";
/**
 * A divider component for NumericalFacets, HierarchicalFacets, and StaticFacets.
 *
 * @param props - A customizable className for facet divider
 * @returns A React component for facets
 *
 * @public
 */
export function FilterDivider({ className }: { className?: string }): JSX.Element {
  return <div className={twMerge(className, 'w-full h-px bg-gray-200 my-4')} />;
}