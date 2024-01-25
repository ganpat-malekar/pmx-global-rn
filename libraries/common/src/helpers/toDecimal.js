export default function toDecimal(x, precision = 2) {
  function toFixedNoRoundOff(num, place = 2) {
    // We don't want rounding off. Otherwise, we simply would have used Number.toFixed()
    // try 19.99 * 100. You will never get 1999
    return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/)).toFixed(place);
  }

  if (["number", "string"].includes(typeof x)) {
    if (typeof x === "string") {
      if (!isNaN(x)) {
        return toFixedNoRoundOff(+x, precision);
      } else {
        return x;
      }
    } else {
      return toFixedNoRoundOff(x, precision);
    }
  } else {
    return "0.00";
  }
}
