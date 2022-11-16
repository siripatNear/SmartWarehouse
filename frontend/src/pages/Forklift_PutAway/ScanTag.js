import React, { useEffect } from "react";
import "./ScanTag.css";
import scanlogo from "../../assets/scanlogo.png";
import Nametag from "../../components/Nametag";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";

const users = [
  {
    user: "Siripat Insee",
    id: "0123456789",
  },
];

function ScanTag() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user.role === "Admin") {
      navigate("/");
    }
    if (user.role === "Operator") {
      navigate("/");
    }
  }, [navigate, user]);

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
