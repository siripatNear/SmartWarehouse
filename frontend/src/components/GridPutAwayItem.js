import React from 'react'
import "../pages/OrderDetail.css";
import { isNil } from "lodash";
import { Spinner, Center, Box } from "@chakra-ui/react";

const mapCountText = (count) => {
    switch (count) {
        case "4":
            return "Full";
        default:
            return "";
    }
};

function GridPutAwayItem(props) {

    const { itemlist, isLoading } = props
    const sec1 = itemlist.positions.filter((positions) => { return positions.section === 1 })
    const sec2 = itemlist.positions.filter((positions) => { return positions.section === 2 })
    const sec3 = itemlist.positions.filter((positions) => { return positions.section === 3 })
    const sec4 = itemlist.positions.filter((positions) => { return positions.section === 4 })

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
                        {sec1.map((data) => {
                            return (
                                <Box
                                    bgColor={data.target_in ? "rgb(4, 187, 4)" : data.count === "4" ? "gray" : '#A3D9FB'}
                                    width='70px'
                                    height='70px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius='12px'
                                    key={data.col_no}
                                >
                                    <div className="TextBoxPutAwayPosition">
                                        {data.count === "4" ? mapCountText(data.count) : (data.count)}
                                    </div>
                                </Box>
                            );
                        })}
                    </div>
                    <div className='SecPutAwayContainer'>
                        {sec2.map((data) => {
                            return (
                                <Box
                                    bgColor={data.target_in ? "rgb(4, 187, 4)" : data.count === "4" ? "gray" : '#A3D9FB'}
                                    width='70px'
                                    height='70px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius='12px'
                                    key={data.col_no}
                                >
                                    <div className="TextBoxPutAwayPosition">
                                        {data.count === "4" ? mapCountText(data.count) : (data.count)}
                                    </div>
                                </Box>
                            );
                        })}
                    </div>
                    <div className='SecPutAwayContainer'>
                        {sec3.map((data) => {
                            return (
                                <Box
                                    bgColor={data.target_in ? "rgb(4, 187, 4)" : data.count === "4" ? "gray" : '#A3D9FB'}
                                    width='70px'
                                    height='70px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius='12px'
                                    key={data.col_no}
                                >
                                    <div className="TextBoxPutAwayPosition">
                                        {data.count === "4" ? mapCountText(data.count) : (data.count)}
                                    </div>
                                </Box>
                            );
                        })}
                    </div>
                    <div className='SecPutAwayContainer'>
                        {sec4.map((data) => {
                            return (
                                <Box
                                    bgColor={data.target_in ? "rgb(4, 187, 4)" : data.count === "4" ? "gray" : '#A3D9FB'}
                                    width='70px'
                                    height='70px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius='12px'
                                    key={data.col_no}
                                >
                                    <div className="TextBoxPutAwayPosition">
                                        {data.count === "4" ? mapCountText(data.count) : (data.count)}
                                    </div>
                                </Box>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default GridPutAwayItem