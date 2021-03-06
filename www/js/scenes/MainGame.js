
import Phaser from 'phaser';
import { CST } from '../constants';
import Images from '../images';
import { openPaymentDiag } from '../utils/payment';

class MainGame extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
  }

  /**
   * init
   */
  init() {
    this.playerSpeed = 1.5;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
    // player is alive
    this.isPlayerAlive = true;
  }

  /**
   * preload
   */
  preload() {
    // load images
    console.log('Images1',Images.background)
    this.load.image('background', Images.background);
    this.load.image('dragon', Images.dragon);
    this.load.image('player', Images.player);
    this.load.image('treasure', Images.treasure);
    console.log("errored")
  }

  /**
   * create
   */
  create() {
    const bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0, 0);
    // player
    this.player = this.add.sprite(
      40,
      this.sys.game.config.height / 2,
      'player'
    );
    this.player.setScale(0.5);

    // group of enemies
    this.enemies = this.add.group({
      key: 'dragon',
      repeat: 5,
      setXY: {
        x: 110,
        y: 100,
        stepX: 80,
        stepY: 20
      }
    });
    // scale enemies
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);
    // set speeds
    Phaser.Actions.Call(this.enemies.getChildren(), enemy => {
      enemy.speed = Math.random() * 2 + 1;
    });

    // goal
    this.treasure = this.add.sprite(
      this.sys.game.config.width - 80,
      this.sys.game.config.height / 2,
      'treasure'
    );
    this.treasure.setScale(0.6);
  }

  /**
   * update
   */
  update() {
    // only if the player is alive
    if (!this.isPlayerAlive) {
      return;
    }
    if (this.input.activePointer.isDown) {
      this.player.x += this.playerSpeed;
    }

    // treasure collision
    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        this.treasure.getBounds()
      )
    ) {
      this.highScore++;
      this.gameOver();
      openPaymentDiag();
    }

    // enemy movement
    const enemies = this.enemies.getChildren();
    for (const enemy of enemies) {
      // move enemies
      enemy.y += enemy.speed;

      // reverse movement if reached the edges
      if (enemy.y >= this.enemyMaxY && enemy.speed > 0) {
        enemy.speed *= -1;
      } else if (enemy.y <= this.enemyMinY && enemy.speed < 0) {
        enemy.speed *= -1;
      }

      // // enemy collision
      // if (
      //   Phaser.Geom.Intersects.RectangleToRectangle(
      //     this.player.getBounds(),
      //     enemy.getBounds()
      //   )
      // ) {
      //   this.gameOver();
      //   break;
      // }
    }
  }

  gameOver() {
    // flag to set player is dead
    this.isPlayerAlive = false;

    // shake the camera
    this.cameras.main.shake(500);

    // fade camera
    this.time.delayedCall(
      250,
      () => {
        this.cameras.main.fade(250);
      },
      []
    );

    // restart game
    this.time.delayedCall(
      500,
      () => {
        this.scene.restart();
      },
      []
    );
  }
}

export default MainGame;
