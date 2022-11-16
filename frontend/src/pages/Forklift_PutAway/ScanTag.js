import React, { useState } from "react";
import "./ScanTag.css";
import scanlogo from "../../assets/scanlogo.png";
import Nametag from "../../components/Nametag";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/query";

import CustomButton from "../../components/CustomButton";
import {
  Box,
  Input,
  FormControl,

} from "@chakra-ui/react";

export const warehouseSelect = [
  { value: "A", label: "Warehouse A" },
  { value: "B", label: "Warehouse B" },
  { value: "C", label: "Warehouse C" },
  { value: "D", label: "Warehouse D" },
];

function ScanTag() {

  // Test input Item
  const [warehouse, setWarehouse] = useState("");
  const [inputitem, setInputitem] = useState("");
  const handleChange = (event) => setInputitem(event.target.value)
  const navigate = useNavigate();
  console.log(inputitem);
  console.log(warehouse);

  const {
    mutate: sendItemCode,
    data
  } = useMutation(
    (send) =>
      api.post(`/put-away/${warehouse}`, { item_code: send }),
    {
      onSuccess(result) {
        console.log(result);
        navigate("/put-away", {
          state: result.data
        });
      }

    }
  );

  return (
    <div>
      <div className="Content">
        <Nametag />
        <div className="ScanTagContainer">
          Please! Scan Tag
          <img src={scanlogo} width="300" height="auto" alt="scanlogo" />
        </div>
        <Box display='flex' alignItems='center' justifyContent='center' mb='10px' mt='20px'>
          <FormControl p={2} id="warehouse">
            <select value={warehouse} onChange={event => setWarehouse(event.target.value)}>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
          </FormControl>
          <Input placeholder='Item_code' width='200px' border='2px'
            inputitem={inputitem}
            onChange={handleChange}
          />
        </Box>
        <div className='ContainerBtn'>
          <CustomButton
            onOpen={() =>
              sendItemCode(inputitem)
            }
            marginX={4}
            buttonName="Test Input-Item"
            buttonColor="twitter"
            HoverColor="twitter.300"
            buttonSize="lg"
            borderRadius="10px"
            fontSize="22px"
            fontWeight="medium"
          />
        </div>
      </div>
    </div>
  );
}

export default ScanTag;
