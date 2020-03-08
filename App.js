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
  bottom: -34.11%;
  //background-blend-mode: screen;
  filter: blur(2px);
  will-change: background;
`;

export default function App() {
  const [ref, { width, height }] = useMeasure();

  const [{ xy }, set] = useSpring(() => ({
    xy: [0, 10],
    config: { mass: 10, tension: 200, friction: 50 }
  }));

  const setRotation = useCallback(
    ({ clientX, clientY }) => {
      //console.log(clientX / width);
      set({
        xy: [(clientX / width) * 100, (clientY / height) * 100]
      });
    },
    [width, set, height]
  );

  const resetRotation = useCallback(() => set({ xy: [0, 10] }), [set]);

  return (
    <div className="App" onMouseMove={setRotation} onMouseLeave={resetRotation}>
      <Gradient
        ref={ref}
        style={{
          background: xy.to(
            xy =>
              //`radial-gradient(${r}deg, rgba(76, 200, 255, 0.8) 9.05%, rgba(242, 71, 255, 0.8) 88.66%)`
              `radial-gradient( 80% 100% at bottom 0% left 10%, rgba(76, 200, 255, 0.5) 10%, transparent),
              radial-gradient(80% 100% at bottom 0% right 10%, rgba(242, 71, 255, 0.7) 10%, transparent)`
          )
        }}
      />
      <animated.span>{xy.getValue()}</animated.span>
    </div>
  );
}
