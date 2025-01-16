
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const zoomSlider = document.getElementById('zoomSlider');
const fullscreenBtn = document.getElementById('fullscreenBtn');

let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;
let zoom = 1; // 확대/축소 초기값


const mi_ar = [];
const img_ar = ["f10001.png", "f10002.png","f10003.png","f10004.png", "f10005.png","f10006.png"
                ,"f10007.png", "f10008.png","f10009.png","f10010.png", "f10011.png","f10012.png"
                ,"f10013.png", "f10014.png","f10015.png","f10016.png", "f10017.png","f10018.png"
                ,"f10019.png", "f10020.png","f10021.png","f10022.png", "f10023.png","f10024.png"
                ,"f10025.png", "f10026.png","f10027.png","f10028.png", "f10029.png","f10030.png"
                ,"f10031.png", "f10032.png","f10033.png","f10034.png", "f10035.png","f10036.png"
               ];  


const ob_ar = [];


const path = "./img/";

// 이미지 로드 성공 시 호출
function imgload(ar) {
  imgcount = ar.length;

  for (var i = 0; i < ar.length; i++) {
    ob_ar[i] = new Image();
    ob_ar[i].src = path+ar[i];

    ob_ar[i].onload = function () {
     
      imgcount--;
      if (imgcount == 0) imgloaded = true;
    };
  }

 
}




// 배경 이미지 로드
const backgroundImage = new Image();
backgroundImage.src = '2101.i121.040_isometric_fantasy_adventure_map.jpg'; // 실제 배경 이미지 파일 경로로 변경

backgroundImage.onload = function () {
    imgload(img_ar);
    drawBackground();
   
};

const ims = new Image();
ims.src = './image/efly1.png'; // 실제 배경 이미지 파일 경로로 변경

ims.onload = function () {
    ims_draw();
};

// 배경 그리기 함수
function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   // ctx.save();
  //  ctx.scale(zoom, zoom); // 확대/축소 적용
    setlimit();
    ctx.drawImage(backgroundImage, offsetX , offsetY , canvas.width * zoom, canvas.height * zoom, 0, 0, canvas.width, canvas.height);
    
   
    ctx.restore();

    setTimeout(drawBackground, 0);
    ims_draw();  // 캐릭터
}


const f_ar = [];
for(var i = 0; i < 100; i++) {
    var ob = new Object();
    ob.xx = 2000+i*(Math.random()*300);
    ob.yy = 2000+i*(Math.random()*300);
    ob.rr = Math.floor(Math.random()*360);
    ob.speed = Math.floor(Math.random()*4)+1;
    f_ar.push(ob);
}




function ims_draw() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
   //ctx.save();
   //ctx.scale(zoom, zoom); // 확대/축소 적용
  
 
  if( imgloaded ) {

    for(var i = 0; i < f_ar.length; i++) {
        var ob = f_ar[i];
        if(Math.floor(10*Math.random()) < 5) ob.rr += ob.speed;
       else  if(Math.floor(10*Math.random()) >= 5) ob.rr -= ob.speed;
       if(ob.rr <  0) ob.rr = 360-ob.rr;
       else if( ob.rr >=359 ) ob.rr = ob.rr-359;
        var rn = Math.floor(ob.rr/10);
        ctx.drawImage(ob_ar[rn], offsetX-ob.xx , offsetY-ob.yy , canvas.width * zoom, canvas.height * zoom, 0, 0, canvas.width, canvas.height);

        // we’re done with the rotating so restore the unrotated context
        
    
       ob.xx += Math.cos(ob.rr*Math.PI/180)*ob.speed;
       ob.yy += Math.sin(ob.rr*Math.PI/180)*ob.speed;
    }
   
  }
    
   
   
   

   setlimit();
}

// 줌 슬라이더 변경 이벤트 핸들러
zoomSlider.addEventListener('input', function () {
    zoom = parseFloat(zoomSlider.value);
    
   // drawBackground();
    
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
        
       // drawBackground();
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
        
        //drawBackground();
    }
});

canvas.addEventListener('touchend', function () {
    isDragging = false;
});

canvas.addEventListener('touchcancel', function () {
    isDragging = false;
});


