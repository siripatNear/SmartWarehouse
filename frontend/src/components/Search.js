import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import "./Search.css";
import { Input } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
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
    <div className="Container">
      <FormControl p={4} id="search" >

        <div className="WarehouseBox">
          <FormLabel>Warehouse</FormLabel>
          <Select
            name="Warehouse"
            options={warehouse}
            placeholder="Warehouse"
            closeMenuOnSelect={true}
          />
        </div>

        <div className="ZoneBox">
          <FormLabel>Zone</FormLabel>
          <Select
            name="Zone"
            options={zone}
            placeholder="Zone"
            closeMenuOnSelect={true}
          />
        </div>
        <div className="CateBox">
          <FormLabel>Category</FormLabel>
          <Select
            name="Category"
            options={cate}
            placeholder="Category"
            closeMenuOnSelect={true}
          />
        </div>
        <div className="LengthBox">
          <FormLabel>Length</FormLabel>
          <Input type="number" placeholder="Length" />
        </div>
      </FormControl>
      <div className="ButtonBox">
      <IconButton
      colorScheme='blue'
      aria-label='Search database'
      icon={<SearchIcon />}
      type="submit" 
      form="search" 
      value="Submit"
      />
      </div>
    </div>
    
  );
};
export default Search;
