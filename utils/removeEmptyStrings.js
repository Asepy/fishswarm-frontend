export default function removeEmptyString(obj) {
  // eslint-disable-next-line no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ""));
}
