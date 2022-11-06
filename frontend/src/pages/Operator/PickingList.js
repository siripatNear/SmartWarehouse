import React from "react";
import {
  Button,
  HStack,
  VStack,
  Heading,
  Box,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Search from "../../components/Search";
import BoxAll from "../../components/BoxAll";
import CustomButton from "../../components/CustomButton";
import TablePickingList from "../../components/TablePickingList";

import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PickingList = () => {
  const { data, isLoading } = useQuery(["/warehouse/A?zone=1"]);
  const navigate = useNavigate();

  return (
    <>
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
        <HStack align="flex-start">
          <VStack width="70%">
            <Search />
            <HStack
              paddingY="16px"
              paddingLeft="32px"
              paddingRight="16px"
              justify="space-between"
              width="100%"
            >
              <Heading as="h1">Zone {data.zone}</Heading>
              <Button
                colorScheme="twitter"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Show All
              </Button>
            </HStack>
            <TablePickingList itemlists={data} />
            <Box
              alignSelf="flex-end"
              display="flex"
              paddingRight="16px"
              paddingTop="20px"
              paddingBottom="20px"
              gap="10px"
            >
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Please select item!</AlertTitle>
                <AlertDescription>before click "Add" button</AlertDescription>
              </Alert>
              <CustomButton
                // onOpen={onOpenDialog}
                buttonName="Add"
                buttonColor="twitter"
                buttonSize="lg"
                // disabledSubmit
              />
            </Box>
          </VStack>
          <Box width="30%" paddingTop="160px">
            <BoxAll data={data} />
          </Box>
        </HStack>
      )}
    </>
  );
};
export default PickingList;
