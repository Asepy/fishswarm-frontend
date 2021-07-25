import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import getYear from "date-fns/getYear";
import parse from "date-fns/parse";

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

export function formatDateMembers(dateMembers) {
  const { year, month, day } = dateMembers;
  return `${year}-${month}-${day}`;
}

export function testValidDateMember(options = {}) {
  try {
    const { day = "1", month = "1", year = "2000" } = options;
    const date = parse(`${day}-${month}-${year}`, "dd-MM-yyyy", new Date());
    return isValid(date);
  } catch (ex) {
    console.error("date validation error", ex);
  }
  return false;
}

export function isAdult(yearOfBirth) {
  const currentYear = getYear(new Date());
  const year = Number(yearOfBirth);
  return currentYear - year >= 18;
}
