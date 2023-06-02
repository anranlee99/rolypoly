class Title extends Phaser.Scene {
    constructor(){
        super('Title');
    }
    preload() {
        this.load.image('hand', 'assets/select.png');
        this.load.image('rolypoly', 'assets/rolypolySprite.png');
    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        let title = this.add.text(this.w/2, this.h/2, 'Roly Poly: To the End', {
            fill: '#000000',
            font: '100px monospace',
        }).setOrigin(0.5).setAlpha(0);
        this.hand = this.add.image(this.w*0.75, this.h*0.25, 'hand').setScale(0.5)
        this.tweens.add({
            targets: [title],
            alpha: {from: 0, to: 1},
            duration: 1000,
            yoyo: true,
            repeat: 3,
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

        let rp = this.add.image(this.w/2, this.h * 0.6, 'rolypoly').setOrigin(0.5);
        
    }
    update(){
        this.hand.x = this.input.activePointer.x;
        this.hand.y = this.input.activePointer.y;
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
            debug: true
        }
    },
    scene: [Title],
    title: "Everything's a Nail",
});