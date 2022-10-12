import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import logo from "../assets/logo-kmutt.png";
import { onLogin } from "../api/auth";
import { useDispatch } from 'react-redux';
import { authenticateUser } from "../redux/slices/authSlice";

export default function Login() {

  const [values, setValues] = useState({
    user_id: '',
    password: ''

  });
  const [error, setError] = useState(false);
  const [success,setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    try {

      const { data } = await onLogin(values);
      dispatch(authenticateUser())
      localStorage.setItem('isAuth','true')

      setSuccess(data.message)
      console.log(success);

    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }

  }

  //-------------------------------------------------------------

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      minH={"93.2vh"}
      align={"center"}
      justify={"center"}
      bgGradient="linear(to-r, #B5E0FB, #E3F3FD, #ECF7FE)"
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        align={"center"}
      >

        <Stack align={"center"}>
          <img src={logo} alt="logo" height="auto" width="350px" />
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
        </Stack>
        <Box borderRadius="15px" boxShadow={"lg"} p={10} bgColor="white">
          <form onSubmit={(e) => onSubmit(e)}>
            <Stack spacing={4}>
              <FormControl id="user_id" isRequired>
                <FormLabel>User ID</FormLabel>
                <Input
                  type="text"
                  placeholder="User ID"
                  name='user_id'
                  value={values.user_id}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name='password'
                    value={values.password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* //TODO: manage error and success style */}

              <div style={{color:'red', margin: '5px 0'}}>{error}</div>

              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
