import { FormControl, FormLabel, Select as SelectBox } from "@chakra-ui/react";
import React from "react";

export default function Select({ children, label = "States", ...rest }) {
  return (
    <FormControl variant="floating" id="first-name" isRequired isInvalid>
      <SelectBox variant={"floating"} placeholder=" " {...rest}>
        {children}
      </SelectBox>
      <FormLabel>{label}</FormLabel>
    </FormControl>
  );
}
