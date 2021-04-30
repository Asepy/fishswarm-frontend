export default function allEmptyValues(values) {
  return !Object.values(values).some(Boolean);
}
