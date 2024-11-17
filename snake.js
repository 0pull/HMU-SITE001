const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = 20; // 20x20 grid

let snake = [];
snake[0] = {
    x: Math.floor(canvasSize / 2) * box,
    y: Math.floor(canvasSize / 2) * box
};

let food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box
};

let direction;
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

function collision(newHead, snakeArray) {
    for (let i = 0; i < snakeArray.length; i++) {
        if (newHead.x === snakeArray[i].x && newHead.y === snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? '#cc99ff' : '#993399';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = '#000';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = '#ff3399';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 100);