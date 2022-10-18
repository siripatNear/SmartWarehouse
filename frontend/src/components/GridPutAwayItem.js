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

function GridPutAwayItem() {
    return (
        <div className='GridPutAwayContainer'>
            {DataSecPositions.map((data) => {
                const { Section } = data;
                return (
                    <div className='SecPutAwayContainer'>
                        { Section }
                        {DataPositions.map((data) => {
                            const { Position } = data;
                            return (
                                <div className="BoxPutAwayPositions">
                                    <div className="TextBoxPutAwayPosition">
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

export default GridPutAwayItem