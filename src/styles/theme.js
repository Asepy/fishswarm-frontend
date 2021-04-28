import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    heading: `Poppins,${chakraTheme.fonts.heading}`,
    body: `Poppins,${chakraTheme.fonts.body}`,
  },
});

export default customTheme;
