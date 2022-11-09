import React from "react";
import "./OrderDetail.css";
import * as dayjs from 'dayjs';
import GridOrderDetail from '../components/GridOrderDetail';
import TablePickingListInOrder from '../components/TablePickingListInOrder';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Center } from '@chakra-ui/react'

import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import Dataorder from "../assets/orderdetailmock.json";

function OrderDetail() {

    const { state } = useLocation();
    const { data: order, isLoading } = useQuery([`/order/${state}`]);
    // const { data: item_zone_1 } = useQuery([`/order/${state}?zone=1`]);
    // const { data: item_zone_2 } = useQuery([`/order/${state}?zone=2`]);
    const { data: item_zone_3 } = useQuery([`/order/${state}?zone=3`]);
    const { data: item_zone_4 } = useQuery([`/order/${state}?zone=4`]);
    const { data: item_zone_5 } = useQuery([`/order/${state}?zone=5`]);
    // const { data: item_zone_6 } = useQuery([`/order/${state}?zone=6`]);

    // console.log(state);
    // console.log(order);
    // console.log(item_zone_3);
    // console.log(item_zone_4);
    // console.log(item_zone_5);

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
                            Order {Dataorder[0].order_id}
                        </div>
                        <div className='OrderBy'>
                            Ordered by {Dataorder[0].create_by} {dayjs(Dataorder[0].create_dt).format('DD/MM/YYYY HH.mm.ss')}
                        </div>
                    </div>
                    <div className='BodyOrderDetailPage'>
                        <Tabs variant='enclosed' width='100%'>
                            <TabList>
                                <Tab>
                                    Zone 1
                                </Tab>
                                <Tab>
                                    Zone 2
                                </Tab>
                                <Tab>
                                    Zone 3
                                </Tab>
                                <Tab>
                                    Zone 4
                                </Tab>
                                <Tab>
                                    Zone 5
                                </Tab>
                                <Tab>
                                    Zone 6
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    1
                                    {/* <GridOrderDetail itemlist={item_zone_1} /> */}
                                    {/* <TablePickingListInOrder itemlist={item_zone_1} /> */}
                                </TabPanel>
                                <TabPanel>
                                    2
                                    {/* <GridOrderDetail itemlist={item_zone_2} /> */}
                                    {/* <TablePickingListInOrder itemlist={item_zone_2} /> */}
                                </TabPanel>
                                <TabPanel>
                                    3
                                    <GridOrderDetail itemlist={item_zone_3} />
                                    <TablePickingListInOrder itemlist={item_zone_3} />
                                </TabPanel>
                                <TabPanel>
                                    4
                                    <GridOrderDetail itemlist={item_zone_4} />
                                    <TablePickingListInOrder itemlist={item_zone_4} />
                                </TabPanel>
                                <TabPanel>
                                    5
                                    <GridOrderDetail itemlist={item_zone_5} />
                                    <TablePickingListInOrder itemlist={item_zone_5} />
                                </TabPanel>
                                <TabPanel>
                                    6
                                    {/* <GridOrderDetail itemlist={item_zone_6} /> */}
                                    {/* <TablePickingListInOrder itemlist={item_zone_6} /> */}
                                </TabPanel>
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