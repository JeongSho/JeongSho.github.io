const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const fullscreenBtn = document.getElementById('fullscreenBtn');

let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;
let disp_zoom = 2;

// 배경 이미지 로드
const backgroundImage = new Image();
backgroundImage.src = './2101.i121.040_isometric_fantasy_adventure_map.jpg'; // 실제 배경 이미지 파일 경로로 변경

backgroundImage.onload = function () {
    drawBackground();
};

// 배경 그리기 함수
function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, offsetX, offsetY, canvas.width*disp_zoom, canvas.height*disp_zoom, 0, 0, canvas.width, canvas.height);
}

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
    startX = e.clientX*disp_zoom + offsetX;
    startY = e.clientY*disp_zoom + offsetY;
});

canvas.addEventListener('mousemove', function (e) {
    if (isDragging) {
        offsetX = startX - e.clientX*disp_zoom;
        offsetY = startY - e.clientY*disp_zoom;
        if(offsetX <= 0) offsetX = 0;
        if(offsetY <= 0) offsetY = 0;
        if(offsetX >= backgroundImage.width- canvas.width*disp_zoom) offsetX = backgroundImage.width- canvas.width*disp_zoom;
        if(offsetY >= backgroundImage.height- canvas.height*disp_zoom) offsetY = backgroundImage.height- canvas.height*disp_zoom;
        

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
    startX = touch.clientX*disp_zoom + offsetX;
    startY = touch.clientY*disp_zoom + offsetY;
});

canvas.addEventListener('touchmove', function (e) {
    if (isDragging) {
        const touch = e.touches[0];
        offsetX = startX - touch.clientX*disp_zoom;
        offsetY = startY - touch.clientY*disp_zoom;

        if(offsetX <= 0) offsetX = 0;
        if(offsetY <= 0) offsetY = 0;
        if(offsetX >= backgroundImage.width- canvas.width*disp_zoom) offsetX = backgroundImage.width- canvas.width*disp_zoom;
        if(offsetY >= backgroundImage.height- canvas.height*disp_zoom) offsetY = backgroundImage.height- canvas.height*disp_zoom;
        drawBackground();
    }
});

canvas.addEventListener('touchend', function () {
    isDragging = false;
});

canvas.addEventListener('touchcancel', function () {
    isDragging = false;
});
