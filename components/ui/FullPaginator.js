import React from "react";
import {
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from "@chakra-ui/icons";

export default function FullPaginator({
  gotoPage = () => {},
  nextPage = () => {},
  pageIndex = 0,
  pageTotal = 10,
  previousPage = () => {},
  hasMore = false
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
