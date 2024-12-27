import React from "react";
import classes from "./classes.module.scss";

type Option = {
  value: string | number;
  label: string | number;
};

interface SelectProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  label: string;
  type: string;
  name: string;
  id: string;
  helperText?: string;
  isInvalid?: boolean;
  options?: Option[];
}

const Select: React.FC<SelectProps> = ({
  placeholder,
  onChange,
  value,
  label,
  type,
  name,
  id,
  helperText,
  isInvalid,
  options = [],
}) => {
  return (
    <div className={classes.select__container}>
      {label && (
        <label htmlFor={id} className={classes.select__label}>
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${classes.select__input} ${
          isInvalid ? classes["select__input--error"] : ""
        }`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p
          className={`${classes["select__helper-text"]} ${
            isInvalid ? classes["select__helper-text--error"] : ""
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
