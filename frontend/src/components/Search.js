import React from "react";
import { FormControl, FormLabel, HStack } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const warehouse = [
  { value: "Warehouse 1", label: "Warehouse 1" },
  { value: "Warehouse 2", label: "Warehouse 2" },
  { value: "Warehouse 3", label: "Warehouse 3" },
  { value: "Warehouse 4", label: "Warehouse 4" },
];

export const zone = [
  { value: "Zone 1", label: "Zone 1" },
  { value: "Zone 2", label: "Zone 2" },
  { value: "Zone 3", label: "Zone 3" },
  { value: "Zone 4", label: "Zone 4" },
  { value: "Zone 5", label: "Zone 5" },
  { value: "Zone 6", label: "Zone 6" },
];

export const cate = [
  { value: "kraft", label: "Kraft" },
  { value: "bleached", label: "Bleached" },
  { value: "glassine", label: "Glassine" },
  { value: "wax", label: "Wax" },
  { value: "pvc", label: "PVC" },
  { value: "inkjet", label: "Inkjet" },
  { value: "corrugated", label: "Corrugated" },
];

const Search = () => {
  return (
    <form style={{ width: "100%" }}>
      <HStack width={"100%"} paddingRight={8}>
        <FormControl p={4} id="warehouse">
          <FormLabel>Warehouse</FormLabel>
          <Select
            name="Warehouse"
            options={warehouse}
            placeholder="Warehouse"
            closeMenuOnSelect={true}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Zone</FormLabel>
          <Select
            name="Zone"
            options={zone}
            placeholder="Zone"
            closeMenuOnSelect={true}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            name="Category"
            options={cate}
            placeholder="Category"
            closeMenuOnSelect={true}
          />
        </FormControl>

        <FormControl p={4} id="length">
          <FormLabel>Length</FormLabel>
          <Input type="text" placeholder="Search Length" />
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
  );
};
export default Search;
