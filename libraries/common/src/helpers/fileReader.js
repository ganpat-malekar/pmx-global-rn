// @ts-nocheck
// import { Buffer } from "buffer";
/**
 * @deprecated - name is changed to getFileAsByteArray
 * Converts a file to an array of binary data. The function reads the BLOB in an
 * array buffer and converts it into an array of 8-bit integers (a TypedArray),
 * and further converts the TypedArray to plain old Javascript Array.
 *
 * Note: Call inside an async function.
 * @param {File} file - A Javascript File object.
 * @returns {Promise} - A promise containing the byte array.
 */
export function readFileAsyncUint8(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result;
      const bytesTypedArray = new Uint8Array(arrayBuffer);
      const fileByteArray = [];
      for (const a of bytesTypedArray) {
        fileByteArray.push(a);
      }
      resolve(fileByteArray);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Converts a file to an array of binary data. The function reads the BLOB in an
 * array buffer and converts it into an array of 8-bit integers (a TypedArray),
 * and further converts the TypedArray to plain old Javascript Array.
 *
 * Note: Call inside an async function.
 * @param {File} file - A Javascript File object.
 * @returns {Promise} - A promise containing the byte array.
 */
export function getFileAsByteArray(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result;
      const bytesTypedArray = new Uint8Array(arrayBuffer);
      const fileByteArray = [];
      for (const item of bytesTypedArray) {
        fileByteArray.push(item);
      }
      resolve(fileByteArray);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Converts a file to a base64 string.
 *
 * Note: Call inside an async function.
 * @param {File} file - A Javascript File object.
 * @returns {Promise} - A promise containing the base64 string.
 */
export function getFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result.split(",")[1]);
    };

    reader.onerror = () => {
      reject(reader.error);
    };
  });
}
