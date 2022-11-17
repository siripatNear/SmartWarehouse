import React, { useEffect } from "react";
import {
  Flex,
  Heading,
  HStack,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Nametag from "../../components/Nametag";
import TableFPickingOrder from "../../components/TableFPickingOrder";

import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";

const PickingOrderList = () => {
  const { data: orders, isLoading } = useQuery(["/order-list"]);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user.role === "Admin") {
      navigate("/");
    }
    if (user.role === "Operator") {
      navigate("/");
    }
  }, [navigate, user]);

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

            <TableFPickingOrder orders={orders} />
          </VStack>
        </div>
      )}
    </>
  );
};

export default PickingOrderList;
