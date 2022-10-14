import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  HStack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SearchUser from "../../components/SearchUser";
import { dataUser } from "../../assets/dataUser";
import CustomButton from "../../components/CustomButton";
import { CustomAlertDialog } from "../../components/AlertDialog";

export const header = [
  { value: "userid", label: "User ID" },
  { value: "name", label: "Name" },
  { value: "Role", label: "Role" },
  { value: "  ", label: " " },
];

const UserManage = () => {
  const [object, setObject] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        LbuttonPopup="Cancle"
        RbuttonPopup="Delete"
        ColorRbuttonPopup="red"
        HearderFsize="2xl"
        textHeader=<HStack>
          <font color="red"> Delete </font>
          <font> this user ? </font>
        </HStack>
        textBody=<VStack alignItems="left">
          <Text fontSize="xl">
            Name : {object.first_name} {object.last_name}
          </Text>
          <Text fontSize="xl">User ID : {object.user_id} </Text>
          <Text fontSize="xl">Role : {object.role} </Text>
        </VStack>
      />

      <Flex direction={"column"} alignItems={"center"}>
        <HStack width={"100%"} marginTop="5">
          <Heading
            minWidth={"max-content"}
            fontSize="35px"
            fontWeight="600"
            marginX={8}
          >
            User Management
          </Heading>
          <SearchUser />
        </HStack>

        <VStack width={"100%"} marginTop="5">
          <TableContainer width="70%">
            <Table size="md">
              <Thead>
                <Tr backgroundColor="#C7E8FC">
                  {header.map((head) => (
                    <Th fontSize={16} key={head.value}>
                      {head.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>

              <Tbody>
                {dataUser.map((User) => (
                  <Tr
                    _hover={{
                      backgroundColor: "#ECF7FE",
                    }}
                    key={User.value}
                  >
                    <Td>{User.user_id}</Td>
                    <Td>
                      {User.first_name} {User.last_name}
                    </Td>
                    <Td>{User.role}</Td>
                    <Td textAlign={"center"}>
                      <CustomButton
                        buttonName="Edit"
                        buttonColor="twitter"
                        HoverColor="twitter.300"
                        buttonSize="sm"
                      />

                      <CustomButton
                        marginX={4}
                        onOpen={() => {
                          setObject(User);
                          onOpen();
                        }}
                        onClose={onClose}
                        buttonName="Delete"
                        buttonColor="red"
                        buttonSize="sm"
                        HoverColor="red.300"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Flex>
    </>
  );
};

export default UserManage;
