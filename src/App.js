import React from "react";
import "./styles.css";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Gradient = styled(animated.div)`
  background: linear-gradient(
    90deg,
    rgba(76, 200, 255, 0.8) 9.05%,
    rgba(242, 71, 255, 0.8) 88.66%
  );
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export default function App() {
  return (
    <div className="App">
      <Gradient />
    </div>
  );
}
