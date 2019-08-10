/**
 * @param {unknown} input
 * @return {string}
 */
export function type(input) {
  return Object.prototype.toString.call(input).replace("[object ", "").replace("]", "").toLowerCase();
}
