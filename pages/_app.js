import React from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import customTheme from "styles/theme";
import "../polyfills";
import "react-datepicker/dist/react-datepicker.css";
import "styles/react-datepicker.css";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <Head>
          <title>Asepy FishSwarm</title>
        </Head>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
