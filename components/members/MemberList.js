import React from "react";
import {
  Button,
  Box,
  Table,
  Text,
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
  Select,
  Flex,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  HStack,
  Divider,
  useRadio,
  useRadioGroup,
  VStack
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";
import {
  SearchIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@chakra-ui/icons";

import { useFilterMemberPaginated } from "utils/useFilterMember";

import SkeletonLines from "components/ui/SkeletonLines";
import ErrorAlert from "components/ui/ErrorAlert";
import EditModal from "./EditModal";
import { formatISODate } from "utils/helpers/date.helpers";
import useDepartments from "utils/useDepartments";
import { useFocus, useTable, useForm } from "hooks/components";
import LoadingOverlay from "components/ui/LoadingOverlay";
import MemberStatusTag from "./MemberStatusTag";
import EditStatusModal from "./EditStatusModal";
import useSelectMemberStatus from "utils/useSelectMemberStatus";
import EmptyDataIcon from "components/ui/svg/EmptyDataIcon";

const initialSearchFormValues = {
  searchTerm: "",
  departmentId: "",
  cityId: "",
  status: ""
};

export default function MemberList() {
  const { values, updateValue, resetValues, updateValueByName } = useForm(
    initialSearchFormValues
  );

  const {
    data,
    error,
    hasMore,
    isFetchingNewPage,
    isNextPageDisabled,
    isSearching,
    nextPage,
    onClear,
    onSearch,
    onSortBy,
    page,
    previousPage,
    status
  } = useFilterMemberPaginated();

  const { departmentResult, citiesResult, updateDepartment } = useDepartments();
  const [searchInputRef, setSearchInputFocus] = useFocus();
  const { statusOptions } = useSelectMemberStatus();

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    onSearch(values);
  };

  const handleClear = () => {
    resetValues(initialSearchFormValues);
    onClear();
  };

  const { data: departments, status: departmentStatus } = departmentResult;
  const { data: cities, status: citiesStatus } = citiesResult;

  return (
    <Box pb={8}>
      <Stack spacing={6} mt={2}>
        <form id="form" onSubmit={handleSubmitSearch}>
          <PageSection spacing={4} px={6} py={4}>
            <Text fontSize="sm">Buscar Miembros</Text>
            <InputGroup variant="outline">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type={"text"}
                placeholder="Buscar por Nombre, Apellido, Cédula o RUC"
                value={values.searchTerm}
                name="searchTerm"
                onChange={updateValue}
                ref={searchInputRef}
              />
              <InputRightElement width="4.5rem">
                {values.searchTerm ? (
                  <IconButton
                    onClick={() => {
                      setSearchInputFocus();
                      updateValueByName("searchTerm", "");
                    }}
                    size="xs"
                    icon={<CloseIcon />}
                  />
                ) : null}
              </InputRightElement>
            </InputGroup>
            <HStack maxW="40%">
              <Select
                size="xs"
                placeholder={
                  departmentStatus === "loading"
                    ? "Cargando..."
                    : "Departamento: Todos"
                }
                isDisabled={!departments}
                name="departmentId"
                value={values.departmentId}
                onChange={(e) => {
                  updateDepartment(e);
                  updateValue(e);
                }}
              >
                {departments?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </Select>
              <Select
                size="xs"
                placeholder={
                  citiesStatus === "loading" ? "Cargando..." : "Ciudad: Todos"
                }
                name="cityId"
                value={values.cityId}
                onChange={updateValue}
                isDisabled={!cities}
              >
                {cities?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </HStack>
            <Divider></Divider>
            <HStack justify="space-between">
              <CardRadioGroup
                name="status"
                value={values.status}
                onChange={(value) => updateValueByName("status", value)}
                options={[{ value: "", label: "Todos" }, ...statusOptions]}
              />
              <HStack>
                <Button
                  size="sm"
                  variant="primary"
                  type="submit"
                  isLoading={isSearching}
                >
                  Buscar
                </Button>
                <Button
                  variant="ghost"
                  px={4}
                  h="1.75rem"
                  size="sm"
                  onClick={handleClear}
                >
                  Limpiar
                </Button>
              </HStack>
            </HStack>
          </PageSection>
        </form>
        <PageSection boxShadow="md" py={4}>
          <MembersTable
            data={data}
            error={error}
            onSortBy={onSortBy}
            status={status}
            isFetchingNewPage={isFetchingNewPage}
          />
          <SimplePaginator
            nextPage={nextPage}
            pageIndex={page}
            previousPage={previousPage}
            hasMore={hasMore}
            isPageLoading={isFetchingNewPage}
            isNextDisabled={isNextPageDisabled}
            totalPages={data?.totalPages}
            totalElements={data?.total}
            px={4}
          />
        </PageSection>
      </Stack>
    </Box>
  );
}

function PageSection(props) {
  return <Stack bg="white" boxShadow="md" borderRadius="lg" {...props} />;
}

const columns = [
  // Incluye nombre y apellido pero le damos relevancia al apellido
  { title: "Nombre", accessor: "surname", sortable: true },
  {
    title: "Cédula de Identidad",
    accessor: "national_id",
    isNumeric: true,
    sortable: true
  },
  { title: "RUC", accessor: "ruc", isNumeric: true, sortable: true },
  { title: "Ciudad", accessor: "cityName", sortable: true },
  { title: "Registrado El", accessor: "startDate", sortable: true },
  { title: "Estado", accessor: "status", textAlign: "center", sortable: true },
  { title: "Opciones", accessor: "options", textAlign: "center" }
];

function MembersTable({ data, error, onSortBy, status, isFetchingNewPage }) {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] =
    React.useState(false);
  const [associate, setAssociate] = React.useState();
  const { getHeaders, getNextSortValues } = useTable({ columns });

  const handleEdit = (member) => {
    setShowEditModal(true);
    setAssociate(member);
  };

  const handleChangeStatus = (member) => {
    setShowChangeStatusModal(true);
    setAssociate(member);
  };

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
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
    <Box position="relative">
      <LoadingOverlay isActive={isFetchingNewPage} />
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {getHeaders().map((column) => (
              <Th
                userSelect="none"
                key={column.key}
                {...column.getHeaderProps()}
                onClick={() => {
                  const sortValues = getNextSortValues(column);
                  onSortBy(
                    column.accessor,
                    sortValues.isSorted,
                    sortValues.isSortedDesc
                  );
                  column.getHeaderProps().onClick();
                }}
              >
                <Flex
                  alignItems="center"
                  justifyContent={
                    column.getHeaderProps().isNumeric
                      ? "flex-end"
                      : "flex-start"
                  }
                >
                  {column.title}
                  {/* Add a sort direction indicator */}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <ChevronDownIcon ml={1} w={4} h={4} />
                    ) : (
                      <ChevronUpIcon ml={1} w={4} h={4} />
                    )
                  ) : (
                    ""
                  )}
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {data?.data.length === 0 && (
            <Tr>
              <Td colSpan={getHeaders().length}>
                <VStack p={4} my={4} spacing={4}>
                  <Text color="gray.400" fontWeight="medium" fontSize="md">
                    Sin datos que mostrar
                  </Text>
                  <EmptyDataIcon boxSize="4rem" />
                </VStack>
              </Td>
            </Tr>
          )}
          {data?.data.map((member) => (
            <Tr key={member.id_number}>
              <Td w="20%">
                <Stack>
                  <span>
                    {member.name} {member.surname}
                  </span>
                  <Box as="span" fontSize="xs" color="gray.500">
                    {member.mail_id}
                  </Box>
                </Stack>
              </Td>
              <Td isNumeric w="15%">
                {member.national_id}
              </Td>
              <Td isNumeric w="15%">
                {member.ruc}
              </Td>
              <Td w="20%">
                <Stack>
                  <span>{member?.cityName}</span>
                  <Box as="span" fontSize="xs" color="gray.500">
                    {member?.departmentName}
                  </Box>
                </Stack>
              </Td>
              <Td w="20%">
                {formatISODate(member.startDate, "dd-MM-yyyy HH:mm")}
              </Td>
              <Td w="5%" textAlign="center">
                <MemberStatusTag status={member.status} />
              </Td>
              <Td w="5%" textAlign="center">
                <Menu matchWidth placement="bottom-end">
                  <MenuButton
                    fontSize="12px"
                    as={IconButton}
                    icon={<FaEllipsisV />}
                    variant="outline"
                    aria-label="Opciones"
                  ></MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleChangeStatus(member)}>
                      Cambiar Estado
                    </MenuItem>
                    <MenuItem onClick={() => handleEdit(member)}>
                      Editar Miembro
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
          {showEditModal && (
            <EditModal
              closeModal={() => setShowEditModal(false)}
              member={associate}
            />
          )}

          {showChangeStatusModal && (
            <EditStatusModal
              onClose={() => setShowChangeStatusModal(false)}
              member={associate}
            />
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

function SimplePaginator({
  nextPage = () => {},
  pageIndex = 0,
  previousPage = () => {},
  hasMore = false,
  totalElements = 0,
  totalPages = 0,
  isNextDisabled = true,
  isPageLoading = false,
  ...rest
}) {
  const previousPageIndex = pageIndex > 1 ? pageIndex - 1 : pageIndex;
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
              {isPageLoading ? previousPageIndex : pageIndex}
            </Text>{" "}
            de{" "}
            <Text fontWeight="bold" as="span">
              {!hasMore ? pageIndex : totalPages}
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
            isDisabled={isNextDisabled}
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
          bg: "teal.400",
          color: "white",
          borderColor: "teal.400"
        }}
        _focus={{
          boxShadow: "outline"
        }}
        px={2}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}
