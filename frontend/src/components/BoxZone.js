import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

const DataBoxZone = [
  {
    label: "Zone 1",
    max: 100,
    usage: 60,
    empty: 40,
  },
  {
    label: "Zone 2",
    max: 100,
    usage: 50,
    empty: 50,
  },
  {
    label: "Zone 3",
    max: 100,
    usage: 20,
    empty: 80,
  },
  {
    label: "Zone 4",
    max: 100,
    usage: 70,
    empty: 30,
  },
  {
    label: "Zone 5",
    max: 100,
    usage: 80,
    empty: 20,
  },
  {
    label: "Zone 6",
    max: 100,
    usage: 90,
    empty: 10,
  },
];

// function BoxZone({ data }) {
function BoxZone() {
  return (
    <>
      {DataBoxZone.map((v) => {
        const { label, max, usage, empty } = v;
        return (
          <Box
            bg="#a3d9fb"
            borderRadius={"12px"}
            w="250px"
            key={label}
            boxShadow="lg"
          >
            <VStack marginTop="8px">
              <HStack>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  {label}
                </Text>
                <Text fontSize="lg">usage</Text>
              </HStack>
            </VStack>
            <VStack>
              <CircularProgress
                value={usage}
                size="140px"
                color="#5677FC"
                marginTop="8px"
                fontSize="7xl"
                fontWeight="bold"
              >
                <CircularProgressLabel>
                  <Text>
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

export default BoxZone;
