import React from "react";
import Lottie from "react-lottie";
import defaultOptions from "../services/lottieOption";

const LottieComponent = (props) => {
  let { data, height, width } = props.value;
  if (height === undefined) height = 400;
  if (width === undefined) width = 400;
  return (
    <div>
      <Lottie options={defaultOptions(data)} height={height} width={width} />
    </div>
  );
};

export default LottieComponent;
