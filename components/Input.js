import { FormControl, FormLabel, Input as InputBox } from "@chakra-ui/react";
import React from "react";

export default function Input({ label = "Email", ...rest }) {
  return (
    <FormControl variant="floating" id="first-name" isRequired isInvalid>
      <InputBox variant={"floating"} placeholder=" " {...rest} />
      <FormLabel>{label}</FormLabel>
    </FormControl>
  );
}
