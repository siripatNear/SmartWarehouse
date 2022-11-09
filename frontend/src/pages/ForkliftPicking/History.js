import React, { useState } from "react";
import {
  Badge,
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { isNil } from "lodash";
import Nametag from "../../components/Nametag";
import dayjs from "dayjs";
import CustomButton from "../../components/CustomButton";

export const header = [
  { value: "order_id", label: "Order ID" },
  { value: "create_dt", label: "Date Create" },
  { value: "create_time", label: "Time Create" },
  { value: "qt", label: "Quantity" },
  { value: "status", label: "Status" },
  { value: "order_by", label: "Order by" },
  { value: "operation", label: " " },
];

const History = () => {
  const { data, isLoading } = useQuery(["/history-order"]);
  // const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <>
      <Flex justify={"center"}>
        <Nametag />
      </Flex>
      {isLoading || isNil(data) ? (
        <Center mt="100px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            alignItems
          />
        </Center>
      ) : (
        <VStack>
          <HStack
            paddingY="16px"
            paddingLeft="64px"
            paddingRight="16px"
            justify="space-between"
            width="100%"
          >
            <Heading as="h1">History</Heading>
          </HStack>

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
                {data.order_list.map((d) => (
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
                          // setObject(d);
                          onOpen();
                        }}
                        onClose={onClose}
                        buttonName="Detail"
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
        </VStack>
      )}
    </>
  );
};

export default History;
