import React, { useEffect, useState } from "react";
import "./UpdateMat.css";
import { Input } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { CustomAlertDialog } from "../../components/AlertDialog";
import { VStack, HStack, useDisclosure, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
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
          <p>Item code : {MockItem[0].item_code}</p>
          <p>Original length : {MockItem[0].og_length} meters</p>
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
            This item's length would be : {MockItem[0].og_length - UseLength}{" "}
            meters
          </p>
        </div>
        <div className="ContainerBtn">
          <CustomButton
            marginX={4}
            onOpen={() => {
              setObject(MockItem[0]);
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
