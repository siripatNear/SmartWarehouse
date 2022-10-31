import React from "react";
import "../pages/OrderList.css";
import * as dayjs from 'dayjs'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,

  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,

} from "@chakra-ui/react";

export const header = [
  { value: "order_id", label: "Order ID" },
  { value: "create_dt", label: "Date Create" },
  { value: "create_time", label: "Time Create" },
  { value: "item", label: "Quantity" },
  { value: "status", label: "Status" },
  { value: "order_by", label: "Order by" },
  { value: "progress_by", label: "Progress by" },
  { value: "operation", label: "Operation" }
];

const mapStatus = (status) => {
  switch (status) {
    case "Not start":
      return (<Badge variant='subtle'
        width="85%"
        textAlign={"center"}
        borderRadius='5px'
        colorScheme='gray'>
        not start
      </Badge>);
    case "In progress":
      return (<Badge variant='subtle'
        width="85%"
        textAlign={"center"}
        borderRadius='5px'
        colorScheme='yellow'>
        in progress
      </Badge>);
    default:
      return "";
  }
};

const BtnDetail = (BtnDetail) => {
  return (<Button
    height="30px"
    borderRadius='7px'
    colorScheme='twitter'>
    detail
  </Button>
  );
};

// const BtnDelete = (BtnDelete) => {
//     return (<Button 
//         height="30px"
//         borderRadius='7px'
//         colorScheme='red'>
//         delete
//     </Button>
//     );
// };

function Delete() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button colorScheme='red' height="30px" onClick={onOpen}>
        delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

const TableOrderlist = (props) => {

  const { Orders } = props

  return (
    <TableContainer width="100%">
      <Table size="md">
        <Thead>
          <Tr >
            {header.map((head) => (
              <Th fontSize={16} key={head.value} textAlign={"center"}>
                {head.label}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {Orders.order_list.map((order) => (
            <Tr
              _hover={{
                backgroundColor: "#ECF7FE",
              }}
              key={order.value}
            >
              <Td textAlign={"center"}>{order.order_id}</Td>
              <Td textAlign={"center"}>{dayjs(order.create_dt).format('DD-MMM-YYYY')}</Td>
              <Td textAlign={"center"}>{dayjs(order.create_dt).format('HH:mm')}</Td>
              <Td textAlign={"center"}>{order.quantity}</Td>
              <Td textAlign={"center"}>{mapStatus(order.order_status)}</Td>
              <Td textAlign={"center"}>{order.ordered_by}</Td>
              <Td textAlign={"center"}>{order.progress_by}</Td>
              {/* <Td textAlign={"center"}>{BtnDetail()} {BtnDelete()}</Td> */}
              <Td textAlign={"center"}>{BtnDetail()} {Delete()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableOrderlist