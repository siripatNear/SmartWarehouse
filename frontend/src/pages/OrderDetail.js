import React from "react";
import "./OrderDetail.css";
import * as dayjs from "dayjs";
import GridOrderDetail from "../components/GridOrderDetail";
import TablePickingListInOrder from "../components/TablePickingListInOrder";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Center,
  Button
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";

import { isNil } from "lodash";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

function OrderDetail() {
  const { state } = useLocation();
  const { data: order, isLoading } = useQuery([`/order/${state}`]);
  const { data: item_zone_1 } = useQuery([`/order/${state}`, { zone: 1 }]);
  const { data: item_zone_2 } = useQuery([`/order/${state}`, { zone: 2 }]);
  const { data: item_zone_3 } = useQuery([`/order/${state}`, { zone: 3 }]);
  const { data: item_zone_4 } = useQuery([`/order/${state}`, { zone: 4 }]);
  const { data: item_zone_5 } = useQuery([`/order/${state}`, { zone: 5 }]);
  const { data: item_zone_6 } = useQuery([`/order/${state}`, { zone: 6 }]);
  const isFetching = useIsFetching([`/order/${state}`]);
  const navigate = useNavigate();

  return (
    <>
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
            <Button leftIcon={<IoIosArrowBack />} ml="30px" onClick={() => navigate("/order-list")}></Button>
            <div className="OrderTitle">
              Order {state}
            </div>
            <div className="OrderBy">
              Ordered by {order.description[0].create_by}{" "}
              {dayjs(order.description[0].create_dt).format("DD/MM/YYYY")}
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
                    <GridOrderDetail itemlist={item_zone_1} />
                    <TablePickingListInOrder itemlist={item_zone_1} />
                  </TabPanel>
                ) : null}
                {item_zone_2.warehouse_id ? (
                  <TabPanel>
                    <GridOrderDetail itemlist={item_zone_2} />
                    <TablePickingListInOrder itemlist={item_zone_2} />
                  </TabPanel>
                ) : null}
                {item_zone_3.warehouse_id ? (
                  <TabPanel>
                    <GridOrderDetail itemlist={item_zone_3} />
                    <TablePickingListInOrder itemlist={item_zone_3} />
                  </TabPanel>
                ) : null}
                {item_zone_4.warehouse_id ? (
                  <TabPanel>
                    <GridOrderDetail itemlist={item_zone_4} />
                    <TablePickingListInOrder itemlist={item_zone_4} />
                  </TabPanel>
                ) : null}
                {item_zone_5.warehouse_id ? (
                  <TabPanel>
                    <GridOrderDetail itemlist={item_zone_5} />
                    <TablePickingListInOrder itemlist={item_zone_5} />
                  </TabPanel>
                ) : null}
                {item_zone_6.warehouse_id ? (
                  <TabPanel>
                    <GridOrderDetail itemlist={item_zone_6} />
                    <TablePickingListInOrder itemlist={item_zone_6} />
                  </TabPanel>
                ) : null}
              </TabPanels>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderDetail;
