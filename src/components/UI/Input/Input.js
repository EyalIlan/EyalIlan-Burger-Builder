import React from "react";

import classes from "./Input.module.css";



const Input = (props) => {
  
  
  let inputElement = null;
  let InputClasses = [classes.InputElement]

  if(props.invalid && props.shouldValidate && props.touched){
     InputClasses.push(classes.Invalid)
  }


  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={InputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={InputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={InputClasses.join(' ')}
          value={props.value}
          onChange={props.change}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={InputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
