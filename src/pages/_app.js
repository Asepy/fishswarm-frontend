import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/ui/Header";
import customTheme from "../styles/theme";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/react-datepicker.css";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <QueryClientProvider client={queryClient}>
          <Header></Header>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
