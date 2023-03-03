import React, {useEffect, useState} from "react";
import Axios from "axios";
import Modal from 'react-modal';

const Lost = ({ open, close, level }) => {
  const [scoreScreen, setScoreScreen] = useState(false);
  const sendScore = (name) => {
    Axios.post("/addScore", {username: name, level:level})
    .then((data) => {
      console.log(data.data)
      setScoreBoard(data.data);
    })
  }

  return (
    <div>
      <Modal className="scoreModal" overlayClassName={{ base: "overlay-base", afterOpen: "overlay-after", beforeClose: "overlay-before" }}
isOpen={open} onRequestClose={() => {close(false)}}>
      <div className="contain">
      <h1>You Lose</h1>
        <h2>Name</h2>
        <div>
          <input id="nameScore"></input>
          <button id="wallButton" onClick={() => {sendScore(document.getElementById('nameScore').value)}}>Enter</button>
        </div>
      </div>
       <button className="checkOut" onClick={() => {
        window.location.reload();
       }}>Restart</button>
      </Modal>
    </div>
  );
};

export default Lost;