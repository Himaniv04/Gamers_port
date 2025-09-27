import React from "react";
import "../App.css"; // neeche CSS diya hai

export default function ButtonGallery({ text = "View Gallery", icon }) {
  return (
    <button className="Btn-Container">
      <div className="text">{text}</div>
      <div className="icon-Container">
        {icon}
      </div>
    </button>
  );
}
