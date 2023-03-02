import SquaresMaze from '../maze/squareMaze.js';
import {putsnake, drawSnake, drawFood } from './snake.jsx'

let options1 = {
  startX: 1,
  startY: 1,
  algorithm: 'Recursive Backtracker',
};

 const generateMazeString = (level) => {
  options1.width = level + 4;
  options1.height = level + 4;
  let maze1 = new SquaresMaze(options1);
  const transfromed = maze1.printCells().replaceAll('#  #', '## #');
  console.log(transfromed);
  return transfromed.split('\n');
}
function drawSegment (segment, className) {
  const gameBoard = document.getElementById('game-board');
  const element = document.createElement('div');
  element.style.gridRowStart = segment.y;
  element.style.gridColumnStart = segment.x;
  element.classList.add(className);
  gameBoard.appendChild(element);
}

export function makeNewMaze (level) {
  let position = [];
  let foodposition;
  let snakeBody = [{}];
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML= "";
  const newMaze = generateMazeString(level);
  const size = newMaze.length - 1;
  gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let i = newMaze.length - 1; i >= 0; i--) {
    const row = newMaze[i];
    // console.log(row)
    for (let j = 0; j < row.length; j++) {
      const column = row[j];
      if (column === "#") {
        position.push(`${i + 1},${j + 1}`);
        drawSegment({x: i + 1, y: j + 1}, 'wall');
      } else if (column === " ") {
        drawSegment({x: i + 1, y: j + 1}, 'space');
      } else if (column === "$") {
        snakeBody = [{ x: i + 1, y: j + 1 }];
        putsnake({ x: i + 1, y: j + 1 }, gameBoard);
      } else if (column === "^") {
        foodposition = { x: i + 1, y: j + 1 };
        drawFood(gameBoard, { x: i + 1, y: j + 1 });
      }
    }
  }
  return [position, foodposition, snakeBody];
}