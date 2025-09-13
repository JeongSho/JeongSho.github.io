export class Start extends Phaser.Scene {
    cursors;
    ship;
    gameOk = false;
    ScoreText;
    level2 = 0;
    err=[];
    arr=[];
    chk = false;
    levelText;
    arrGroup;
    eshipGroup;
    music;
    ptext;
     // P 키 추가
    keyP;

    lives = 3;   // 기본 라이프
    lifeText;    

   // dcount = 0;
   // dcounttext;

    isPaused = false;  // 물리엔진 정지 여부 플래그

     markers = [
        { name: 'alien death', start: 1, duration: 1.0, config: {} },
        { name: 'boss hit', start: 3, duration: 0.5, config: {} },
        { name: 'escape', start: 4, duration: 3.2, config: {} },
        { name: 'meow', start: 8, duration: 0.5, config: {} },
        { name: 'numkey', start: 9, duration: 0.1, config: {} },
        { name: 'ping', start: 10, duration: 1.0, config: {} },
        { name: 'death', start: 12, duration: 4.2, config: {} },
        { name: 'shot', start: 17, duration: 1.0, config: {} },
        { name: 'squit', start: 19, duration: 0.3, config: {} }
    ];

    

    constructor() {
        super('Start');
       
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/phaser.png');
        this.load.image('efly', 'assets/efly.png');
        this.load.spritesheet('misa', 'assets/misa.png', { frameWidth: 280, frameHeight:53 });

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
        this.load.spritesheet('boom', 'assets/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });

        this.load.audio('sfx', [
            'assets/audio/fx_mixdown.ogg',
            'assets/audio/fx_mixdown.mp3'
        ]);

         this.load.audio('theme', [
            'assets/audio/gemattack-maintheme.m4a'
        ]);
       

    }

    create() {

       this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23 }), // 0~23프레임 사용
            frameRate: 90,
            repeat: 0 // 1번만 재생
            
        });
       
         this.centreX = this.scale.width * 0.5;
        this.centreY = this.scale.height * 0.5;
        this.pathHeight = this.pathHeightMax;

        this.cameras.main.setBackgroundColor(0x00ff00);
       


        this.physics.world.setBounds(0, 0, 1280, 720);
       
        this.cursors = this.input.keyboard.createCursorKeys();

        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        const logo = this.add.image(640, 200, 'logo');

        this.ship = this.physics.add.sprite(640, 360, 'ship')
             .setBounce(0.1)
            .setCollideWorldBounds(true);

        this.ship.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });

        this.ship.play('fly');
        this.children.bringToTop(this.ship);   // obj1을 가장 위로

         
       this.music = this.sound.add('theme');

       //this.sound.setListenerPosition(400, 300); 
  
       this.tweens.add({
            targets: logo,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: 0,   // 1번 왕복 (yoyo=true니까 내려갔다 올라옴)
            onComplete: () => {
                
                logo.destroy();   // 트윈 끝나면 로고 제거
                 // Phaser 게임 캔버스에 포커스 주기
                this.game.canvas.setAttribute('tabindex', '0'); 
             
               // 키보드 입력 다시 활성화
                this.input.keyboard.enabled = true;

                // 캔버스 포커스 보장
                this.game.canvas.focus();

                this.gameOk = true;  //게임시작

                this.bgm(true);

               
                this.lifeText =  this.add.text(900,25 , "LIFE : " + this.lives, {
                    fontFamily: 'Arial Black', fontSize: 42, color: '#ffffff',
                    stroke: '#000000', strokeThickness: 4,
                    align: 'center'
                });
                
            }
       })

        this.arrGroup = this.physics.add.group();
        this.eshipGroup = this.physics.add.group();

        // 충돌 설정
        this.physics.add.collider(this.arrGroup, this.eshipGroup, (mi, emi) => {
            mi.destroy();
            emi.destroy();
        });

      
         this.ScoreText =  this.add.text(140,25 , "SCORE : " , {
                    fontFamily: 'Arial Black', fontSize: 42, color: '#ff0000',
                    stroke: '#aaff00', strokeThickness: 4,
                    align: 'left'
                });


          // P 키 추가
            this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

            this.isPaused = false;  // 물리엔진 정지 여부 플래그
    }

    bgm(bl) {
        if (bl === true) {
                this.music.play({
                        loop: true,
                            source: {
                                //x: 400,
                                //y: 300,
                                refDistance: 50,
                                follow: this.image
                            }
                 });

                        
            
                   
            
        } else {
           
                this.music.pause();
               
        }
        
    }
 
    inptext(st) {
          // Create tutorial text
        const text = this.add.text(this.centreX, this.centreY , st, {
            fontFamily: 'Arial Black', fontSize: 70, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        return text;
    }
 
    update() {
        
        if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
            if (this.isPaused) {
                this.physics.resume();
                this.isPaused = false;
                 this.bgm(true);
                  if(this.ptext) this.ptext.destroy();
                  
               
            } else {
                this.physics.pause();
                this.isPaused = true;
                this.bgm(false);
                
                if(this.ptext) this.ptext.destroy();
                this.ptext = this.inptext("Pause ! ");
            }
        }

        if(this.gameOk == false || this.isPaused == true ) return;
         
         this.ship.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.ship.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown)
        {
            this.ship.setVelocityX(300);
        }

        if (this.cursors.up.isDown)
        {
            this.ship.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown)
        {
            this.ship.setVelocityY(300);
        }
       
       

        if (this.cursors.space.isDown && this.chk == false) {
           this.fireMissile();
           this.chk = true;
            this.sound.play('sfx', this.markers[0]);
            
        }
        
        if (!this.cursors.space.isDown) {
            this.chk = false;
           
           
        }

        if(Phaser.Math.Between(1, 30) ==5) {
             var value = Phaser.Math.Between(50, 700); // Returns a value >= min and <= max
            this.enemy(1200, value);
           
        }

        this.arrs();
        this.errs();
        this.checkCollisions();
        this.background.tilePositionX += 10;
         
        this.checkPlayerCollisions();

        

    }

    checkPlayerCollisions() {
        // 적기와 충돌
        for (let j = this.err.length - 1; j >= 0; j--) {
            const emi = this.err[j];
            if (emi && Phaser.Geom.Intersects.RectangleToRectangle(this.ship.getBounds(), emi.getBounds())) {
                this.playerHit();
                emi.destroy();
                this.err.splice(j, 1);
            }
        }

        // 적 미사일과 충돌
        if (this.enemyBullets) {
            for (let k = this.enemyBullets.length - 1; k >= 0; k--) {
                const bullet = this.enemyBullets[k];
                if (bullet && Phaser.Geom.Intersects.RectangleToRectangle(this.ship.getBounds(), bullet.getBounds())) {
                    this.playerHit();
                    bullet.destroy();
                    this.enemyBullets.splice(k, 1);
                }
            }
        }
    }

    playerHit() {       //---------------- 플레이어 히트...
        this.lives--;
        this.lifeText.setText("LIFE : " + this.lives);

        // 폭발 이펙트
        const boom = this.add.sprite(this.ship.x, this.ship.y, 'boom').setScale(3.0);
        boom.play('explode');
        boom.on('animationcomplete', () => boom.destroy());

        if (this.lives <= 0) {
            this.ship.destroy();
            
            this.add.text(this.centreX,this.centreY ,"GAME OVER" , {
                    fontFamily: 'Arial Black', fontSize: 42, color: '#ff0000',
                    stroke: '#aaff00', strokeThickness: 4,
                    align: 'center'
                }).setOrigin(0.5);
          //  this.physics.pause();
            this.music.stop();
            this.gameOk = false;
            this.sound.play('sfx', this.markers[6]);
            this.sound.play('sfx', this.markers[7]);
        } else {
             this.sound.play('sfx', this.markers[1]);
        }
    }

    
    fireMissile() {
        const mi = this.physics.add
                .sprite(this.ship.x, this.ship.y, 'misa')
                .setVelocityX(5300)
                .setScale(0.3);

                // 바운드 체크 가능하게
                mi.body.onWorldBounds = true;

                mi.anims.create({
                    key: 'fight',
                    frames: this.anims.generateFrameNumbers('misa', { start: 0, end: 4 }),
                    frameRate: 15,
                    repeat: -1
                });
                mi.play('fight');
                 this.arr.push(mi);
               
    }

    enemy(xx, yy) {
        const emi = this.physics.add
                .image(xx,yy, 'efly')
                .setVelocityX(-300)
                .setVelocityY(Phaser.Math.Between(-130, 130))
                .setScale(2.3);

                // 바운드 체크 가능하게
                emi.body.onWorldBounds = true;
                
                 this.err.push(emi);
              

                // 자기 자신이 바운드를 벗어나면 파괴
                this.physics.world.on('worldbounds', (body) => {
                    if (body.gameObject === emi) {
                       emi.destroy();
                       
                    }
                });

                 // 일정 확률로 미사일 발사
                if (Phaser.Math.Between(1, 3) == 1) {   // 20% 확률
                    this.enemyFire(emi);
                }
    }
    

    enemyFire(enemy) {
        const bullet = this.physics.add
            .sprite(enemy.x, enemy.y, 'misa')
            .setVelocityX(-600)
            .setScale(0.2);
        bullet.play('fight');
        bullet.setTint(0xff0000); // 빨간색 미사일
        if (!this.enemyBullets) this.enemyBullets = [];
        this.enemyBullets.push(bullet);
         this.sound.play('sfx', this.markers[0]);

          // 배열 순회하면서 화면 밖으로 나간 미사일 제거
        this.enemyBullets = this.enemyBullets.filter(misa => {
            
            if (misa.x < 0) {
                
                //if(this.dcounttext) this.dcounttext.destroy(); 
                //this.dcount++;
                //this.dcounttext = this.add.text(460, 600, (this.dcount), { font: '46px Courier', fill: '#ff0000' });
                misa.destroy();
                return false;  // 배열에서 제거
            }
            return true;
        });
    }

   arrs() {
        // 배열 순회하면서 화면 밖으로 나간 미사일 제거
        this.arr = this.arr.filter(mi => {
            
            if (mi.x > this.sys.game.config.width) {
                
               
                mi.destroy();
                return false;  // 배열에서 제거
            }
            return true;
        });
    }

    errs() {
        // 배열 순회하면서 화면 밖으로 나간 미사일 제거
        this.err = this.err.filter(emi => {
            if (emi.x < 0) {
                
              
                emi.destroy();
                return false;  // 배열에서 제거
            }
            return true;
        });
    }

    
    checkCollisions() {
    for (let i = this.arr.length - 1; i >= 0; i--) {
        for (let j = this.err.length - 1; j >= 0; j--) {
            const mi = this.arr[i];
            const emi = this.err[j];

            if (mi && emi && Phaser.Geom.Intersects.RectangleToRectangle(mi.getBounds(), emi.getBounds())) {
               // 폭발 스프라이트 생성
                const boom = this.add.sprite(emi.x, emi.y, 'boom');
                boom.play('explode');
                boom.setScale(2.0);

                // 애니메이션 끝나면 자동 제거
                boom.on('animationcomplete', () => {
                    boom.destroy();
                });

                this.sound.play('sfx', this.markers[7]);               
                if(this.levelText2) this.levelText2.destroy(); 
                this.level2++;
               
                this.levelText2 =  this.add.text(360,25 , (this.level2*10) , {
                    fontFamily: 'Arial Black', fontSize: 42, color: '#ffffff',
                    stroke: '#aaff00', strokeThickness: 4,
                    align: 'left'
                });
                mi.destroy();
                emi.destroy();

                // 배열에서 제거
                this.arr.splice(i, 1);
                this.err.splice(j, 1);
                break; // 같은 mi가 여러 emi와 중복 충돌 방지
            }
        }
    }
}
}
