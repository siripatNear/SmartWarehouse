import React from "react";
import "../pages/OrderList.css";
import orderlists from "../assets/mock_data.json";
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
} from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'

export const header = [
  { value: "no", label: "No" },
  { value: "order_id", label: "Order ID" },
  { value: "create_dt", label: "Date Create" },
  { value: "create_time", label: "Time Create" },
  { value: "item", label: "Item" },
  { value: "status", label: "Status" },
  { value: "order_by", label: "Order by" },
  { value: "progress_by", label: "Progress by" },
  { value: "operation", label: "Operation" }
];

const mapStatus = (status) => {
  switch (status) {
    case "not_start":
      return (<Badge variant='subtle'
        width="85%"
        textAlign={"center"}
        borderRadius='5px'
        colorScheme='gray'>
        not start
      </Badge>);
    case "in_progress":
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

const TableOrderlist = () => {
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
          {orderlists.map((orderlist) => (
            <Tr
              _hover={{
                backgroundColor: "#ECF7FE",
              }}
              key={orderlist.value}
            >
              <Td textAlign={"center"}>{orderlist.internal_id}</Td>
              <Td textAlign={"center"}>{orderlist.item_code}</Td>
              <Td textAlign={"center"}>{dayjs(orderlist.create_dt).format('DD-MMM-YYYY')}</Td>
              <Td textAlign={"center"}>{dayjs(orderlist.create_dt).format('HH:mm')}</Td>
              <Td textAlign={"center"}>{orderlist.length}</Td>
              <Td textAlign={"center"}>{mapStatus(orderlist.item_status)}</Td>
              <Td textAlign={"center"}>{orderlist.create_by}</Td>
              <Td textAlign={"center"}>{orderlist.modify_by}</Td>
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