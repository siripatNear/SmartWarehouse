import { Button } from "@chakra-ui/react";
import React from "react";

function CustomButton({
  marginX,
  buttonName = "",
  buttonColor = "",
  buttonSize = "",
  HoverColor = "",
  onOpen = null,
  disabledSubmit = false,
}) {
  return (
    <>
      <Button
        marginX={marginX}
        type={disabledSubmit ? "button" : "submit"}
        colorScheme={buttonColor}
        loadingText="Submitting"
        size={buttonSize}
        color={"white"}
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
