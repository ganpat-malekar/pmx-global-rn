/**
 * @deprecated Since its creation.
 * @param {string} base64 - Base64 string data without the "data" prefix
 * @param {string} filename - Name of the file you want to give
 * @param {string} extension - File extension with a leading dot (eg: .png)
 * @returns {File} - Javascript File object
 * @description The function is written to work with the response data sent by PMX backend
 * <pre>
 * Where:
 *      File type is separately sent
 *      File Name is separately sent
 *      File Data is separately sent in base64
 * </pre>
 */
export function dataURLtoFile(base64, filename, extension) {
  const fileType = extension.split(".")[1];

  const fileTypePrefix =
    fileType === "png"
      ? "data:image/png;base64,"
      : fileType === "jpeg"
      ? "data:image/jpeg;base64,"
      : fileType === "jpg"
      ? "data:image/jpg;base64,"
      : fileType === "pdf"
      ? "data:application/pdf;base64,"
      : "";

  const dataurl = fileTypePrefix + base64;

  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]); // Converts base64 to binary string
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  // Put unicode value of each character into Uint8Array
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
