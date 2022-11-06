import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import {
  Box,
  Center,
  Grid,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";

import BoxZone from "../components/BoxZone";
import BoxAll from "../components/BoxAll";
import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data, isLoading } = useQuery(["/warehouse/A"]);
  console.log(data);

  return (
    <>
      {isLoading || isNil(data) ? (
        <Center mt="100px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            alignItems
          />
        </Center>
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
