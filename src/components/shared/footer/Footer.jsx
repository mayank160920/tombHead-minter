import React from "react";
import style from "./footer.module.css";

export function Footer(props) {
  return (
    <div className={style.footer} style={{ ...props.style }}>
      <p>
        Made with
        <span role="img">&nbsp;❤&nbsp;️</span>
        by&nbsp;
        <span style={{ color: "var(--fgSecondary)" }}>Mayank</span>
      </p>
    </div>
  );
}
