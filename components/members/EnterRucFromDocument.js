import React from "react";
import { animated, useTransition } from "react-spring";
import { Stack, Input, Select } from "@chakra-ui/react";
import { Field, useField } from "formik";
import { useFocus } from "hooks/components";
import { getDigitoVerificador } from "utils/helpers/ruc.helpers";

export default function EnterRucFromDocument({
  selectName,
  enterName,
  documentName,
  ...restProps
}) {
  const [, , selectHelpers] = useField(selectName);
  const [, enterMeta, enterHelpers] = useField(enterName);
  const [, documentMeta] = useField(documentName);
  const [inputRef, setInputFocus] = useFocus();
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
    setToggle(value === "new" || value == "sameAsDocument");
    if (value === "new") {
      // reset the select
      selectHelpers.setValue(undefined);
      enterHelpers.setValue("");
      setInputFocus();
    } else if (value === "sameAsDocument") {
      // reset the select
      selectHelpers.setValue(undefined);
      const dv = getDigitoVerificador(documentMeta.value);
      enterHelpers.setValue(documentMeta.value + "-" + dv);
      setInputFocus();
    } else if (value === "") {
      selectHelpers.setValue(value);
      // reset the input
      enterHelpers.setValue("");
    }
  }

  return (
    <Stack {...restProps}>
      <Field name={selectName}>
        {({ field }) => (
          <Select name={selectName} {...field} onChange={handleSelectChange}>
            <option value="">Ninguno</option>
            <option value="sameAsDocument">Igual a mi Cédula con DV</option>
            <option value="new">Quiero ingresar el valor</option>
          </Select>
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
                    ref={inputRef}
                    placeholder="Ingrese el valor de su RUC. Ej: 7777777-3"
                    name={enterName}
                    value={enterMeta.value}
                    onChange={(e) => enterHelpers.setValue(e.target.value)}
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
