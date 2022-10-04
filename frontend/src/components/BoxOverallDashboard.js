import React from 'react'
import "../pages/Dashboard.css";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const DataBoxOverall = [
    {
        "label": "Overall",
        "max": 100,
        "usage": 80,
        "empty": 20
    }
]

function BoxSection() {
    return (
        <div className='OverallContainer'>
            {DataBoxOverall.map((data) => {
                const { label, max, usage, empty } = data;
                return (
                    <div className="OverallDashboardBox">
                        <div className="OverallDashboardTitle">
                            {label}
                        </div>
                        <div className="CircularProgress">
                            <CircularProgress value={usage} size='260px' color='#5677FC' mt='8px' fontSize='9xl' fontWeight='bold' >
                                <CircularProgressLabel >
                                    <p>{usage}/{max}</p>
                                    <p>units</p>
                                </CircularProgressLabel>
                            </CircularProgress>
                        </div>
                        <div className="OverallBody">
                            Empty {empty} units
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default BoxSection