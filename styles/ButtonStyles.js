import { darken, mode, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props) => ({
      bg: "primary", // Notice the use of color directly here
      color: "white",
      borderColor: "transparent",
      borderWidth: "1px",
      _hover: {
        // Notice the use of `mode` function to change color
        // based on theme color mode
        bg: mode(whiten("primary", 100), darken("primary", 100))(props),
        boxShadow: "md",
        borderColor: "primary",
        color: "primary",
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {},
};
