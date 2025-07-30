class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
       // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bg', 'assets/sprites/bg_blue.png');
        this.load.spritesheet('hat', 'assets/sprites/hat.png', { frameWidth: 237, frameHeight: 318, endFrame: 105 });
         this.load.spritesheet('hat2', 'assets/sprites/hat2.png', { frameWidth: 262, frameHeight: 242, endFrame: 56 });
        this.load.spritesheet('pan1', 'assets/sprites/pan1.png', { frameWidth: 187, frameHeight: 221, endFrame: 15 });
    }

    create ()
    {
         this.add.image(400, 16, 'bg').setOrigin(0.5, 0);
        const config_hat = {
            key: 'explode',
            frames: 'hat',
            frameRate: 40,
            repeat: -1,
            repeatDelay: 300
        };
         const config_hat2 = {
            key: 'explode2',
            frames: 'hat2',
            frameRate: 40,
            repeat: -1,
            repeatDelay: 300
        };
        const config_pan1 = {
            key: 'aa',
            frames: 'pan1',
            frameRate: 40,
            repeat: -1,
            repeatDelay: 10
        };

        this.anims.create(config_hat);
         this.anims.create(config_hat2);
         this.anims.create(config_pan1);

        

            let hat = this.add.sprite(650, 410, 'hat', 105);


            //  Each one can have a random start delay
            hat.play({
                key: 'explode',
                delay: Math.random() * 1000
            });

             let hat2 = this.add.sprite(400, 440, 'hat2', 105);


            //  Each one can have a random start delay
            hat2.play({
                key: 'explode2',
                delay: Math.random() * 1000
            });



             let pan1 = this.add.sprite(200, 450, 'pan1', 17);
            

            //  Each one can have a random start delay
            pan1.play({
                key: 'aa',
                delay: Math.random() * 100
            });
      
      
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
