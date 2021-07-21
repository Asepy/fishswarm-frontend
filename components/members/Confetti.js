import React from "react";
import styled from "@emotion/styled";

/**
 * All the credit for this code goes to: https://codepen.io/ykadosh/pen/aaoZRB
 * Thank you @ykadosh
 */
const ConfettiWrapper = styled.div`
  .particles {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;

    .particle {
      position: absolute;
      transition: all 5s ease-out;

      &.circular {
        background-color: var(--color);
        width: var(--size);
        height: var(--size);
        border-radius: var(--size);
        transform: translate(var(--x), var(--y));
      }

      &.rectangular {
        background-color: var(--color);
        width: var(--size);
        height: var(--size);
        transform: translate(var(--x), var(--y)) rotateX(var(--rotate))
          rotateY(var(--rotate));
      }

      &.squiggle {
        stroke: var(--color);
        stroke-width: 15px;
        stroke-linecap: round;
        overflow: visible;
        width: var(--size);
        height: var(--size);
        transform: translate(var(--x), var(--y)) rotateY(var(--rotate));
      }
    }
  }
`;

let id = 1;
export default function Confetti({ show = false }) {
  const [particles, setParticles] = React.useState([]);
  const innerWidthRef = React.useRef();

  React.useEffect(() => {
    innerWidthRef.current = window.innerWidth;
  }, []);

  React.useEffect(() => {
    if (show === true) {
      showConfetti();
    }
  }, [show]);

  const showConfetti = () => {
    const _id = id;
    id++;

    setParticles((particles) => [...particles, _id]);
    setTimeout(() => {
      // Cleanup
      setParticles((particles) => particles.filter((id) => id !== _id));
    }, 5000);
  };

  return (
    <ConfettiWrapper>
      {innerWidthRef.current &&
        particles.map((id) => (
          <Particles key={id} count={Math.floor(innerWidthRef.current / 10)} />
        ))}
    </ConfettiWrapper>
  );
}

const COLORS = ["#2ecc71", "#3498db", "#e67e22", "#e67e22", "#e74c3c"];
const LEFT_OFFSET = 150;

const randomNumber = (min, max) =>
  min + Math.floor(Math.random() * (max - min));

const randomColor = () => COLORS[randomNumber(0, COLORS.length)];

const Particle = ({ children, size }) => {
  const ref = React.useRef();
  const child = React.Children.only(children);
  const top = randomNumber(-200, -size[1]);

  React.useEffect(() => {
    ref.current.style.setProperty(
      "--x",
      `${randomNumber(-LEFT_OFFSET, LEFT_OFFSET)}px`
    );
    ref.current.style.setProperty(
      "--y",
      `${window.innerHeight - top + randomNumber(0, 300)}px`
    );
    ref.current.style.setProperty("--rotate", `${randomNumber(200, 3000)}deg`);
  }, []);

  return React.cloneElement(child, {
    ref,
    style: {
      "--color": randomColor(),
      "--size": `${randomNumber(...size)}px`,
      "--rotate": "0deg",
      "--x": "0px",
      "--y": "0px",
      top: top,
      left: randomNumber(0, window.innerWidth)
    }
  });
};

const CircularParticle = () => (
  <Particle size={[5, 10]}>
    <div className="particle circular" />
  </Particle>
);

const RectangularParticle = () => (
  <Particle size={[5, 10]}>
    <div className="particle rectangular" />
  </Particle>
);

const SquiggleParticle = () => (
  <Particle size={[15, 45]}>
    <svg
      className="particle squiggle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 200"
    >
      <path d="M15 0 Q 30 25 15 50 Q 0 75 15 100 Q 30 125 15 150 Q 0 175 15 200" />
    </svg>
  </Particle>
);

const Particles = React.memo(function ParticlesComponent({ count: n }) {
  const particles = [];
  const types = [SquiggleParticle, RectangularParticle, CircularParticle];

  while (n--) {
    const Particle = types[randomNumber(0, 3)];
    particles.push(<Particle key={n} />);
  }

  return <div className="particles">{particles}</div>;
});
