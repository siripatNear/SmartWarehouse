import React from 'react'
// import "./Dashboard.css";
import BoxSectionDashboard from '../components/BoxSectionDashboard';
import BoxOverallDashboard from '../components/BoxOverallDashboard';
import Search from '../components/Search';
import { HStack,VStack } from '@chakra-ui/react'

const Dashboard = () => {
  return (
    <HStack>
      <VStack width='70%'>
        <Search />
        <BoxSectionDashboard />
      </VStack>
      <BoxOverallDashboard />
    </HStack>

  )
}

// const Dashboard = () => {
//   return (
//     <div>
//       <div className='Search'>
//         <Search />
//       </div>
//       <div className='Dashboard'>
//         <BoxSectionDashboard />
//         <BoxOverallDashboard />
//       </div>
//     </div>
//   )
// }

export default Dashboard