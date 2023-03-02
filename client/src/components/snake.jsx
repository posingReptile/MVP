
 export function updateSnake (snakeBody, inputDirection) {
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
  }

  export const putsnake = (segment, gameBoard) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement);
  }

 export function drawSnake (gameBoard, snakeBody) {
    snakeBody.forEach((segment, index) => {
      putsnake(segment, gameBoard)
    })
  }

 export function drawFood(gameBoard, food) {
    const foodElement = document.createElement('img');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    foodElement.src = './Apple.svg'
    gameBoard.appendChild(foodElement);
  }

  export function deleteSnake() {
    const gameBoard = document.getElementsByClassName('snake');
    for (let i = 0; i < gameBoard.length; i++) {
      const element = gameBoard[i];
      element.remove();
    }
  }