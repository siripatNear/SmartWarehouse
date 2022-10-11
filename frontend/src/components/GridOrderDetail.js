import React from 'react'
import "../pages/OrderDetail.css";

const DataSecPositions = [
    {
        "Section": " ",
    },
    {
        "Section": " ",
    },
    {
        "Section": " "
    },
    {
        "Section": " "
    },

];

const DataPositions = [
    {
        "Position": "1",
    },
    {
        "Position": "2",
    },
    {
        "Position": "3"
    },
    {
        "Position": "full"
    },
    {
        "Position": "full"
    },
    {
        "Position": "3"
    },
    {
        "Position": "2"
    },
    {
        "Position": "1"
    }
];

function GridOrderDetail() {
    return (
        <div className='GridContainer'>
            {DataSecPositions.map((data) => {
                const { Section } = data;
                return (
                    <div className='SecContainer'>
                        { Section }
                        {DataPositions.map((data) => {
                            const { Position } = data;
                            return (
                                <div className="BoxPositions">
                                    <div className="TextBoxPosition">
                                        {Position}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}

export default GridOrderDetail