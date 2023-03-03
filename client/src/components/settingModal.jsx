import React, {useEffect, useState} from "react";
import Axios from "axios";
import Modal from 'react-modal';

const SettingModal = ({ open, close }) => {
// console.log('from setting')
  function changeColor(prop, color) {
    var root = document.querySelector(':root');
    root.style.setProperty(prop, color);
  }
  return (
    <div>
      <Modal className="scoreModal" overlayClassName={{ base: "overlay-base", afterOpen: "overlay-after", beforeClose: "overlay-before" }}
isOpen={open} onRequestClose={() => {close(false)}}>
       <button className="checkOut" onClick={() => {close(false)}}>Exit</button>
       <div className="contain">
       <h1>Setting</h1>
        <h2 id="snakeColorSetting">Change Snake Color</h2>
        <div>
          <input id="colorValue"></input>
          <button id="colorButton" onClick={() => {changeColor('--color', document.getElementById('colorValue').value)}}>Enter</button>
        </div>
        <h2 id="wallColorSetting">Change wall color</h2>
        <div>
          <input id="wallValue"></input>
          <button id="wallButton" onClick={() => {changeColor('--wallColor',document.getElementById('wallValue').value)}}>Enter</button>
        </div>

       </div>
        </Modal>
    </div>
  );
};

export default SettingModal;