export function allEmptyValues(values) {
  return !Object.values(values).some(Boolean);
}

export function allNonEmptyValues(values) {
  return Object.values(values).every(Boolean);
}

export function removeEmptyString(obj) {
  // eslint-disable-next-line no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ""));
}

export function serializeToUri(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
