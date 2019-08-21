const FIELD_SIZE = 20;
const SNAKE_SPEED = 100;
const game = {
  snake: null,
  interval: null,
  fields: null,
  points: 0
};

document.addEventListener('DOMContentLoaded', startGame);
document.addEventListener('keydown', changeDirection);

function spawnSnake(size) {
  for (let i = size - 3; i < size; i++) {
    game.fields.children[size - 1].children[i].classList.add('snake-cell');
  }

  const snake = game.fields.children[size - 1].children[size - 3];
  snake.tail = game.fields.children[size - 1].children[size - 2];
  snake.tail.tail = game.fields.children[size - 1].children[size - 1];

  snake.direction = 'left';
  return snake;
}

function Cell() {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  return cell;
}

function Row(size) {
  const row = document.createElement('div');
  row.classList.add('row');

  for (let i = 0; i < size; i++) {
    row.appendChild(new Cell());
  }
  return row;
}

function CreateFields(size = 20) {
  const fields = document.createElement('div');
  fields.classList.add('fields');
  fields.spawnSnake = spawnSnake;

  for (let i = 0; i < size; i++) {
    fields.appendChild(new Row(size));
  }

  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    for (let cellIndex = 0; cellIndex < size; cellIndex++) {
      const cell = fields.children[rowIndex].children[cellIndex];

      if (rowIndex === 0) {
        cell.up = null;
      } else {
        cell.up = fields.children[rowIndex - 1].children[cellIndex];
      }
      if (cellIndex === 0) {
        cell.left = null;
      } else {
        cell.left = fields.children[rowIndex].children[cellIndex - 1];
      }
      if (cellIndex === size - 1) {
        cell.right = null
      } else {
        cell.right = fields.children[rowIndex].children[cellIndex + 1];
      }
      if (rowIndex === size - 1) {
        cell.down = null;
      } else {
        cell.down = fields.children[rowIndex + 1].children[cellIndex];
      }
    }
  }

  return fields;
}

function spawnFood(size) {
  let food;
  do {
    food = game.fields.children[Math.floor(Math.random() * size)].children[Math.floor(Math.random() * size)];
  } while (food.classList.contains('snake-cell'));
  food.eat = true;
  food.style.background = 'white'
}

function changeDirection(event) {
  //up
  if (event.code === 'ArrowUp') {
    if (game.snake.direction === 'left' || game.snake.direction === 'right') {
      game.snake.direction = 'up';
    }
  }
  // down
  if (event.code === 'ArrowDown') {
    if (game.snake.direction === 'left' || game.snake.direction === 'right') {
      game.snake.direction = 'down';
    }
  }
  // left
  if (event.code === 'ArrowLeft') {
    if (game.snake.direction === 'up' || game.snake.direction === 'down') {
      game.snake.direction = 'left';
    }
  }
  // right
  if (event.code === 'ArrowRight') {
    if (game.snake.direction === 'up' || game.snake.direction === 'down') {
      game.snake.direction = 'right';
    }
  }
}

function snakeMotion() {
  const nextCell = game.snake[game.snake.direction];

  if (nextCell && !nextCell.classList.contains('snake-cell')) {
    nextCell.direction = game.snake.direction;
    nextCell.tail = game.snake;

    if (nextCell.eat) {
      spawnFood(FIELD_SIZE);
      game.points = game.points + 1;
      document.querySelector('.points').textContent = game.points;
    }

    let currentCell = game.snake.tail;
    let previousCell;
    while (currentCell.tail) {
      previousCell = currentCell;
      currentCell = currentCell.tail;
    }
    if (!currentCell.eat) {
      delete previousCell.tail;
    } else {
      currentCell.eat = false;
    }

    currentCell.className = 'cell';
    game.snake = nextCell;
    game.snake.className = 'snake-cell';
    currentCell.style.background = '';
  } else {
    console.log('Вы проиграли');
    clearInterval(game.interval)
  }
}

function startGame() {
  const container = document.querySelector('.game');
  const points = document.querySelector('.points');

  game.fields = CreateFields(FIELD_SIZE);
  container.appendChild(game.fields);
  game.snake = spawnSnake(FIELD_SIZE);

  game.points = 0;
  points.textContent = game.points;

  spawnFood(FIELD_SIZE);
  game.interval = setInterval(snakeMotion, SNAKE_SPEED);
}