import React, { useLayoutEffect, useState } from "react";

/**
 *
 * @param {Array} initialColumns - Array of objects, can be unordered or ordered as per priority (Array of objects of MUI)
 * @param {Array} priorityColumnNames - Names of columns ordered as per priority, from the JSON (Array of strings)
 * @param {number} base - Minimum number of columns you strictly want to be displayed in any case
 * @param {number} minSupportedWidth - Minimum width, which you have decided for mobile view
 * @param {number} maxSupportedWidth - Maximum supported width, which you have developed and tested this project on!
 * @returns {Array} - Gives array containing two arrays; tableColumns & modalColumns.
 */
export function useColumns(
  initialColumns,
  priorityColumnNames,
  base,
  minSupportedWidth,
  maxSupportedWidth
) {
  const [size, setSize] = useState([0, 0]);
  const [columns, setColumns] = useState([initialColumns, []]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useLayoutEffect(() => {
    const slicedColumns = getColumns(
      [...initialColumns],
      priorityColumnNames,
      base - 1,
      size[0],
      minSupportedWidth,
      maxSupportedWidth
    );

    setColumns(slicedColumns);
  }, [size]);

  return columns;
}

const getPriorityOrderedArray = (ic, pcn) => {
  // Just in case if priorityColumns is not provided then consider initialColumns as ordered-in-priority
  if (!(pcn?.length < 1)) {
    return ic;
  }

  // Length of both initialColumns and priorityColumnNames should be same
  if (ic.length !== pcn?.length) {
    console.error("ERR: Array length mismatch");
    return;
  }

  let arr = Array(pcn.length);

  pcn.forEach((n, i) => {
    arr.splice(i, 0, ic[ic.findIndex((p) => p.name === n)]);
  });

  return arr;
};

const getMeanIndex = (
  arr,
  base,
  currentWidth,
  minSupportedWidth,
  maxSupportedWidth
) => {
  const minIndex = base;
  const maxIndex = arr.length - 1;
  currentWidth = currentWidth === 0 ? minSupportedWidth : currentWidth;

  console.log(
    "variables: ",
    maxIndex,
    minIndex,
    maxSupportedWidth,
    minSupportedWidth,
    currentWidth,
    minSupportedWidth
  );
  // TODO: Think of a better formula change the approach!
  let index =
    ((maxIndex - minIndex) / (maxSupportedWidth - minSupportedWidth)) *
    (currentWidth - minSupportedWidth);

  console.log("raw: ", index);

  index = index < base ? base : index;
  index = index >= arr.length ? arr.length : index;

  console.log("raw limited : ", index);
  console.log("ceiled: ", Math.ceil(index));
  return Math.ceil(index);
};

const getColumns = (
  ic,
  pcn,
  base,
  currentWidth,
  minSupportedWidth,
  maxSupportedWidth
) => {
  let arr = getPriorityOrderedArray([...ic], pcn);

  const actionColumn = arr.splice(
    arr.findIndex((p) => p.name === "Actions"),
    1
  );

  const splitAtIndex = getMeanIndex(
    arr,
    base,
    currentWidth,
    minSupportedWidth,
    maxSupportedWidth
  );

  const modalColumns = arr.splice(splitAtIndex);
  const tableColumns = [...arr, actionColumn[0]];

  return [tableColumns, modalColumns];
};
