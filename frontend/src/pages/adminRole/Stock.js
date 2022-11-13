import React, { useState } from "react";
import { Box, Center, Grid, HStack, Spinner, VStack } from "@chakra-ui/react";

import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import BoxStock from "../../components/BoxStock";

const Stock = () => {
  const { data, isLoading } = useQuery(["/stock"]);

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
        <Center>
          <HStack padding="60px">
            <Grid templateColumns="repeat(4, 2fr)" gap="64px">
              <BoxStock stockData={data} />
            </Grid>
          </HStack>
        </Center>
      )}
    </>
  );
};

export default Stock;
