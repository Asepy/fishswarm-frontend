import React from "react";
import { animated, useTransition } from "react-spring";
import {
  Center,
  Checkbox,
  Heading,
  Flex,
  Grid,
  GridItem,
  Stack,
  Tag,
  TagLabel,
  Text,
  Box
} from "@chakra-ui/react";
import { useField, Field } from "formik";
import styled from "@emotion/styled";
import CirclesPatternSvg from "components/ui/svg/CirclesPatternSvg";

const FieldsWrapper = styled.div`
  background-color: var(--chakra-colors-alabaster-500);
  input,
  select,
  .chakra-checkbox__control:not([data-checked]) {
    background-color: var(--chakra-colors-white);
  }
`;

export default function PlusMembershipFields({ children, ...restProps }) {
  const [, , methodHelpers] = useField("plusPaymentMethod");
  const [, , billingHelpers] = useField("plusBillingAddress");
  const [toggle, setToggle] = React.useState(false);
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

  function handleCheckSocioPlus(event) {
    const { checked } = event.target;
    setToggle(checked);
    if (!checked) {
      billingHelpers.setValue(undefined);
      methodHelpers.setValue(undefined);
    }
  }

  return (
    <FieldsWrapper>
      <Stack
        borderStyle="solid"
        borderWidth="thin"
        borderRadius="md"
        p={6}
        {...restProps}
      >
        <Grid templateColumns={"repeat(6, minmax(auto, 1fr))"}>
          <GridItem colSpan={4}>
            <Stack spacing={4}>
              <Heading size="md">¿Querés ser Socio Plus?</Heading>
              <Text>
                Los socios Plus aportan 100.000 Gs mensuales. Esto permite que
                ASEPY pueda sostener su operación y colaborar en que Paraguay
                sea un mejor ecosistema para emprender.
              </Text>
              <Text>
                Marcando estos datos, una persona de nuestro equipo se pondrá en
                contacto contigo para coordinar.
              </Text>
            </Stack>
          </GridItem>
          <GridItem colSpan={2}>
            <Box h="full" position="relative">
              <Box position="absolute" bottom="0" right="0">
                <CirclesPatternSvg />
              </Box>
              <Center h="full" position="relative">
                <Tag
                  variant="solid"
                  size="lg"
                  borderRadius="2xl"
                  colorScheme="teal"
                  px={4}
                  py={2}
                >
                  <TagLabel>
                    <Heading size="lg">Plus</Heading>
                  </TagLabel>
                </Tag>
              </Center>
            </Box>
          </GridItem>
        </Grid>
        <Flex justify="space-between">
          <Field name="checkedPlus">
            {({ field }) => (
              <Checkbox
                size="lg"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleCheckSocioPlus(e);
                }}
              >
                <Heading size="sm">Quiero ser Socio Plus</Heading>
              </Checkbox>
            )}
          </Field>
        </Flex>
        {transitions(
          (styles, item) =>
            item && (
              <animated.div style={styles}>
                <Stack ml={6} spacing={4}>
                  {children}
                </Stack>
              </animated.div>
            )
        )}
      </Stack>
    </FieldsWrapper>
  );
}
