import React, { useEffect } from "react";
import { animated, useTransition } from "react-spring";
import { Select, Flex, Box } from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import {
  Date_Format,
  Month_Names_Short,
  RangeParserBy,
  Weekday_Names_Short
} from "./datePicker.utils";

export default function DateRangePicker({
  customRangesSelectProps,
  size,
  onDateRangeChange,
  ...restProps
}) {
  const [selectedDates, setSelectedDates] = React.useState([]);

  const [toggle, setToggle] = React.useState(false);

  const transitions = useTransition(toggle, {
    enter: {
      x: 0,
      opacity: 1
    },
    leave: {
      x: -10,
      opacity: 0
    },
    from: {
      x: -10,
      opacity: 0
    }
  });

  useEffect(() => {
    setToggle(customRangesSelectProps.value === "new");
  }, [customRangesSelectProps, customRangesSelectProps.value]);

  function handleSelectChange(event) {
    customRangesSelectProps.onChange(event);
    const { value } = event.target;
    if (value !== "" && value !== "new") {
      const range = RangeParserBy[value]();
      onDateRangeChange(range);
    } else {
      onDateRangeChange(selectedDates);
    }
  }

  function handleDateChange(params) {
    setSelectedDates(params);
    onDateRangeChange(params);
  }

  return (
    <Flex align="center" fontSize={size} gridGap={2} {...restProps}>
      <Box>
        <Select
          size={size}
          {...customRangesSelectProps}
          onChange={handleSelectChange}
        >
          <option value="">Ninguno</option>
          <option value="today">Hoy</option>
          <option value="yesterday">Ayer</option>
          <option value="last7Days">Últimos 7 días</option>
          <option value="thisMonth">Este Mes</option>
          <option value="thisYear">Este Año</option>
          <option value="new">Elegir una fecha</option>
        </Select>
      </Box>
      <Box width={"48"}>
        {transitions(
          (styles, item) =>
            item && (
              <animated.div style={styles}>
                <RangeDatepicker
                  size={size}
                  configs={{
                    dayNames: Weekday_Names_Short,
                    monthNames: Month_Names_Short,
                    dateFormat: Date_Format
                  }}
                  selectedDates={selectedDates}
                  onDateChange={handleDateChange}
                  placeholder="seleccionar una fecha"
                  propsConfigs={{
                    dayOfMonthBtnProps: {
                      borderColor: "red.300",
                      selectedBg: "blue.200",
                      _hover: {
                        bg: "blue.400"
                      }
                    },
                    inputProps: {
                      placeholder: "Seleccionar una fecha",
                      size: size
                    }
                  }}
                />
              </animated.div>
            )
        )}
      </Box>
    </Flex>
  );
}
