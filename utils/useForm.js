import { useState } from "react";

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function resetValues(values) {
    setValues({
      ...values
    });
  }

  function updateValue(e) {
    // check if its a number and convert
    let { value } = e.target;
    if (e.target.type === "number") {
      value = parseInt(e.target.value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [e.target.name]: value
    });
  }

  function updateValueByName(name, value) {
    setValues((values) => ({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [name]: value
    }));
  }

  return { values, resetValues, updateValue, updateValueByName };
}
