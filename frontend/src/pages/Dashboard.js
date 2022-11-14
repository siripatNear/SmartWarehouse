import React, { useState } from "react";
import Search from "../components/Search";
import {
  Box,
  Button,
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
import TablePickingList from "../components/TablePickingList";
import BoxZoneAll from "../components/BoxZoneAll";
import ReactPaginate from "react-paginate";

const Dashboard = () => {
  const [warehouse, setWarehouse] = useState({
    value: "A",
    label: "Warehouse A",
  });
  const [zone, setZone] = useState(null);
  const [category, setCategory] = useState(null);
  const { data } = useQuery([
    `/warehouse/${warehouse.value}`,
    {
      zone: zone?.value,
      category: category?.value,
    },
  ]);

  return (
    <>
      <HStack paddingBottom={"32px"}>
        <VStack w="70%">
          <Search
            warehouse={warehouse}
            zone={zone}
            category={category}
            setWarehouse={setWarehouse}
            setZone={setZone}
            setCategory={setCategory}
          />
          {isNil(data) ? (
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
          ) : isNil(zone) && isNil(category) ? (
            <>
              <Heading as="h1" alignSelf={"flex-start"} paddingLeft="20px">
                Warehouse {data.warehouse}
              </Heading>

              <Box paddingLeft={15}>
                <Grid templateColumns="repeat(3, 2fr)" gap="32px">
                  <BoxZone warehouseData={data} zone={zone} setZone={setZone} />
                </Grid>
              </Box>
            </>
          ) : (
            <>
              <HStack
                paddingY="16px"
                paddingLeft="32px"
                paddingRight="16px"
                justify="space-between"
                width="100%"
              >
                <Heading as="h1">Zone {data.summary.zone}</Heading>
                <Button
                  colorScheme="twitter"
                  variant="outline"
                  onClick={() => {
                    setZone(null);
                    setCategory(null);
                  }}
                >
                  Show All
                </Button>
              </HStack>
              <TablePickingList itemlists={data} warehouse={warehouse.value} />
              {/* <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={() => null}
                pageRangeDisplayed={5}
                pageCount={3}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
              /> */}
            </>
          )}
        </VStack>
        {isNil(data) ? null : (
          <Box paddingLeft={"32px"}>
            {!isNil(zone) || !isNil(category) ? (
              <BoxZoneAll data={data} />
            ) : (
              <BoxAll data={data} />
            )}
          </Box>
        )}
      </HStack>
    </>
  );
};

export default Dashboard;
