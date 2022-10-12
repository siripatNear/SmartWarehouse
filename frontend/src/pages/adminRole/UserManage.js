import {  Flex,  Heading } from "@chakra-ui/react";
import React from "react";
import SearchUser from "../../components/SearchUser";
// import Search from "../../components/Search";

const UserManage = () => {
  return (
    <Flex alignItems={"center"}>
      <Heading
        minWidth={"max-content"}
        fontSize="35px"
        fontWeight="600"
        marginX={8}
      >
        User Management
      </Heading>
      <SearchUser />
    </Flex>
  );
};

export default UserManage;
