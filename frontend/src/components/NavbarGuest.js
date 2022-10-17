import { React } from "react";
import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import logo from "../assets/logo-kmutt.png";

export default function NavbarGuest() {
  return (
    <>
      <Box bg={useColorModeValue("#A3D9FB", "#A3D9FB")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={9} alignItems={"center"}>
            <img
              src={logo}
              width="200"
              height="auto"
              alt="Smart Warehouse"
              className="Logo"
            />

            <HStack
              as={"nav"}
              spacing={15}
              display={{ base: "none", md: "flex" }}
              fontSize="xl"
            ></HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
