export function allEmptyValues(values) {
  return !Object.values(values).some(Boolean);
}

export function allNonEmptyValues(values) {
  return Object.values(values).every(Boolean);
}

export function someNonEmptyValues(values) {
  return Object.values(values).some(Boolean);
}

export function removeEmptyString(obj) {
  if (obj == null) {
    return obj;
  }
  // eslint-disable-next-line no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ""));
}

export function removeEmpty(obj) {
  if (obj == null) {
    return obj;
  }
  return Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line no-unused-vars
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );
}

export function serializeToUri(obj) {
  return new URLSearchParams(removeEmpty(obj)).toString();
}
