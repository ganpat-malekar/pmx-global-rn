export default () => {
  const regex = new RegExp(`^http://localhost:4200/Beta/DevAPAC/([^/]+)/*`);
  const matches = window.location.href.match(regex);
  // console.log(process.env.NX_PUBLIC_URL, window.location.href);
  if (matches && matches[1]) {
    return matches[1];
  } else {
    return null;
  }
};
// d.dunomo.au
// d.dunomo.my
// d.dunomo.sg
