import React from "react";
import "./ScanTag.css";
import scanlogo from "../../assets/scanlogo.png";
import Nametag from "../../components/Nametag";

const users = [
  {
    user: "Siripat Insee",
    id: "0123456789",
  },
];

function ScanTag() {
  return (
    <div>
      <div className="Content">
        <Nametag name={users[0].user} userID={users[0].id} />
        <div className="ScanTagContainer">
          Please! Scan Tag
          <img src={scanlogo} width="300" height="auto" alt="scanlogo" />
        </div>
      </div>
    </div>
  );
}

export default ScanTag;
