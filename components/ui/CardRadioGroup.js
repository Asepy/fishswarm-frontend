import React from "react";
import {
  Box,
  Flex,
  HStack,
  useRadio,
  useRadioGroup,
  TagLeftIcon
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

export default function CardRadioGroup({
  options,
  name,
  defaultValue = "",
  onChange = () => {},
  value
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
    value
  });

  const group = getRootProps();
  return (
    <HStack {...group}>
      {options.map(({ value, label }) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {label}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        fontSize="xs"
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "gray.100",
          borderColor: "gray.100"
        }}
        _focus={{
          boxShadow: "outline"
        }}
        px={2}
        py={1}
      >
        <Flex alignItems="center">
          {input.checked && <TagLeftIcon as={CheckIcon}></TagLeftIcon>}
          {props.children}
        </Flex>
      </Box>
    </Box>
  );
}
