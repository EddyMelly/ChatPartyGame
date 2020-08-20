import { GlassTile } from './GlassTile.js';
const LEVEL_STATE = {
  PAUSED: 0,
  RUNNING: 0,
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
    this.glassTiles = [];
    this.buildLevel(this.game);
    this.glassTilesBreaking = [];
    this.glassTilesNotBreaking = [];
    this.animationTimer = 0;
    this.timer = 0;
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
    if (this.timer % 4 === 0) {
      //this.chooseTileToBreak();
    }
  }

  update(deltaTime) {
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
    this.glassTiles.forEach((object) => object.draw(ctx));
  }
}
