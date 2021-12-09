export function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export function capitalize(str) {
  const first = str.charAt(0).toUpperCase();
  return `${first}${str.substr(1)}`;
}

export function parseCellphone(phone) {
  // remove white spaces
  let result = phone.replace(/\s/g, "");
  if (result.startsWith("595")) {
    result = result.substr(3);
  }
  if (!result.startsWith("0")) {
    result = `0${result}`;
  }

  if (result.length > 10) {
    result = result.substr(result.length - 10);
  }

  return result;
}
