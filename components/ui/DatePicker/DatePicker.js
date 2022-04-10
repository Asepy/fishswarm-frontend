import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";

import es from "date-fns/locale/es";
registerLocale("es", es);

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  placeholder,
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
      placeholderText={placeholder}
      {...props}
    />
  );
};

export default DatePicker;
