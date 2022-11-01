import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  TableContainer,
  Badge,
} from "@chakra-ui/react";

import * as dayjs from "dayjs";

export const header = [
  { value: "checkbox", label: " " },
  { value: "item_code", label: "Item Code" },
  { value: "cate", label: "Category" },
  { value: "length", label: "Length" },
  { value: "create_dt", label: "Date Create" },
  { value: "status", label: "Status" },
];

const mapCateName = (category) => {
  switch (category) {
    case "1":
      return "Kraft";
    case "2":
      return "Bleached";
    case "3":
      return "Glassine";
    case "4":
      return "Wax";
    case "5":
      return "PVC";
    case "6":
      return "Inkjet";
    case "7":
      return "Corrugated";
    default:
      return "";
  }
};

const mapStatus = (status) => {
  switch (status) {
    case "stock in":
      return (
        <Badge
          variant="subtle"
          textAlign={"center"}
          borderRadius="5px"
          colorScheme="green"
        >
          stock in
        </Badge>
      );
    case "used":
      return (
        <Badge
          variant="subtle"
          textAlign={"center"}
          borderRadius="5px"
          colorScheme="yellow"
        >
          used
        </Badge>
      );
    case "new coming":
      return (
        <Badge
          variant="subtle"
          textAlign={"center"}
          borderRadius="5px"
          colorScheme="red"
        >
          new coming
        </Badge>
      );
    case "in progress":
      return (
        <Badge
          variant="subtle"
          textAlign={"center"}
          borderRadius="5px"
          colorScheme="gray"
        >
          in progress
        </Badge>
      );
    default:
      return "";
  }
};

const TablePickingList = (props) => {

  const { itemlists } = props

  return (
    <TableContainer width="100%">
      <Table size="md">
        <Thead>
          <Tr>
            {header.map((head) => (
              <Th fontSize={16} key={head.value}>
                {head.label}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {itemlists.items.map((item) => (
            <Tr
              _hover={{
                backgroundColor: "#ECF7FE",
              }}
              key={item.item_code}
            >
              <Td textAlign={"center"}>
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  defaultChecked={false}
                />
              </Td>
              <Td>{item.item_code}</Td>
              <Td>{mapCateName(item.category)}</Td>
              <Td>{item.length}</Td>
              <Td>{dayjs(item.create_dt).format("DD / MM / YYYY")}</Td>
              <Td>{mapStatus(item.status)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TablePickingList;
