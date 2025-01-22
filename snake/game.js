var score = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // 격자 크기 (지렁이와 먹이를 격자 단위로 움직임)
const snake = [{ x: 5, y: 5 }]; // 지렁이의 초기 위치
let direction = { x: 1, y: 0 }; // 초기 이동 방향 (오른쪽)


function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function moveSnake() {
    const head = snake[0]; // 현재 머리 위치
    const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
    };

    snake.unshift(newHead); // 새로운 머리를 추가
    snake.pop(); // 꼬리를 제거
}





document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});


let food = { x: Math.floor(Math.random() * (canvas.width / gridSize)), y: Math.floor(Math.random() * (canvas.height / gridSize)) };

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}


function checkCollision() {
    const head = snake[0];

    // 벽 충돌
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        return true;
    }

    // 자기 자신과 충돌
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}


function eatFood() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        // 먹이를 먹으면 길이 증가 (꼬리 제거 안 함)
        snake.push({});
        // 새로운 먹이 생성
        score+=10;
        food = { x: Math.floor(Math.random() * (canvas.width / gridSize)), y: Math.floor(Math.random() * (canvas.height / gridSize)) };
    }
}

function getScore(num) {
    var disp_score = "";
    if (num < 10) disp_score = "000000" + num;
    else if (num < 100) disp_score = "00000" + num;
    else if (num < 1000) disp_score = "0000" + num;
    else if (num < 10000) disp_score = "000" + num;
    else if (num < 100000) disp_score = "00" + num;
    else if (num < 1000000) disp_score = "0" + num;
    else if (num < 10000000) disp_score = num;
    return disp_score;
  }

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 초기화
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    moveSnake(); // 지렁이 이동
    eatFood(); // 먹이 먹기
    if (checkCollision()) {
        alert('게임 오버!');
        return;
    }

    drawFood(); // 먹이 그리기
    drawSnake(); // 지렁이 그리기s
    ctx.fillStyle = "#ff0000";
    ctx.font = "35px Arial";
    ctx.fillText("score : " + getScore(score),  20, 30);
   
    setTimeout(gameLoop, 100); // 속도 조정
}

gameLoop();
