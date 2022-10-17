import { Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Nametag from "../../components/Nametag";
import TableFPickingOrder from "../../components/TableFPickingOrder";

const users = [
  {
    user: "Pathomporn Yinganurakwong",
    id: "0123456789",
  },
];

const PickingOrderList = () => {
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
          <Heading as="h1">Order List</Heading>
        </HStack>

        <TableFPickingOrder />
      </VStack>
    </>
  );
};

export default PickingOrderList;
