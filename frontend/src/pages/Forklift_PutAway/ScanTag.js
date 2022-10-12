import React from 'react'
import "./ScanTag.css";
import scanlogo from "../../assets/scanlogo.png";

const user = [
    {
        "name": "Mr.Petch",
        "id": "0123456789",
    },
]

function ScanTag() {
  return (
    <div>
      <div className='ContentScanTagPage'>
        <div className='UserContainer'>
          Name : {user[0].name} ID : {user[0].id} 
        </div>
        <div className='ScanTagContainer'>
          Please! Scan Tag
          <img
                  src={scanlogo}
                  width="300"
                  height="auto"
                  alt="scanlogo"
                />
        </div>
      </div>
    </div>
  )
}

export default ScanTag