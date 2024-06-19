import React from "react";
import "./head.styles.css";
import GithubIcon from "../../assets/github.svg";

export default function Head() {
  return (
    <div className="contentHead">
      <div>
        <a href="/home" className="logo">
          WikiGamersHub
        </a>
      </div>
      <a href=""></a>
      <div>
        <a
          href="https://github.com/IgnacioMartinez10/PI-Videogames"
          target="_bank"
        >
          <img className="githubIcon" src={GithubIcon} alt="github" />
        </a>
      </div>
    </div>
  );
}
