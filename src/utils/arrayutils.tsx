/* eslint-disable @typescript-eslint/no-explicit-any */

type MapFunction = (element: any, index: number) => any;

/**
 * Reduces an array into an object consisting of groups. The keys of the object indicate the groups
 * and the values hold an array of elements which are in that group. Mapping functions can be specified
 * which determine the key and the value for the element. An initial object may be optionally specified.
 *
 * @param {Array<any>} arr array to be grouped
 * @param {MapFunction} keyMap Mapping function that evaluates what key to give an array element.
 * @param {MapFunction} valueMap Mapping function that evaluates what value to give an array element.
 * @param {Object} intitial the initial object to add to, defaulting to {}
 * @returns {Object}
 */
export function mapArrayToObject(
  arr: Array<any>,
  keyMap: MapFunction = (key: any) => key,
  valueMap: MapFunction = (value: any) => value,
  initial: Record<any, any> = {}
): Record<any, any> {
  return arr.reduce((groups, element, idx) => {
    const key = keyMap(element, idx);
    const value = valueMap(element, idx);
    if (!groups[key]) {
      groups[key] = [value];
    } else {
      groups[key].push(value);
    }
    return groups;
  }, initial);
}
