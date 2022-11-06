import React from 'react'
import "../pages/OrderDetail.css";
import { isNil } from "lodash";
import { Spinner, Center } from "@chakra-ui/react";

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

function GridPutAwayItem(props) {

    const { itemlist, isLoading } = props
    // const sec1 = itemlist.positions_grid.filter((positions) => { return positions.section === 1 })
    // const sec2 = itemlist.positions_grid.filter((positions) => { return positions.section === 2 })
    // const sec3 = itemlist.positions_grid.filter((positions) => { return positions.section === 3 })
    // const sec4 = itemlist.positions_grid.filter((positions) => { return positions.section === 4 })

    return (
        <>
            {isLoading || isNil(itemlist) ? (
                <Center mt='100px'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                        alignItems
                    />
                </Center>
            ) : (
                <div className='GridPutAwayContainer'>
                    <div className='SecPutAwayContainer'>
                        {DataPositions.map((data) => {
                            return (
                                <div className="BoxPutAwayPositions">
                                    <div className="TextBoxPutAwayPosition">
                                        {data.Position}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='SecPutAwayContainer'>
                        {DataPositions.map((data) => {
                            return (
                                <div className="BoxPutAwayPositions">
                                    <div className="TextBoxPutAwayPosition">
                                        {data.Position}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='SecPutAwayContainer'>
                        {DataPositions.map((data) => {
                            return (
                                <div className="BoxPutAwayPositions">
                                    <div className="TextBoxPutAwayPosition">
                                        {data.Position}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='SecPutAwayContainer'>
                        {DataPositions.map((data) => {
                            return (
                                <div className="BoxPutAwayPositions">
                                    <div className="TextBoxPutAwayPosition">
                                        {data.Position}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default GridPutAwayItem