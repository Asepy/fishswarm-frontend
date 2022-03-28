import { isNumeric } from "./string.helpers";

// Source: https://github.com/berithpy/digitoverificador/blob/master/javascript/digitoVerificador.js
export function getDigitoVerificador(ruc, baseMax = 11) {
  ruc = typeof ruc === "string" ? ruc : ruc.toString();
  var resultado = 0;
  var index = 0;
  for (var rucIndex = ruc.length - 1; rucIndex >= 0; rucIndex--) {
    resultado += parseInt(ruc[rucIndex]) * (index + 2);
    var r = resultado % baseMax;
    index++;
  }
  var verificador = r > 1 ? baseMax - r : 0;
  return verificador;
}

// yournumber.replace(/,/g, '')
export function parseRuc(str) {
  // remove white spaces
  let result = str.replace(/\s/g, "");

  // strip thousands separator
  result = result.replace(/\./g, "");

  // strip underscore separator
  result = result.replace(/_/g, "-");

  // reduce length
  if (result.length > 10) {
    result = result.substr(result.length - 10);
  }
  // check for numeric parts
  if (result.includes("-")) {
    const parts = result.split("-");
    if (!isNumeric(parts[0]) || !isNumeric(parts[1])) {
      return "";
    }
  } else if (!isNumeric(result)) {
    return "";
  }

  return result;
}
