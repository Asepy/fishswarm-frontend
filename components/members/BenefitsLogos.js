import React from "react";
import { Box } from "@chakra-ui/react";
import { animated, config, useTrail, useTransition } from "react-spring";

const logoItems = [
  {
    src: "/images/benefits/logo-dhl-en-alta-1536x340.png",
    width: 150,
    height: 33,
    initialX: 560,
    initialY: 200,
    distance: 300
  },
  {
    src: "/images/benefits/MiNegocio-Logo-Oficial-01-e1599751082387-2048x563.jpeg",
    width: 225,
    height: 62,
    initialX: 449.0119385649778,
    initialY: 338.5,
    distance: 290
  },
  {
    src: "/images/benefits/taxit.png",
    width: 200,
    height: 150,

    initialX: 500,
    initialY: 60,
    distance: 300
  },
  {
    src: "/images/benefits/Logo-Bims.png",
    width: 221,
    height: 125,
    initialX: -10,
    initialY: 173.8532771757026,
    distance: 300
  },
  {
    src: "/images/benefits/loffice.png",
    width: 172,
    height: 129,
    initialX: 6.782989848936381,
    initialY: 24.371169869017763,
    distance: 300
  },
  {
    src: "/images/benefits/copipunto.png",
    width: 260,
    height: 65,
    initialX: 214.45082690549685,
    initialY: 114.40514770876852,
    distance: 115
  },
  {
    src: "/images/benefits/grupo-nativa.png",
    width: 260,
    height: 130,
    initialX: 219.3683932495117,
    initialY: 0,
    distance: 225
  },
  {
    src: "/images/benefits/formativa.png",
    width: 260,
    height: 130,
    initialX: 485.8800670312087,
    initialY: 0,
    distance: 340
  },
  {
    src: "/images/benefits/ptf.png",
    width: 260,
    height: 195,
    initialX: 215.1928388023482,
    initialY: 186.65238572776838,
    distance: 150
  },
  {
    src: "/images/benefits/koga.png",
    width: 260,
    height: 195,
    initialX: -5,
    initialY: 273.8532771757026,
    distance: 300
  },
  {
    src: "/images/benefits/girolabs.png",
    width: 260,
    height: 195,
    initialX: 445.1928388023482,
    initialY: 186.65238572776838,
    distance: 150
  }
];

export default function BenefitsLogos(props) {
  return (
    <>
      <BenefitsLogosMediumScreen
        display={{ base: "none", md: "block" }}
        {...props}
      />
      <BenefitsLogosMobile display={{ base: "block", md: "none" }} {...props} />
    </>
  );
}

function BenefitsLogosMediumScreen({
  containerWidth = 700,
  containerHeight = 400,
  ...restProps
}) {
  const transitions = useTransition(logoItems, {
    from: { rotate: -90, life: "0%", opacity: 0, x: 0, y: 0, top: 0, left: 0 },
    enter: (item) => async (next) => {
      await next({
        life: "0%",
        top: containerHeight / 2,
        left: containerWidth / 2
      });

      await next({
        rotate: 0,
        opacity: 1,
        top: 0,
        left: 0,
        x: item.initialX,
        y: item.initialY,
        life: "100%"
      });
    },
    trail: 1000 / logoItems.length,
    config: config.gentle
  });

  return (
    <Box height="465px" boxSizing="content-box" {...restProps}>
      <Box
        maxW={containerWidth}
        style={{ height: `${containerHeight}px` }}
        margin="0 auto"
        position="relative"
      >
        {transitions((styles, item) => (
          <animated.img
            src={item.src}
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: item.width,
              height: item.height,
              ...styles
            }}
          ></animated.img>
        ))}
      </Box>
    </Box>
  );
}

function BenefitsLogosMobile(props) {
  const trail = useTrail(logoItems.length, {
    from: { marginLeft: -20, opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { marginLeft: 20, opacity: 1, transform: "translate3d(0,0px,0)" },
    config: config.slow,
    delay: 1000
  });

  return (
    <Box px="4" {...props}>
      {trail.map((props, index) => {
        return (
          <Box key={logoItems[index].src} textAlign="center">
            <animated.img
              src={logoItems[index].src}
              style={{
                marginTop: "1rem",
                maxWidth: "100%",
                height: "auto",
                ...props
              }}
            ></animated.img>
          </Box>
        );
      })}
    </Box>
  );
}
