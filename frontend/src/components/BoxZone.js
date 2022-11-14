import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

function BoxZone({ warehouseData, zone = null, setZone = () => null }) {
  return (
    <>
      {warehouseData.summary.map((v) => {
        const percentage = (Number(v.usage) / Number(v.total_positions)) * 100;
        return (
          <Box
            onClick={() => setZone({ value: v.zone, label: `Zone ${v.zone}` })}
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
                value={percentage}
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
