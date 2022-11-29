import React from "react";
import "./OrderDetail.css";
import * as dayjs from "dayjs";
import TablePickingListInOrder from "../components/TablePickingListInOrder";

import {
    Spinner,
    Center,
    Button
} from "@chakra-ui/react";

import { IoIosArrowBack } from "react-icons/io";
import { isNil } from "lodash";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

function HistoryDetail() {
    const { state } = useLocation();
    const { data: order, isLoading } = useQuery([`/order/${state}`]);
    const { data: items } = useQuery([`/order/${state}`, { zone: 1 }]);
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
                        <Button leftIcon={<IoIosArrowBack />} ml="30px" onClick={() => navigate("/history")}></Button>
                        <div className="OrderTitle">
                            {/* Order {state} */}
                            Order
                        </div>
                        <div className="OrderBy">
                            {/* Progress by {order.description[0].create_by}{" "} */}
                            Progress by 

                            {/* {dayjs(order.description[0].create_dt).format("DD/MM/YYYY")} */}
                        </div>
                    </div>
                    <div className="BodyOrderDetailPage">
                        {/* <TablePickingListInOrder itemlist={items} /> */}
                    </div>
                </div>
            )}
        </>
    );
}

export default HistoryDetail;
