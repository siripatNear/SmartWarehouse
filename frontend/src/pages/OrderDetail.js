import React from 'react'
import "./OrderDetail.css";
import GridOrderDetail from '../components/GridOrderDetail';
import TablePickingListInOrder from '../components/TablePickingListInOrder';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import Dataorder from "../assets/order.json";

// const DataTitles = [
//     {
//         "label_order": "AA-123456",
//         "create_by": "jkyw.1905",
//         "create_dt": "9/17/2022 18:12",
//     }
// ]

// const Zones = [
//     {
//         "zone_number": "Zone 1",
//     },
//     {
//         "zone_number": "Zone 2",
//     },
//     {
//         "zone_number": "Zone 3",
//     },
//     {
//         "zone_number": "Zone 4",
//     }
// ]

function OrderDetail() {
    return (
        <div>
            {Dataorder.map((ordertitle) => (
                <div className='TitleContainer'>
                    <div className='OrderTitle'>
                        Order {ordertitle.order_id}
                    </div>
                    <div className='OrderBy'>
                        Ordered by {ordertitle.create_by} {ordertitle.create_dt}
                    </div>
                </div>
            ))}
            <div className='BodyOrderDetailPage'>
                <Tabs variant='enclosed' width='100%'>
                    <TabList>
                        {Dataorder.map((zone, index) => (
                            <Tab>
                                Zone {zone.order_id_trans[`${index+1}`].position_code.zone}
                                {/* Zone {zone.`AA-0000 + ${index+1}`.position_code.zone} */}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <GridOrderDetail />
                            <TablePickingListInOrder />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}

// function OrderDetail() {
//     return (
//         <div>
//             {DataTitles.map((datatitle) => (
//                 <div className='TitleContainer'>
//                     <div className='OrderTitle'>
//                         Order {datatitle.label_order}
//                     </div>
//                     <div className='OrderBy'>
//                         Ordered by {datatitle.create_by} {datatitle.create_dt}
//                     </div>
//                 </div>
//             ))}
//             <div className='BodyOrderDetailPage'>
//                 <Tabs variant='enclosed' width='100%'>
//                     <TabList>
//                         {Zones.map((zone) => (
//                             <Tab>
//                                 {zone.zone_number}
//                             </Tab>
//                         ))}
//                     </TabList>
//                     <TabPanels>
//                         {Zones.map((zone) => (
//                             <TabPanel>
//                                 {zone.zone_number}
//                                 <GridOrderDetail />
//                                 <TablePickingListInOrder />
//                             </TabPanel>
//                         ))}
//                     </TabPanels>
//                 </Tabs>
//             </div>
//         </div>
//     )
// }

export default OrderDetail