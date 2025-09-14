class Example extends Phaser.Scene
{
     platform1;
     platform2;
     platform3;
     ground;
     water;
     sign;
     playerchk = false;
     level = 1;
     gameOk = false;
     sprite;
     title;
     levelText;
     
    preload ()
    {
        //this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.spritesheet('dude', './assets/pan.png', { frameWidth: 45, frameHeight: 94 });
        this.load.atlas('tiles', 'assets/sets/platformer.png', 'assets/sets/platformer.json');
        this.load.atlas('menu', 'assets/button/button.png', 'assets/button/button.json');
        this.load.image('bg', 'assets/sets/background.png');
    }

    create ()
    {
        this.add.image(400, 300, 'bg');

        this.water = this.physics.add.staticGroup();
        this.ground = this.physics.add.staticGroup();
        this.physics.world.setBounds(0, -400, 800, 1000);
        this.cursors = this.input.keyboard.createCursorKeys();
       
        
        

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });


//------------------   버튼
       

      

        

        this.resetStage();
        this.title =  this.add.sprite(430,200,'menu','title');     // 아저씨게임 타이틀
        this.add.sprite(440,50,'menu','level');     // 아저씨게임 타이틀

        this.sprite = this.add.sprite(450, 300, 'menu','start1').setInteractive();


        this.sprite.on('pointerdown', (pointer) => {

            this.sprite.setTint(0xff0000);
            this.gameOk = true;   // 씬 변수 접근 OK
            this.title.destroy(); // 씬 변수 접근 OK
            this.sprite.destroy();
        });

        // 씬(this)을 사용하고 싶을 때 (권장)
        this.sprite.on('pointerout', (pointer) => {
            this.sprite.setFrame('start1');
            this.sprite.clearTint();
        });

        this.sprite.on('pointerup', (pointer) => {
            this.sprite.setFrame('start2');
            this.sprite.clearTint();
        });
    }


    deleteStage() {
        // 오브젝트 제거
        
            this.ground.clear(true, true);  // 그룹 안의 오브젝트 전부 제거

            this.water.clear(true, true);
           if(this.platform1) this.platform1.destroy();
           if(this.platform2)  this.platform2.destroy();
           if(this.platform3)  this.platform3.destroy();
            this.player.destroy();

            this.sign.destroy(); 
       
           
    }

    resetStage() {
         

          
        this.stageMap(this.level);
        if(this.levelText) this.levelText.destroy();
         this.levelText = this.add.text(510, 25, this.level , { font: '46px Courier', fill: '#ff0000' });

       

      // player 새로 생성
      if(this.playerchk == false) {
         // this.playerchk = true;
          this.player = this.physics.add.sprite(64, -64, 'dude')
            .setBounce(0.1)
            .setCollideWorldBounds(true);

        // 새 collider 다시 등록
        
      } else  {
         // 플레이어 위치 초기화
        this.player.setPosition(64, -64);
      
        this.player.setVelocity(0,0);

      }
        
        this.physics.add.collider(this.player, this.ground);
       
        this.physics.add.collider(this.player, [this.platform1, this.platform2, this.platform3]);

       this.physics.add.collider(this.player,  this.water, () => {
               this.deleteStage();
               this.resetStage();
               
        });  



        this.tweens.add({
            targets:  this.platform1,
            x: 200,
            duration: 4000,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets:  this.platform2,
            x: 250,
            duration: 3000,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets:  this.platform3,
            x: 550,
            y: 450,
            duration: 2500,
            yoyo: true,
            repeat: -1
        });
            
    
    }


    stageMap( lv ) 
    {

       switch (lv) {
            case  1 :
                    for (let i = 0; i < 6; i++)
                    {
                        this.water.create(i * 128, 552, 'tiles', '17');
                    }

                    

                    this.ground.create(64, 536, 'tiles', '3');
                    this.ground.create(290, 536, 'tiles', '3');
                    this.ground.create(520, 536, 'tiles', '3');
                    this.ground.create(736, 536, 'tiles', '1');

                    this.sign = this.add.image(740, 440, 'tiles', 'sign2');

                   
            break; 
             case  2 :
                   
                    for (let i = 0; i < 6; i++)
                    {
                        this.water.create(i * 128, 552, 'tiles', '17');
                    }
                    

                    this.ground.create(64, 536, 'tiles', '6');
                    this.ground.create(64, 536-128, 'tiles', '6');
                    this.ground.create(64, 536-256, 'tiles', '3');
                    
                    this.ground.create(736, 536, 'tiles', '1');

                    this.sign = this.add.image(740, 440, 'tiles', 'sign2');

                    this.platform1 = this.physics.add.image(600, 128, 'tiles', 'platform1').setScale(0.5).setDirectControl().setImmovable();
                    this.platform2 = this.physics.add.image(700, 270, 'tiles', 'platform1').setScale(0.5).setDirectControl().setImmovable();
                    this.platform3 = this.physics.add.image(200, 400, 'tiles', 'platform1').setScale(0.5).setDirectControl().setImmovable();
            break; 
             case  3 :
                    for (let i = 0; i < 6; i++)
                    {
                        this.water.create(i * 128, 552, 'tiles', '17');
                    }

                    

                    this.ground.create(64, 536, 'tiles', '6');
                    this.ground.create(64, 536-128, 'tiles', '3');
                   
                    
                    this.ground.create(736, 536, 'tiles', '1');

                    this.sign = this.add.image(740, 440, 'tiles', 'sign2');

                    this.platform1 = this.physics.add.image(600, 128, 'tiles', 'platform1').setScale(0.5).setDirectControl().setImmovable();
                    this.platform2 = this.physics.add.image(700, 270, 'tiles', 'platform1').setScale(0.5).setDirectControl().setImmovable();
                    this.platform3 = this.physics.add.image(200, 400, 'tiles', 'platform1').setScale(0.5).setDirectControl().setImmovable();
            break; 
            default : 
                    this.level = 1;
                    for (let i = 0; i < 6; i++)
                    {
                        this.water.create(i * 128, 552, 'tiles', '17');
                    }

                    

                    this.ground.create(64, 536, 'tiles', '6');
                    this.ground.create(64, 536-128, 'tiles', '6');
                    this.ground.create(64, 536-256, 'tiles', '6');
                    this.ground.create(64, 536-384, 'tiles', '3');
                    this.ground.create(736, 536, 'tiles', '1');
                  
                    this.sign = this.add.image(740, 440, 'tiles', 'sign2');

                    this.platform1 = this.physics.add.image(600, 128, 'tiles', 'platform1').setScale(0.5).setDirectControl().setImmovable();
                    this.platform2 = this.physics.add.image(700, 270, 'tiles', 'platform1').setScale(0.5).setDirectControl().setImmovable();
                    this.platform3 = this.physics.add.image(200, 400, 'tiles', 'platform1').setScale(0.5).setDirectControl().setImmovable();
            break; 
       }
       
        
    }

    update ()
    {

        if(this.gameOk == false) return;
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-190);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(190);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-380);
        }

        
        if(this.player.x >=750 && this.player.y >= 400) {
             this.level++;
             this.deleteStage();
             this.resetStage();
             //레벨업
            
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
             debug: false
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);