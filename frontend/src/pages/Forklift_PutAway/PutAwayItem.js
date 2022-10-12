import React from 'react'
import "./PutAwayItem.css";
import GridPutAwayItem from "../../components/GridPutAwayItem.js";

const MockDataPutAway = [
  {
    "zone": "1",
    "a": "",
    "b": "",
    "c": "",
    "d": "",
  },
]

function PutAway() {
  return (
    <div className='ContentPutAwayItemPage'>
      <div className='ZoneTitle'>
        Zone {MockDataPutAway[0].zone}
      </div>
      <div>
        <GridPutAwayItem />
      </div>
      <div className='ContainerNoteBox'>
        <div className='NoteBoxInprogress'>
          No.
        </div>
        Inprogress
        <div className='NoteBoxTarget'>
          No.
        </div>
        Target
        <div className='NoteBoxFull'>
          Full
        </div>
        Full
      </div>

    </div>
  )
}

export default PutAway