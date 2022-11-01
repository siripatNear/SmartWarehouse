import { Box, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { useUserStore } from "../store/user";

const Nametag = ({ name = "", userID = "" }) => {
  const user = useUserStore((state) => state.user);
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
          {user.first_name} {user.last_name}
        </Text>
        <Text>&nbsp;&nbsp;&nbsp;</Text>
        <Text>
          <b>User ID : </b>
          {user.user_id}
        </Text>
      </HStack>
    </Box>
  );
};

export default Nametag;
