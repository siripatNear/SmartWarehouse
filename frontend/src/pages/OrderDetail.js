import React from 'react'
import "./OrderDetail.css";
import GridOrderDetail from '../components/GridOrderDetail';

function OrderDetail() {
    return (
        <div>
            <div className='TitleOrderDetailPage'>
                Order Detail
            </div>
            <GridOrderDetail />
            Table
        </div>
    )
}

export default OrderDetail