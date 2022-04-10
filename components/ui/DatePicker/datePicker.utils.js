import startOfMonth from "date-fns/startOfMonth";
import startOfYear from "date-fns/startOfYear";
import addDays from "date-fns/addDays";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import subDays from "date-fns/subDays";

export const Date_Format = "dd/MM/yyyy";

export const Month_Names_Short = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic"
];

export const Weekday_Names_Short = [
  "Dom",
  "Lun",
  "Mar",
  "Mier",
  "Jue",
  "Vie",
  "Sab"
];

export const RangeParserBy = {
  today: () => {
    return [startOfDay(new Date()), endOfDay(new Date())];
  },
  yesterday: () => {
    return [
      startOfDay(addDays(new Date(), -1)),
      endOfDay(addDays(new Date(), -1))
    ];
  },
  last7Days: () => {
    return [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())];
  },
  thisMonth: () => {
    return [startOfMonth(new Date()), endOfDay(new Date())];
  },
  thisYear: () => {
    return [startOfYear(new Date()), endOfDay(new Date())];
  }
};
