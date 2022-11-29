import React, { useEffect, useState } from "react";
// import "./UpdateMat.css";
import { Box, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { CustomAlertDialog } from "../../components/AlertDialog";
import {
  VStack,
  HStack,
  useDisclosure,
  Text,
  useToast,
  Grid,
} from "@chakra-ui/react";

import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/query";
import { useUserStore } from "../../store/user";

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
  const toast = useToast();
  let leftValue = state.item.length - useLength;
  console.log(leftValue);

  const { mutate: finishupdate } = useMutation((send) =>
    api.put(`/update-item`, {
      item_code: send.item.item_code,
      length: leftValue,
    })
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
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => {
          finishupdate(state);
          onClose();
          toast({
            title: "Update Item Finish",
            description: "Item Code : " + object.item_code + "",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/scan-tag");
        }}
        LbuttonPopup="Cancle"
        RbuttonPopup="Confirm"
        ColorRbuttonPopup="twitter"
        HearderFsize="2xl"
        textHeader=<HStack>
          <font> Update raw material </font>
        </HStack>
        textBody=<VStack alignItems="left">
          <Text fontSize="xl">Item code : {object.item_code} </Text>
          <Grid templateColumns="repeat(2, 2fr)" gap={2}>
            <Text fontSize="xl">
              Original {object.length} {object.unit}{" "}
            </Text>
            <Text fontSize="xl">
              Used {useLength} {object.unit}{" "}
            </Text>
            <Text fontSize="xl">
              Left {leftValue} {object.unit}{" "}
            </Text>
          </Grid>
        </VStack>
      />

      <Flex minH={"83vh"} align={"center"} justify={"center"}>
        <Stack spacing={5} py={30} px={15}>
          <HStack
            paddingY="16px"
            paddingLeft="64px"
            paddingRight="16px"
            justify="space-between"
            width="100%"
            marginTop={"50px"}
          >
            <Heading fontSize={"5xl"} color="blue">
              Please update this raw material before put it away
            </Heading>
          </HStack>

          <Box
            borderRadius="15px"
            boxShadow={"lg"}
            p={8}
            width="70%"
            alignSelf={"center"}
          >
            <Text fontSize={"40px"} marginBottom="15px" fontWeight={"bold"}>
              {mapCateName(state.item.item_cate_code)}
            </Text>
            {/* {mapCateName(state.item.item_cate_code)} */}
            <Text fontSize={"35px"} marginBottom="15px">
              Item code : {state.item.item_code}
            </Text>
            <Text fontSize={"35px"} marginBottom="15px">
              Sub category code : {state.item.sub_cate_code}
            </Text>
            <Text fontSize={"35px"} marginBottom="15px">
              Original length : {state.item.length} {state.item.unit}
            </Text>
            <Text fontSize={"30px"} marginBottom="15px">
              How many length do you use? :{" "}
              <Input
                placeholder="0"
                isInvalid
                errorBorderColor="crimson"
                width="100px"
                onChange={(event) => setUseLength(event.currentTarget.value)}
              />{" "}
              meters{" "}
            </Text>
            <Text fontSize={"30px"} marginBottom="15px">
              This item's length would be : {leftValue} {state.item.unit}
            </Text>

            <Stack spacing={10} pt={2} width="100%" alignItems={"center"}>
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
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
