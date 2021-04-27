import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/ui/Header";
import { extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/react-datepicker.css";

import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Header></Header>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
