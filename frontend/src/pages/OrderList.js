import React from 'react'
import "./OrderList.css";

import TableOrderlist from '../components/TableOrderlist';

import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Center } from "@chakra-ui/react";

const OrderList = () => {

  const { data: Orders, isLoading } = useQuery(["/order-list"]);

  return (
    <>
      {isLoading || isNil(Orders) ? (
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
          <div className='TitleOrderListPage'>
            Order List
          </div>
          <div className='TableOrderlist'>
            <TableOrderlist Orders={Orders} />
          </div>
        </div>
      )}
    </>
  )
}

export default OrderList