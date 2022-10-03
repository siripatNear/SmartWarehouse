import React from "react";
import "./PopUp.css";

function PopUp({ closePopUp }) {
  return (
    <div className="popupBg">
      <div className="popupContainer">
        <div className="popupTitle">
          <p>Username or Password</p>
          <p className="redfront">not correct!</p>
          <p>Please try agian</p>
          <button className="close-btn" onClick={() => closePopUp(false)}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
