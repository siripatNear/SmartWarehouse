import React from 'react'
import "./ScanTag.css";
import scanlogo from "../../assets/scanlogo.png";

const users = [
    {
        "user": "Mr.Petch",
        "id": "0123456789",
    },
]

function ScanTag() {
  return (
    <div>
      <div className='Content'>
        <div className='UserContainer'>
          Name : {users[0].user} ID : {users[0].id} 
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