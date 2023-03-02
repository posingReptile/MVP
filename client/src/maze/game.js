import {snakeSpeed, updateSnake, drawSnake, getSnakeHead, snakeIntersection} from "./snake.js"
import { updateFood, drawFood } from "./food.js";
import { generateMaze } from './grid.js'
import { outsideGrid } from "./grid.js";

const gameBoard = document.getElementById('game-board')

// let gameOver = false;
// let lastRenderTime = 0;
// function main (currentTime) {
//   if (gameOver) {
//     alert('you lose')
//   }
//   const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
//   window.requestAnimationFrame(main);
//   if (secondsSinceLastRender < 1 / snakeSpeed) return
//   console.log(currentTime);
//   lastRenderTime = currentTime;
//   update();
//   draw();
// }

// window.requestAnimationFrame(main);

function update() {
  updateSnake();
  checkDeath()
}

function draw() {
  // gameBoard.innerHTML = ''
  drawSnake(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead())
}


window.addEventListener('keydown', () => {
  update();
  drawSnake(gameBoard);
})

