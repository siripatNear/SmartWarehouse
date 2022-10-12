import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import SaveButton from "./Savebutton";

export const roleData = [
  { value: "Operator", label: "Operator" },
  { value: "Forklift", label: "Forklift" },
  { value: "Admin", label: "Admin" },
];

export default function AddUser() {

  /*
  const [firstname, setFirstName] = useState("");
  const [lasttname, setLastName] = useState("");
  const [userid, setUserID] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (event) => {
    event.preventDefault();
    onOpen();
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const handleShowConfirmClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Flex
      minH={"93.2vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white.200", "gray.800")}
    >
      <Stack spacing={5} py={30} px={15}>
        <Stack>
          <Heading fontSize={"4xl"}>Add User</Heading>
        </Stack>
        <Box
          borderRadius="15px"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box width="100%">
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="First Name"
                      onChange={(event) =>
                        setFirstName(event.currentTarget.value)
                      }
                    />
                  </FormControl>
                </Box>
                <Box width="100%">
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      onChange={(event) =>
                        setLastName(event.currentTarget.value)
                      }
                    />
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box width="100%">
                  <FormControl id="userid" isRequired>
                    <FormLabel>User ID</FormLabel>
                    <Input
                      type="text"
                      placeholder="User ID"
                      onChange={(event) => setUserID(event.currentTarget.value)}
                    />
                  </FormControl>
                </Box>
                <Box width="100%" zIndex={2}>
                  <FormControl id="role" isRequired>
                    <FormLabel>Role</FormLabel>
                    <Select
                      options={roleData}
                      placeholder="Role"
                      closeMenuOnSelect={true}
                      onChange={(v) => setRole(v.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={(event) =>
                          setPassword(event.currentTarget.value)
                        }
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        onChange={(event) =>
                          setConfirmPassword(event.currentTarget.value)
                        }
                      />
                      <InputRightElement zIndex={1} width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleShowConfirmClick}
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Box>
              </HStack>

              <Stack spacing={10} pt={2}>
                <SaveButton
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  buttonName="Save"
                  textHeader="add"
                  textBody=<VStack alignItems="left">
                    <Text fontSize="xl">
                      Name : {firstname} {lasttname}
                    </Text>
                    <Text fontSize="xl">User ID : {userid} </Text>
                    <Text fontSize="xl">Role : {role} </Text>
                  </VStack>
                />
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
