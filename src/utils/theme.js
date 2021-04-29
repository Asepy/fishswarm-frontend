import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

const styles = {
  global: {
    ...chakraTheme.styles.global,
    "html, body, #__next": {
      height: "100%",
    },
  },
};

const customTheme = extendTheme({
  fonts: {
    heading: `Poppins,${chakraTheme.fonts.heading}`,
    body: `Poppins,${chakraTheme.fonts.body}`,
  },
  styles,
});

export default customTheme;
