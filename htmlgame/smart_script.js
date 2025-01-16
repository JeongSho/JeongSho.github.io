const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const zoomSlider = document.getElementById('zoomSlider');
const fullscreenBtn = document.getElementById('fullscreenBtn');

let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;
let zoom = 1; // 확대/축소 초기값

// 배경 이미지 로드
const backgroundImage = new Image();
backgroundImage.src = '2101.i121.040_isometric_fantasy_adventure_map.jpg'; // 실제 배경 이미지 파일 경로로 변경

backgroundImage.onload = function () {
    drawBackground();
};

// 배경 그리기 함수
function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   // ctx.save();
  //  ctx.scale(zoom, zoom); // 확대/축소 적용
    setlimit();
    ctx.drawImage(backgroundImage, offsetX , offsetY , canvas.width * zoom, canvas.height * zoom, 0, 0, canvas.width, canvas.height);
    
    ctx.restore();
}

// 줌 슬라이더 변경 이벤트 핸들러
zoomSlider.addEventListener('input', function () {
    zoom = parseFloat(zoomSlider.value);
    drawBackground();
});

// 전체화면 전환 함수
function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) { // Mozilla Firefox
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari, Opera
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) { // Internet Explorer/Edge
            canvas.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// 버튼 클릭 이벤트 핸들러
fullscreenBtn.addEventListener('click', toggleFullScreen);

// 마우스 이벤트 핸들러
canvas.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX*zoom + offsetX;
    startY = e.clientY*zoom + offsetY;
});

canvas.addEventListener('mousemove', function (e) {
    if (isDragging) {
        offsetX = startX - e.clientX*zoom;
        offsetY = startY - e.clientY*zoom;
        
        drawBackground();
    }
});

function setlimit() {
    if(offsetX <= 0) offsetX = 0;
    if(offsetY <= 0) offsetY = 0;
    if(offsetX >= backgroundImage.width- canvas.width*zoom) offsetX = backgroundImage.width- canvas.width*zoom;
    if(offsetY >= backgroundImage.height- canvas.height*zoom) offsetY = backgroundImage.height- canvas.height*zoom;
}

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
    startX = touch.clientX*zoom + offsetX;
    startY = touch.clientY*zoom + offsetY;
});

canvas.addEventListener('touchmove', function (e) {
    if (isDragging) {
        const touch = e.touches[0];
        offsetX = startX - touch.clientX*zoom;
        offsetY = startY - touch.clientY*zoom;
        
        drawBackground();
    }
});

canvas.addEventListener('touchend', function () {
    isDragging = false;
});

canvas.addEventListener('touchcancel', function () {
    isDragging = false;
});


