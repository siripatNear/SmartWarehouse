import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";

import CompleteOrder from "../assets/CompleteOrder.json";
import * as dayjs from "dayjs";
import CustomButton from "./CustomButton";

export const header = [
  { value: "order_id", label: "Order ID" },
  { value: "create_dt", label: "Date Create" },
  { value: "create_time", label: "Time Create" },
  { value: "qt", label: "Quantity" },
  { value: "status", label: "Status" },
  { value: "order_by", label: "Order by" },
  { value: "operation", label: " " },
];

const mapStatus = (order_status) => {
  switch (order_status) {
    case "Completed":
      return (
        <Badge
          variant="subtle"
          textAlign={"center"}
          borderRadius="5px"
          colorScheme="green"
        >
          completed
        </Badge>
      );
    default:
      return "";
  }
};

const TableHistory = () => {
  const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TableContainer width="90%">
        <Table size="md">
          <Thead>
            <Tr>
              {header.map((head) => (
                <Th fontSize={18} key={head.value}>
                  {head.label}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {CompleteOrder.map((d) => (
              <Tr
                _hover={{
                  backgroundColor: "#ECF7FE",
                }}
                key={d.order_id}
              >
                <Td>{d.order_id}</Td>
                <Td>{dayjs(d.create_dt).format("DD / MM / YYYY")}</Td>
                <Td>{dayjs(d.create_dt).format("HH : mm")}</Td>
                <Td>{d.quantity}</Td>
                <Td>{mapStatus(d.order_status)}</Td>
                <Td>{d.ordered_by}</Td>
                <Td textAlign={"center"}>
                  <CustomButton
                    marginX={4}
                    onOpen={() => {
                      setObject(d);
                      onOpen();
                    }}
                    onClose={onClose}
                    buttonName="Detail"
                    buttonColor="green"
                    buttonSize="sm"
                    HoverColor="green.300"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableHistory;
