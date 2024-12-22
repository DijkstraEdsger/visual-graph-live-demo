import React, { forwardRef } from "react";
import classes from "./classes.module.scss";

interface TextFieldProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  type: string;
  name: string;
  id: string;
  helperText?: string;
  isInvalid?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      placeholder,
      onChange,
      value,
      label,
      type,
      name,
      id,
      helperText,
      isInvalid,
    },
    ref
  ) => {
    return (
      <div className={classes.textfield}>
        <label className={classes.textfield__label} htmlFor={id}>
          {label}
        </label>
        <input
          type={type}
          className={`${classes.textfield__input} ${
            isInvalid ? classes["textfield__input--error"] : ""
          }`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          id={id}
          ref={ref}
        />
        {helperText && (
          <p
            className={`${classes["textfield__helper-text"]} ${
              isInvalid ? classes["textfield__helper-text--error"] : ""
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export default TextField;
