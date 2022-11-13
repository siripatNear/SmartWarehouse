import React, { useState } from "react";
import { FormControl, HStack } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import produce from "immer";

export const warehouseSelect = [
  { value: "A", label: "Warehouse A" },
  { value: "B", label: "Warehouse B" },
  { value: "C", label: "Warehouse C" },
  { value: "D", label: "Warehouse D" },
];

export const zoneSelect = [
  { value: "1", label: "Zone 1" },
  { value: "2", label: "Zone 2" },
  { value: "3", label: "Zone 3" },
  { value: "4", label: "Zone 4" },
  { value: "5", label: "Zone 5" },
  { value: "6", label: "Zone 6" },
];

export const cate = [
  { value: "1", label: "Kraft" },
  { value: "2", label: "Bleached" },
  { value: "3", label: "Glassine" },
  { value: "4", label: "Wax" },
  { value: "5", label: "PVC" },
  { value: "6", label: "Inkjet" },
  { value: "7", label: "Corrugated" },
];

const Search = ({
  warehouse = null,
  setWarehouse = () => null,
  zone = null,
  setZone = () => null,
  category = null,
  setCategory = () => null,
}) => {
  return (
    <form style={{ width: "100%" }}>
      <HStack width={"100%"} paddingRight={4} paddingTop={4}>
        <FormControl p={2} id="warehouse">
          <Select
            name="Warehouse"
            options={warehouseSelect}
            placeholder="Warehouse"
            value={warehouse}
            closeMenuOnSelect={true}
            onChange={setWarehouse}
          />
        </FormControl>

        <FormControl>
          <Select
            name="Zone"
            options={zoneSelect}
            placeholder="Zone"
            closeMenuOnSelect={true}
            value={zone}
            onChange={setZone}
            isClearable
          />
        </FormControl>

        <FormControl>
          <Select
            name="Category"
            options={cate}
            placeholder="Category"
            closeMenuOnSelect={true}
            value={category}
            onChange={setCategory}
            isClearable
          />
        </FormControl>

        <FormControl p={2} id="length">
          <Input type="text" placeholder="Search Sub Category" />
        </FormControl>
        {/* <IconButton
          colorScheme="blue"
          aria-label="Search database"
          icon={<SearchIcon />}
          type="submit"
          form="search"
        /> */}
      </HStack>
    </form>
  );
};
export default Search;
