import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import "./Search.css";
import { Input } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";

export const section = [
  { value: "Section 1", label: "Section 1" },
  { value: "Section 2", label: "Section 2" },
  { value: "Section 3", label: "Section 3" },
  { value: "Section 4", label: "Section 4" },
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
        <div className="SectionBox">
          <FormLabel>Section</FormLabel>
          <Select
            selectedOptionColor="purple"
            name="Section"
            options={section}
            placeholder="Section"
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
