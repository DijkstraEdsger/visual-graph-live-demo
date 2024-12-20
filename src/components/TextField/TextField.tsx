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
          className={
            isInvalid
              ? classes["textfield__input--error"]
              : classes.textfield__input
          }
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          id={id}
          ref={ref}
        />
        {helperText && (
          <p
            className={
              isInvalid
                ? classes["textfield__helper-text--error"]
                : classes["textfield__helper-text"]
            }
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export default TextField;
