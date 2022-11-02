import { Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Nametag from "../../components/Nametag";
import TableFPickingOrder from "../../components/TableFPickingOrder";

const PickingOrderList = () => {
  return (
    <>
      <Flex justify={"center"}>
        <Nametag />
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
