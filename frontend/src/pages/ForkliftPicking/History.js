import {
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { isNil } from "lodash";
import React from "react";
import Nametag from "../../components/Nametag";
import TableHistory from "../../components/TableHistory";

const History = () => {
  const { data, isLoading } = useQuery(["/history-order"]);
  return (
    <>
      <Flex justify={"center"}>
        <Nametag />
      </Flex>
      {isLoading || isNil(data) ? (
        <Center mt="100px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            alignItems
          />
        </Center>
      ) : (
        <VStack>
          <HStack
            paddingY="16px"
            paddingLeft="64px"
            paddingRight="16px"
            justify="space-between"
            width="100%"
          >
            <Heading as="h1">History</Heading>
          </HStack>

          <TableHistory />
        </VStack>
      )}
    </>
  );
};

export default History;
