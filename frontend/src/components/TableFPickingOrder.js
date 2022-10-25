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

import OrderForklift from "../assets/OrderForklift.json";
import * as dayjs from "dayjs";
import CustomButton from "./CustomButton";
import { CustomAlertDialog } from "./AlertDialog";

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
    case "Not start":
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
    case "In progress":
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

const TableFPickingList = () => {
  const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        LbuttonPopup="No"
        RbuttonPopup="Yes"
        ColorRbuttonPopup={
          object.order_status === "Not start" ? "twitter" : "yellow"
        }
        HearderFsize={object.order_status === "Not start" ? "2xl" : "xl"}
        textHeader={
          object.order_status === "Not start" ? (
            <HStack>
              <font> Are you sure to </font>
              <font color="#1DA1F2"> Start </font>
              <font> this order ? </font>
            </HStack>
          ) : (
            <HStack>
              <font> Are you sure to </font>
              <font color="#FFBF00"> Resume </font>
              <font> this order ? </font>
            </HStack>
          )
        }
        textBody=<VStack alignItems="left">
          <Text fontSize="xl">Order : {object.order_id}</Text>
          <Text fontSize="xl">
            Create :{dayjs(object.create_dt).format("DD/MM/YYYY   HH:mm")}
          </Text>
          <Text fontSize="xl">Quantity : {object.quantity}</Text>
          <Text fontSize="xl">Order by : {object.ordered_by}</Text>
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
            {OrderForklift.map((d) => (
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
                    buttonName={
                      d.order_status === "Not start" ? "Start" : "Resume"
                    }
                    buttonColor={
                      d.order_status === "Not start" ? "blue" : "yellow"
                    }
                    buttonSize="sm"
                    HoverColor={
                      d.order_status === "Not start"
                        ? "twitter.300"
                        : "yellow.300"
                    }
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

export default TableFPickingList;
