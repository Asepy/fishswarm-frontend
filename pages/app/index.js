import React from "react";
import AppLayout from "components/ui/layout/AppLayout";
import Container from "components/ui/Container";
import AuthenticationFlow from "components/auth/AuthenticationFlow";
import {
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
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";
import useFilterMember from "utils/useFilterMember";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function index() {
  const { data, refetch, isLoading, error } = useFilterMember();

  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <AuthenticationFlow>
      <AppLayout>
        <Container>
          <Heading size="md">Últimos socios registrados</Heading>
          <Stack mt={8}>
            <SkeletonText isLoaded={!isLoading} noOfLines={4} spacing="4">
              {error && <Text color="red.500">{error.message}</Text>}
              {data && <MemberList members={data.data} />}
            </SkeletonText>
          </Stack>
        </Container>
      </AppLayout>
    </AuthenticationFlow>
  );
}

function MemberList({ members }) {
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
        {members.map((member) => (
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

export default index;
