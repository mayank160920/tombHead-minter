import React from "react";
import style from "./footer.module.css";

export function Footer(props) {
  return (
    <div className={style.footer} style={{ ...props.style }}>
      <p>
        Made with <span style={{ color: "red" }}>❤</span> by :{" "}
      </p>
      <div className={style.avatars}>
        <div className={style.avatarCard}>
          <img
            className={style.avatarImg}
            src="./tombhead.png"
            alt="..."
            onClick={() =>
              window.open("https://discordapp.com/users/394669527486562304")
            }
          />
          <p className={style.avatarCaption}>TombHeads</p>
        </div>
        <div className={style.avatarCard}>
          <img
            className={style.avatarImg}
            src="./0xKalakaua.png"
            alt="..."
            onClick={() =>
              window.open("https://discordapp.com/users/687754112866975841")
            }
          />
          <p className={style.avatarCaption}>0xKalakaua</p>
        </div>
        <div className={style.avatarCard}>
          <img
            className={style.avatarImg}
            src="./mandy.png"
            alt="..."
            onClick={() =>
              window.open("https://discordapp.com/users/478158762989846536")
            }
          />
          <p className={style.avatarCaption}>Mandy160920</p>
        </div>
      </div>
    </div>
  );
}
