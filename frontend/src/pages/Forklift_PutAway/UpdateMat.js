import React, { useState } from "react";
import "./UpdateMat.css";
import { Input } from '@chakra-ui/react'

const MockItem = [
  {
    "name": "Kraft Paper",
    "size": "100gsm. 420mm",
    "type": "smooth, brown",
    "item_code": "AA-125464",
    "og_length": 200,
  },
]

export default function UpdateMat() {
  const [UseLength, setUseLength] = useState("");

  return (
    <div className='ContentUpdateMatPage'>
      <div className='AlertTitle'>
        Please update this raw material before put it away
      </div>
      <div className='ItemName'>
        {MockItem[0].name}
      </div>
      <div className='ItemProperties'>
        {MockItem[0].size} {MockItem[0].type}
      </div>
      <div className='Original'>
        <p>Item code : {MockItem[0].item_code}</p>
        <p>Original length : {MockItem[0].og_length} meters</p>
      </div>
      <div className='Update'>
        <p>How many length do you use? : <Input placeholder='0' isInvalid errorBorderColor='crimson' width='100px' onChange={(event) =>
          setUseLength(event.currentTarget.value)
        } /> meters </p>
        <p>This item's length would be : {MockItem[0].og_length - UseLength} meters</p>
      </div>
    </div>
  )
}
