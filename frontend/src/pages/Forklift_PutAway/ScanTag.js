import React from 'react'
import "./ScanTag.css";
// import scanlogo from "./scanlogo.png";
// const users = [
//     {
//         "user": "Mr.Petch",
//         "id": "0123456789",
//     },
// ]

function ScanTag() {
  return (
    <div>
      <div className='Content'>
        <div className='UserContainer'>
          Name : Mr.Petch ID : 0123456789
        </div>
        <div className='ScanTagContainer'>
          Please! Scan Tag
        </div>
      </div>
    </div>
  )
}

export default ScanTag