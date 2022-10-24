import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

const DataBoxOverall = [
  {
    label: "Overall",
    max: 100,
    usage: 80,
    empty: 20,
  },
];

function BoxAll() {
  return (
    <>
      {DataBoxOverall.map((data) => {
        const { label, max, usage, empty } = data;
        return (
          <Box
            bg="#a3d9fb"
            borderRadius={"12px"}
            w="280px"
            h="280px"
            key={label}
            boxShadow="lg"
          >
            <VStack marginTop="8px">
              <HStack>
                <Text fontSize="3xl" fontWeight={"bold"}>
                  {label}
                </Text>
                <Text fontSize="xl">usage</Text>
              </HStack>
            </VStack>
            <VStack>
              <CircularProgress
                value={usage}
                size="160px"
                color="#5677FC"
                marginTop="8px"
                marginLeft="8px"
                fontSize="7xl"
                fontWeight="bold"
              >
                <CircularProgressLabel>
                  <Text fontSize="2xl">
                    {usage}/{max}
                  </Text>
                  <Text>units</Text>
                </CircularProgressLabel>
              </CircularProgress>
            </VStack>
            <VStack marginTop="8px" fontSize="lg" marginBottom="8px">
              <Text>Empty {empty} units</Text>
            </VStack>
          </Box>
        );
      })}
    </>
  );
}

export default BoxAll;
