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
  Box,
  Input,
  useToast,
  Button
} from "@chakra-ui/react";

import CustomButton from "../../components/CustomButton";
import GridOrderDetail from "../../components/GridOrderDetail";
import TablePickingListInOrder from "../../components/TablePickingListInOrder";
import { CustomAlertOneButton } from "../../components/AlertOneButton";
import { IoIosArrowBack } from "react-icons/io";

import { isNil } from "lodash";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";
import { useMutation } from "@tanstack/react-query";
import { api, queryClient } from "../../lib/query";

function PickingOrderDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
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

  const { state } = useLocation();
  const { data: order, isLoading } = useQuery([`/picking/${state}`]);
  const { data: item_zone_1 } = useQuery([`/picking/${state}`, { zone: 1 }]);
  const { data: item_zone_2 } = useQuery([`/picking/${state}`, { zone: 2 }]);
  const { data: item_zone_3 } = useQuery([`/picking/${state}`, { zone: 3 }]);
  const { data: item_zone_4 } = useQuery([`/picking/${state}`, { zone: 4 }]);
  const { data: item_zone_5 } = useQuery([`/picking/${state}`, { zone: 5 }]);
  const { data: item_zone_6 } = useQuery([`/picking/${state}`, { zone: 6 }]);
  const isFetching = useIsFetching([`/picking/${state}`]);

  // Test input Item
  const [inputitem, setInputitem] = useState("");
  const handleChange = (event) => setInputitem(event.target.value)
  console.log(inputitem);

  const {
    mutate: sendItemCode,
    data
  } = useMutation(
    (send) =>
      api.post(`/picking/${state}`, { item_code: send }),
    {
      onSuccess: (result) => {
        console.log(result);
        if (result.data.matching) {
          console.log('match');
          onOpen();
          // if (result.data.matching) {
          //   console.log('match');
          //   onOpen();
          // } else {
          //   console.log('not finish');
          //   onOpen();
          // }
        } else {
          console.log('not match');
          onOpen();
        }
      }
    }
  );

  // const {
  //   mutate: sendItemCode,
  //   data
  // } = useMutation(
  //   (send) =>
  //     api.post(`/picking/${state}`, { item_code: send }),
  //   {
  //     onSuccess: (result) => {
  //       console.log(result);
  //       if (result.data.finish) {
  //         console.log('finish');
  //         onOpen();
  //       } else {
  //         console.log('not finish');
  //         if (result.data.matching) {
  //           console.log('match');
  //           onOpen();
  //         } else {
  //           console.log('not match');
  //           onOpen();
  //         }
  //       }
  //     }
  //   }
  // );

  return (
    <>
      {/* Pop-up*/}
      < CustomAlertOneButton
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => {
          onClose();
          if (data?.data?.finish) {
            toast({
              title: 'Order Finish',
              description: 'Order ID : ' + state + ' is already finished.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            navigate("/history")
          } else {
            queryClient.invalidateQueries([`/picking/${state}`])
          }
        }}
        buttonPopup="OK"
        ColorbuttonPopup="twitter"
        HearderFsize="5xl"
        textHeader=<HStack >
          <font color={data?.data?.matching ? "green " : "red"} > {data?.data?.matching ? "Match!" : "Not Match!"} </font>
        </HStack>
        textBody=<VStack alignItems="left">
          {(data?.data?.matching) ? <Text fontSize="xl">Zone : {data?.data?.item[0].zone} </Text> : null}
          <Text fontSize="xl">Item code : {data?.data?.item[0].item_code} </Text>
          <Text fontSize="xl">Category : {data?.data?.item[0].cate_name} </Text>
          <Text fontSize="xl">Length : {data?.data?.item[0].length} </Text>
          <Text fontSize="xl">Date create : {dayjs(data?.data?.item[0].create_dt).format('DD/MM/YYYY')} </Text>
        </VStack>
      />

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
            <Button leftIcon={<IoIosArrowBack />} ml="30px" onClick={() => navigate("/picking-order-list")}></Button>
            <div className="OrderTitle">
              Order {state}
            </div>
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
          <Box display='flex' flexDirection='column' gap='10px' alignItems='center' justifyContent='center' mb='10px'>
            <Input placeholder='Item_code' width='200px' border='2px'
              inputitem={inputitem}
              onChange={handleChange}
            />
            <CustomButton
              onOpen={() =>
                sendItemCode(inputitem)
              }
              marginX={4}
              buttonName="Test Input-Item"
              buttonColor="twitter"
              HoverColor="twitter.300"
              buttonSize="lg"
              borderRadius="10px"
              fontSize="22px"
              fontWeight="medium"
            />
          </Box>
        </div>
      )}
    </>
  )

}

export default PickingOrderDetail;
