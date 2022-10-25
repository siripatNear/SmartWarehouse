import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

function BoxZone({ warehouseData }) {
  return (
    <>
      {warehouseData.summary.map((v) => {
        return (
          <Box
            bg="#a3d9fb"
            borderRadius={"12px"}
            w="250px"
            key={v.zone}
            boxShadow="lg"
          >
            <VStack marginTop="8px">
              <HStack>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  Zone {v.zone}
                </Text>
                <Text fontSize="lg">usage</Text>
              </HStack>
            </VStack>
            <VStack>
              <CircularProgress
                value={v.usage}
                size="140px"
                color="#5677FC"
                marginTop="8px"
                fontSize="7xl"
                fontWeight="bold"
              >
                <CircularProgressLabel>
                  <Text>
                    {v.usage}/{v.total_positions}
                  </Text>
                  <Text>units</Text>
                </CircularProgressLabel>
              </CircularProgress>
            </VStack>
            <VStack marginTop="8px" fontSize="lg" marginBottom="8px">
              <Text>Empty {v.empty} units</Text>
            </VStack>
          </Box>
        );
      })}
    </>
  );
}

export default BoxZone;
