export const snakeSpeed = 1;
import { getInputDirection } from "./input.js";
const snakeBody = [
  {x: 2, y: 10},
  // {x: 11, y: 11},
  // {x: 12, y: 11},
];

export function updateSnake () {
  let direction = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = {...snakeBody[i]}
  }
  snakeBody[0].x += direction.x;
  snakeBody[0].y += direction.y;
}

export function drawSnake (gameBoard) {
  snakeBody.forEach((segment, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement);
  })
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, {ignoreHead = false} = {}) {
  return snakeBody.some(segment => {
    if (ignoreHead && index === 0) return false
    return equalPosition(segment, position)
  })
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], {ignoreHead: true})
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === post2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({...snakeBody[snakeBody.length - 1]})
  }
  newSegments = 0;
}