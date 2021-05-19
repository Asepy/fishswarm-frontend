import React from "react";
import {
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Text,
  Select,
  Flex,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  HStack,
  Tabs,
  TabList,
  Tab,
  Divider,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";
import { DeleteIcon, EditIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";

import useFilterMember, {
  useFilterMemberPaginated,
} from "utils/useFilterMember";

import isNumeric from "utils/isNumeric";
import SkeletonLines from "components/ui/SkeletonLines";

export default function MemberList() {
  const [searchTerm, setSearchTerm] = React.useState();
  const [queryParams, setQueryParams] = React.useState({
    name: "",
    document: "",
    status: "pending",
  });
  const {
    data,
    page,
    nextPage,
    previousPage,
    setPage,
    error,
    hasMore,
    status,
  } = useFilterMemberPaginated(queryParams);

  const handleFilter = (event) => {
    if (event.key === "Enter") {
      setPage(1);
      if (isNumeric(searchTerm)) {
        setQueryParams((old) => ({ document: searchTerm }));
      } else {
        setQueryParams((old) => ({ name: searchTerm }));
      }
    }
  };

  const handleClear = () => {
    setPage(1);
    setSearchTerm("");
    setQueryParams({ name: "", document: "", status: "pending" });
  };

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Miembros</Tab>
        </TabList>
      </Tabs>
      <Stack spacing={6} mt={4}>
        <PageSection spacing={4} px={6}>
          <Text fontSize="sm">Buscar Miembros</Text>
          <InputGroup size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              variant="outline"
              type={"text"}
              placeholder="Buscar por CI, Nombre, Apellido, Razón Social o RUC"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleFilter}
            />
            <InputRightElement width="4.5rem">
              {searchTerm ? (
                <IconButton
                  onClick={handleClear}
                  size="xs"
                  icon={<CloseIcon />}
                />
              ) : null}
            </InputRightElement>
          </InputGroup>
          <HStack maxW="40%">
            <Select size="xs" placeholder="Departamento">
              <option value="" selected>
                Departamento: Todos
              </option>
            </Select>
            <Select size="xs" placeholder="Ciudad">
              <option selected value="">
                Ciudad: Todos
              </option>
            </Select>
          </HStack>
          <Divider></Divider>
          <HStack justify="space-between">
            <CardRadioGroup
              name="status"
              defaultValue="pending"
              options={[
                { value: "pending", label: "Pendiente" },
                { value: "active", label: "Activo" },
                { value: "inactive", label: "Inactivo" },
                { value: "conditional", label: "Condicional" },
              ]}
            />

            <Button
              variant="outline"
              px={4}
              h="1.75rem"
              size="sm"
              onClick={handleClear}
            >
              Limpiar
            </Button>
          </HStack>
        </PageSection>
        <PageSection boxShadow="md">
          <MembersTable error={error} status={status} data={data} />
          <SimplePaginator
            gotoPage={(pageParam) => setPage(pageParam)}
            nextPage={nextPage}
            pageIndex={page}
            previousPage={previousPage}
            hasMore={hasMore}
            pageTotal={data?.pageTotal}
            totalElements={data?.total}
            px={2}
          />
        </PageSection>
      </Stack>
    </>
  );
}

function PageSection(props) {
  return <Stack boxShadow="md" py={4} {...props} />;
}

function MembersTable({ error, status, data }) {
  if (error) {
    return <Text color="red.500">{error.message}</Text>;
  }
  if (status === "loading") {
    return (
      <SkeletonLines
        thickness="20px"
        noOfLines={5}
        spacing="6"
        mt={4}
      ></SkeletonLines>
    );
  }

  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>E-mail</Th>
          <Th isNumeric>Cédula</Th>
          <Th textAlign="center">Opciones</Th>
        </Tr>
      </Thead>

      <Tbody>
        {data?.data.map((member) => (
          <Tr key={member.id_number}>
            <Td>
              {member.name} {member.surname}
            </Td>
            <Td>{member.mail_id}</Td>
            <Td isNumeric>{member.national_id}</Td>
            <Td textAlign="center">
              <Menu matchWidth>
                <MenuButton
                  fontSize="12px"
                  as={IconButton}
                  icon={<FaEllipsisV />}
                  variant="outline"
                  aria-label="Opciones"
                ></MenuButton>
                <MenuList>
                  <MenuItem icon={<EditIcon></EditIcon>}>Editar</MenuItem>
                  <MenuItem icon={<DeleteIcon />}>Eliminar</MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function SimplePaginator({
  nextPage = () => {},
  pageIndex = 0,
  pageTotal = 10,
  previousPage = () => {},
  hasMore = false,
  totalElements = 0,
  ...rest
}) {
  return (
    <>
      <Flex justifyContent="space-between" m={8} alignItems="center" {...rest}>
        <Text flexShrink="0" mr={8}>
          <Text fontWeight="bold" as="span">
            {totalElements}
          </Text>{" "}
          resultados
        </Text>
        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Página{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex}
            </Text>{" "}
            de{" "}
            <Text fontWeight="bold" as="span">
              {!hasMore ? pageIndex : pageTotal}
            </Text>
          </Text>
        </Flex>

        <Flex>
          <Button
            onClick={previousPage}
            isDisabled={pageIndex === 1}
            size="sm"
            variant="outline"
          >
            Anterior
          </Button>
          <Button
            onClick={nextPage}
            isDisabled={!hasMore}
            ml={2}
            size="sm"
            variant="outline"
          >
            Siguiente
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

// TODO: Move to another file when stable
function CardRadioGroup({
  options,
  name,
  defaultValue = "",
  onChange = console.log,
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
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
          bg: "teal.400",
          color: "white",
          borderColor: "teal.400",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={2}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}
