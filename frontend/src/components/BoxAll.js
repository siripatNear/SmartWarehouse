import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

function BoxAll(props) {

  const { DataUsage } = props
  console.log(DataUsage);

  return (


    <Box
      bg="#a3d9fb"
      borderRadius={"12px"}
      w="280px"
      h="280px"
      key={DataUsage.zone}
      boxShadow="lg"
    >
      <VStack marginTop="8px">
        <HStack>
          <Text fontSize="3xl" fontWeight={"bold"}>
            Zone {DataUsage.zone}
          </Text>
          <Text fontSize="xl">usage</Text>
        </HStack>
      </VStack>
      <VStack>
        <CircularProgress
          value={DataUsage.usage}
          size="160px"
          color="#5677FC"
          marginTop="8px"
          marginLeft="8px"
          fontSize="7xl"
          fontWeight="bold"
        >
          <CircularProgressLabel>
            <Text fontSize="2xl">
              {DataUsage.usage}/{DataUsage.positions}
            </Text>
            <Text>units</Text>
          </CircularProgressLabel>
        </CircularProgress>
      </VStack>
      <VStack marginTop="8px" fontSize="lg" marginBottom="8px">
        <Text>Empty {DataUsage.empty} units</Text>
      </VStack>
    </Box>
  );
}

export default BoxAll;
