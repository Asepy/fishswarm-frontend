import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AppLayout from "components/ui/layout/AppLayout";
import Container from "components/ui/Container";
import AuthenticationFlow from "components/auth/AuthenticationFlow";
import PageSection from "components/ui/PageSection";
import { useMembersCsv } from "hooks/components";

function Import() {
  return (
    <AuthenticationFlow>
      <AppLayout>
        <Container>
          <CsvReader />
        </Container>
      </AppLayout>
    </AuthenticationFlow>
  );
}

function CsvReader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [csvFile, setCsvFile] = useState();
  const [sql, setSql] = useState("");
  const { csvData, processCSV, generateSql, generateAllSql } = useMembersCsv();
  const [copySuccess, setCopySuccess] = useState("");

  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text); // plugged in here
    };

    reader.readAsText(file);
  };

  const handleGenerateSql = () => {
    const sqlVal = generateAllSql(csvData.rows);
    setSql(sqlVal);
    onOpen();
  };
  const handleClose = () => {
    setSql("");
    setCopySuccess("");
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>SQL</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box maxW="400" overflow="auto">
              <Flex justify="flex-end" align="baseline">
                <Box mr="4">{copySuccess}</Box>
                <CopyToClipboard
                  text={sql}
                  onCopy={() => setCopySuccess("Copiado")}
                >
                  <Button variant="primary">Copiar</Button>
                </CopyToClipboard>
              </Flex>
              <Box mt="4">
                <code>
                  <pre>{sql}</pre>
                </code>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <form id="csv-form">
        <PageSection boxShadow="md" p={4}>
          <Text fontSize="sm">
            Seleccionar archivo CSV con miembros a importar
          </Text>
          <HStack>
            <Input
              type="file"
              accept=".csv"
              id="csvFile"
              size="sm"
              onChange={(e) => {
                setCsvFile(e.target.files[0]);
              }}
            ></Input>
            <Button
              size="sm"
              isDisabled={!csvFile}
              onClick={(e) => {
                e.preventDefault();
                if (csvFile) submit();
              }}
            >
              Procesar CSV
            </Button>
            {csvData && (
              <Button
                variant="primary"
                isDisabled={!csvData}
                onClick={() => handleGenerateSql()}
              >
                Generar SQL
              </Button>
            )}
          </HStack>
        </PageSection>
      </form>
      <PageSection mt="2" overflow="auto" boxShadow="md" py={4}>
        {csvData ? (
          <>
            <Table>
              <Thead>
                <Th key={"actions"}>Acciones</Th>
                {csvData.headers.map((headerName) => (
                  <Th key={headerName}>{headerName}</Th>
                ))}
              </Thead>
              <Tbody>
                {csvData.rows.map((row, first) => (
                  <Tr key={first}>
                    <Td key={`${first}-action`}>
                      <Button size="xs" onClick={() => generateSql(row)}>
                        Importar
                      </Button>
                    </Td>
                    {csvData.headers.map((headerName, second) => (
                      <Td key={`${first}-${second}`}>
                        {row[headerName].value}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        ) : (
          <Text textAlign="center">Sin datos que mostrar</Text>
        )}
      </PageSection>
    </>
  );
}

export default Import;
