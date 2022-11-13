import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

function BoxStock({ stockData }) {
  return (
    <>
      {stockData.data.map((v) => {
        const percentage = (Number(v.usage) / Number(v.max_quantity)) * 100;
        return (
          <Box
            // bg="#a3d9fb"
            bg={v.usage <= v.min_quantity ? "#FFF06A" : "#a3d9fb"}
            borderRadius={"12px"}
            w="260px"
            key={v.item_cate_code}
            boxShadow="lg"
          >
            <VStack marginTop="8px">
              <HStack>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  {v.category}
                </Text>
              </HStack>
            </VStack>
            <VStack>
              <CircularProgress
                value={percentage}
                size="140px"
                // color="#5677FC"
                color={v.usage <= v.min_quantity ? "#FF9900" : "#5677FC"}
                marginTop="8px"
                fontSize="7xl"
                fontWeight="bold"
              >
                <CircularProgressLabel>
                  <Text>
                    {v.usage}/{v.max_quantity}
                  </Text>
                  <Text>units</Text>
                </CircularProgressLabel>
              </CircularProgress>
            </VStack>
            <VStack marginTop="8px" fontSize="lg" marginBottom="8px">
              <Text fontSize="s">Empty {v.empty} units</Text>
            </VStack>
          </Box>
        );
      })}
    </>
  );
}

export default BoxStock;
