import { Button } from "@chakra-ui/react";
import React from "react";

function CustomButton({
  marginX,
  buttonName = "",
  buttonColor = "",
  buttonSize = "",
  HoverColor = "",
  fontSize = "",
  fontWeight = "",
  borderRadius = "",
  onOpen = null,
}) {
  return (
    <>
      <Button
        marginX={marginX}
        type={"submit"}
        colorScheme={buttonColor}
        loadingText="Submitting"
        size={buttonSize}
        color={"white"}
        borderRadius={borderRadius}
        fontSize={fontSize}
        fontWeight={fontWeight}
        _hover={{
          bg: HoverColor,
        }}
        onClick={onOpen}
      >
        {buttonName}
      </Button>
    </>
  );
}

export default CustomButton;
