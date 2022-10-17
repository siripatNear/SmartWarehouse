import { Flex } from "@chakra-ui/react";
import React from "react";
import Nametag from "../../components/Nametag";

const users = [
  {
    user: "Mr.Petch",
    id: "0123456789",
  },
];

const PickingOrderList = () => {
  return (
    <>
      <Flex justify={"center"}>
        <Nametag name={users[0].user} userID={users[0].id} />
        {/* <Nametag /> */}
      </Flex>
    </>
  );
};

export default PickingOrderList;
