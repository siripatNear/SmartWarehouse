import React from 'react'
import "./OrderDetail.css";
import * as dayjs from 'dayjs';
import GridOrderDetail from '../components/GridOrderDetail';
import TablePickingListInOrder from '../components/TablePickingListInOrder';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import Dataorder from "../assets/orderdetailmock.json";

function OrderDetail() {
    return (
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
                            <GridOrderDetail />
                            <TablePickingListInOrder items={Dataorder} />
                        </TabPanel>
                        <TabPanel>
                            2
                            {/* <GridOrderDetail /> */}
                            <TablePickingListInOrder items={Dataorder} />
                        </TabPanel>
                        <TabPanel>
                            3
                            {/* <GridOrderDetail /> */}
                            <TablePickingListInOrder items={Dataorder} />
                        </TabPanel>
                        <TabPanel>
                            4
                            {/* <GridOrderDetail /> */}
                            <TablePickingListInOrder items={Dataorder} />
                        </TabPanel>
                        <TabPanel>
                            5
                            {/* <GridOrderDetail /> */}
                            <TablePickingListInOrder items={Dataorder} />
                        </TabPanel>
                        <TabPanel>
                            6
                            {/* <GridOrderDetail /> */}
                            <TablePickingListInOrder items={Dataorder} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}

export default OrderDetail