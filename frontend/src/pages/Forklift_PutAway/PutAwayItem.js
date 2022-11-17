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
  Center,
  useToast,
  Grid,
} from "@chakra-ui/react";

import { isNil } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/query";

function PutAway() {

  const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, isLoading } = useLocation();
  const navigate = useNavigate();
  const toast = useToast()

  const {
    mutate: finishputaway,
  } = useMutation(
    (send) =>
    api.put(`/put-away-finish`, {
      item_code: send.item.item_code,
      item_status: send.item.item_status,
      position_code: send.target.position_code
    })
  );

  return (
    <>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => {
          finishputaway(state)
          onClose();
          toast({
            title: 'Put Away Finish',
            description: 'Position Code : ' + state.target.position_code + '',
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
        textHeader=<HStack>
          <font>Are you sure to Finish put away?</font>
        </HStack>
        textBody=<VStack alignItems="center">
          <Text fontSize="xl">Item Code : {object.item.item_code} </Text>
          <Text fontSize="xl">Position Code : {object.target.position_code} </Text>
          <Grid templateColumns='repeat(2, 2fr)' gap={2}>
            <Text fontSize="xl">Zone : {object.target.zone} </Text>
            <Text fontSize="xl">Section : {object.target.section} </Text>
            <Text fontSize="xl">Colum : {object.target.col_no} </Text>
            <Text fontSize="xl">Floor : {object.target.floor_no} </Text>
          </Grid>
        </VStack>
      />
      {isLoading || isNil(state) ? (
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
            Zone {state.target.zone}
          </div>
          <div>
            <GridPutAwayItem itemlist={state} />
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
                  setObject(state);
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