import { React, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Link as L,
  VStack,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MdOutlineLogout } from "react-icons/md";
import logo from "../assets/logo-kmutt.png";
import { useUserStore } from "../store/user";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const OpLinks = [
  {
    name: "Dashboard",
    link: "/",
  },
  {
    name: "Order list",
    link: "order-list",
  },
  {
    name: "History",
    link: "/history",
  },
];

const NavLink = ({ children }) => (
  <L
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("#DAEFFD", "white"),
    }}
    href={children.link}
  >
    {children.name}
  </L>
);

export default function NavbarOperator() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // show user
  const user = useUserStore((state) => state.user);
  // log out
  const logoutStore = useUserStore((state) => state.removeUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const logout = async () => {
    try {
      await onLogout();

      logoutStore();
      dispatch(unauthenticateUser()); //set isAuth = false
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  // *cookie
  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

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
            >
              {OpLinks.map((link) => (
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
                      {user.user_id}
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
                <MenuItem
                  icon={<MdOutlineLogout size={"30px"} />}
                  onClick={() => logout()}
                >
                  <Text marginLeft={4} fontSize="xl">
                    Log out
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {OpLinks.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
