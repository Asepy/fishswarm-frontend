import React from "react";
import Image from "next/image";

export default function WaitingSearch({ ...rest }) {
  return (
    <Image
      width={300}
      height={300}
      src="/images/undraw_File_searching_re_3evy.svg"
      {...rest}
    />
  );
}
