import React, { useEffect, useState } from "react";
import "../OrderDetail.css";
import * as dayjs from "dayjs";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Center,
  VStack,
  HStack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import CustomButton from "../../components/CustomButton";
import GridOrderDetail from "../../components/GridOrderDetail";
import TablePickingListInOrder from "../../components/TablePickingListInOrder";
import { CustomAlertOneButton } from "../../components/AlertOneButton";

import { isNil } from "lodash";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";

function PickingOrderDetail() {
  const [object, setObject] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { state } = useLocation();
  const { data: order, isLoading } = useQuery([`/picking/${state}`]);
  const { data: item_zone_1 } = useQuery([`/picking/${state}`, { zone: 1 }]);
  const { data: item_zone_2 } = useQuery([`/picking/${state}`, { zone: 2 }]);
  const { data: item_zone_3 } = useQuery([`/picking/${state}`, { zone: 3 }]);
  const { data: item_zone_4 } = useQuery([`/picking/${state}`, { zone: 4 }]);
  const { data: item_zone_5 } = useQuery([`/picking/${state}`, { zone: 5 }]);
  const { data: item_zone_6 } = useQuery([`/picking/${state}`, { zone: 6 }]);
  const isFetching = useIsFetching([`/picking/${state}`]);

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

  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user.role === "Admin") {
      navigate("/");
    }
    if (user.role === "Operator") {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <>
      {/* Pop-up Match */}
      <CustomAlertOneButton
        isOpen={isOpen}
        onClose={onClose}
        buttonPopup="OK"
        ColorbuttonPopup="twitter"
        HearderFsize="5xl"
        textHeader=<HStack>
          <font color="green"> Match! </font>
        </HStack>
        textBody=<VStack alignItems="left">
          <Text fontSize="xl">Zone : {object.zone} </Text>
          <Text fontSize="xl">Item code : {object.item_code} </Text>
          <Text fontSize="xl">Category : {mapCateName(object.category)} </Text>
          <Text fontSize="xl">Length : {object.length} </Text>
          <Text fontSize="xl">
            Date create : {dayjs(object.create_dt).format("DD/MM/YYYY")}{" "}
          </Text>
        </VStack>
      />

      {/* Pop-up Not Match */}
      {/* <CustomAlertOneButton
                isOpen={isOpen}
                onClose={onClose}
                buttonPopup="Try again"
                ColorbuttonPopup="twitter"
                HearderFsize="5xl"
                textHeader=<HStack >
                    <font color="red" > Not Match! </font>
                </HStack>
                textBody=<VStack alignItems="left">
                    <Text fontSize="xl">Zone : {object.zone} </Text>
                    <Text fontSize="xl">Item code : {object.item_code} </Text>
                    <Text fontSize="xl">Category : {mapCateName(object.category)} </Text>
                    <Text fontSize="xl">Length : {object.length} </Text>
                    <Text fontSize="xl">Date create : {dayjs(object.create_dt).format('DD/MM/YYYY')} </Text>
                </VStack>
            /> */}
      {isLoading || isNil(order) || isFetching > 0 ? (
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
        <div>
          <div className="TitleContainer">
            <div className="OrderTitle">Order {state}</div>
            <div className="OrderBy">
              Ordered by {order.description.create_by}{" "}
              {dayjs(order.description.create_dt).format("DD/MM/YYYY")}
            </div>
          </div>
          <div className="BodyOrderDetailPage">
            <Tabs variant="enclosed" width="100%">
              <TabList>
                {item_zone_1.warehouse_id ? <Tab>Zone 1</Tab> : null}
                {item_zone_2.warehouse_id ? <Tab>Zone 2</Tab> : null}
                {item_zone_3.warehouse_id ? <Tab>Zone 3</Tab> : null}
                {item_zone_4.warehouse_id ? <Tab>Zone 4</Tab> : null}
                {item_zone_5.warehouse_id ? <Tab>Zone 5</Tab> : null}
                {item_zone_6.warehouse_id ? <Tab>Zone 6</Tab> : null}
              </TabList>
              <TabPanels>
                {item_zone_1.warehouse_id ? (
                  <TabPanel>
                    1
                    <GridOrderDetail itemlist={item_zone_1} />
                    <TablePickingListInOrder itemlist={item_zone_1} />
                  </TabPanel>
                ) : null}
                {item_zone_2.warehouse_id ? (
                  <TabPanel>
                    2
                    <GridOrderDetail itemlist={item_zone_2} />
                    <TablePickingListInOrder itemlist={item_zone_2} />
                  </TabPanel>
                ) : null}
                {item_zone_3.warehouse_id ? (
                  <TabPanel>
                    3
                    <GridOrderDetail itemlist={item_zone_3} />
                    <TablePickingListInOrder itemlist={item_zone_3} />
                  </TabPanel>
                ) : null}
                {item_zone_4.warehouse_id ? (
                  <TabPanel>
                    4
                    <GridOrderDetail itemlist={item_zone_4} />
                    <TablePickingListInOrder itemlist={item_zone_4} />
                  </TabPanel>
                ) : null}
                {item_zone_5.warehouse_id ? (
                  <TabPanel>
                    5
                    <GridOrderDetail itemlist={item_zone_5} />
                    <TablePickingListInOrder itemlist={item_zone_5} />
                  </TabPanel>
                ) : null}
                {item_zone_6.warehouse_id ? (
                  <TabPanel>
                    6
                    <GridOrderDetail itemlist={item_zone_6} />
                    <TablePickingListInOrder itemlist={item_zone_6} />
                  </TabPanel>
                ) : null}
              </TabPanels>
            </Tabs>
          </div>

          {/* Test Pop-Up Button */}
          <div className="ContainerBtn">
            <CustomButton
              marginX={4}
              onOpen={() => {
                setObject(order);
                onOpen();
              }}
              buttonName="Test Pop-Up"
              buttonColor="twitter"
              HoverColor="twitter.300"
              buttonSize="lg"
              borderRadius="10px"
              fontSize="22px"
              fontWeight="medium"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PickingOrderDetail;
