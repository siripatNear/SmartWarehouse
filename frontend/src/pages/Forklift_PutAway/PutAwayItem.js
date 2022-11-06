import React, { useState } from "react";
import "./PutAwayItem.css";
import GridPutAwayItem from "../../components/GridPutAwayItem.js";
import CustomButton from "../../components/CustomButton";
import { CustomAlertDialog } from "../../components/AlertDialog";
import {
  VStack,
  HStack,
  useDisclosure,
  Text,
  Spinner,
  Center
} from "@chakra-ui/react";

import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";

const MockDataPutAway = [
  {
    "zone": "1",
    "item": "AA-12345",
    "create": "15/07/2022 11:50",
    "quantity": "5 pcs",
    "ordered_by": "Mr.petch",
  },
]

function PutAway() {

  const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useQuery(["/warehouse/A?zone=1"]);
  
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
          <font>Are you sure to Finish put away?</font>
        </HStack>
        textBody=<VStack alignItems="center">
          <Text fontSize="xl">Item : {object.item} </Text>
          <Text fontSize="xl">Create : {object.create} </Text>
          <Text fontSize="xl">Quantity : {object.quantity} </Text>
          <Text fontSize="xl">Ordered by : {object.ordered_by} </Text>
        </VStack>
      />

      {isLoading || isNil(data) ? (
        <Center mt="100px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            alignItems
          />
        </Center>
      ) : (
      <div className='ContentPutAwayItemPage'>
        <div className='ZoneTitle'>
          Zone {MockDataPutAway[0].zone}
        </div>
        <div>
          <GridPutAwayItem itemlist={data}/>
        </div>
        <div className='ContainerContent'>
          <div className='ContainerNoteBox'>
            <div className='NoteBoxInprogress'>
              No.
            </div>
            Inprogress
            <div className='NoteBoxTarget'>
              No.
            </div>
            Target
            <div className='NoteBoxFull'>
              Full
            </div>
            Full
          </div>
          <div className='ContainerBtnFinish'>
            <CustomButton
              marginX={4}
              onOpen={() => {
                setObject(MockDataPutAway[0]);
                onOpen();
              }}
              buttonName="Finish"
              buttonColor="twitter"
              HoverColor="twitter.300"
              buttonSize="lg"
              borderRadius="10px"
              fontSize="20px"
              fontWeight="medium"
            />
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default PutAway