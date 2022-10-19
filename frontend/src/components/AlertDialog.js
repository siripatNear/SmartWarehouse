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

export const CustomAlertDialog = ({
  textHeader = "",
  textBody = "",
  LbuttonPopup = "",
  RbuttonPopup = "",
  ColorRbuttonPopup = "",
  HearderFsize = "",
  isOpen,
  onClose,
  onConfirm,
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
          <AlertDialogHeader fontSize={HearderFsize} marginTop="18px">
            {textHeader}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{textBody}</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>{LbuttonPopup}</Button>
            <Button colorScheme={ColorRbuttonPopup} ml={3} onClick={onConfirm}>
              {RbuttonPopup}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
