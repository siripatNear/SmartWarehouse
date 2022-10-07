import React from 'react'
import { Button, HStack, Link, VStack,Heading, Box, } from '@chakra-ui/react'

import BoxOverallDashboard from '../components/BoxOverallDashboard';
import TablePickingList from '../components/TablePickingList';
import Search from '../components/Search';
import AddAlert from '../components/Addbutton';




const PickingList = () => {


  return (
    <HStack align='flex-start' >
      <VStack width='70%' >
      <Search />
      <HStack paddingY='16px' paddingLeft='32px' paddingRight='16px' justify='space-between' width='100%'>
      <Heading as='h1'>Zone 4</Heading>
       <Link href="/">
           <Button colorScheme='twitter' variant='outline'>Show All</Button>
       </Link>
      </HStack>
        <TablePickingList />
        <Box alignSelf='flex-end' paddingRight='16px' paddingTop='20px' paddingBottom='20px'>
        <AddAlert/>
        {/* <Link href="/">
          <Button colorScheme='twitter' variant='solid' >Add</Button>
        </Link> */}
        </Box>
      </VStack>
        <Box width='30%' paddingTop='160px'>
          <BoxOverallDashboard />
        </Box>
    </HStack>
  )
}
export default PickingList