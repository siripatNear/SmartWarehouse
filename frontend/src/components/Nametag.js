import { Box, Text, HStack } from "@chakra-ui/react";
import React from "react";

const Nametag = ({ name = "", userID = "" }) => {
  return (
    <Box
      bg="#E3F3FD"
      w="70%"
      p={4}
      color="black"
      margin={5}
      borderRadius="15px"
      fontSize="xl"
      justifyItems={"center"}
    >
      <HStack justify={"center"}>
        <Text>
          <b> Name : </b>
          {name}
        </Text>
        <Text>&nbsp;&nbsp;&nbsp;</Text>
        <Text>
          <b>User ID : </b>
          {userID}
        </Text>
      </HStack>
    </Box>
  );
};

export default Nametag;
