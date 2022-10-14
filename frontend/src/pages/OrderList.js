import React from 'react'
import "./OrderList.css";
import TableOrderlist from '../components/TableOrderlist';

const OrderList = () => {
  return (
    <div>
      <div className='TitleOrderListPage'>
        Order List
      </div>
      <div className='TableOrderlist'>
        <TableOrderlist />
      </div>
    </div>
  )
}

export default OrderList