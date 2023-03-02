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
       <button className="checkOut" onClick={() => {close(false)}}>x</button>
       <h1>setting</h1>
        <input id="colorValue"></input>
        <button onClick={() => {changeColor('--color', document.getElementById('colorValue').value)}}>change color</button>
        <input id="wallValue"></input>
        <button onClick={() => {changeColor('--wallColor',document.getElementById('wallValue').value)}}>change wall color</button>
        </Modal>
    </div>
  );
};

export default SettingModal;