import React from "react";
import { FormControl, HStack, Button } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export const roleData = [
  { value: "Operator", label: "Operator" },
  { value: "Forklift", label: "Forklift" },
  { value: "Admin", label: "Admin" },
];

const SearchUser = () => {
  return (
    <>
      <form style={{ flex: 1 }}>
        <HStack flex={1} paddingRight={8}>
          <FormControl width={"30%"} p={4} id="rolesearch">
            <Select
              name="Role"
              options={roleData}
              placeholder="Role"
              closeMenuOnSelect={true}
            />
          </FormControl>

          <FormControl width={"70%"} p={4}>
            <Input type="text" placeholder="Search User ID or Name..." />
          </FormControl>
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<SearchIcon />}
            type="submit"
            form="search"
          />
        </HStack>
      </form>
      <Button
        marginRight={4}
        marginLeft={3}
        colorScheme="whatsapp"
        as={Link}
        to="/add-user"
      >
        ADD USER
      </Button>
    </>
  );
};
export default SearchUser;
