import React from "react";
import style from "../styles/App.module.css";
function Button({ onClick, text }) {
  return (
    <button className={style.loginButton} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
