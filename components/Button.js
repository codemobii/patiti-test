import React from "react";
import { Button as ButtonBox } from "@chakra-ui/react";

export default function Button({ children, ...rest }) {
  return (
    <ButtonBox
      color="#fff"
      _hover={{ color: "#000", bg: "#F6F7FB" }}
      rounded="0"
      bg="#000"
      {...rest}
    >
      {children}
    </ButtonBox>
  );
}
