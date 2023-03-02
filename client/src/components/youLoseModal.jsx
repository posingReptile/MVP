import React, {useEffect, useState} from "react";
import Axios from "axios";
import Modal from 'react-modal';

const Lost = ({ open, close, level }) => {


  return (
    <div>
      <Modal className="scoreModal" overlayClassName={{ base: "overlay-base", afterOpen: "overlay-after", beforeClose: "overlay-before" }}
isOpen={open} onRequestClose={() => {close(false)}}>
        <h1>You Lose</h1>
       <button className="checkOut" onClick={() => {
        window.location.reload();
       }}>restart</button>
      </Modal>
    </div>
  );
};

export default Lost;