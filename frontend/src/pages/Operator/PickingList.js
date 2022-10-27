import React from "react";
import { Button, HStack, VStack, Heading, Box } from "@chakra-ui/react";

import BoxAll from "../../components/BoxAll";
import TablePickingList from "../../components/TablePickingList";
import Search from "../../components/Search";
import AddAlert from "../../components/Addbutton";
import { useNavigate } from "react-router-dom";

const PickingList = () => {
  const navigate = useNavigate();
  return (
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
          <Heading as="h1">Zone 4</Heading>
          <Button
            colorScheme="twitter"
            variant="outline"
            onClick={() => navigate("/")}
          >
            Show All
          </Button>
        </HStack>
        <TablePickingList />
        <Box
          alignSelf="flex-end"
          paddingRight="16px"
          paddingTop="20px"
          paddingBottom="20px"
        >
          <AddAlert />
        </Box>
      </VStack>
      <Box width="30%" paddingTop="160px">
        <BoxAll />
      </Box>
    </HStack>
  );
};
export default PickingList;
