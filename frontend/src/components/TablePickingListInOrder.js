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

import { data } from "../assets/dataRawMat";

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
          {data.map((d) => (
            <Tr
              _hover={{
                backgroundColor: "#ECF7FE",
              }}
              key={d.value}
            >
              <Td>{d.item_code}</Td>
              <Td>{mapCateName(d.item_cate_code)}</Td>
              <Td>{d.length}</Td>
              <Td>{dayjs(d.create_dt).format('DD / MM / YYYY')}</Td>
            </Tr>
          ))}

        </Tbody>
      </Table>
    </TableContainer>
  </div>
  );
};

export default TablePickingList;





