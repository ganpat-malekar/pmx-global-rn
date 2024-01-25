/**
 *
 * @param {Array} initialColumns - Array of objects, can be unordered or ordered as per priority (Array of objects of MUI)
 * @param {Array} priorityColumnNames - Names of columns ordered as per priority, from the JSON (Array of strings)
 * @param {number} base - Minimum number of columns you strictly want to be displayed in any case
 * @param {number} minSupportedWidth - Minimum width, which you have decided for mobile view
 * @param {number} maxSupportedWidth - Maximum supported width, which you have developed and tested this project on!
 * @returns {Array} - Gives array containing two arrays; tableColumns & modalColumns.
 */

const responsiveConfig = {
  startIndex: 2,
  minSupportedWidth: 768,
  maxSupportedWidth: 1366,
};
export default (currentWidth, endIndex, config = responsiveConfig) => {
  let { startIndex, minSupportedWidth, maxSupportedWidth } = config;
  const minIndex = startIndex;
  const maxIndex = endIndex - 1;

  currentWidth = currentWidth === 0 ? minSupportedWidth : currentWidth;

  // console.log(
  //   "variables: ",
  //   startIndex,
  //   endIndex,
  //   maxSupportedWidth,
  //   minSupportedWidth,
  //   currentWidth
  // );

  // TODO: Think of a better formula change the approach!
  let index =
    ((maxIndex - minIndex) / (maxSupportedWidth - minSupportedWidth)) *
    (currentWidth - minSupportedWidth);

  // console.log("raw: ", index);

  index = index < startIndex ? startIndex : index;
  index = index >= endIndex ? endIndex : index;

  // console.log("raw limited : ", index);
  // console.log("ceiled: ", Math.ceil(index));
  return Math.ceil(index);
};
