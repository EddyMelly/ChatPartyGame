import TwitchApi from './TwitchApi.js';

const GAMESTATE = {
  PAUSED: 0,
  JOINING: 1,
};

var savedGamestate;

export default class Game {
  constructor(gameWidth, gameHeight, ctx) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.savedGameState = null;
    this.allTeams = { red: [], blue: [], green: [], yellow: [] };
    this.allPlayers = [];
    // this.player = new Player(this);
    // this.restartStatus = false;
  }

  start() {
    this.gamestate = GAMESTATE.JOINING;
    // this.gameObjects = [this.player, this.fences];
    this.TwitchApi = new TwitchApi('ceremor', this);
    this.TwitchApi.connectTwitchChat();
  }

  update(deltaTime) {
    switch (this.gamestate) {
      case GAMESTATE.PAUSED:
        break;
      case GAMESTATE.JOINING:
        // this.gameObjects = [
        //   this.player,
        //   ...this.fences,
        //   ...this.player.bullets,
        // ];
        // this.gameObjects.forEach((object) => object.update(deltaTime));
        // this.gameObjects = this.gameObjects.filter(
        //   (object) => !object.markedForDeletion
        // );
        // if (this.fences.length <= 11 && this.fences.length > 5) {
        //   this.fences.forEach((fence) => {
        //     fence.intervalUpper = 27;
        //     fence.intervalLower = 11;
        //     fence.bulletSpeedModifier = 0.3;
        //   });
        // }
        // if (this.fences.length <= 5) {
        //   this.fences.forEach((fence) => {
        //     fence.intervalUpper = 20;
        //     fence.intervalLower = 10;
        //     fence.bulletSpeedModifier = 0.35;
        //   });
        // }
        // if (this.fences.length === 0) {
        //   //move this out
        //   this.setUpCutScene();
        //   this.lastUser = { username: '', instruction: 'unknown' };
        //   this.gamestate = GAMESTATE.CUTSCENE;
        // }
        // this.fences = this.fences.filter((object) => !object.markedForDeletion);
        break;
    }
  }

  // clearOfRect(ctx) {
  //   ctx.clearRect(0, 0, this.width, this.height);
  //   ctx.closePath();
  //   ctx.beginPath();
  // }

  draw(ctx) {
    // if (savedGamestate !== this.gamestate) {
    //   this.clearOfRect(ctx);
    //   savedGamestate = this.gamestate;
    // }

    // this.gameObjects.forEach((object) => object.draw(ctx));
    ctx.font = '12px Monospace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    // ctx.fillText(this.lastUser.username, 150, 10);
  }

  displayMessage(ctx, rgbValue, message) {
    ctx.rect(200, 100, this.gameWidth / 2, this.gameHeight / 2);
    ctx.fillStyle = rgbValue;
    ctx.fill();
    ctx.font = '35px Monospace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(message.main, this.gameWidth / 2, this.gameHeight / 2);
    ctx.font = '18px Monospace';
    ctx.fillText(
      message.subtitle,
      this.gameWidth / 2,
      this.gameHeight / 2 + 30
    );
  }

  // gameOver() {
  //   playSound(this.failureTune);
  //   this.restartStatus = true;
  //   setTimeout(function () {
  //     restart();
  //     return;
  //   }, 10000);
  // }

  // victory() {
  //   playSound(this.victoryTune);
  //   this.restartStatus = true;
  //   setTimeout(function () {
  //     restart();
  //     return;
  //   }, 10000);
  // }
}
