import React from "react";
import "./asidebar.styles.css";
export default function Asidebar() {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/about">Acerca de</a>
        </li>
        <li>
          <a href="/contact">Contacto</a>
        </li>
      </ul>
    </div>
  );
}
