import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

function SaveButton({
  buttonName = "",
  buttonColor = "",
  textHeader = "",
  textBody = "",
  LbuttonPopup = "",
  RbuttonPopup = "",
  ColorRbuttonPopup = "",
  HearderFsize = "",
  isOpen,
  onOpen,
  onClose,
}) {
  const cancelRef = React.useRef();

  return (
    <>
      <Button
        type="submit"
        colorScheme={buttonColor}
        loadingText="Submitting"
        size="lg"
        color={"white"}
        _hover={{
          bg: "green.500",
        }}
      >
        {buttonName}
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent borderRadius="15px">
          <AlertDialogHeader fontSize={HearderFsize}>
            {textHeader}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{textBody}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {LbuttonPopup}
            </Button>
            <Button colorScheme={ColorRbuttonPopup} ml={3}>
              {RbuttonPopup}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SaveButton;
