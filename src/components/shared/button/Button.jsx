import React from "react";
import { Link } from "react-router-dom";
import style from "./button.module.css";

export function Button(props) {
  if (props.link) {
    return (
      <Link
        className={props.disabled ? style.buttonDisabled : style.button}
        onClick={props.onClick}
        disabled={props.disabled}
        style={{ ...props.style }}
        to={props.link}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={props.disabled ? style.buttonDisabled : style.button}
      onClick={props.onClick}
      disabled={props.disabled}
      style={{ ...props.style }}
    >
      {props.children}
    </button>
  );
}
