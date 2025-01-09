window.addEventListener("load",onPageLoadComplete, false);



var temp_text_x = 400;
var temp_text_y = 300;
var inputSystem = new InputSystem();

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


function onPageLoadComplete()
{
    
   // var FPS = 30;
   // SETiNTERVAL(gameLoop , 1000/FPS);
   setTimeout(gameLoop,0);
   
}


 // SVG 이미지 로드
 const img = new Image();
 let imgLoaded = false;

 img.onload = function () {
    imgLoaded = true;
    ctx.drawImage(img, temp_text_x, temp_text_y, 100, 100); // SVG 렌더링
   
 };

 img.src = './cir.svg';



function Update()  {

    //업데이트 
      
   if( inputSystem.isKeyDown(37)) 
    {
        //LEFT
        temp_text_x -= 5;
    }
    if(inputSystem.isKeyDown(39)) 
    {
        //RIGHT
        temp_text_x += 5;
    }
    if(inputSystem.isKeyDown(38))
    {
        //TOP
        temp_text_y -= 5;
    }
    if(inputSystem.isKeyDown(40))
    {
        //BOTTOM
        temp_text_y += 5;
    }
  
}


function Render()
{
    //그리기
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    Context.fillStyle = "#ff0000";
    Context.fillRect(0,0,800,600);

    // FPS 표시
    Context.fillStyle = "#ffffff";
    Context.font = '15px Arial';
    Context.textBaseline = "top";
    Context.fillText("fps : " + frameCounter.Lastfps, 10,10);

    //Context.font = '40px Arial';
   // Context.fillText('▲', temp_text_x,temp_text_y );
    // Canvas와 Context 가져오기
        
          // SVG 이미지가 로드되었을 경우에만 그리기
        
         
       


}

function gameLoop()
{
    
    Update();
    Render();

    frameCounter.countFrame();
    setTimeout( gameLoop, 0);
}