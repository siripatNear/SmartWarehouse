import React from "react";
import TableOrderlist from "../components/TableOrderlist";
import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import {
  Spinner,
  Center,
  Heading,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import Nametag from "../components/Nametag";

const OrderList = () => {
  const { data: orders, isLoading } = useQuery(["/order-list"]);

  return (
    <>
      {isLoading || isNil(orders) ? (
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
        <div>
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

            <TableOrderlist orders={orders} />
          </VStack>
        </div>
      )}
    </>
  );
};

export default OrderList;
