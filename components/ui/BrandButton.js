import { Button } from "@chakra-ui/button";
import React from "react";

export default function BrandButton({ ...rest }) {
  return (
    <Button
      bgColor="black"
      color="white"
      _hover={{
        color: "black",
        borderColor: "black",
        borderWidth: "1px",
        background: "gray.100",
      }}
      {...rest}
    ></Button>
  );
}
