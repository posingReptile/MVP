import React, { useState, useEffect, Component, useRef } from "react";
import axios from "axios";
import Modal from 'react-modal';
import particleconfig from './particle.js'
import CustomIcon from "./icons.jsx";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// import { AiFillAccountBook } from "react-icons/ai";

import ScoreForm from "./ScoreForm.jsx";
import Score from "./Score.jsx";

import { makeNewMaze } from "./mazeGenerater.jsx";
import {putsnake, drawSnake, drawFood, deleteSnake, updateSnake } from './snake.jsx';

import ScoreModal from "./scoreModal.jsx";
import SettingModal from "./settingModal.jsx";
import Lost from "./youLoseModal.jsx";

const App = () => {
  console.log('I am being rendered');
  // const [snakeSpeed, setSnakeSpeed] = useState(1);
  // const [mazeLength, setMazeLength] = useState(11);
  // const [food, setFood] = useState({});
  Modal.setAppElement('#app');

  const [scoreScreen, setScoreScreen] = useState(false);
  const [settingScreen, setSettingScreen] = useState(false);
  const [lostScreen, setLostScreen] = useState(false);

  const [level, setLevel] = useState(0);
  const didMount = useRef(false);

  let position, foodposition, snakeBody
  let inputDirection = { x: 0, y: 0};

  useEffect(() => {
    if (didMount.current) {
      [position, foodposition, snakeBody] = makeNewMaze(level);
      document.addEventListener("keydown", arrowFunctions);
      deleteSnake();
      update();
    } else {
      didMount.current = true;
    }
    return () => {
      document.removeEventListener("keydown", arrowFunctions);
    };
  }, [level]);
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };

  function update() {
    const gameBoard = document.getElementById('game-board');
    updateSnake(snakeBody, inputDirection);
    drawSnake(gameBoard, snakeBody);
    updateFood();
    checkDeath();
  }

  function checkDeath() {
    if (position.includes(`${snakeBody[0].x},${snakeBody[0].y}`)) {
      setLostScreen(true);
      // window.location.reload();
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
      <Particles id="particles-here" init={particlesInit} options={particleconfig}/>
      {
        level === 0 ? 
         <div id="menu">

          <svg id="play" onClick={()=>{setLevel(1)}}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.37 219.43">
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
          <svg id="highScore" onClick={()=>{setScoreScreen(true)}}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209.58 181.5">
              <defs>
                {/* <style>.cls-1{fill:#fff;}.cls-2{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:3px;}</style> */}
              </defs>
              <g id="Layer_1-2">
                <g id="highScoreIcon">
                  <polygon className="cls-2" points="156.32 1.5 53.26 1.5 1.73 90.75 53.26 180 156.32 180 207.85 90.75 156.32 1.5"/>
                  <path className="cls-1" d="M124.73,46.62v-.08h-39.85v.04c-9.52,.41-17.12,8.24-17.12,17.86s7.91,17.78,17.7,17.89c1.5,6.28,5.97,11.38,11.84,13.78,1.2,2.09,1.88,4.51,1.88,7.09,0,4.9-2.47,9.23-6.23,11.81v.07c-1.41,.23-2.49,1.45-2.49,2.92v2.06c-1.41,.23-2.49,1.45-2.49,2.92v9c0,1.64,1.33,2.97,2.97,2.97h27.68c1.64,0,2.97-1.33,2.97-2.97v-9c0-1.48-1.08-2.69-2.49-2.92v-2.06c0-1.48-1.08-2.69-2.49-2.92v-.07c-3.76-2.58-6.23-6.91-6.23-11.81,0-2.57,.69-4.98,1.87-7.07,5.88-2.39,10.36-7.49,11.88-13.76,9.78-.12,17.67-8.08,17.67-17.89s-7.58-17.43-17.09-17.86Zm-39.85,30.65c-6.74-.4-12.09-5.98-12.09-12.83s5.35-12.42,12.09-12.83v25.66Zm39.85,.04v-25.65c6.72,.42,12.05,5.99,12.05,12.83s-5.33,12.4-12.05,12.83Z"/>
                </g>
              </g>
          </svg>
          <svg id="setting" onClick={()=>{setSettingScreen(true)}}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209.58 181.5">
            <g id="settingLayer_1-2">
              <g id="SettingsIcon">
                <polygon className="cls-2" points="156.32 1.5 53.26 1.5 1.73 90.75 53.26 180 156.32 180 207.85 90.75 156.32 1.5"/>
                <path className="cls-1" d="M147.41,80.81h-6.72c-.41-1.47-.94-2.9-1.52-4.29-.58-1.4-1.21-2.79-1.97-4.12l4.75-4.75c3.3-3.3,3.3-8.64,0-11.93l-2.13-2.13c-3.3-3.3-8.64-3.3-11.93,0l-4.75,4.75c-1.34-.76-2.72-1.39-4.13-1.97-1.39-.58-2.82-1.11-4.29-1.52v-6.72c0-4.66-3.78-8.44-8.44-8.44h-3.01c-4.66,0-8.44,3.78-8.44,8.44v6.72c-1.47,.41-2.9,.94-4.29,1.52-1.4,.58-2.79,1.21-4.13,1.97l-4.75-4.75c-3.3-3.3-8.64-3.3-11.93,0l-2.13,2.13c-3.3,3.3-3.3,8.64,0,11.93l4.75,4.75c-1.56,2.76-2.73,5.69-3.52,8.69h-6.68c-4.66,0-8.44,3.78-8.44,8.44v3.01c0,4.66,3.78,8.44,8.44,8.44h6.9c.83,2.86,2.01,5.65,3.55,8.28l-4.8,4.8c-3.3,3.3-3.3,8.64,0,11.93l2.13,2.13c3.3,3.3,8.64,3.3,11.93,0l5.01-5.01c.91,.5,1.84,.96,2.78,1.37,.36,.16,.71,.31,1.08,.47,.33,.14,.67,.27,1.01,.39,1.1,.42,2.22,.8,3.37,1.12v6.92c0,4.66,3.78,8.44,8.44,8.44h3.01c4.66,0,8.44-3.78,8.44-8.44v-6.96c2.93-.82,5.71-1.99,8.3-3.47l4.78,4.78c3.3,3.3,8.64,3.3,11.93,0l2.13-2.13c3.3-3.3,3.3-8.64,0-11.93l-4.83-4.83c1.43-2.55,2.57-5.27,3.37-8.14h6.72c4.66,0,8.44-3.78,8.44-8.44v-3.01c0-4.66-3.78-8.44-8.44-8.44Zm-48.43,27.74c-.46-.15-.92-.32-1.36-.5-.44-.19-.88-.39-1.31-.61-.07-.03-.14-.06-.2-.1-1.64-.86-3.17-1.98-4.55-3.36s-2.5-2.92-3.36-4.55c-.03-.07-.06-.14-.1-.2-.22-.43-.42-.87-.61-1.31-.18-.45-.35-.9-.5-1.36-.02-.07-.05-.14-.07-.21-.55-1.77-.84-3.65-.84-5.6,0-10.45,8.47-18.92,18.92-18.92,2.5,0,4.88,.5,7.06,1.37,2.17,.92,4.2,2.25,5.96,4.02,7.39,7.39,7.39,19.37,0,26.76-1.38,1.38-2.92,2.5-4.55,3.36-.07,.03-.14,.06-.2,.1-.43,.22-.87,.42-1.31,.61-.45,.18-.9,.35-1.36,.5-.07,.02-.14,.05-.21,.07-1.77,.55-3.65,.84-5.6,.84s-3.83-.3-5.6-.84c-.07-.02-.14-.05-.21-.07Z"/>
              </g>
            </g>
          </svg>

          <ScoreModal open={scoreScreen} close={setScoreScreen}/>
          <SettingModal open={settingScreen} close={setSettingScreen}/>
          
         </div> 
        :<div>
          <h1 id="levelTitle">Level {level}</h1>
          <div id="game-board"></div>
          <button className="checkOut"  id="restart" onClick={() => {setLevel(1)}}>Restart</button>
          <button className="checkOut" id="nextlevel" onClick={() => {setLevel(level + 1);}}>Next Level</button>
          <Lost open={lostScreen} close={setLostScreen} level={level}/>
         </div>
      }
    </div>
  );
};

export default App;
