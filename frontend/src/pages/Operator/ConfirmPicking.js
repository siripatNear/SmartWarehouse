import React from 'react'
import Nametag from "../../components/Nametag";
import { Flex, Heading, HStack, VStack, Box, Spinner, Center} from "@chakra-ui/react";
import TablePickingList from "../../components/TablePickingList";
import CustomButton from "../../components/CustomButton";

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
            <TablePickingList itemlists={data} />
            <Box
              alignSelf="flex-end"
              display="flex"
              paddingRight="16px"
              paddingTop="20px"
              paddingBottom="20px"
              gap="20px"
            >
              <CustomButton
                // onOpen={onOpenDialog}
                buttonName="Back"
                buttonColor="red"
                buttonSize="lg"
              // disabledSubmit
              />
              <CustomButton
                // onOpen={onOpenDialog}
                buttonName="Save"
                buttonColor="twitter"
                buttonSize="lg"
              // disabledSubmit
              />
            </Box>
          </VStack>
        </div>
      )}
    </>
  );
}

export default ConfirmPicking