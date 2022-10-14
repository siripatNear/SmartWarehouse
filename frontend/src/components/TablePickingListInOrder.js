import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import * as dayjs from 'dayjs'

import Dataorder from "../assets/orderdetailmock.json";

export const header = [
  { value: "item_code", label: "Item Code" },
  { value: "cate", label: "Category" },
  { value: "length", label: "Length" },
  { value: "create_dt", label: "Date Create" },
];

const mapCateName = (category) => {
  switch (category) {
    case 1:
      return "Kraft";
    case 2:
      return "Bleached";
    case 3:
      return "Glassine";
    case 4:
      return "Wax";
    case 5:
      return "PVC";
    case 6:
      return "Inkjet";
    case 7:
      return "Corrugated";
    default:
      return "";
  }
};

const TablePickingList = () => {
  return (
    <div className="ConTablePickingListInOrder">
    <TableContainer width='70%' >
      <Table size="md" >
        <Thead>
          <Tr backgroundColor='#A3D9FB'>
            {header.map((head) => (
              <Th fontSize={16} key={head.value} >
                {head.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        
        <Tbody >
          {Dataorder.map((data) => (
            <Tr
              _hover={{
                backgroundColor: "#ECF7FE",
              }}
              key={data.value}
            >
              <Td>{data.item_code}</Td>
              <Td>{mapCateName(data.item_cate_code)}</Td>
              <Td>{data.length}</Td>
              <Td>{dayjs(data.create_dt).format('DD / MM / YYYY')}</Td>
            </Tr>
          ))}

        </Tbody>
      </Table>
    </TableContainer>
  </div>
  );
};

export default TablePickingList;





