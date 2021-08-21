import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
import { ButtonStyles } from "./ButtonStyles";

const styles = {
  global: {
    ...chakraTheme.styles.global,
    "html, body, #__next": {
      height: "100%"
    }
  }
};

const customTheme = extendTheme({
  colors: {
    primary: chakraTheme.colors.black,
    alabaster: {
      DEFAULT: "#FAFAFA",
      50: "#FFFFFF",
      100: "#FFFFFF",
      200: "#FFFFFF",
      300: "#FFFFFF",
      400: "#FFFFFF",
      500: "#FAFAFA",
      600: "#E1E1E1",
      700: "#C7C7C7",
      800: "#ADADAD",
      900: "#949494"
    },
    minsk: {
      DEFAULT: "#382F95",
      50: "#C3BFEB",
      100: "#B0ABE5",
      200: "#8C85D8",
      300: "#685ECC",
      400: "#473BBC",
      500: "#382F95",
      600: "#29236E",
      700: "#1B1747",
      800: "#0C0A21",
      900: "#000000"
    },
    stiletto: {
      DEFAULT: "#952F32",
      50: "#EBBFC0",
      100: "#E5ABAD",
      200: "#D88587",
      300: "#CC5E61",
      400: "#BC3B3F",
      500: "#952F32",
      600: "#6E2325",
      700: "#471718",
      800: "#210A0B",
      900: "#000000"
    },
    apple: {
      DEFAULT: "#49952F",
      50: "#CAEBBF",
      100: "#BAE5AB",
      200: "#9AD885",
      300: "#7ACC5E",
      400: "#5CBC3B",
      500: "#49952F",
      600: "#366E23",
      700: "#234717",
      800: "#10210A",
      900: "#000000"
    },
    astral: {
      DEFAULT: "#2F7A95",
      50: "#BFDFEB",
      100: "#ABD5E5",
      200: "#85C2D8",
      300: "#5EAFCC",
      400: "#3B9ABC",
      500: "#2F7A95",
      600: "#235A6E",
      700: "#173B47",
      800: "#0A1B21",
      900: "#000000"
    },
    "mule-fawn": {
      DEFAULT: "#955B2F",
      50: "#EBD2BF",
      100: "#E5C4AB",
      200: "#D8A985",
      300: "#CC8D5E",
      400: "#BC733B",
      500: "#955B2F",
      600: "#6E4323",
      700: "#472C17",
      800: "#21140A",
      900: "#000000"
    },
    lochinvar: {
      DEFAULT: "#2F9576",
      50: "#BFEBDD",
      100: "#ABE5D3",
      200: "#85D8BF",
      300: "#5ECCAB",
      400: "#3BBC95",
      500: "#2F9576",
      600: "#236E57",
      700: "#174739",
      800: "#0A211A",
      900: "#000000"
    }
  },
  components: {
    Button: ButtonStyles
  },
  fonts: {
    heading: `Poppins,${chakraTheme.fonts.heading}`,
    body: `Roboto,${chakraTheme.fonts.body}`
  },
  styles
});

export default customTheme;
