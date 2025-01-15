function SoundSystem() {
    this.isLoadComplete = false;
    this.nowResourceLoadedCount = 0; // 현재 로딩된 리소스 수/
    this.intAllResourceCount = 0      // 로딩해야 할 총 리소스 수
    this.volume = 1;
    this.arrSounds = new Array();
    this.backgroundMusic = undefined;
    return this;
}


SoundSystem.prototype.AddSound = function(fileName, resourceCount )
{
    var SOUND_RESOURCE_MAX = 8;

    if( resourceCount == undefined ) 
        resourceCount = SOUND_RESOURCE_MAX;

    for(i = 0; i < resourceCount; i++) {
        
    
        var soundMusic = new Audio();
        soundMusic.src = fileName;
        soundMusic.loop = false;
        soundMusic.sound.play();
        soundMusic.isPlayed = false;
        soundMusic.addEventListener("canplaythrough", onLoadSoundComplete, false);
        soundMusic.addEventListener("ended", function() {
            if( window.chrome )  this.load();
            this.pause();
            }, false);

        document.body.appendChild(soundMusic);

        this.arrSounds.push( {name: fileName, sound: soundMusic, isPlayed: false });
        this.intAllResourceCount++;
    }
}



SoundSystem.prototype.PlaySound = function( fileName ) {
    // 사운드 출력
    for( var i = 0; i < this.arrSounds.length; i++) {
        if(this.arrSounds[i].name == fileName )

        {
            if( this.arrSounds[i].sound.ended == true || this.arrSounds[i].sound.isPlayed == false )
            {
                if( this.arrSounds[i].sound.paused )
                {
                    this.arrSounds[i].sound.volume == this.volume;
                    this.arrSounds[i].sound.play();
                    this.arrSounds[i].isPlayed = true;
                    break;
                }
            }
        }
    }
}


SoundSystem.prototype.PlayBackgroundMusic = function( fileName ) 
{
    
    if( this.backgroundMusic )
    {

        this.backgroundMusic.sound.pause();
        this.backgroundMusic.isPlayed = false;
        this.backgroundMusic = undefined;

    }

    for( var i = 0;  i < this.arrSounds.length; i++) 
    {
        if( this.arrSounds[i].name == fileName ) 
        {
            var backgroundMusic = this.arrSound[i];
            backgroundMusic.soundpause();  // 기존에 실행되고 있을지 모르니 우선 정지
            backgroundMusic.sound.loop = true; //일반적으로 배경음은 반복된다.
            backgroundMusic.isPlayed = true;
            backgroundMusic.sound.play();

            this.backgroundMusic = backgroundMusic;  // 배경음 교체
        }
    }
}


SoundSystem.prototype.SetVolume = function( volume ) 
{
    // 사운드 시스템의 볼륨값을 저장함
    this.volume = volume;

    for( var i = 0; i < this.arrSounds.length; i++ ) 
    {
        this.arrSounds[i].sound.volume = this.volume;

    }
}

var soundSystem = new SoundSystem();

function onLoadSoundComplete()
{
    soundSystem.nowResourceLoadedCount++;

    //현재 로딩된 리소스 수와 총 리소스 수를 비교
    if( soundSystem.nowResourceLoadedCount <= soundSystem.intAllResourceCount )
    {
        soundSystem.isLoadComplete = true;
    }
}

