import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

function BoxAll({ data }) {
  const percentage = (Number(data.usage) / Number(data.positions)) * 100;

  return (
    <>
      <Box
        bg="#a3d9fb"
        borderRadius={"12px"}
        w="300px"
        h="300px"
        key={data.warehouse}
        boxShadow="lg"
      >
        <VStack marginTop="8px">
          <HStack>
            <Text fontSize="3xl" fontWeight={"bold"} marginTop="7px">
              Warehouse {data.warehouse}
            </Text>
            <Text fontSize="2xl" marginTop="10px">
              usage
            </Text>
          </HStack>
        </VStack>
        <VStack>
          <CircularProgress
            value={percentage}
            size="180px"
            color="#5677FC"
            marginTop="8px"
            marginLeft="8px"
            fontSize="7xl"
            fontWeight="bold"
          >
            <CircularProgressLabel>
              <Text fontSize="2xl">
                {data.usage}/{data.positions}
              </Text>
              <Text>units</Text>
            </CircularProgressLabel>
          </CircularProgress>
        </VStack>
        <VStack marginTop="10px" fontSize="2xl">
          <Text>Empty {data.empty} units</Text>
        </VStack>
      </Box>
    </>
  );
}

export default BoxAll;
