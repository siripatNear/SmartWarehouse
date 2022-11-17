import React, { useState } from "react";
import "./UpdateMat.css";
import { Input } from '@chakra-ui/react'
import CustomButton from "../../components/CustomButton";
import { CustomAlertDialog } from "../../components/AlertDialog";
import {
  VStack,
  HStack,
  useDisclosure,
  Text,
  useToast,
  Grid
} from "@chakra-ui/react";

import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/query";

const mapCateName = (category) => {
  switch (category) {
    case "1":
      return "Kraft";
    case "2":
      return "Bleached";
    case "3":
      return "Glassine";
    case "4":
      return "Wax";
    case "5":
      return "PVC";
    case "6":
      return "Inkjet";
    case "7":
      return "Corrugated";
    default:
      return "";
  }
};

export default function UpdateMat() {

  const [useLength, setUseLength] = useState("");
  const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast()
  let leftValue = state.item.length - useLength;
  console.log(leftValue);

  const {
    mutate: finishupdate,
  } = useMutation(
    (send) =>
      api.put(`/update-item`, {
        item_code: send.item.item_code,
        length: leftValue
      })
  );

  return (
    <>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => {
          finishupdate(state)
          onClose();
          toast({
            title: 'Update Item Finish',
            description: 'Item Code : ' + object.item_code + '',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          navigate("/scan-tag")
        }}
        LbuttonPopup="Cancle"
        RbuttonPopup="Confirm"
        ColorRbuttonPopup="twitter"
        HearderFsize="2xl"
        textHeader=<HStack >
          <font> Update raw material </font>
        </HStack>
        textBody=<VStack alignItems="left">
          <Text fontSize="xl">Item code : {object.item_code} </Text>
          <Grid templateColumns='repeat(2, 2fr)' gap={2}>
            <Text fontSize="xl">Original {object.length} {object.unit}  </Text>
            <Text fontSize="xl">Used {useLength} {object.unit} </Text>
            <Text fontSize="xl">Left {leftValue} {object.unit} </Text>
          </Grid>
        </VStack>
      />

      <div className='ContentUpdateMatPage'>
        <div className='AlertTitle'>
          Please update this raw material before put it away
        </div>
        <div className='ItemName'>
          {mapCateName(state.item.item_cate_code)}
        </div>
        {/* <div className='ItemProperties'>
        </div> */}
        <div className='Original'>
          <p>Item code : {state.item.item_code}</p>
          <p>Sub category code : {state.item.sub_cate_code}</p>
          <p>Original length : {state.item.length} {state.item.unit}</p>
        </div>
        <div className='Update'>
          <p>How many length do you use? : <Input placeholder='0' isInvalid errorBorderColor='crimson' width='100px'
            onChange={(event) =>
              setUseLength(event.currentTarget.value)
            } /> meters </p>
          <p>This item's length would be : {leftValue} {state.item.unit}</p>
        </div>
        <div className='ContainerBtn'>
          <CustomButton
            marginX={4}
            onOpen={() => {
              setObject(state.item);
              onOpen();
            }}
            buttonName="Update"
            buttonColor="twitter"
            HoverColor="twitter.300"
            buttonSize="lg"
            borderRadius="10px"
            fontSize="22px"
            fontWeight="medium"
          />
        </div>
      </div>
    </>
  )
}
