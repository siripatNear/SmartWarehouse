import { React } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/logo-kmutt.png";
// import { Link as RouterLink } from "react-router-dom";

// const Links = ["Dashboard", "Orderlist", "Report"];
const Links = [
  {
    name: "Dashboard",
    link: "/",
  },
  {
    name: "Order list",
    link: "orderlist",
  },
  {
    name: "Report",
    link: "report",
  },
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("#DAEFFD", "white"),
    }}
    href={children.link}
    // as={RouterLink}
    // to="search"
  >
    {children.name}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("#A3D9FB", "#A3D9FB")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href="/">
              <div>
                <img
                  src={logo}
                  width="200"
                  height="auto"
                  alt="Smart Warehouse"
                  className="Logo"
                />
              </div>
            </Link>

            <HStack
              as={"nav"}
              spacing={6}
              display={{ base: "none", md: "flex" }}
              fontSize="xl"
            >
              {Links.map((link) => (
                <NavLink key={link.name}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size="sm" bg="#618296" />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text marginLeft={4} fontSize="xl">
                      u071819
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>
                  <LogoutIcon />
                  <Text marginLeft={4} fontSize="xl">
                    {" "}
                    Sign out{" "}
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
