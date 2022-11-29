import React, { useEffect, useState } from "react";
import "./ScanTag.css";
import scanlogo from "../../assets/scanlogo.png";
import Nametag from "../../components/Nametag";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/query";
import { useUserStore } from "../../store/user";
import { isEmpty } from "lodash";

import CustomButton from "../../components/CustomButton";
import {
  Box,
  Input,
  Button,
  VStack,
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
  } = useMutation(
    (send) =>
      api.post(`/put-away/${warehouse}`, { item_code: send }),
    {
      onSuccess(result) {
        console.log(result);
        if (result.data.target) {
          console.log('new coming');
          navigate("/put-away", {
            state: result.data
          });
        } else {
          console.log('update');
          navigate("/update-mat", {
            state: result.data
          });
        }
      }
    }
  );

  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user.role === "Admin") {
      navigate("/");
    }
    if (user.role === "Operator") {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <>
      {isEmpty(warehouse) ?
        <VStack mt='10px' spacing={5}>
          <Nametag />
          <Button colorScheme='twitter' variant='outline' borderRadius='50px' height='75px' width='300px' fontSize='30px'
            onClick={() => {
              setWarehouse("A");
            }}
          >
            Warehouse A
          </Button>
          <Button colorScheme='twitter' variant='outline' borderRadius='50px' height='75px' width='300px' fontSize='30px'
            onClick={() => {
              setWarehouse("B");
            }}
          >
            Warehouse B
          </Button>
          <Button colorScheme='twitter' variant='outline' borderRadius='50px' height='75px' width='300px' fontSize='30px'
            onClick={() => {
              setWarehouse("C");
            }}
          >
            Warehouse C
          </Button>
          <Button colorScheme='twitter' variant='outline' borderRadius='50px' height='75px' width='300px' fontSize='30px'
            onClick={() => {
              setWarehouse("D");
            }}
          >
            Warehouse D
          </Button>
        </VStack>
        : (
          <div>
            <div className="Content">
              <Nametag />
              <div className="ScanTagContainer">
                Please! Scan Tag
                <img src={scanlogo} width="300" height="auto" alt="scanlogo" />
              </div>
              <Box display='flex' alignItems='center' justifyContent='center' mb='10px' mt='20px'>
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
        )}
    </>
  );
}

export default ScanTag;
