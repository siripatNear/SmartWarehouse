import React, { useState } from "react";
import "../OrderDetail.css";
import * as dayjs from 'dayjs';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Center } from '@chakra-ui/react'
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

import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";

import Dataorder from "../../assets/orderdetailmock.json";

function PickingOrderDetail() {

    const [object, setObject] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data: order, isLoading } = useQuery(["/order/KL004"]);
    // const { data: item_zone_1 } = useQuery(["/order/KL004?zone=1"]);
    // const { data: item_zone_2 } = useQuery(["/order/KL004?zone=2"]);
    const { data: item_zone_3 } = useQuery(["/order/KL004?zone=3"]);
    const { data: item_zone_4 } = useQuery(["/order/KL004?zone=4"]);
    const { data: item_zone_5 } = useQuery(["/order/KL004?zone=5"]);
    // const { data: item_zone_6 } = useQuery(["/order/KL004?zone=6"]);

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
            < CustomAlertOneButton
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
            )}
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