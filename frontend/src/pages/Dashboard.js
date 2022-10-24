import React from "react";
// import "./Dashboard.css";
// import BoxSectionDashboard from "../components/BoxSectionDashboard";
// import BoxOverallDashboard from "../components/BoxOverallDashboard";
import Search from "../components/Search";
import { Box, Grid, Heading, HStack, VStack } from "@chakra-ui/react";

import BoxZone from "../components/BoxZone";
import BoxAll from "../components/BoxAll";
import axios from "axios";

const Dashboard = () => {
  // const x = axios.get("http://localhost:5000/warehouse/A");
  return (
    <>
      <HStack paddingBottom={"32px"}>
        <VStack w="70%">
          <Search />
          {/* <Heading as="h1">Warehouse {x.warehouse} </Heading> */}
          <Heading as="h1" alignSelf={"flex-start"} paddingLeft="20px">
            Warehouse
          </Heading>

          <Box paddingLeft={15}>
            <Grid templateColumns="repeat(3, 2fr)" gap="32px">
              {/* <BoxZone data={x} /> */}
              <BoxZone />
            </Grid>
          </Box>
        </VStack>
        <Box paddingLeft={"32px"}>
          <BoxAll />
        </Box>
      </HStack>
    </>
  );
};

export default Dashboard;
