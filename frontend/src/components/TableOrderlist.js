import React, { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  HStack,
  useDisclosure,
  Text,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useUserStore } from "../store/user";
import CustomButton from "./CustomButton";
import { CustomAlertDialog } from "./AlertDialog";
import { api, queryClient } from "../lib/query";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Select } from "chakra-react-select";
import _, { isEmpty } from "lodash";

export const header = [
  { value: "order_id", label: "Order ID" },
  { value: "create_dt", label: "Date Create" },
  { value: "create_time", label: "Time Create" },
  { value: "item", label: "Quantity" },
  { value: "status", label: "Status" },
  { value: "order_by", label: "Order by" },
  { value: "progress_by", label: "Progress by" },
  { value: "operation", label: " " },
];

export const statusData = [
  { value: "NotStart", label: "Not start" },
  { value: "InProgress", label: "In progress" },
];

const mapStatus = (status) => {
  switch (status) {
    case "Not start":
      return (
        <Badge
          variant="subtle"
          textAlign={"center"}
          borderRadius="5px"
          colorScheme="gray"
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

const TableOrderlist = (props) => {
  const [searchStatus, setSearchStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const { orders } = props;
  const user = useUserStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [object, setObject] = useState({});
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(null);

  //* delete data from api
  const { mutate: DeleteOrder, isLoading: isDeleting } = useMutation(
    (v) => api.delete(`/order/${v}`),
    {
      onSuccess() {
        onClose();
        queryClient.invalidateQueries(["/order-list"]); //* update ui
      },
    }
  );

  useEffect(() => {
    if (!isEmpty(searchStatus) && !isEmpty(searchText)) {
      setFilteredData(
        _(orders?.order_list)
          .filter(
            (v) =>
              _(v.order_status).includes(searchStatus.label) &&
              (_(v.order_id).toLower().includes(_(searchText).toLower()) ||
                _(v.ordered_by).toLower().includes(_(searchText).toLower()) ||
                _(v.progress_by).toLower().includes(_(searchText).toLower()))
          )
          .value()
      );
    } else if (!isEmpty(searchStatus)) {
      setFilteredData(
        _(orders?.order_list)
          .filter((v) => _(v.order_status).includes(searchStatus.label))
          .value()
      );
    } else if (!isEmpty(searchText)) {
      setFilteredData(
        _(orders?.order_list)
          .filter(
            (v) =>
              _(v.order_id).toLower().includes(_(searchText).toLower()) ||
              _(v.ordered_by).toLower().includes(_(searchText).toLower()) ||
              _(v.progress_by).toLower().includes(_(searchText).toLower())
          )
          .value()
      );
    } else {
      setFilteredData(orders?.order_list);
    }
  }, [orders, searchStatus, searchText]);

  useEffect(() => {
    console.log(searchStatus);
  }, [searchStatus]);

  return (
    <>
      <CustomAlertDialog
        isLoading={isDeleting}
        isOpen={isOpen}
        onConfirm={() => {
          DeleteOrder(object.order_id);
        }}
        onClose={onClose}
        LbuttonPopup="No"
        RbuttonPopup="Yes"
        ColorRbuttonPopup="red"
        HearderFsize="2xl"
        textHeader=<HStack>
          <font color="red"> Delete </font>
          <font> order </font>
          <font> '{object.order_id}' </font>
        </HStack>
        textBody=<Text fontSize="xl">
          Are you sure? You can't undo this action afterwards.
        </Text>
      />

      <HStack flex={1} paddingRight={4} width={"90%"}>
        <FormControl width={"20%"} p={2} id="statussearch">
          <Select
            isClearable
            value={searchStatus}
            onChange={setSearchStatus}
            placeholder="Status"
            closeMenuOnSelect={true}
            options={statusData}
          />
        </FormControl>
        <FormControl width={"80%"} p={1}>
          <Input
            type="text"
            placeholder="Search Order ID, Order By, Progress By ..."
            value={searchText}
            onChange={(v) => setSearchText(v.target.value)}
          />
        </FormControl>
      </HStack>

      <TableContainer width="90%">
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
            {filteredData?.map((order) => (
              <Tr
                _hover={{
                  backgroundColor: "#ECF7FE",
                }}
                key={order.order_id}
              >
                <Td>{order.order_id}</Td>
                <Td>{dayjs(order.create_dt).format("DD / MMM / YYYY")}</Td>
                <Td>{dayjs(order.create_dt).format("HH:mm")}</Td>
                <Td>{order.quantity}</Td>
                <Td>{mapStatus(order.order_status)}</Td>
                <Td>{order.ordered_by}</Td>
                <Td>{order.progress_by}</Td>
                <Td>
                  {
                    <CustomButton
                      buttonName="Detail"
                      buttonColor="twitter"
                      buttonSize="sm"
                      onOpen={() =>
                        navigate("/order-detail", { state: order.order_id })
                      }
                    />
                  }
                  {user.role === "Operator" && (
                    <CustomButton
                      onOpen={() => {
                        setObject(order);
                        onOpen();
                      }}
                      onClose={onClose}
                      marginX={4}
                      buttonName="Delete"
                      buttonColor="red"
                      buttonSize="sm"
                      HoverColor="red.300"
                      borderRadius="5px"
                      fontSize="15px"
                      fontWeight="medium"
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableOrderlist;
