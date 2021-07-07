import React from "react";
import { animated, useTransition } from "react-spring";
import { Stack, Input } from "@chakra-ui/react";
import { Field, useField } from "formik";
import RubroSelect from "./RubroSelect";

export default function EnterOrSelectRubro({
  rubros,
  selectName,
  enterName,
  ...restProps
}) {
  const [, setSelectedRubroId] = React.useState("");
  const [, , selectHelpers] = useField(selectName);
  const [, enterMeta, enterHelpers] = useField(enterName);
  const [toggle, setToggle] = React.useState(() => {
    return Boolean(enterMeta.initialValue);
  });
  const transitions = useTransition(toggle, {
    enter: {
      y: 0,
      opacity: 1
    },
    leave: {
      y: -10,
      opacity: 0
    },
    from: {
      y: -10,
      opacity: 0
    }
  });

  function handleSelectChange(event) {
    const { value } = event.target;
    setSelectedRubroId(value);
    setToggle(value === "new");
    if (value === "new") {
      // reset the select
      selectHelpers.setValue(undefined);
    } else if (value !== "") {
      // reset the input
      enterHelpers.setValue(undefined);
      // set select
      selectHelpers.setValue(value);
    }
  }

  return (
    <Stack {...restProps}>
      <Field name={selectName}>
        {({ field }) => (
          <RubroSelect
            name={selectName}
            initialRubros={rubros}
            {...field}
            onChange={handleSelectChange}
          >
            <option value="">Seleccione un rubro</option>
            <option value="new">
              No está en el listado. Especificar un rubro nuevo
            </option>
          </RubroSelect>
        )}
      </Field>
      {transitions(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <Field name={enterName}>
                {({ field }) => (
                  <Input
                    autoFocus
                    placeholder="Especifique el nombre del rubro"
                    name={enterName}
                    {...field}
                  />
                )}
              </Field>
            </animated.div>
          )
      )}
    </Stack>
  );
}
