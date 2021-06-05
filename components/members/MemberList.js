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
  Tag,
  Divider,
  useRadio,
  useRadioGroup
} from "@chakra-ui/react";

import { AiOutlineUserDelete } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
import {
  EditIcon,
  SearchIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@chakra-ui/icons";

import { useFilterMemberPaginated } from "utils/useFilterMember";

import SkeletonLines from "components/ui/SkeletonLines";
import ErrorAlert from "components/ui/ErrorAlert";
import EditModal from "./EditModal";
import DeactivateModal from "./DeactivateModal";
import getUIMemberStatus from "utils/getUIMemberStatus";
import { formatISODate } from "utils/formatDate";
import useDepartments from "utils/useDepartments";
import useForm from "utils/useForm";
import useFocus from "utils/useFocus";
import useTable from "utils/useTable";
import LoadingOverlay from "components/ui/LoadingOverlay";

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
    isFetching,
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

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    console.log("values :: ", values);
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
      <Tabs py={2}>
        <TabList>
          <Tab>Miembros</Tab>
        </TabList>
      </Tabs>
      <Stack spacing={6} mt={2}>
        <form id="form" onSubmit={handleSubmitSearch}>
          <PageSection spacing={4} px={6} py={4}>
            <Text fontSize="sm">Buscar Miembros</Text>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                variant="outline"
                type={"text"}
                placeholder="Buscar por CI, Nombre, Apellido o RUC"
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
                onChange={(e) => {
                  updateDepartment(e);
                  values.departmentId = e.target.value;
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
                options={[
                  { value: "PENDING", label: "Pendiente" },
                  { value: "ACTIVE", label: "Activo" },
                  { value: "INACTIVE", label: "Inactivo" },
                  { value: "CONDITIONAL", label: "Condicional" }
                ]}
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
            pageTotal={data?.pageTotal}
            totalElements={data?.total}
            px={4}
          />
        </PageSection>
      </Stack>
    </Box>
  );
}

function PageSection(props) {
  return <Stack boxShadow="md" {...props} />;
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
  const [showDeactivateModal, setShowDeactivateModal] = React.useState(false);
  const [associate, setAssociate] = React.useState();
  const { getHeaders, getNextSortValues } = useTable({ columns });
  const handleEdit = (member) => {
    setShowEditModal(true);
    setAssociate(member);
  };

  const handleDeactivate = (member) => {
    setShowDeactivateModal(true);
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
          <LoadingOverlay isActive={isFetchingNewPage} />
          {data?.data.map((member) => (
            <Tr key={member.id_number} w="20%">
              <Td>
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
                <StatusCell status={member.status} />
              </Td>
              <Td w="5%" textAlign="center">
                <Menu matchWidth>
                  <MenuButton
                    fontSize="12px"
                    as={IconButton}
                    icon={<FaEllipsisV />}
                    variant="outline"
                    aria-label="Opciones"
                  ></MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => handleEdit(member)}
                      icon={<EditIcon></EditIcon>}
                    >
                      Editar
                    </MenuItem>
                    <MenuItem
                      isDisabled={member.status === "INACTIVE"}
                      onClick={() => handleDeactivate(member)}
                      icon={<AiOutlineUserDelete />}
                    >
                      Desactivar
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
          {showDeactivateModal && (
            <DeactivateModal
              associate={associate}
              closeModal={() => setShowDeactivateModal(false)}
              text="¿Está seguro que desea desactivar al usuario?"
            />
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

function StatusCell({ status }) {
  const uiStatus = getUIMemberStatus(status);
  return (
    <Tag borderRadius="full" colorScheme={uiStatus.color}>
      {uiStatus.label}
    </Tag>
  );
}

function SimplePaginator({
  nextPage = () => {},
  pageIndex = 0,
  pageTotal = 10,
  previousPage = () => {},
  hasMore = false,
  totalElements = 0,
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
