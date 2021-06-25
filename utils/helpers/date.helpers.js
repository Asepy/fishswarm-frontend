import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export function formatDate(date, formatStr = "yyyy-MM-dd") {
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  return format(new Date(year, month, day), formatStr);
}

export function formatISODate(isoStr, formatStr = "dd-MM-yyyy") {
  if (isoStr == null) {
    return "";
  }
  var date = parseISO(isoStr);
  return format(date, formatStr);
}
