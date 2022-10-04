import React from 'react'
import "../pages/Dashboard.css";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const DataBoxSection = [
    {
        "label": "Zone 1",
        "max": 100,
        "usage": 60,
        "empty": 40
    },
    {
        "label": "Zone 2",
        "max": 100,
        "usage": 50,
        "empty": 50
    },
    {
        "label": "Zone 3",
        "max": 100,
        "usage": 20,
        "empty": 80
    },
    {
        "label": "Zone 4",
        "max": 100,
        "usage": 70,
        "empty": 30
    },
    {
        "label": "Zone 5",
        "max": 100,
        "usage": 80,
        "empty": 20
    },
    {
        "label": "Zone 6",
        "max": 100,
        "usage": 90,
        "empty": 10
    }
];

function BoxSection() {
    return (
        <div className='SectionContainer'>
            {DataBoxSection.map((data) => {
                const { label, max, usage, empty } = data;
                return (
                    <div className="SecDashboardBox">
                        <div className="SecDashboardTitle">
                            {label}
                        </div>
                        <div className="SecCircular">
                            <CircularProgress value={usage} size='180px' color='#5677FC' mt='8px' fontSize='8xl' fontWeight='bold'>
                                <CircularProgressLabel >
                                    <p>{usage}/{max}</p>
                                    <p>units</p>
                                </CircularProgressLabel>
                            </CircularProgress>
                        </div>
                        <div className="SecBody">
                            Empty {empty} units
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default BoxSection