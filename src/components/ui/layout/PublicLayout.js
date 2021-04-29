import React from "react";
import Header from "./PublicHeader";

function PublicLayout({ children }) {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}

export default PublicLayout;
