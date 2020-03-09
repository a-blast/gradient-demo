import React, { useCallback } from "react";
import "./styles.css";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import useMeasure from "react-use-measure";

const Gradient = styled(animated.div)`
  //  background: linear-gradient(
  //    90deg,
  //    rgba(76, 200, 255, 0.8) 9.05%,
  //    rgba(242, 71, 255, 0.8) 88.66%
  //  );
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  //left: -66.93%;
  //right: -66.93%;
  //top: 55%;
  //bottom: -30%;
  left: -1%
  background-blend-mode: screen;
  filter: url('#goo');
  will-change: background;
`;

export default function App() {
  const [ref, { width, height }] = useMeasure();

  const [{ xy }, set] = useSpring(() => ({
    xy: [20, 100, 80, 100],
    config: { mass: 10, tension: 200, friction: 50 }
  }));

  const setRotation = useCallback(
    ({ clientX, clientY }) => {
      set({
        xy: [(clientX / width) * 100, (clientY / height) * 100, 50, 50]
      });
    },
    [width, set, height]
  );

  const resetGradients = useCallback(() => set({ xy: [20, 100, 80, 100] }), [
    set
  ]);

  return (
    <div
      className="App"
      onMouseMove={setRotation}
      onMouseLeave={resetGradients}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="4" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
          />{" "}
        </filter>
      </svg>
      <Gradient
        ref={ref}
        style={{
          background: xy.to(
            (x, y, width, height) =>
              //`radial-gradient(${r}deg, rgba(76, 200, 255, 0.8) 9.05%, rgba(242, 71, 255, 0.8) 88.66%)`
              `radial-gradient( ${width}% ${height}% at top ${y}% left ${x}%, rgba(76, 200, 255, 0.5) 0%, transparent),
              radial-gradient( ${width}% ${height}% at top ${y}% right ${x}%, rgba(242, 71, 255, 0.6) 0%, transparent)`
          )
        }}
      />
      <animated.span>{xy.to((x, y) => x)}</animated.span>
    </div>
  );
}
