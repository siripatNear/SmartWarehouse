import { Select } from "@chakra-ui/react";
import React from "react";

export default function Search() {
  return (
    <div>
      <Select>
        <option selected hidden disabled value="">
          Placeholder
        </option>
        <option value="a1">a1</option>
        <option value="b2">b2</option>
        <option value="c3">c3</option>
        <option value="c4">c4</option>
        <option value="c5">c5</option>
      </Select>
    </div>
  );
}
