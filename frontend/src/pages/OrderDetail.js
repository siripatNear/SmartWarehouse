import React from "react";
import "./OrderDetail.css";
import * as dayjs from 'dayjs';
import GridOrderDetail from '../components/GridOrderDetail';
import TablePickingListInOrder from '../components/TablePickingListInOrder';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Center } from '@chakra-ui/react'

import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function OrderDetail() {

    const { state } = useLocation();
    const { data: order, isLoading } = useQuery([`/order/${state}`]);
    const { data: item_zone_1 } = useQuery([`/order/${state}?zone=1`]);
    const { data: item_zone_2 } = useQuery([`/order/${state}?zone=2`]);
    const { data: item_zone_3 } = useQuery([`/order/${state}?zone=3`]);
    const { data: item_zone_4 } = useQuery([`/order/${state}?zone=4`]);
    const { data: item_zone_5 } = useQuery([`/order/${state}?zone=5`]);
    const { data: item_zone_6 } = useQuery([`/order/${state}?zone=6`]);


    return (
        <>
            {isLoading || isNil(order) ? (
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
                <div>
                    <div className='TitleContainer'>
                        <div className='OrderTitle'>
                            Order {state}
                        </div>
                        {order.description.map((d) => {
                            return (
                                <div className='OrderBy'>
                                    Ordered by {d.create_by} {dayjs(d.create_dt).format('DD/MM/YYYY')}
                                </div>
                            );
                        })}
                    </div>
                    <div className='BodyOrderDetailPage'>
                        <Tabs variant='enclosed' width='100%'>
                            <TabList>
                                {item_zone_1.warehouse_id ? (
                                    <Tab>
                                        Zone 1
                                    </Tab>
                                ) : null}
                                {item_zone_2.warehouse_id ? (
                                    <Tab>
                                        Zone 2
                                    </Tab>
                                ) : null}
                                {item_zone_3.warehouse_id ? (
                                    <Tab>
                                        Zone 3
                                    </Tab>
                                ) : null}
                                {item_zone_4.warehouse_id ? (
                                    <Tab>
                                        Zone 4
                                    </Tab>
                                ) : null}
                                {item_zone_5.warehouse_id ? (
                                    <Tab>
                                        Zone 5
                                    </Tab>
                                ) : null}
                                {item_zone_6.warehouse_id ? (
                                    <Tab>
                                        Zone 6
                                    </Tab>
                                ) : null}
                            </TabList>
                            <TabPanels>
                                {/* {{ item_zone_1 } ? (
                                    <TabPanel>
                                        <GridOrderDetail itemlist={item_zone_1} />
                                        <TablePickingListInOrder itemlist={item_zone_1} />
                                    </TabPanel>
                                ) : null} */}
                                {/* {order.zones.map((z) => {
                                    let { data: item_zone_1 } = useQuery([`/order/${state}?zone=1`]);
                                    return (
                                        <TabPanel>
                                            1
                                            <GridOrderDetail itemlist={item_zone_1} />
                                            <TablePickingListInOrder itemlist={item_zone_1} />
                                        </TabPanel>
                                    );
                                })} */}
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
                </div>
            )
            }
        </>
    )
}

export default OrderDetail