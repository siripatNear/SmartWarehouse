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
import SaveButton from "../components/Savebutton";

import { onAddUser } from '../api/auth';
import CustomButton from "../components/CustomButton";


const roles = [
  { value: "Operator", label: "Operator" },
  { value: "Forklift", label: "Forklift" },
  { value: "Admin", label: "Admin" },
];


export default function AddUser() {
  
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    user_id: '',
    role: '',
    password: '',
    confirmPassword: '',
    
  });
  const [error,setError] = useState(false);
  const [success,setSuccess] = useState(false);
  
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const onConfirm = async (e) => {
    console.log(values);
    try {
      
      const { data } = await onAddUser(values);
      setError('');
      setSuccess(data.message)
      setValues({
        first_name: '',
        last_name: '',
        user_id: '',
        role: '',
        password: '',
        confirmPassword: '',
        
      })
      onClose(); // close popup window

    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess('');
      onClose(); // close popup window

    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    onOpen(); //call popup
  };
  
  //---------------------------------------
  // pop-up
  const { isOpen, onOpen, onClose } = useDisclosure();
  //show password
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleShowConfirmClick = () => setShowConfirmPassword(!showConfirmPassword);

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
          <form onSubmit={(e) => onSubmit(e)}>
            <Stack spacing={4}>
              <HStack>
                <Box width="100%">
                  <FormControl id="first_name" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input onChange={(e) => onChange(e)}
                      type='text'
                      name='first_name'
                      value={values.first_name}
                      placeholder='First Name'
                    />

                  </FormControl>
                </Box>
                <Box width="100%">
                  <FormControl id="last_name" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input onChange={(e) => onChange(e)}
                      type='text'
                      name='last_name'
                      value={values.last_name}
                      placeholder='Last Name'
                    />
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box width="100%">
                  <FormControl id="user_id" isRequired>
                    <FormLabel>User ID</FormLabel>
                    <Input onChange={(e) => onChange(e)}
                      type='text'
                      name='user_id'
                      value={values.user_id}
                      placeholder='User ID'
                    />

                  </FormControl>
                </Box>
                <Box width="100%" zIndex={2}>
                  <FormControl id="role" isRequired>
                    <FormLabel>Role</FormLabel>
                    <Select
                      options={roles}
                      placeholder="Role"
                      closeMenuOnSelect={true}
                      onChange={(e) => {
                        setValues({...values,role:e.value})
                      }}
                      />

                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id='password' isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={(e) => onChange(e)}
                      />

                      {/* ------------------------------------- */}

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
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={(e) => onChange(e)}
                      />
                      {/* ----------------------------------------- */}

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
              
              {/* //TODO: manage error and success style */}

              <div style={{color:'red', margin: '10px 0'}}>{error}</div>
              <div style={{color:'green', margin: '10px 0'}}>{success}</div>

              { /* ------------------------------------ */}

              <Stack spacing={10} pt={2}>
                <CustomButton
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  onConfirm={onConfirm}
                  buttonName="Save"
                  textHeader="add"
                  textBody=<VStack alignItems="left">
                    <Text fontSize="xl">
                      Name : {values.first_name} {values.last_name}
                    </Text>
                    <Text fontSize="xl">User ID : {values.user_id} </Text>
                    <Text fontSize="xl">Role : {values.role} </Text>
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
