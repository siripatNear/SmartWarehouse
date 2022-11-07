import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Center,
} from "@chakra-ui/react";

import * as dayjs from "dayjs";
import { isNil } from "lodash";

export const header = [
  { value: "item_code", label: "Item Code" },
  { value: "cate", label: "Category" },
  { value: "length", label: "Length" },
  { value: "create_dt", label: "Date Create" },
];

// const mapCateName = (category) => {
//   switch (category) {
//     case 1:
//       return "Kraft";
//     case 2:
//       return "Bleached";
//     case 3:
//       return "Glassine";
//     case 4:
//       return "Wax";
//     case 5:
//       return "PVC";
//     case 6:
//       return "Inkjet";
//     case 7:
//       return "Corrugated";
//     default:
//       return "";
//   }
// };

const TablePickingList = (props) => {
  const { itemlist, isLoading } = props

  return (
    <>
      {isLoading || isNil(itemlist) ? (
        <Center mt='100px'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            alignItems
          />
        </Center>
      ) : (
        <div className="ConTablePickingListInOrder">
          <TableContainer width="70%">
            <Table size="md">
              <Thead>
                <Tr backgroundColor="#A3D9FB">
                  {header.map((head) => (
                    <Th fontSize={16} key={head.value}>
                      {head.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>


              <Tbody >
                {itemlist.items.map((item) => (

                  <Tr
                    _hover={{
                      backgroundColor: "#ECF7FE",
                    }}
                  >
                    <Td>{item.item_code}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.length}</Td>
                    <Td>{dayjs(item.create_dt).format('DD / MM / YYYY')}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default TablePickingList;
