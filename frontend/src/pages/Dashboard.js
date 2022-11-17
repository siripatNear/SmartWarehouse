import React, { useEffect, useState } from "react";
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
import { isEmpty, isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import TablePickingList from "../components/TablePickingList";
import BoxZoneAll from "../components/BoxZoneAll";
import ReactPaginate from "react-paginate";
import styled from "@emotion/styled";
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";

const Pagination = styled(ReactPaginate)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
Pagination.defaultProps = {
  activeClassName: "active",
};

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState({
    value: "A",
    label: "Warehouse A",
  });
  const [zone, setZone] = useState(null);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const { data } = useQuery([
    `/warehouse/${warehouse.value}`,
    {
      zone: zone?.value,
      category: category?.value,
      search: isEmpty(search) ? null : search,
      page: !isNil(zone) || !isNil(category) ? page : null,
    },
  ]);

  useEffect(() => {
    if (user.role === "Forklift") {
      navigate("picking-order-list");
    }
  }, [navigate, user]);

  useEffect(() => {
    setPage(1);
  }, [category, zone]);

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
            search={search}
            setSearch={setSearch}
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
          ) : isNil(zone) && isNil(category) && isEmpty(search) ? (
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
                <Heading as="h1">
                  {isNil(zone)
                    ? `Warehouse ${data.summary.warehouse}`
                    : `Zone ${data.summary.zone}`}
                </Heading>
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
              <Box
                sx={{
                  ".container": {
                    flexDirection: "row",
                  },
                  ".page-item": {
                    borderRadius: 9,
                    borderWidth: 10,
                    // bg: "black",
                  },
                }}
              >
                <Pagination
                  pageCount={data.meta.last}
                  onPageChange={(data) => {
                    console.log(data.selected + 1);
                    setPage(data.selected + 1);
                  }}
                  forcePage={page - 1}
                />
              </Box>
            </>
          )}
        </VStack>
        {isNil(data) ? null : (
          <Box paddingLeft={"32px"}>
            {!isNil(zone) ? <BoxZoneAll data={data} /> : <BoxAll data={data} />}
          </Box>
        )}
      </HStack>
    </>
  );
};

export default Dashboard;
