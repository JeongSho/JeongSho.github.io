const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

// 배경 이미지 로드
const backgroundImage = new Image();
backgroundImage.src = './background.png'; // 실제 배경 이미지 파일 경로로 변경

backgroundImage.onload = function () {
    drawBackground();
};

// 배경 그리기 함수
function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, offsetX, offsetY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
}

// 마우스 이벤트 핸들러
canvas.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX + offsetX;
    startY = e.clientY + offsetY;
});

canvas.addEventListener('mousemove', function (e) {
    if (isDragging) {
        offsetX = startX - e.clientX;
        offsetY = startY - e.clientY;
        drawBackground();
    }
});

canvas.addEventListener('mouseup', function () {
    isDragging = false;
});

canvas.addEventListener('mouseout', function () {
    isDragging = false;
});

// 터치 이벤트 핸들러
canvas.addEventListener('touchstart', function (e) {
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX + offsetX;
    startY = touch.clientY + offsetY;
});

canvas.addEventListener('touchmove', function (e) {
    if (isDragging) {
        const touch = e.touches[0];
        offsetX = startX - touch.clientX;
        offsetY = startY - touch.clientY;
        drawBackground();
    }
});

canvas.addEventListener('touchend', function () {
    isDragging = false;
});

canvas.addEventListener('touchcancel', function () {
    isDragging = false;
});
