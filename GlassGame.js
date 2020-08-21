import { GlassTile } from './GlassTile.js';
const LEVEL_STATE = {
  PAUSED: 0,
  RUNNING: 1,
};
const level = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export default class GlassGame {
  constructor(game) {
    this.game = game;
    this.levelState = LEVEL_STATE.PAUSED;
    this.glassTiles = [];
    this.buildLevel(this.game);
    this.glassTilesBreaking = [];
    this.glassTilesNotBreaking = [];
    this.animationTimer = 0;
    this.timer = 0;
    this.backGroundImage = document.getElementById('lavaBackground');
    this.startMessage = '';
  }

  buildLevel(game) {
    level.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile === 1) {
          let position = {
            x: this.game.gameArea.startX + 50 * tileIndex,
            y: this.game.gameArea.startY + 50 * rowIndex,
          };
          this.glassTiles.push(new GlassTile(game, position));
        }
      });
    });
  }

  chooseTileToBreak() {
    if (this.glassTilesBreaking.length === 0) {
      var randomTile = this.glassTiles[
        Math.floor(Math.random() * this.glassTiles.length)
      ];
      randomTile.breaking = true;
    } else {
      var randomTile = this.glassTilesNotBreaking[
        Math.floor(Math.random() * this.glassTilesNotBreaking.length)
      ];
      randomTile.breaking = true;
    }
  }

  callEverySecond() {
    this.timer = this.timer + 1;
    switch (this.levelState) {
      case LEVEL_STATE.RUNNING:
        if (this.timer % 3 === 0 && this.glassTiles.length >= 1) {
          this.chooseTileToBreak();
        }
        break;
      case LEVEL_STATE.PAUSED:
        this.displayStart(this.timer);
        break;
    }
  }

  displayStart(timer) {
    switch (timer) {
      case 0:
        this.startMessage = '3';
        break;
      case 1:
        this.startMessage = '3';
        break;
      case 2:
        this.startMessage = '2';
        break;
      case 3:
        this.startMessage = '1';
        break;
      case 4:
        this.startMessage = 'GO!';
        break;
      case 5:
        this.startMessage = '';
        this.timer = 0;
        this.levelState = LEVEL_STATE.RUNNING;
        break;
    }
  }

  update(deltaTime) {
    switch (this.levelState) {
      case LEVEL_STATE.PAUSED:
        break;
      case LEVEL_STATE.RUNNING:
        break;
    }
    this.glassTilesNotBreaking = this.glassTiles.filter(
      (object) => !object.breaking
    );

    this.glassTilesBreaking = this.glassTiles.filter(
      (object) => object.breaking
    );

    this.glassTilesBreaking.forEach((object) => object.update(deltaTime));

    this.animationTimer += deltaTime / 1000;
    if (this.animationTimer >= 1) {
      this.callEverySecond();
      this.animationTimer = 0;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.backGroundImage, 300, 50, 600, 600);
    if (this.levelState === LEVEL_STATE.PAUSED) {
      ctx.font = '40px luckiest_guyregular';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      ctx.fillText(this.startMessage, 600, 45);
    }
    this.glassTiles.forEach((object) => object.draw(ctx));
  }
}
