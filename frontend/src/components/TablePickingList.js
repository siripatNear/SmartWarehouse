import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Box,
  useToast,
} from "@chakra-ui/react";

import * as dayjs from "dayjs";
import _, { isEmpty } from "lodash";
import CustomButton from "./CustomButton";

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
  const { itemlists } = props;
  const [ItemState, setItemState] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    setItemState(
      itemlists.items.map((d) => {
        return {
          select: false,
          item_code: d.item_code,
          category: d.category,
          length: d.length,
          create_dt: d.create_dt,
          status: d.status,
        };
      })
    );
  }, [itemlists]);

  useEffect(() => {
    console.log(
      _(ItemState)
        .filter((v) => v.select === true)
        .value()
    );
    setSelectedItem(
      _(ItemState)
        .filter((v) => v.select === true)
        .value()
    );
  }, [ItemState]);

  const toast = useToast();

  return (
    <>
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
            {ItemState.map((item) => (
              <Tr
                _hover={{
                  backgroundColor: "#ECF7FE",
                }}
                key={item.item_code}
              >
                <Td textAlign={"center"}>
                  <input
                    onChange={(event) => {
                      let checked = event.target.checked;
                      setItemState(
                        ItemState.map((data) => {
                          if (item.item_code === data.item_code) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={item.select}
                  ></input>
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
      <Box
        alignSelf="flex-end"
        display="flex"
        paddingRight="16px"
        paddingTop="20px"
        paddingBottom="20px"
        gap="10px"
      >
        <CustomButton
          buttonName="Add"
          buttonColor="twitter"
          buttonSize="lg"
          onOpen={() => {
            if (isEmpty(selectedItem)) {
              toast({
                title: "Please select item!",
                description: 'before click "Add" button',
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        />
      </Box>
    </>
  );
};

export default TablePickingList;
