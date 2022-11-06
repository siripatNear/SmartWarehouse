import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Box, Grid, Heading, HStack, Spinner, VStack } from "@chakra-ui/react";

import BoxZone from "../components/BoxZone";
import BoxAll from "../components/BoxAll";
// import { onGetWarehouseDashboard } from "../api/data";
import { isNil } from "lodash";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { api, queryClient } from "../../lib/query";

const Dashboard = () => {
  const { data, isLoading } = useQuery(["/warehouse/A"]);
  console.log(data);

  const { data:DataOverall } = useQuery(["/warehouse/A"]);

  return (
    <>
      {isLoading || isNil(data) ? (
        <Spinner />
      ) : (
        <HStack paddingBottom={"32px"}>
          <VStack w="70%">
            <Search />
            <Heading as="h1" alignSelf={"flex-start"} paddingLeft="20px">
              Warehouse {data.warehouse}
            </Heading>

            <Box paddingLeft={15}>
              <Grid templateColumns="repeat(3, 2fr)" gap="32px">
                <BoxZone warehouseData={data} />
              </Grid>
            </Box>
          </VStack>
          <Box paddingLeft={"32px"}>
            <BoxAll data={data} />
          </Box>
        </HStack>
      )}
    </>
  );
};

export default Dashboard;
