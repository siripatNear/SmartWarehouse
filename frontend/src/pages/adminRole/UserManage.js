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
  Spinner,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { CustomAlertDialog } from "../../components/AlertDialog";
import _, { isEmpty, isNil } from "lodash";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "../../lib/query";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "chakra-react-select";

export const header = [
  { value: "userid", label: "User ID" },
  { value: "name", label: "Name" },
  { value: "Role", label: "Role" },
  { value: "  ", label: " " },
];

export const roleData = [
  { value: "Operator", label: "Operator" },
  { value: "Forklift", label: "Forklift" },
  { value: "Admin", label: "Admin" },
];

const UserManage = () => {
  //* popup
  const [searchRole, setSearchRole] = useState("");
  const [searchText, setSearchText] = useState("");
  const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredData, setFilteredData] = useState(null);

  //* get data from api
  const { data, isLoading } = useQuery(["/manage-users"]);

  //* delete data from api
  const { mutate, isLoading: isDeleting } = useMutation(
    (v) => api.delete(`/manage-users/${v}`),
    {
      onSuccess() {
        onClose();
        queryClient.invalidateQueries(["/manage-users"]); //* update ui
      },
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(searchRole) && !isEmpty(searchText)) {
      setFilteredData(
        _(data?.users)
          .filter(
            (v) =>
              _(v.role).includes(searchRole.value) &&
              (_(v.first_name + " " + v.last_name)
                .toLower()
                .includes(_(searchText).toLower()) ||
                _(v.user_id).toLower().includes(_(searchText).toLower()))
          )
          .value()
      );
    } else if (!isEmpty(searchRole)) {
      setFilteredData(
        _(data?.users)
          .filter((v) => _(v.role).includes(searchRole.value))
          .value()
      );
    } else if (!isEmpty(searchText)) {
      setFilteredData(
        _(data?.users)
          .filter(
            (v) =>
              _(v.first_name + " " + v.last_name)
                .toLower()
                .includes(_(searchText).toLower()) ||
              _(v.user_id).toLower().includes(_(searchText).toLower())
          )
          .value()
      );
    } else {
      setFilteredData(data?.users);
    }
  }, [data, searchRole, searchText]);

  return (
    <>
      <CustomAlertDialog
        isLoading={isDeleting}
        isOpen={isOpen}
        onConfirm={() => {
          mutate(object.user_id);
        }}
        onClose={onClose}
        LbuttonPopup="No"
        RbuttonPopup="Yes"
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
      {isLoading || isNil(data) || isNil(filteredData) ? (
        <Spinner />
      ) : (
        <Flex direction={"column"} alignItems={"center"}>
          <HStack width={"100%"} marginTop="5">
            <Heading as="h1" minWidth={"max-content"} marginX={8}>
              User Management
            </Heading>
            <HStack flex={1} paddingRight={4}>
              <FormControl width={"30%"} p={2} id="rolesearch">
                <Select
                  isClearable
                  value={searchRole}
                  onChange={setSearchRole}
                  placeholder="Role"
                  closeMenuOnSelect={true}
                  options={roleData}
                />
              </FormControl>
              <FormControl width={"70%"} p={1}>
                <Input
                  type="text"
                  placeholder="Search User ID or Name..."
                  value={searchText}
                  onChange={(v) => setSearchText(v.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack>
              <Button
                marginRight={5}
                colorScheme="whatsapp"
                as={Link}
                to="/add-user"
              >
                ADD USER
              </Button>
            </HStack>
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
                  {filteredData.map((User) => (
                    <Tr
                      _hover={{
                        backgroundColor: "#ECF7FE",
                      }}
                      key={User.user_id}
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
                          borderRadius="5px"
                          fontSize="15px"
                          fontWeight="medium"
                          onOpen={() => navigate("/add-user", { state: User })}
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
                          borderRadius="5px"
                          fontSize="15px"
                          fontWeight="medium"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Flex>
      )}
    </>
  );
};

export default UserManage;
