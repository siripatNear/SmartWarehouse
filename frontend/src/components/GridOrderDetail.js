import React from 'react'
import "../pages/OrderDetail.css";
import { isNil } from "lodash";
import { Spinner, Center, Box } from "@chakra-ui/react";

function GridOrderDetail(props) {

    const { itemlist, isLoading } = props
    const sec1 = itemlist.positions_grid.filter((positions) => { return positions.section === 1 })
    const sec2 = itemlist.positions_grid.filter((positions) => { return positions.section === 2 })
    const sec3 = itemlist.positions_grid.filter((positions) => { return positions.section === 3 })
    const sec4 = itemlist.positions_grid.filter((positions) => { return positions.section === 4 })
    console.log(sec1);

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
                <div className='GridContainer'>
                    <div className='SecContainer'>
                        {sec1.map((data) => {
                            return (
                                <Box
                                    bgColor={data.target_in ? "yellow" : '#A3D9FB'}
                                    width='70px'
                                    height='70px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius='12px'
                                    key={data.col_no}
                                >
                                    <div className="TextBoxPosition">
                                        {data.count}
                                    </div>
                                </Box>
                            );
                        })}
                    </div>
                    <div className='SecContainer'>
                        {sec2.map((data) => {
                            return (
                                <Box
                                    bgColor={data.target_in ? "yellow" : '#A3D9FB'}
                                    width='70px'
                                    height='70px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius='12px'
                                    key={data.col_no}
                                >
                                    <div className="TextBoxPosition">
                                        {data.count}
                                    </div>
                                </Box>
                            );
                        })}
                    </div>
                    <div className='SecContainer'>
                        {sec3.map((data) => {
                            return (
                                <Box
                                    bgColor={data.target_in ? "yellow" : '#A3D9FB'}
                                    width='70px'
                                    height='70px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius='12px'
                                    key={data.col_no}
                                >
                                    <div className="TextBoxPosition">
                                        {data.count}
                                    </div>
                                </Box>
                            );
                        })}
                    </div>
                    <div className='SecContainer'>
                        {sec4.map((data) => {
                            return (
                                <Box
                                    bgColor={data.target_in ? "yellow" : '#A3D9FB'}
                                    width='70px'
                                    height='70px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius='12px'
                                    key={data.col_no}
                                >
                                    <div className="TextBoxPosition">
                                        {data.count}
                                    </div>
                                </Box>
                            );
                        })}
                    </div>
                </div>
            )
            }
        </>
    );
};

export default GridOrderDetail