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
  Text
} from "@chakra-ui/react";
import { useField } from "formik";
import styled from "@emotion/styled";

const FieldsWrapper = styled.div`
  background-color: var(--chakra-colors-accents-1);
  input,
  select,
  .chakra-checkbox__control:not([data-checked]) {
    background-color: var(--chakra-colors-white);
  }
`;

export default function PlusMembershipFields({ children, ...restProps }) {
  const [, membershipTypeMeta, membershipTypeHelpers] =
    useField("membershipType");
  const [, , methodHelpers] = useField("plusPaymentMethod");
  const [, , billingHelpers] = useField("plusBillingAddress");
  const [socioPlusChecked, setSocioPlusChecked] = React.useState(() => {
    return membershipTypeMeta.initialValue === "PLUS";
  });
  const [toggle, setToggle] = React.useState(() => {
    return membershipTypeMeta.initialValue === "PLUS";
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

  function handleCheckSocioPlus(event) {
    const { checked } = event.target;
    setToggle(checked);
    setSocioPlusChecked(checked);
    membershipTypeHelpers.setValue(checked ? "PLUS" : "NORMAL");
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
            <Center m="0 auto" h="full">
              <Tag
                variant="solid"
                size="lg"
                borderRadius="full"
                colorScheme="teal"
              >
                <TagLabel>
                  <Heading size="md">Plus</Heading>{" "}
                </TagLabel>
              </Tag>
            </Center>
          </GridItem>
        </Grid>
        <Flex justify="space-between" flexDir="row">
          <Checkbox
            size="lg"
            value={socioPlusChecked}
            onChange={handleCheckSocioPlus}
          >
            <Heading size="sm">Quiero ser Socio Plus</Heading>
          </Checkbox>
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
