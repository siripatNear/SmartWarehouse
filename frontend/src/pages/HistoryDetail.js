import React from "react";
import "./OrderDetail.css";
import * as dayjs from "dayjs";
import TablePickingListInOrder from "../components/TablePickingListInOrder";

import {
    Spinner,
    Center,
    Button,
    Stack,
    Text,
} from "@chakra-ui/react";

import { IoIosArrowBack } from "react-icons/io";
import { isNil } from "lodash";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

function HistoryDetail() {
    const { state } = useLocation();
    const { data: order, isLoading } = useQuery([`/history-order/${state}`]);
    const isFetching = useIsFetching([`/history-order/${state}`]);
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
                    <div className="HistoryTitleContainer">
                        <Button leftIcon={<IoIosArrowBack />} ml="30px" mt="13px" onClick={() => navigate("/history")}></Button>
                        <div className="HistoryOrderTitle">
                            Order {state}
                        </div>
                        <div className="HistoryOrderBy">
                            <Stack>
                                <Text>Order by {order.order[0].order_by} {dayjs(order.order[0].create_dt).format("DD/MM/YYYY")} </Text>
                                <Text>Progress by {order.order[0].progress_by}</Text>
                            </Stack>
                        </div>
                    </div>
                    <div className="BodyOrderDetailPage">
                        <TablePickingListInOrder itemlist={order} />
                    </div>
                </div>
            )}
        </>
    );
}

export default HistoryDetail;
