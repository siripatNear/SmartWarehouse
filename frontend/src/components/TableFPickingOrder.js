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
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";

import orderdetailmock from "../assets/orderdetailmock.json";
import * as dayjs from "dayjs";
import CustomButton from "./CustomButton";
import { CustomAlertDialog } from "./AlertDialog";

export const header = [
  { value: "order_id", label: "Order ID" },
  { value: "create_dt", label: "Date Create" },
  { value: "create_time", label: "Time Create" },
  { value: "item", label: "Items" },
  { value: "status", label: "Status" },
  { value: "order_by", label: "Order by" },
  { value: "operation", label: " " },
];

const mapStatus = (status) => {
  switch (status) {
    case "not_start":
      return (
        <Badge
          variant="subtle"
          textAlign={"center"}
          borderRadius="5px"
          colorScheme="red"
        >
          not start
        </Badge>
      );
    case "in_progress":
      return (
        <Badge
          variant="subtle"
          textAlign={"center"}
          borderRadius="5px"
          colorScheme="yellow"
        >
          in progress
        </Badge>
      );
    default:
      return "";
  }
};

const TablePickingList = () => {
  const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        LbuttonPopup="Cancle"
        RbuttonPopup="Start"
        ColorRbuttonPopup="twitter"
        HearderFsize="2xl"
        textHeader=<HStack>
          <font> Are you sure to </font>
          <font color="#1DA1F2"> Start </font>
          <font> this order ? </font>
        </HStack>
        textBody=<VStack alignItems="left">
          <Text fontSize="xl">Order : {object.order_id}</Text>
          <Text fontSize="xl">
            Create :{dayjs(object.create_dt).format("DD/MM/YYYY   HH:mm")}
          </Text>
          <Text fontSize="xl">Quantities : {object.length}</Text>
          <Text fontSize="xl">Order by : {object.create_by}</Text>
        </VStack>
      />
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
            {orderdetailmock.map((d) => (
              <Tr
                _hover={{
                  backgroundColor: "#ECF7FE",
                }}
                key={d.value}
              >
                <Td>{d.order_id}</Td>
                <Td>{dayjs(d.create_dt).format("DD / MM / YYYY")}</Td>
                <Td>{dayjs(d.create_dt).format("HH : mm")}</Td>
                <Td>{d.create_by}</Td>
                <Td>{d.length}</Td>
                <Td>{d.create_by}</Td>
                <Td textAlign={"center"}>
                  <CustomButton
                    marginX={4}
                    onOpen={() => {
                      setObject(d);
                      onOpen();
                    }}
                    onClose={onClose}
                    buttonName="Start"
                    buttonColor="twitter"
                    buttonSize="sm"
                    HoverColor="twitter.300"
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

export default TablePickingList;
