import TwitchApi from './TwitchApi.js';
import JoiningScreen from './JoiningScreen.js';
import InputHandler from './InputHandler.js';
import Player from './Player.js';
import GlassGame from './GlassGame.js';
import ContestantPanels from './ContestantPanels.js';
import VictoryScreen from './VictoryScreen.js';
import { playSound } from './PlaySound.js';
import { restart } from './index.js';
import { GAMESTATE, COLOUR, SOUNDS } from './SharedConstants.js';

export default class Game {
  constructor(gameWidth, gameHeight, ctx, gameArea) {
    this.gameArea = gameArea;
    this.ctx = ctx;
    this.glassGame = null;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameObjects = [];
    this.victoryScreen;

    this.players = [
      { teamColour: COLOUR.RED, player: new Player(this, COLOUR.RED) },
      { teamColour: COLOUR.BLUE, player: new Player(this, COLOUR.BLUE) },
      { teamColour: COLOUR.GREEN, player: new Player(this, COLOUR.GREEN) },
      { teamColour: COLOUR.YELLOW, player: new Player(this, COLOUR.YELLOW) },
    ];
    new InputHandler(this.players[0], this, COLOUR.RED);
    new InputHandler(this.players[3], this, COLOUR.YELLOW);
    this.JoiningScreen = new JoiningScreen(this);
    this.contestantPanels = new ContestantPanels(this);
    this.currentGameState = null;
    this.allTeams = {
      RED: [],
      BLUE: [],
      GREEN: [],
      YELLOW: [],
    };
    this.allPlayers = [];
    this.extractedPlayers = [];
  }

  start() {
    this.currentGameState = GAMESTATE.JOINING;
    this.gameObjects = [this.JoiningScreen];
    this.players.forEach((element) => {
      this.extractedPlayers.push(element.player);
    });
    this.players.forEach((object) => object.player.determineOtherTeams());
    this.TwitchApi = new TwitchApi('ceremor', this);
    this.TwitchApi.connectTwitchChat();
  }

  startGlassGame() {
    this.gameObjects = [this.contestantPanels, ...this.extractedPlayers];
    this.currentGameState = GAMESTATE.FIRSTGAME;
  }

  update(deltaTime) {
    switch (this.currentGameState) {
      case GAMESTATE.PAUSED:
        break;
      case GAMESTATE.JOINING:
        this.gameObjects = [this.contestantPanels, this.JoiningScreen];
        this.gameObjects.forEach((object) => object.update(deltaTime));

        break;
      case GAMESTATE.FIRSTGAME:
        if (this.glassGame === null) {
          this.glassGame = new GlassGame(this);
          this.gameObjects.push(this.glassGame);
        }
        this.gameObjects = [
          this.contestantPanels,
          this.glassGame,
          ...this.extractedPlayers,
        ];
        this.gameObjects.forEach((object) => object.update(deltaTime));
        // if (this.players.length === 2 && this.glassGame.breakTimer !== 3) {
        //   this.glassGame.breakTimer = 3;
        // }

        if (this.players.length <= 1) {
          this.victory(this.players[0]);
        }
        break;
      case GAMESTATE.VICTORY:
        this.gameObjects = [this.contestantPanels, this.victoryScreen];
    }
  }

  removePlayer(player) {
    this.players = this.players.filter((object) => object.player !== player);
    this.extractedPlayers = this.extractedPlayers.filter(
      (object) => object !== player
    );
    this.players.forEach((object) => {
      object.player.determineOtherTeams();
    });
  }

  draw(ctx) {
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

  victory(player) {
    if (player && player.player.playerState === 0) {
      this.victoryScreen = new VictoryScreen(this, player.teamColour);
    } else {
      this.victoryScreen = new VictoryScreen(this, 'umm... no one?');
    }

    this.currentGameState = GAMESTATE.VICTORY;

    playSound(SOUNDS.VICTORY);
    this.restartStatus = true;
    setTimeout(function () {
      restart();
      return;
    }, 10000);
  }
}
