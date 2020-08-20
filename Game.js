import TwitchApi from './TwitchApi.js';
import JoiningScreen from './JoiningScreen.js';
import InputHandler from './InputHandler.js';
import Player from './Player.js';
import GlassGame from './GlassGame.js';
import { GAMESTATE, COLOUR } from './SharedConstants.js';
// const GAMESTATE = {
//   PAUSED: 0,
//   JOINING: 1,
//   FIRSTGAME: 2,
// };
// const COLOUR = {
//   RED: 0,
//   BLUE: 1,
//   GREEN: 2,
//   YELLOW: 3,
// };

var savedGameState;
export default class Game {
  constructor(gameWidth, gameHeight, ctx, gameArea) {
    this.gameArea = gameArea;
    this.ctx = ctx;
    this.glassGame = null;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameObjects = [];
    this.players = [
      new Player(this, COLOUR.RED),
      new Player(this, COLOUR.BLUE),
      new Player(this, COLOUR.GREEN),
      new Player(this, COLOUR.YELLOW),
    ];
    new InputHandler(this.players[0], this, COLOUR.RED);
    new InputHandler(this.players[3], this, COLOUR.YELLOW);
    this.JoiningScreen = new JoiningScreen(this);
    this.currentGameState = null;
    this.allTeams = {
      red: [],
      blue: [],
      green: [],
      yellow: [],
    };
    this.allPlayers = [];
  }

  start() {
    this.currentGameState = GAMESTATE.FIRSTGAME;
    // this.gameObjects = [this.JoiningScreen];
    this.gameObjects = [...this.players];
    this.players.forEach((object) => object.determineOtherTeams());
    this.TwitchApi = new TwitchApi('ceremor', this);
    this.TwitchApi.connectTwitchChat();
  }

  update(deltaTime) {
    switch (this.currentGameState) {
      case GAMESTATE.PAUSED:
        break;
      case GAMESTATE.JOINING:
        this.gameObjects = [this.JoiningScreen];
        break;
      case GAMESTATE.FIRSTGAME:
        if (this.glassGame === null) {
          this.glassGame = new GlassGame(this);
          this.gameObjects.push(this.glassGame);
        }
        this.gameObjects = [this.glassGame, ...this.players];
        this.gameObjects.forEach((object) => object.update(deltaTime));
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

    this.gameObjects.forEach((object) => object.draw(ctx));
    ctx.font = '12px Monospace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
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
