import React, { useEffect, useState } from "react";
import "./UpdateMat.css";
import { Input } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { CustomAlertDialog } from "../../components/AlertDialog";
import {
  VStack,
  HStack,
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/query";
import { useUserStore } from "../../store/user";

const MockItem = [
  {
    name: "Kraft Paper",
    size: "100gsm. 420mm",
    type: "smooth, brown",
    item_code: "AA-125464",
    og_length: 200,
  },
];

export default function UpdateMat() {
  const [UseLength, setUseLength] = useState("");
  const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, isLoading } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

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
        LbuttonPopup="Cancle"
        RbuttonPopup="Confirm"
        ColorRbuttonPopup="twitter"
        HearderFsize="2xl"
        textHeader=<HStack>
          <font> Update raw material </font>
        </HStack>
        textBody=<VStack alignItems="left">
          <Text fontSize="xl">Item code : {object.item_code} </Text>
          <Text fontSize="xl">
            Original {object.og_length}m. used 80m. left 120m.{" "}
          </Text>
        </VStack>
      />

      <div className="ContentUpdateMatPage">
        <div className="AlertTitle">
          Please update this raw material before put it away
        </div>
        <div className="ItemName">{MockItem[0].name}</div>
        <div className="ItemProperties">
          {MockItem[0].size} {MockItem[0].type}
        </div>
        <div className="Original">
          <p>Item code : {state.item.item_code}</p>
          <p>Original length : {state.item.lengh} meters</p>
        </div>
        <div className="Update">
          <p>
            How many length do you use? :{" "}
            <Input
              placeholder="0"
              isInvalid
              errorBorderColor="crimson"
              width="100px"
              onChange={(event) => setUseLength(event.currentTarget.value)}
            />{" "}
            meters{" "}
          </p>
          <p>
            This item's length would be : {state.item.lengh - UseLength} meters
          </p>
        </div>
        <div className="ContainerBtn">
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
  );
}
