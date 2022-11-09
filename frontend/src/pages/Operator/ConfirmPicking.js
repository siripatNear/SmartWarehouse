import React from 'react'
import Nametag from "../../components/Nametag";
import { Flex, Heading, HStack, VStack, Spinner, Center} from "@chakra-ui/react";
import TablePickingListConfirm from "../../components/TablePickingListConfirm";

import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function ConfirmPicking() {

  const { data, isLoading } = useQuery(["/warehouse/A?zone=1"]);

  return (
    <>
      {isLoading || isNil(data) ? (
        <Center mt='100px'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
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
              <Heading as="h1">Confirm Picking</Heading>
            </HStack>
            <TablePickingListConfirm itemlists={data} />
          </VStack>
        </div>
      )}
    </>
  );
}

export default ConfirmPicking