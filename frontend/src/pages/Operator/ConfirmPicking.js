import React from 'react'
import Nametag from "../../components/Nametag";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/react";

const users = [
    {
      user: "Pathomporn Yinganurakwong",
      id: "0123456789",
    },
  ];

function ConfirmPicking() {
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
              <Heading as="h1">Confirm Picking</Heading>
            </HStack>
    
            {/* <TableFPickingOrder /> */}
          </VStack>
        </>
      );
}

export default ConfirmPicking