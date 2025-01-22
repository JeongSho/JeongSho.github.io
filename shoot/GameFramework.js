// 이미지 파일 경로 설정
window.addEventListener("load", onPageLoadComplete, false);

var inputSystem = new InputSystem();

const offscreenCanvas = document.createElement('canvas'); 
const offscreenCtx = offscreenCanvas.getContext('2d');
var score = 0;
var disp_width = 600;
var disp_height = 800;
var temp_text_x = disp_width / 2;
var temp_text_y = disp_height / 2 + disp_height / 4;
var score = 0;
var misa_chk = false;
let stp = 2;
let speed = 5*stp;  // 아군미사일 스피드
let step = 5*stp;  // 이동속도
let c_speed1 = 8*stp; // 구름 스피드
let c_speed2 = 2*stp; // 구름 스피드

let imgloaded = false;
let imgcount = 0;


let cldloaded = false;
let cldcount = 0;  

let moloaded = false;
let mocount = 0;  


let pokloaded = false;
let pokcount = 0;  

let fireloaded = false;
let firecount = 0;  

const cl_ar = [];
const cl2_ar = [];
const cld_ar = ["cloud1.png","cloud2.png","cloud3.png"];
const ob_cld_ar = [];

const mi_ar = [];
const img_ar = ["cir.png", "misa1.png","misa2.png"];
const ob_ar = [];


const mo_ar = [];
const img_mo_ar = ["efly1.png","monster1.png","monster2.png","monster2.png"];
const ob_mo_ar = [];


const pok_ar = [];
const img_pok_ar= ["pok0001.png","pok0002.png","pok0003.png","pok0004.png","pok0005.png","pok0006.png","pok0007.png","pok0008.png"
                    ,"pok0009.png","pok0010.png","pok0011.png","pok0012.png","pok0013.png"];
const ob_pok_ar = [];

const fire_ar = [];
const img_fire_ar= ["zetfire10001.png","zetfire10002.png","zetfire10003.png","zetfire10004.png","zetfire10005.png","zetfire10006.png","zetfire10007.png","zetfire10008.png"
                    ,"zetfire10009.png","zetfire10010.png","zetfire10011.png","zetfire10012.png","zetfire10013.png","zetfire10014.png"];
const ob_fire_ar = [];
let tot_life = 100;
const lsize = 250;

const path = "./image/";

// 이미지 로드 성공 시 호출
function imgload(ar) {
  imgcount = ar.length;

  for (var i = 0; i < ar.length; i++) {
    ob_ar[i] = new Image();
    ob_ar[i].src = path+ar[i];

    ob_ar[i].onload = function () {
      img_onload(this);
      imgcount--;
      if (imgcount == 0) imgloaded = true;
    };
  }

 
}

function cldload(ar) {  //-----------  구름 그림로드..
  cldcount = ar.length;

  for (var i = 0; i < ar.length; i++) {
    ob_cld_ar[i] = new Image();
    ob_cld_ar[i].src = path+ar[i];

    ob_cld_ar[i].onload = function () {
      img_onload(this);
      cldcount--;
      if (cldcount == 0) cldloaded = true;
    };
  }

 
}

function moload(ar) {  // --------------------enemy 무비.. 
  mocount = ar.length;

  for (var i = 0; i < ar.length; i++) {
    ob_mo_ar[i] = new Image();
    ob_mo_ar[i].src = path+ar[i];

    ob_mo_ar[i].onload = function () {
      img_onload(this);
      mocount--;
      if (mocount == 0) moloaded = true;
    };
  }

 
}


function pokload(ar) {    // --------------------폭파 무비..
  pokcount = ar.length;

  for (var i = 0; i < ar.length; i++) {
    ob_pok_ar[i] = new Image();
    ob_pok_ar[i].src = path+ar[i];

    ob_pok_ar[i].onload = function () {
      img_onload(this);
      pokcount--;
      if (pokcount == 0) pokloaded = true;
    };
  }

 
}


function fireload(ar) {    // --------------------제트 분사사 무비..
  pokcount = ar.length;

  for (var i = 0; i < ar.length; i++) {
    ob_fire_ar[i] = new Image();
    ob_fire_ar[i].src = path+ar[i];
    
    ob_fire_ar[i].onload = function () {
      img_onload(this);
      firecount--;
      if (firecount == 0) fireloaded = true;
    };
  }

 
}

function img_onload(filename) {

  
    offscreenCanvas.width = filename.width;
    offscreenCanvas.height = filename.height;
    offscreenCtx.drawImage(filename, 0, 0);
   
 
}
  







// Canvas 설정




// 초기 그리기
// 사운드 로드

var bgmsound = new Audio();  // your-sound-file.mp3을 실제 MP3 파일 경로로 바꿔주세요
bgmsound.src = "./sound/works.mp3";
// 사운드 재생 함수
function playSound() {

  
  bgmsound.play().catch((error) => {
      console.error("사운드 재생 실패:", error);
  });
}

function stopSound() {
  bgmsound.stop().catch((error) => {
      console.error("사운드 재생 실패:", error);
  });
}

var shoot = [];
var attach = [];
var pang = [];

function loadsound(ar, fsound) {
  for(var i = 0; i < 5; i++) {
      ar.push(new Audio("./sound/"+fsound));  
      //ar[i].src = "./sound/"+fsound;
      
  }
}

loadsound(shoot, "shoot.wav");
loadsound(attach,"attach.wav");
loadsound(pang, "pang.wav");
let s1_cnt = 0;
let s2_cnt = 0;
let s3_cnt = 0;

function effectsound(st) {
  if(st == "shoot") { 
        
     shoot[s1_cnt].play();
     
     s1_cnt++;
     s1_cnt = s1_cnt%shoot.length;
  } else  if(st == "attach") {
    attach[s2_cnt].play();
   
    s2_cnt++;
    s2_cnt = s2_cnt%attach.length;
  } else  if(st == "pang") {
    pang[s3_cnt].play();
   

    s3_cnt++;
    s3_cnt = s3_cnt%pang.length;
  }
}

 


function onPageLoadComplete() {

  
  imgload(img_ar);
  cldload(cld_ar);
  moload(img_mo_ar);
  pokload(img_pok_ar);
  fireload(img_fire_ar);
  firemem();

   gameOk = "go";
  
   

}

var gameOk = "stop";
function gameStart() {
       
     if(gameOk == "go") {
         gameOk = "started"
         setTimeout(gameLoop, 0);
     }
     
}

function Update() {
  //업데이트

  if (inputSystem.isKeyDown(37)) {
    //LEFT
    temp_text_x -= step;
  }
  if (inputSystem.isKeyDown(39)) {
    //RIGHT
    temp_text_x += step;
  }
  if (inputSystem.isKeyDown(38)) {
    //TOP
    temp_text_y -= step;
  }
  if (inputSystem.isKeyDown(40)) {
    //BOTTOM
    temp_text_y += step;
    
  }
  if (inputSystem.isKeyDown(90) && misa_chk == false) {
    misa_chk = true;
    tot_life--;
    effectsound("shoot");
  }

  if (inputSystem.isKeyPressed[90] == false) {
    misa_chk = false;
    
    
  }
}

function getScore(num) {
  var disp_score = "";
  if (score < 10) disp_score = "000000" + num;
  else if (score < 100) disp_score = "00000" + num;
  else if (score < 1000) disp_score = "0000" + num;
  else if (score < 10000) disp_score = "000" + num;
  else if (score < 100000) disp_score = "00" + num;
  else if (score < 1000000) disp_score = "0" + num;
  else if (score < 10000000) disp_score = num;
  return disp_score;
}



function Render() {
  //그리기
  var theCanvas = document.getElementById("GameCanvas");
  var Context = theCanvas.getContext("2d");
  var Context = theCanvas.getContext("2d");
  Context.clearRect(0, 0, theCanvas.width, theCanvas.height);
  Context.fillStyle = "#235BBD";
  Context.fillRect(0, 0, disp_width, disp_height);

  cloud_ani(50,10,c_speed2,cl_ar); // 구름 생성
 


  enemy_ani(100,10,stp,mo_ar);

  


  

  if (misa_chk == true) {
    var po_ar = [-20,20];
    for(var i = 0; i < 2; i++) {
      var mi = new Object();
      var num = 1;  // 캐릭터선택
      mi.count = 0;
      mi.speed = 0;
      mi.wd = ob_ar[num].width/3;
      mi.hd = ob_ar[num].height/1.5;
      mi.img = ob_ar[num];
      mi.x = temp_text_x-mi.wd/2-po_ar[i];
      mi.y = temp_text_y-mi.hd;
      mi_ar.push(mi);
    }
   
    
    misa_chk = null;
  }

  for (var i = 0; i < mi_ar.length; i++) {  //  미사일 발사.
    var yy = mi_ar[i].y - mi_ar[i].speed;
    var xx = mi_ar[i].x;
    var wd = mi_ar[i].wd;
    var hd = mi_ar[i].hd;
    var img = mi_ar[i].img;
   
    Context.drawImage(img, xx, yy, wd, hd); // 미사일
    mi_ar[i].speed += speed;
  
    
    if (yy < 0) mi_ar.splice(i, 1); 
    else {
       for(var j = 0; j < mo_ar.length; j++) {
           var mon = mo_ar[j];
           if( xx > mon.xx && xx <= mon.xx+mon.wd
                &&  yy > mon.yy && yy <= mon.yy+mon.hd && mon.die == false) {
                  mon.life--;
                  if(mon.life == 0) {
                    mo_ar.splice(j,1);
                   
                    pokmem(mon.xx-mon.wd/2,mon.yy-mon.hd/2, 0);
                    score++;
                    mon.die = true;
                    effectsound("pang");
                  } else {
                    effectsound("attach");
                    
                  }
                  pokmem(mon.xx-mon.wd/2,mon.yy-mon.hd/2, 8);
                  mi_ar.splice(i,1);
           }

              
       }
       


    }


   
  }

  if (imgloaded) {
    var px =  temp_text_x - ob_ar[0].width / 2;
      var py = temp_text_y - ob_ar[0].height / 2

    Context.drawImage(  ob_ar[0], px,py); // 아군비행기
    anifire(px,py);
    area(ob_ar[0]);
  }

  cloud_ani(1000,10,c_speed1,cl2_ar); // 구름 생성


  // FPS 표시
  Context.fillStyle = "#f00fff";
  Context.font = "15px Arial";
  Context.textBaseline = "top";
  Context.fillText("fps : " + frameCounter.Lastfps, 10, 10);

  Context.fillStyle = "#ff0000";
  Context.font = "35px Arial";
  Context.fillText("score : " + getScore(score), disp_width / 2 - 130, 30);
}

function area(img) {
  if (temp_text_x < img.width / 2) temp_text_x = img.width / 2;
  if (temp_text_x > disp_width - img.width / 2)
    temp_text_x = disp_width - img.width / 2;
  if (temp_text_y < 100) temp_text_y = 100;
  if (temp_text_y > disp_height - img.height*2 )
    temp_text_y = disp_height - img.height*2;
}

function cloud_ani(tt, rr,sp, ar) {
  var theCanvas = document.getElementById("GameCanvas");
  var Context = theCanvas.getContext("2d");

     if(cldloaded) {
         if(Math.floor(Math.random()*tt) == rr) {
            var cl = new Object();
            var num = Math.floor(Math.random()*cld_ar.length);  // 캐릭터선택
            cl.count = 0;
            cl.speed = 0;
            cl.sp = sp;
            cl.wd = ob_cld_ar[num].width*sp;
            cl.hd = ob_cld_ar[num].height*sp;
            cl.img = ob_cld_ar[num];
            cl.x = Math.floor(Math.random()*disp_width)-cl.wd/2; 
            cl.y = -cl.hd;
            ar.push(cl);
            
            
         }

         for(var i = 0; i < ar.length; i++) {
            var yy = ar[i].y + ar[i].speed;
            var wd = ar[i].wd;
            var hd = ar[i].hd;
            var img = ar[i].img;
          
            Context.drawImage(img, ar[i].x, yy, wd, hd); // 구름
            ar[i].speed += ar[i].sp;
        
        
            if (yy > disp_height+img.height ) ar.splice(i, 1);
         }
     }
}

//----------------------------------------- 적기 


function enemy_ani(tt, rr,sp, ar) {
  var theCanvas = document.getElementById("GameCanvas");
  var Context = theCanvas.getContext("2d");

     if(moloaded) {
         if(Math.floor(Math.random()*tt) == rr) {
            var cl = new Object();
            var num = Math.floor(Math.random()*img_mo_ar.length);  // 캐릭터선택
            cl.count = 0;
            cl.speed = 0;
            cl.sp = sp;
            cl.wd = ob_mo_ar[num].width;
            cl.hd = ob_mo_ar[num].height;
            cl.img = ob_mo_ar[num];
            cl.x = Math.floor(Math.random()*(disp_width-cl.wd)); 
            cl.y = -300;
            cl.life = 5;  //  적군 라이프
            cl.die = false;
            ar.push(cl);
            
            
         }

         for(var i = 0; i < ar.length; i++) {
            var yy = ar[i].y + ar[i].speed;
            var wd = ar[i].wd;
            var hd = ar[i].hd;
            var img = ar[i].img;
          
            Context.drawImage(img, ar[i].x, yy, wd, hd); // 구름
            ar[i].speed += ar[i].sp;
            ar[i].xx = ar[i].x;
            ar[i].yy = yy;
        
            if (yy > disp_height+img.height) ar.splice(i, 1);
         }
     }
}


//----------------------------------------- 폭파 무비..

function pokmem( xx, yy,fr) {
  
      cnt = 0;
      var op = new Object();
      op.xx = xx;
      op.yy = yy;
      op.cnt = fr;
      op.del = 0;
      pok_ar.push(op);
      
         
    
}
function anipok() {               
  var theCanvas = document.getElementById("GameCanvas");
  var Context = theCanvas.getContext("2d");
     for(var i = 0; i < pok_ar.length; i++) {
        var cnt = pok_ar[i].cnt;
        var pok = ob_pok_ar[cnt];

        
        if(pok_ar[i].cnt < ob_pok_ar.length) {
          Context.drawImage(pok, pok_ar[i].xx, pok_ar[i].yy);
          if(pok_ar[i].del > 3) {
            pok_ar[i].cnt++;
            pok_ar[i].del = 0;
          } else  pok_ar[i].del++;
         
        } else
          pok_ar.splice(i,1);
        }


     
    }
     
  //----------------------------------------------- 제트 분사 무비..   
  function firemem( ) {
  
      
      var op = new Object();
      
      op.cnt = 0;
      op.del = 0;
      fire_ar.push(op);
      
     
}

function anifire(px,py) {               
  var theCanvas = document.getElementById("GameCanvas");
  var Context = theCanvas.getContext("2d");
     for(var i = 0; i < fire_ar.length; i++) {
        var cnt = fire_ar[i].cnt;
        var fire = ob_fire_ar[cnt];

        if(fire_ar[i].cnt < ob_fire_ar.length) {
         

          Context.drawImage(fire, px+14, py+40,10,50);
          Context.drawImage(fire, px+24, py+40,10,50);
          if(fire_ar[i].del > 5) {
            fire_ar[i].cnt++;
           
            fire_ar[i].del = 0;
          } else  fire_ar[i].del++;
         
        } else {
           // fire_ar.splice(i,1);
            fire_ar[i].cnt = 0;
            
        }
     


     
    }
  }
     
//------------------------------------ 
// 그리기 함수 (예시)
function btdraw() {
  var theCanvas = document.getElementById("GameCanvas");
  var Context = theCanvas.getContext("2d");
  Context.fillStyle = '#FF0000';
  Context.fillRect(8, disp_height-30, tot_life/100*lsize, 24);
  Context.fillStyle = '#000000';
  Context.rect(8, disp_height-30, lsize, 24);
  Context.stroke();
  Context.fillStyle = '#113322';
  Context.font = '24px Arial';
  Context.fillText('Health condition', 10, disp_height-55);
  
   

  Context.drawImage(ob_ar[0], disp_width-70,disp_height-55);
  Context.drawImage(ob_ar[0], disp_width-120,disp_height-55);
  Context.drawImage(ob_ar[0], disp_width-170,disp_height-55);
  if(tot_life <= 0) {
    gameOk = "stop";
  }
}


            
            
function disp(ar, xx, yy) {
  var theCanvas = document.getElementById("GameCanvas");
  var Context = theCanvas.getContext("2d");
  
  Context.fillStyle = "#f00fff";
  Context.font = "15px Arial";
  Context.textBaseline = "top";
  Context.fillText("배열길이 : " + ar.length, xx, yy);
  
}          
                
 


//----------------------

function gameLoop() {
  
 //Context.clearRect(0, 0, theCanvas.width, theCanvas.height);


  if( gameOk == "started") {
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");
   // Context.save();
    Context.reset();
  

    Update();
    Render();
    anipok();
    btdraw();
     playSound();
    frameCounter.countFrame();
    
  
    disp(cl_ar, 10, 200);
    disp(cl2_ar, 10, 230);
    disp(mi_ar, 10, 260);
    disp(mo_ar, 10, 290);
    disp(pok_ar, 10, 320);
   
   // Context.restore();
     //setTimeout(gameLoop, 5);
     requestAnimationFrame(gameLoop);
  } else stopSound();

  
}


/*
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 캔버스 상태 저장
    ctx.save();

    // 이미지 그리기
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // 캔버스 상태 복원
     ctx.restore();

    // 다음 프레임 요청
     requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
이 코드는 requestAnimationFrame을 사용하여 애니메이션 루프를 구현하고, 
  캔버스 상태를 저장하고 복원하여 메모리 누수를 방지하며,
    이미지가 완전히 로드된 후에만 drawImage를 호출합니다.
    이를 통해 성능을 최적화하고 이미지가 그려지지 않는 문제를 해결할 수 있습니다.


// 픽셀 정리
  Context.clearRect(0, 0, disp_width, disp_height);
  // 컨텍스트 리셋
  Context.beginPath();
*/