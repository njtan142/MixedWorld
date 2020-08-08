// create a new scene
let gameScene = new Phaser.Scene('Game');

// set the configuration of the game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: gameScene
};

//game variables

let platform;
let player;
let bottomPlatform;
// create a new game, pass the configuration
let game = new Phaser.Game(config);

//preload
gameScene.preload = function () {
    this.load.image('topGround', 'assets/TopGround.png');
    this.load.image('middleGround', 'assets/MiddleGround.png');
    this.load.image('bottomGround', 'assets/BottomGround.png');
}

//create
gameScene.create = function () {
    // Tiles
    //BottomGround
    platform = this.physics.add.group();
    bottomPlatform = this.physics.add.staticGroup();
    console.log(platform.world.bodies.entries[1])
    tileLoop('topGround', bottomPlatform, 40, 0, 16 * 19, 16);
    tileLoop('topGround', bottomPlatform, 10, 16 * 10, 16 * 18, 16);
    // EscalatedGround
    // Pyramid
    //    tileLoop('topGround', this, 15, 16*15, 16*16);
    //    tileLoop('topGround', this, 11, 16*17, 16*14);
    //    tileLoop('topGround', this, 7, 16*19, 16*12);
    //    tileLoop('middleGround', this, 15, 16*15, 16*17);
    //    tileLoop('middleGround', this, 11, 16*17, 16*15);
    //    tileLoop('middleGround', this, 7, 16*19, 16*13);

    //Player
    player = this.physics.add.sprite(160, 0, 'bottomGround').setOrigin(0, 0);
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);

    //Collision
    this.physics.add.collider(player, platform)
    this.physics.add.collider(platform, bottomPlatform)
    this.physics.add.collider(player, bottomPlatform)
    this.physics.add.collider(platform, platform)
}
//update
function update() {

}

//game functions

function tileLoop(spriteName, platform, loop = 2, x = 0, y = 0, length = 16, orientation = 'horizontal') {
    if (orientation == 'vertical') {
        for (let i = 0; i < loop; i++) {
            platform.create(x, y + length * i, spriteName).setOrigin(0, 0).refreshBody();
        }
    } else if (orientation == 'horizontal') {
        for (let i = 0; i < loop; i++) {
            platform.create(x + length * i, y, spriteName).setOrigin(0, 0).refreshBody();
        }
    }
}


    