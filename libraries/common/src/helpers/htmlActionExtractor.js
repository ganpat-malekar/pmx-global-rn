function isHTML(str) {
  // A simple check to determine if the string might be HTML
  return /<\/?[a-z][\s\S]*>/i.test(str);
}

export default function (input) {
  if (!input) {
    return input;
  }

  if (!isHTML(input)) {
    // If the input does not look like HTML, return it in lowercase
    // console.log(input.toLowerCase().trim("'").split(','));
    return input
      .toLowerCase()
      .split(',')
      .map((item) => item.trim().replace(/'/g, ''));
  }

  // The rest of the function remains the same as before
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, 'text/html');
  const links = Array.from(doc.querySelectorAll('a[title]'));

  const titles = links
    .map((link) => link.getAttribute('title').toLowerCase().trim())
    .filter((title) => title.length > 0);

  // console.log(titles.map((title) => `${title}`));
  return titles.map((title) => `${title}`);
}
