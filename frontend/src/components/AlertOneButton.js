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
  
  export const CustomAlertOneButton = ({
    textHeader = "",
    textBody = "",
    buttonPopup = "",
    ColorbuttonPopup = "",
    HearderFsize = "",
    isOpen,
    onClose,
    onConfirm
  }) => {
  
    return (
      <>
        <AlertDialog
          motionPreset="slideInBottom"
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent borderRadius="15px">
            <AlertDialogHeader  fontSize={HearderFsize}>
              {textHeader}
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>{textBody}</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme={ColorbuttonPopup} ml={3} onClick={onConfirm}>
                {buttonPopup}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };
  