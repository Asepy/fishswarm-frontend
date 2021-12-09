import React from "react";
import {
  Button,
  Box,
  Table,
  Text,
  Thead,
  Tbody,
  Tooltip,
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
  VStack
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";
import { ImArrowUpRight2 } from "react-icons/im";
import {
  SearchIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@chakra-ui/icons";

import SkeletonLines from "components/ui/SkeletonLines";
import ErrorAlert from "components/ui/ErrorAlert";
import EditModal from "./EditModal";
import { formatISODate } from "utils/helpers/date.helpers";
import { useDepartments, useFilterMemberPaginated, useRubros } from "hooks/api";
import {
  useFocus,
  useTable,
  useForm,
  useSelectMemberStatus,
  useSelectMembershipType
} from "hooks/components";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { MemberStatusBadge } from "./MemberStatusTag";
import EditStatusModal from "./EditStatusModal";
import EmptyDataIcon from "components/ui/svg/EmptyDataIcon";
import MembershipType from "./MembershipType";
import CardRadioGroup from "components/ui/CardRadioGroup";
import PageSection from "components/ui/PageSection";
import { formatDistanceStrict, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import ExportModal from "./ExportModal";
import RubroSelect from "./RubroSelect";

const initialSearchFormValues = {
  searchTerm: "",
  departmentId: "",
  cityId: "",
  status: "",
  rubroId: "",
  membershipType: ""
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
    sortBy,
    status
  } = useFilterMemberPaginated();

  const { departmentResult, citiesResult, updateDepartment } = useDepartments();
  const { rubros } = useRubros();
  const [searchInputRef, setSearchInputFocus] = useFocus();
  const { statusOptions } = useSelectMemberStatus();
  const { membershipTypeOptions } = useSelectMembershipType();
  const [showExportModal, setShowExportModal] = React.useState(false);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    onSearch(values);
  };

  const handleClear = () => {
    resetValues(initialSearchFormValues);
    onClear();
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const { data: departments, status: departmentStatus } = departmentResult;
  const { data: cities, status: citiesStatus } = citiesResult;
  // const { data: rubros, status: rubrosStatus } = rubrosResult;

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
                placeholder="Buscar por cualquier término"
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
              <RubroSelect
                size="xs"
                placeholder="Rubro: Todos"
                name="rubroId"
                value={values.rubroId}
                initialRubros={rubros}
                onChange={updateValue}
                // isDisabled={!rubros}
              ></RubroSelect>
            </HStack>
            <Divider></Divider>
            <HStack>
              <Text fontSize="sm">Membresía</Text>
              <CardRadioGroup
                name="membershipType"
                value={values.membershipType}
                onChange={(value) => updateValueByName("membershipType", value)}
                options={[
                  { value: "", label: "Todos" },
                  ...membershipTypeOptions
                ]}
              />
            </HStack>
            <HStack justify="space-between">
              <HStack>
                <Text fontSize="sm">Estado</Text>
                <CardRadioGroup
                  name="status"
                  value={values.status}
                  onChange={(value) => updateValueByName("status", value)}
                  options={[{ value: "", label: "Todos" }, ...statusOptions]}
                />
              </HStack>
              <HStack>
                <Button
                  rightIcon={<ImArrowUpRight2 />}
                  size="sm"
                  onClick={handleExport}
                  variant="outline"
                  isDisabled={isSearching}
                >
                  Exportar
                </Button>
                {showExportModal && (
                  <ExportModal
                    filterValues={values}
                    sortBy={sortBy}
                    onClose={() => setShowExportModal(false)}
                  />
                )}
                <Button
                  variant="ghost"
                  px={4}
                  h="1.75rem"
                  size="sm"
                  onClick={handleClear}
                >
                  Limpiar
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  type="submit"
                  isLoading={isSearching}
                >
                  Buscar
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

const columns = [
  // Incluye nombre y apellido pero le damos relevancia al apellido
  { title: "Nombre", accessor: "surname", sortable: true },
  { title: "Celular / Correo", accessor: "cellphone", sortable: true },
  {
    title: "Cédula / RUC",
    accessor: "national_id",
    sortable: true
  },

  {
    title: "RUC EMPRENDIMIENTO",
    accessor: "ruc",
    isNumeric: true,
    sortable: true
  },

  {
    title: "Membresía",
    accessor: "membershipType",
    textAlign: "center"
  },
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
                  fontSize=".65rem"
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
              <Td>
                <MemberCell member={member} />
              </Td>
              <Td>
                <Stack>
                  <span>{member?.cellphone}</span>
                  <Box as="span" fontSize="xs" color="gray.500">
                    {member?.mail_id}
                  </Box>
                </Stack>
              </Td>

              <Td>
                <Stack>
                  <span>{member?.national_id}</span>
                  <Box as="span" fontSize="xs" color="gray.500">
                    RUC: {member.personalRuc ? member.personalRuc : "- -"}
                  </Box>
                </Stack>
              </Td>

              <Td isNumeric>{member.ruc}</Td>

              <Td w="5%">
                <MembershipType
                  membershipType={member.membershipType}
                  tooltipEnabled
                />
              </Td>
              <Td textAlign="center">
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

function MemberCell({ member }) {
  const { name, surname, status, startDate } = member;
  return (
    <Stack>
      <Text fontSize="sm">
        {name} {surname}
      </Text>

      <HStack align="flex-start">
        {startDate && (
          <Tooltip
            aria-label="Fecha de registro"
            label={formatISODate(startDate, "dd-MM-yyyy HH:mm")}
          >
            <Box cursor="pointer" as="span" fontSize="xs" color="gray.500">
              Registrado: hace{" "}
              {formatDistanceStrict(parseISO(startDate), new Date(), {
                addSuffix: false,
                locale: es
              })}
            </Box>
          </Tooltip>
        )}
        <span>&#183;</span>
        <MemberStatusBadge textTransform="revert" status={status} />
      </HStack>
    </Stack>
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
