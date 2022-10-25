import React, { useState } from "react";
import "../OrderDetail.css";
import * as dayjs from 'dayjs';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CustomButton from "../../components/CustomButton";
import {
  VStack,
  HStack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import GridOrderDetail from '../../components/GridOrderDetail';
import TablePickingListInOrder from '../../components/TablePickingListInOrder';
import { CustomAlertOneButton } from "../../components/AlertOneButton";

import Dataorder from "../../assets/orderdetailmock.json";

function PickingOrderDetail() {

    const [object, setObject] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    return (
        <>
            {/* Pop-up Match */}
            <CustomAlertOneButton
                isOpen={isOpen}
                onClose={onClose}
                buttonPopup="OK"
                ColorbuttonPopup="twitter"
                HearderFsize="5xl"
                textHeader=<HStack >
                    <font color="green" > Match! </font>
                </HStack>
                textBody=<VStack alignItems="left">
                    <Text fontSize="xl">Zone : {object.zone} </Text>
                    <Text fontSize="xl">Item code : {object.item_code} </Text>
                    <Text fontSize="xl">Category : {mapCateName(object.category)} </Text>
                    <Text fontSize="xl">Length : {object.length} </Text>
                    <Text fontSize="xl">Date create : {dayjs(object.create_dt).format('DD/MM/YYYY')} </Text>
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
                                    <TablePickingListInOrder items={Dataorder}/>
                                </TabPanel>
                                <TabPanel>
                                    2
                                    {/* <GridOrderDetail /> */}
                                    <TablePickingListInOrder items={Dataorder}/>
                                </TabPanel>
                                <TabPanel>
                                    3
                                    {/* <GridOrderDetail /> */}
                                    <TablePickingListInOrder items={Dataorder}/>
                                </TabPanel>
                                <TabPanel>
                                    4
                                    {/* <GridOrderDetail /> */}
                                    <TablePickingListInOrder items={Dataorder}/>
                                </TabPanel>
                                <TabPanel>
                                    5
                                    {/* <GridOrderDetail /> */}
                                    <TablePickingListInOrder items={Dataorder}/>
                                </TabPanel>
                                <TabPanel>
                                    6
                                    {/* <GridOrderDetail /> */}
                                    <TablePickingListInOrder items={Dataorder}/>
                                </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                
                {/* Test Pop-Up Button */}
                <div className='ContainerBtn'>
                    <CustomButton
                        marginX={4}
                        onOpen={() => {
                            setObject(Dataorder[0]);
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
        </>
    )
}

// function PickingOrderDetail() {
//     return (
//         <div>
//             <div className='TitleContainer'>
//                 <div className='OrderTitle'>
//                     Order {Dataorder[0].order_id}
//                 </div>
//                 <div className='OrderBy'>
//                     Ordered by {Dataorder[0].create_by} {Dataorder[0].create_dt}
//                 </div>
//             </div>
//             <div className='BodyOrderDetailPage'>
//                 <Tabs variant='enclosed' width='100%'>
//                     <TabList>
//                         {Dataorder.map((zone_number) => (
//                             <Tab>
//                                 Zone {zone_number.zone}
//                             </Tab>
//                         ))}
//                     </TabList>
//                     <TabPanels>
//                         {Dataorder.map((zone_number) => (
//                             <TabPanel>
//                                 {zone_number.zone}
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

export default PickingOrderDetail