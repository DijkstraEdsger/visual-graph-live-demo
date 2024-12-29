import React from "react";
import classes from "./classes.module.scss";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Slider: React.FC<SliderProps> = ({
  id,
  value,
  min,
  max,
  step,
  onChange,
  ...props
}) => {
  return (
    <div className={classes.slider__container}>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        {...props}
        className={classes.slider__input}
      />
    </div>
  );
};

export default Slider;
