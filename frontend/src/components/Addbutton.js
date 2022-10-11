import { AlertDialog, 
  AlertDialogBody, 
  AlertDialogContent, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogOverlay, 
  Button, 
  useDisclosure, 
 } from '@chakra-ui/react'
import React from 'react'


function AddAlert() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button 
      colorScheme='green' 
      onClick={onOpen}
      _hover={{
        bg: "green.500",
      }}
      >
        Add
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>

            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Please Select Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Please select item before click this button
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>

          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
export default AddAlert


// function CreateButton() {
//   const toast = useToast()
//   return (
//     <Button
//       onClick={() =>
//         toast({
//           title: 'Account created.',
//           description: "We've created your account for you.",
//           status: 'success',
//           duration: 9000,
//           isClosable: true,
//         })
//       }
//     >
//       Show Toast
//     </Button>
//   )
// }
// export default CreateButton
