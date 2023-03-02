
class Cell {
  constructor(x, y) {
    this.x = x,
    this.y = y,
    this.exits = {};
    this.visited = false;
    this.isLeaf = true;
    this.distanceFromStart = -1;
    this.overpass = false;
    this.overpassDistanceFromStart = -1;
    this.onSolutionPath = false;
  }

  makeExit(dir, cell) {
    this.exits[dir] = { 
      x: cell.x,
      y: cell.y,
    };
    if(Object.keys(this.exits).length > 1) {
      this.isLeaf = false;
    }
  }
}

function finalizeMaze() {
  calculateCellDistancesFromStart.bind(this)();
  determineMazeEnd.bind(this)();
  setSolutionPath.bind(this)();
}


function calculateCellDistancesFromStart() {

  let currentCell = this.getCell(this.start.x, this.start.y);
  if(!currentCell) throw `Exception: the address (${this.start.x}, ${this.start.y}) is invalid for this maze.`;

  currentCell.isLeaf = false;
  recursiveSetDistanceFromStart.bind(this)(currentCell, 0);
}


function determineMazeEnd() {
  const mazeEdgeCells = this.cells[this.maxX];
  const difficultyObject = mazeEdgeCells.reduce((obj, cell) => {

    if(cell.distanceFromStart > obj.long.distance) {
      return {
        long: { distance: cell.distanceFromStart, x: cell.x, y: cell.y },
      };
    }

    return obj;
  },
  {
    long: { distance: 0, x: -1, y: -1 },
  });

  if(!this.end.x && !this.end.y) {
    this.end.x = difficultyObject.long.x;
    this.end.y = difficultyObject.long.y;
  }
  this.solutionLength = difficultyObject.long.distance;
}


function setSolutionPath() {
  let currentCell = this.getCell(this.end.x, this.end.y);
  if(!currentCell) throw `Exception: the address (${this.end.x}, ${this.end.y}) is invalid for this maze.`;

  let solutionPath = [];
  let distance = currentCell.distanceFromStart;
  while(distance > 0) {
    currentCell.onSolutionPath = true;
    solutionPath.push({
      x: currentCell.x,
      y: currentCell.y
    });

    Object.entries(currentCell.exits).some(exitObj => {
      const exit = exitObj[1];
      const neighbor = this.getCell(exit.x, exit.y);

      if(neighbor && !neighbor.overpass && neighbor.distanceFromStart === distance - 1) {
        currentCell = neighbor;
        distance--;
        return true;
      }
      if(neighbor && neighbor.overpass) {
        if(neighbor.overpassDistanceFromStart === distance - 1 || neighbor.distanceFromStart === distance - 1) {
          const dir = exitObj[0];
          const otherSideCell = this.getCell(exit.x + this.getDirectionOffset(dir).x, exit.y + this.getDirectionOffset(dir).y);
          if(otherSideCell.distanceFromStart === distance - 2) {
            currentCell = neighbor;
            distance--;
            return true;
          }
        }
      }
      return false;
    });
  }

  currentCell = this.getCell(this.start.x, this.start.y);
  currentCell.onSolutionPath = true;
  solutionPath.push({
    x: currentCell.x,
    y: currentCell.y
  });

  this.solutionPath = solutionPath.reverse();
}


function recursiveSetDistanceFromStart(cell, distance) {
  cell.distanceFromStart = distance;

  if(cell.isLeaf) {
    this.numLeafCells++;
    return;
  }

  Object.entries(cell.exits).forEach(exitObj => {
    const exitCoords = exitObj[1];
    const newCell = this.getCell(exitCoords.x, exitCoords.y);

    if(newCell.overpass) {
      const dir = exitObj[0];

      const otherSideCell = this.getCell(newCell.x + this.getDirectionOffset(dir).x, newCell.y + this.getDirectionOffset(dir).y);
      if(otherSideCell.distanceFromStart === -1) {

        if(newCell.distanceFromStart === -1) {
          newCell.distanceFromStart = distance + 1;
        }
        else {
          newCell.overpassDistanceFromStart = distance + 1;
        }

        recursiveSetDistanceFromStart.bind(this)(otherSideCell, distance + 2);
      }
    }

    if(!newCell.overpass && newCell.distanceFromStart === -1) {
      recursiveSetDistanceFromStart.bind(this)(newCell, distance + 1);
    }
  });

}

function recursiveBacktracker() {
  let currentCell = this.getRandomCell();
  currentCell.visited = true;

  this.active = [];
  this.active.push(currentCell);

  recurseMaze.bind(this)();
}

export function recurseMaze() {
  while(this.active.length > 0) {
    let currentCell = this.active[this.active.length - 1];

    const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
    const validDirections = potentialDirections.filter(dir => {
      return (this.getCell(currentCell.x + this.getDirectionOffset(dir).x, currentCell.y + this.getDirectionOffset(dir).y).visited === false);
    });

    if(validDirections.length < 1) {
      this.active.pop();
    }
    else {
      const randomNumber = Math.floor(Math.random() * validDirections.length);
      const randomDirection = validDirections[randomNumber];
      const newCell = this.getCell(currentCell.x + this.getDirectionOffset(randomDirection).x, currentCell.y + this.getDirectionOffset(randomDirection).y);

      /* istanbul ignore next */
      if(!newCell) throw 'Exception: internal error';

      currentCell.makeExit(randomDirection, newCell);
      newCell.makeExit(this.getOppositeDirection(randomDirection), currentCell);
      newCell.visited = true;
      this.active.push(newCell);
    }

    recurseMaze.bind(this)();
  }
}

const validAlgosByCellShape = {
  'Square': ['Recursive Backtracker', 'Growing Tree', 'Prims', 'Woven'],
  'Hexagonal': ['Recursive Backtracker', 'Growing Tree', 'Prims'],
};

class Maze {
  constructor(options) {
    this.dimensions = {
      width: options.width,
      height: options.height
    };
    this.start = {
      x: options.startX,
      y: options.startY
    };
    this.end = {
      x: options.endX,
      y: options.endY
    };
    this.numCells = options.width * options.height;
    this.numLeafCells = 0;
    this.cellShape = options.cellShape;
    this.algorithm = options.algorithm;
  }

  makeMaze() {
    if(!validAlgosByCellShape[this.cellShape].includes(this.algorithm)) throw 'Exception: the chosen algorithm is not valid in combination with the cellShape input.';

    if(this.algorithm === 'Recursive Backtracker') {
      recursiveBacktracker.bind(this)();
    }
    if(this.algorithm === 'Growing Tree') {
      growingTree.bind(this)();
    }
    if(this.algorithm === 'Prims') {
      prims.bind(this)();
    }
    if(this.algorithm === 'Woven') {
      woven.bind(this)();
    }
  }

  finalizeMaze() {
    return finalizeMaze.bind(this)();
  }

  exportMazeModel() {
    return {
      cellShape: this.cellShape,
      algorithm: this.algorithm,
      dimensions: this.dimensions,
      connectivity: this.numLeafCells / this.numCells,
      averagePathLength: this.numCells / this.numLeafCells,
      start: this.start,
      end: this.end,
      solutionLength: this.solutionLength + 1,
      averageWrongPathLength: (this.numCells - this.solutionLength) / this.numLeafCells,
      solutionPath: this.solutionPath,
      cellMap: this.formattedCells(),
      displayString: this.printCells(),
      displayStringWithSolutionPath: this.printCells('showSolution')
    };
  }

  formattedCells() {
    return this.cells.reduce((flatCells, col) => {
      const flatCol = col
        .filter(cell => cell)
        .map(cell => {
          const formattedCell = {
            coordinates: {
              x: cell.x,
              y: cell.y
            },
            exits: cell.exits
          };
          if(this.algorithm === 'Woven')
            formattedCell.overpass = cell.overpass;
          return formattedCell;
        });
      flatCells.push(...flatCol);
      return flatCells;
    }, []);
  }

  getCell(x, y) {
    if(!this.cells[x] || !this.cells[x][y]) return null;

    return this.cells[x][y];
  }

  getCellDirections(x, y) {
    return this.getDirections().filter(dir => {
      return this.getCell(x + this.getDirectionOffset(dir).x, y + this.getDirectionOffset(dir).y);
    });
  }
}
//------------------------------
const topChars = {
  '': '# ',
  'ExitW': '  ',
  'ExitWOverpass': ' |=|',
  'Solution': '# x',
  'ExitWSolution': '  x',
  'ExitWOverpassSolution': ' |=|',
  'MazeEnd': '#$',
  'ExitWMazeEnd': ' $',
  'MazeStart': '#^',
  'ExitWMazeStart': ' ^',
};
const topCharsPlain = {
  '': '# ',
  'ExitW': '  ',
  'ExitWOverpass': ' |=|',
};
const botChars = {
  '': '##',
  'ExitS': '# ',
  'ExitW': '##',
  'ExitSExitW': '  ',
  'ExitSExitWOverpass': ' |=|',
  'Solution': '##',
  'ExitSSolution': '# ',
  'ExitWSolution': '##',
  'ExitSExitWSolution': '  ',
  'ExitSExitWOverpassSolution': ' |=|',
};

export class SquareCell extends Cell {
  constructor(x, y) {
    super(x, y);
  }

  toString(start, end, showSolution, showDistances) {
    const isEnd = this.x === end.x && this.y === end.y;
    const isStart = this.x === start.x && this.y === start.y;

    const optionsStringTop = [
      (this.exits['w']) ? 'ExitW' : '',
      (this.overpass) ? 'Overpass' : '',
      (this.onSolutionPath && showSolution && !isEnd && !isStart && !showDistances) ? 'Solution' : '',
      (isEnd && !showDistances) ? 'MazeEnd' : '',
      (isStart && !showDistances) ? 'MazeStart' : '',
    ].join('');

    let topString = topChars[optionsStringTop];

    if(showDistances) {
      topString = topCharsPlain[optionsStringTop];
      const distanceTensDigit = Math.floor(Math.abs(this.distanceFromStart) / 10) % 10;
      const distanceOnesDigit = Math.abs(this.distanceFromStart) % 10;
      topString = topString.slice(0, 1) + distanceTensDigit + distanceOnesDigit + topString.slice(3, 4);
      if(this.onSolutionPath) topString = chalk.yellow(topString);
    }

    const optionsStringBottom = [
      (this.exits['s']) ? 'ExitS' : '',
      (this.exits['w']) ? 'ExitW' : '',
      (this.overpass) ? 'Overpass' : '',
      (this.onSolutionPath && showSolution) ? 'Solution' : '',
    ].join('');
    const botString = botChars[optionsStringBottom];

    return { topString, botString };
  }
}
//--------------------------------
class SquaresMaze extends Maze {
  constructor(options) {
    super(options);

    this.cellShape = 'Square';
    this.makeCells();

    this.makeMaze();

    this.finalizeMaze();
  }

  makeCells() {

    this.maxX = this.dimensions.width;   /* min X index is 1 */
    this.maxY = this.dimensions.height;   /* min y index is 1 */
    this.cells = [];

    for(let xIndex = 1; xIndex <= this.maxX; xIndex++) {
      this.cells[xIndex] = [];

      for(let yIndex = 1; yIndex <= this.maxY; yIndex++) {
        this.cells[xIndex][yIndex] = new SquareCell(xIndex, yIndex);
      }
    }
  }

  printCells(showSolution = false, showDistances = false) {
    let output = '#' + '##'.repeat(this.maxX) + '\n';
    for(let yIndex = 2 * this.maxY; yIndex > 0; yIndex--) {

      for(let xIndex = 1; xIndex <= this.maxX; xIndex++) {

        const cell = this.getCell(xIndex, Math.floor((yIndex + 1) / 2));
        const side = yIndex % 2 ? 'botString' : 'topString';
        const wall = cell.toString(this.start, this.end, showSolution, showDistances)[side];
        output += wall;
      }

      output += '#\n';
    }

    return output;
  }

  getRandomCell() {
    const randomX = Math.floor(Math.random() * this.maxX) + 1;
    const randomY = Math.floor(Math.random() * this.maxY) + 1;
    return this.getCell(randomX, randomY);
  }

  getDirections() {
    return [
      'n',
      's',
      'e',
      'w'
    ];
  }

  getDirectionOffset(direction) {
    const object = {
      n: { x: 0, y: +1 },
      s: { x: 0, y: -1 },
      e: { x: +1, y: 0 },
      w: { x: -1, y: 0 },
    };
    return object[direction];
  }

  getOppositeDirection(direction) {
    const object = {
      n: 's',
      s: 'n',
      e: 'w',
      w: 'e'
    };
    return object[direction];
  }
}

export default SquaresMaze;