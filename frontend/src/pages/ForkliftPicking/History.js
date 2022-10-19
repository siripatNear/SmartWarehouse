import { Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Nametag from "../../components/Nametag";
import TableHistory from "../../components/TableHistory";

const users = [
  {
    user: "Salinthip Talatha",
    id: "0123456789",
  },
];

const History = () => {
  return (
    <>
      <Flex justify={"center"}>
        <Nametag name={users[0].user} userID={users[0].id} />
      </Flex>
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
    </>
  );
};

export default History;
