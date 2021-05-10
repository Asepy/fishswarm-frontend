import React from "react";
import {
  Button,
  Heading,
  SkeletonText,
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
  Icon,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Input,
  HStack,
  InputGroup,
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";
import {
  DeleteIcon,
  EditIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@chakra-ui/icons";
import { BiFilterAlt } from "react-icons/bi";
import useFilterMember, {
  useFilterMemberPaginated,
} from "utils/useFilterMember";

import isNumeric from "utils/isNumeric";

export default function MemberList() {
  const [searchTerm, setSearchTerm] = React.useState();
  const [queryParams, setQueryParams] = React.useState({
    name: "",
    document: "",
  });
  const {
    data,
    page,
    isFetching,
    nextPage,
    previousPage,
    setPage,
    error,
    hasMore,
    status,
  } = useFilterMemberPaginated(queryParams);

  const handleFilter = () => {
    setPage(1);
    if (isNumeric(searchTerm)) {
      setQueryParams((old) => ({ document: searchTerm }));
    } else {
      setQueryParams((old) => ({ name: searchTerm }));
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setQueryParams({ name: "", document: "" });
  };

  //   if (status === "loading") {
  //     return <SkeletonText noOfLines={4} spacing="4"></SkeletonText>;
  //   }
  if (error) {
    return <Text color="red.500">{error.message}</Text>;
  }
  return (
    <Stack mt={4} spacing={4}>
      <Flex justifyContent="space-between">
        <Heading size="md">Socios Registrados</Heading>
        <HStack alignItems="center">
          <Icon as={BiFilterAlt} w={6} h={6} color="gray.400" />
          <InputGroup size="sm">
            <Input
              variant="filled"
              // pr="4.5rem"
              type={"text"}
              placeholder="Nombre o cédula"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button
            variant="primary"
            px={4}
            h="1.75rem"
            size="xs"
            onClick={handleFilter}
          >
            Listo
          </Button>
          <Button
            variant="outline"
            px={4}
            h="1.75rem"
            size="xs"
            onClick={handleClear}
          >
            Borrar
          </Button>
        </HStack>
        {status === "loading" && (
          <SkeletonText noOfLines={4} spacing="4"></SkeletonText>
        )}
      </Flex>

      <Table variant="simple" size="sm" mt={12}>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>E-mail</Th>
            <Th isNumeric>Cédula</Th>
            <Th textAlign="center">Opciones</Th>
          </Tr>
        </Thead>

        <Tbody>
          {/* {isFetching && <Spinner />} */}

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
      <SimplePaginator
        gotoPage={(pageParam) => setPage(pageParam)}
        nextPage={nextPage}
        pageIndex={page}
        previousPage={previousPage}
        hasMore={hasMore}
        pageTotal={data?.pageTotal}
        totalElements={data?.total}
      />
    </Stack>
  );
}

function FullPaginator({
  gotoPage = () => {},
  nextPage = () => {},
  pageIndex = 0,
  pageTotal = 10,
  previousPage = () => {},
  hasMore = false,
}) {
  return (
    <>
      <Flex justifyContent="space-around" m={8} alignItems="center">
        <Flex>
          <Tooltip label="Primera página">
            <IconButton
              onClick={() => gotoPage(1)}
              isDisabled={pageIndex === 1}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Anterior">
            <IconButton
              onClick={previousPage}
              isDisabled={pageIndex === 1}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Página{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex}
            </Text>{" "}
            de{" "}
            <Text fontWeight="bold" as="span">
              {pageTotal}
            </Text>
          </Text>
          <Text flexShrink="0">Ir a página:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageTotal}
            onChange={(value) => {
              const page = value ? value : 1;
              gotoPage(page);
            }}
            defaultValue={pageIndex}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>

        <Flex>
          <Tooltip label="Siguiente Página">
            <IconButton
              onClick={nextPage}
              isDisabled={!hasMore}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Última Página">
            <IconButton
              onClick={() => gotoPage(pageTotal)}
              isDisabled={!hasMore}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
}

function SimplePaginator({
  gotoPage = () => {},
  nextPage = () => {},
  pageIndex = 0,
  pageTotal = 10,
  previousPage = () => {},
  hasMore = false,
  totalElements = 0,
}) {
  return (
    <>
      <Flex justifyContent="space-between" m={8} alignItems="center">
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

function PageSizeSelector({ pageSize, setPageSize }) {
  return (
    <Select
      w={32}
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Mostrar {pageSize}
        </option>
      ))}
    </Select>
  );
}
