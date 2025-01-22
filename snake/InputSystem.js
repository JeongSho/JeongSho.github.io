window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);


function InputSystem() {
    this.mouseX = 0;
    this.mouseY = 0;
    // 키 입력 정보 배열
    this.isKeyPressed = [];
    
    return this;
}

function onMouseMove(e) {
    var theCanvas = document.getElementById("GameCanvas");

    InputSystem.mouseX = e.clientX - theCanvas.offsetLeft;
    InputSystem.mouseY = e.clientY - theCanvas.offsetTop;
}

function onKeyDown(e) {
    inputSystem.isKeyPressed[e.keyCode] = true;
}

function onKeyUp(e) {
    inputSystem.isKeyPressed[e.keyCode] = false;
}

InputSystem.prototype.isKeyDown = function(keyCode) {
    if(this.isKeyPressed[keyCode] == true )
        return true;
    else 
        return false;
}

InputSystem.prototype.getMousePositingX = function() {
    return this.mouseX;
}

InputSystem.prototype.getMousePositionY = function() {
    return this.mouseY;
}

var inputSystem = new InputSystem();

