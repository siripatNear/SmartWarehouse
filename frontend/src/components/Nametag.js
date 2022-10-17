import { Box } from "@chakra-ui/react";
import React from "react";

const Nametag = ({ name = "", userID = "" }) => {
  return (
    <Box
      bg="gray.200"
      w="80%"
      p={4}
      color="black"
      margin={5}
      borderRadius="15px"
      fontSize="xl"
    >
      Name : {name} User ID : {userID}
    </Box>
  );
};

export default Nametag;
