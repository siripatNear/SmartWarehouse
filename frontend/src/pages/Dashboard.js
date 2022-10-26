import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Box, Grid, Heading, HStack, Spinner, VStack } from "@chakra-ui/react";

import BoxZone from "../components/BoxZone";
import BoxAll from "../components/BoxAll";
import { onGetWarehouseDashboard } from "../api/data";
import { isNil } from "lodash";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const { data: result } = await onGetWarehouseDashboard("A");
        setData(result);
        console.log(result);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

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
            <BoxAll />
          </Box>
        </HStack>
      )}
    </>
  );
};

export default Dashboard;
