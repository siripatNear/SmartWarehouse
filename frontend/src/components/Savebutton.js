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
  textHeader = "",
  textBody = "",
  isOpen,
  onOpen,
  onClose,
  onConfirm,
}) {
  const cancelRef = React.useRef();

  return (
    <>
      <Button
        type="submit"
        colorScheme="green"
        loadingText="Submitting"
        size="lg"
        bg={"green"}
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
          <AlertDialogHeader fontSize={"2xl"}>
            <font color="green">Confirm</font> to {textHeader} this user
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{textBody}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={onConfirm} ml={3}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SaveButton;
