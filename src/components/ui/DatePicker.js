import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";

import es from "date-fns/locale/es";
registerLocale("es", es);

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}) => {
  return (
    <ReactDatePicker
      locale="es"
      dateFormat="dd/MM/yyyy"
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      {...props}
    />
  );
};

export default DatePicker;
