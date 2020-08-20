import { lavaDetection } from './CollisionDetection.js';

const TILE_SIZE = 50;
export class GlassTile {
  constructor(game, position) {
    this.game = game;
    this.image = document.getElementById('glassTile');
    this.position = { x: position.x, y: position.y };
    this.width = 50;
    this.height = 50;
    this.breaking = false;
    this.markedForDeletion = false;
    this.tile_sheet = {
      tile_sets: [0, 1, 2, 3],
      image: document.getElementById('glassTileSheet'),
    };
    this.currentTile = 0;
    this.animationTimer = 0;
    this.canBreak = false;
    this.timer = 0;
  }

  update(deltaTime) {
    this.animationTimer += deltaTime / 1000;
    if (this.animationTimer > 1) {
      this.callEverySecond();
      this.animationTimer = 0;
    }

    if (this.currentTile === 3) {
      this.game.players.forEach((player) => {
        if (lavaDetection(this, player)) {
          console.log('hit');
        }
      });
    }
  }
  callEverySecond() {
    this.timer++;
    if (this.timer % 13 === 0) {
      this.break();
    }
  }

  break() {
    if (this.currentTile < 3) {
      this.currentTile++;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.tile_sheet.image,
      this.currentTile * TILE_SIZE,
      0,
      TILE_SIZE,
      TILE_SIZE,
      this.position.x,
      this.position.y,
      TILE_SIZE,
      TILE_SIZE
    );
  }
}