import React, { useState, useEffect, Component, useRef } from "react";
import axios from "axios";
import Modal from 'react-modal';

import CustomIcon from "./icons.jsx";

// import { AiFillAccountBook } from "react-icons/ai";

import ScoreForm from "./ScoreForm.jsx";
import Score from "./Score.jsx";

import { makeNewMaze } from "./mazeGenerater.jsx";
// import { arrowFunctions } from "./arrowFunction.jsx";
import {putsnake, drawSnake, drawFood, deleteSnake, updateSnake } from './snake.jsx';

const App = () => {
  console.log('I am being rendered');
  // const [snakeSpeed, setSnakeSpeed] = useState(1);
  // const [mazeLength, setMazeLength] = useState(11);
  // const [food, setFood] = useState({});
  Modal.setAppElement('#app');
  const [modalIsOpen, setModal] = useState(false);
  const [level, setLevel] = useState(0);
  const didMount = useRef(false);

  let position, foodposition, snakeBody
  let inputDirection = { x: 0, y: 0};

  useEffect(() => {
    if (didMount.current) {
      [position, foodposition, snakeBody] = makeNewMaze(level);
      document.addEventListener("keydown", arrowFunctions);
    } else {
      didMount.current = true;
    }
    return () => {
      document.removeEventListener("keydown", arrowFunctions);
    };
  }, [level]);

  function update() {
    const gameBoard = document.getElementById('game-board');
    updateSnake(snakeBody, inputDirection);
    checkDeath();
    updateFood();
    drawSnake(gameBoard, snakeBody);
  }

  function checkDeath() {
    if (position.includes(`${snakeBody[0].x},${snakeBody[0].y}`)) {
      window.alert('you lose');
      window.location.reload();
    }
  }
  
  function updateFood() {
    if (JSON.stringify(foodposition) === JSON.stringify(snakeBody[0])) {
      setLevel(currentLevel => currentLevel + 1)
    }
  }

  const arrowFunctions = (e) => {
    switch (e.key) {
      case 'ArrowUp' :
        // if (inputDirection.y !== 0) break
        inputDirection = { x: 0, y: -1 };
        update();
        // draw();
        break;
      case 'ArrowDown' :
        // if (inputDirection.y !== 0) break
        inputDirection = { x: 0, y: 1 };
        update();
        // draw();
        break;
      case 'ArrowLeft' :
        // if (inputDirection.x !== 0) break
        inputDirection = { x: -1, y: 0 };
        update();
        // draw();
        break;
      case 'ArrowRight' :
        // if (inputDirection.x !== 0) break
        inputDirection = { x: 1, y: 0 };
        update();
        // draw();
        break;
    }
  }

  return (
    <div>
      {
        level === 0 ? 
         <div id="menu">

          <svg id="play" onClick={() => {setLevel(1)}}xmlns="http://www.w3.org/2000/svg"       viewBox="0 0 253.37 219.43">
            <defs>
              {/* <style>
                .cls-1{stroke-width: 3px;}.cls-1,.cls-2{fill:none;stroke:#fff;stroke-miterlimit:10;}.cls-2{stroke-width:2px;}
              </style> */}
            </defs>
            <g id="Layer_1-2">
              <g id="Play_button">
                <path className="cls-2" d="M166.32,117.98l-58.09,31.61c-3.13,1.7-7.01-.62-7.03-4.21l-.48-64.12c-.03-3.58,3.79-5.81,6.94-4.05l58.58,32.51c3.28,1.82,3.33,6.5,.09,8.26Z"/>
                <polygon className="cls-1" points="189.16 1.5 64.21 1.5 1.73 109.71 64.21 217.93 189.16 217.93 251.64 109.71 189.16 1.5"/>
              </g>
            </g>
          </svg>

          <img src='./Maze_Settings.svg' id="highScore" onClick={()=>{setModal(true)}}/>
          <img src='./Highscore_Icon.svg' id="options" onClick={()=>{setModal(true)}}/>

          <Modal className="scoreModal" overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before"
                }}
                 isOpen={modalIsOpen} onRequestClose={() => {setModal(false)}}>
            <Score/>
            <button id="checkOut"onClick={() => {setModal(false)}}>x</button>
          </Modal>
          
         </div> 
        :<div>
          <h1 id="levelTitle">Level {level}</h1>
          <div id="game-board"></div>
          <button onClick={() => {setLevel(1)}}>restart</button>
          <button onClick={() => {setLevel(level + 1);}}>Next Level</button>
         </div>
      }
    </div>
  );
};

export default App;
