class Title extends Phaser.Scene {
    constructor(){
        super('Title');
    }
    preload() {
        this.load.image('hand', 'assets/select.png');
        this.load.image('rolypoly', 'assets/rolypolySprite.png');
        this.load.image('snail', 'assets/snailSprite.png');
    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        let title = this.add.text(this.w/2, this.h/2, 'Roly Poly: To the End', {
            fill: '#000000',
            font: '100px monospace',
        }).setOrigin(0.5).setAlpha(0);
        this.hand = this.add.image(this.w*0.75, this.h*0.25, 'hand').setScale(0.1)
        this.tweens.add({
            targets: [title],
            alpha: {from: 0, to: 1},
            duration: 1000,
            yoyo: true,
            repeat: 1,
            onComplete: ()=>{
                title.alpha = 1;
            }
        })
        this.tweens.add({
            targets: [ this.hand],
            alpha: {from: 0, to: 1},
            duration: 1000,
            yoyo: true,
            repeat: -1,
        })
        
        let rp = this.add.image(this.w*0.4, this.h *0.6, 'rolypoly')
        let snail = this.add.image(this.w*0.6, this.h * 0.6, 'snail')
        this.tweens.add({
            targets: rp,
            x: {from: 0, to: this.w},
            duration: 10000,
            repeat: -1,
        })
        this.input.on('pointerdown', ()=>{
            this.scene.start('Game');
        })
    }
    update(){
        this.hand.x = this.input.activePointer.x;
        this.hand.y = this.input.activePointer.y;
    }

}
class Game extends Phaser.Scene {
    constructor(){
        super('Game');
    }
    preload() {
        this.load.image('hand', 'assets/select.png');
        this.load.image('rolypoly', 'assets/rolypolySprite.png');
        this.load.image('snail', 'assets/snailSprite.png');
    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        
        let platform = this.add.line(0, this.h*0.8, 0, 0, this.w, 0,  0, 1).setOrigin(0)
        this.physics.add.existing(platform, true)
        let rp = this.physics.add.image(this.w*0.2, this.h *0.6, 'rolypoly')
        rp.jump = 1;
        let col = this.physics.add.collider(rp, platform, ()=>{
            rp.jump = 1;
        }) 

        this.input.on('pointerdown', ()=>{
            if(rp.jump > 0){
                rp.setVelocityY(-500)
                rp.jump--;
            }
        })
        let spawn = (time)=> {
            this.time.delayedCall(time, ()=> {
                let snail = this.physics.add.image(this.w*0.8, this.h * 0.6, 'snail').setScale(0.5)
                snail.setVelocityX(-200)
                let c = this.physics.add.collider(snail, platform)
                this.physics.add.collider(snail, rp, ()=>{
                    rp.setVelocityY(-100)
                    rp.setVelocityX(-100)
                    this.physics.world.removeCollider(col)
                    this.physics.world.removeCollider(c)
                    this.time.delayedCall(1000, ()=>{
                        // this.cameras.main.fade(1000, 0, 0, 0)
                        this.cameras.main.setBackgroundColor('#000000')

                    })
                    this.time.delayedCall(2000, ()=>{
                        console.log('game over')
                        this.add.text(this.w/2, this.h/2, 'Game Over! Don\'t touch the snails', {
                            color: '#ffffff',
                            font: '50px monospace',
                        }).setOrigin(0.5).setAlpha(1);
                        this.input.on('pointerdown', ()=>{
                            this.scene.start('Title');
                        })
                    })
                })
            }) 
        }
        spawn(0)
        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                spawn(Phaser.Math.Between(1000,4000))
            },
            loop: true,
        })
        
    }

}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    backgroundColor: '#ffffff',
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {y:500}
        }
    },
    scene: [Title, Game],
    title: "Everything's a Nail",
});