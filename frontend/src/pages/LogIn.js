import * as React from "react";
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

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
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
          <Heading fontSize={"2xl"}>Log in to your account</Heading>
        </Stack>

        <Box borderRadius="15px" boxShadow={"lg"} p={10} bgColor="white">
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>User ID</FormLabel>
              <Input type="text" placeholder="User ID" />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
