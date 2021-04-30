import format from "date-fns/format";

export default function formatDate(date, formatStr = "yyyy-MM-dd") {
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  return format(new Date(year, month, day), formatStr);
}
