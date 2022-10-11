import React from 'react'
import "./OrderDetail.css";
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
                    Ordered by {Dataorder[0].create_by} {Dataorder[0].create_dt}
                </div>
            </div>
            <div className='BodyOrderDetailPage'>
                <Tabs variant='enclosed' width='100%'>
                    <TabList>
                        {Dataorder.map((zone_number) => (
                            <Tab>
                                Zone {zone_number.zone}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {Dataorder.map((zone_number) => (
                            <TabPanel>
                                {zone_number.zone}
                                <GridOrderDetail />
                                <TablePickingListInOrder />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}

export default OrderDetail