import Animation from './Animation.js';
import { pushingDetection } from './CollisionDetection.js';
import { GAMESTATE, DIRECTIONS, COLOUR } from './SharedConstants.js';
const SPRITE_SIZE = 50;

export default class Player {
  constructor(game, colour) {
    this.colour = colour;
    this.width = 50;
    this.game = game;
    this.height = 50;
    this.otherPlayers = [];
    let xPosition = this.game.gameArea.endX - this.width;
    let yPosition = this.game.gameArea.endY - this.height;
    this.position = { x: xPosition, y: yPosition };
    this.canMove = true;
    this.sprite_sheet = {
      frame_sets: [
        [0, 1],
        [2, 3, 4, 5, 6],
      ],
      image: document.getElementById('redAnimationStrip'),
    };

    switch (this.colour) {
      case COLOUR.RED:
        this.position = {
          x: this.game.gameArea.startX,
          y: this.game.gameArea.startY,
        };
        break;
      case COLOUR.BLUE:
        this.position = {
          x: this.game.gameArea.endX - this.width,
          y: this.game.gameArea.startY,
        };
        break;
      case COLOUR.GREEN:
        this.position = {
          x: this.game.gameArea.startX,
          y: this.game.gameArea.endY - this.height,
        };
        break;
      case COLOUR.YELLOW:
        this.position = {
          x: this.game.gameArea.endX - this.width,
          y: this.game.gameArea.endY - this.height,
        };
    }
    this.animation = new Animation(this.sprite_sheet.frame_sets[0], 30);
    this.movement = {
      activated: false,
      direction: null,
      frameToReach: 20,
      currentFrame: 0,
    };
  }

  resetMovement() {
    this.canMove = true;
    this.animation = new Animation(this.sprite_sheet.frame_sets[0], 30);
    this.movement = {
      activated: false,
      direction: null,
      frameToReach: 20,
      currentFrame: 0,
    };
  }

  determineOtherTeams() {
    this.otherPlayers = this.game.players.filter(
      (object) => object.colour != this.colour
    );

    console.log('thisteam:' + this.colour + 'otherTeams:' + this.otherPlayers);
  }

  movingDirection(direction) {
    this.movement.currentFrame = this.movement.currentFrame + 1;
    if (this.movement.currentFrame <= this.movement.frameToReach) {
      switch (direction) {
        case DIRECTIONS.LEFT:
          //if (this.position.x > this.game.gameArea.startX) {
          this.position.x = this.position.x - this.width / 20;
          //}
          break;
        case DIRECTIONS.RIGHT:
          //if (this.position.x < this.game.gameArea.endX - 50) {
          this.position.x = this.position.x + this.width / 20;
          //}
          break;
        case DIRECTIONS.UP:
          // if (this.position.y > this.game.gameArea.startY) {
          this.position.y = this.position.y - this.height / 20;
          //}
          break;
        case DIRECTIONS.DOWN:
          // if (this.position.y < this.game.gameArea.endY - 50) {
          this.position.y = this.position.y + this.height / 20;
          //}
          break;
      }
    } else {
      this.resetMovement();
    }
  }

  moveLeft() {
    if (this.canMove) {
      this.movement.direction = DIRECTIONS.LEFT;
      this.movement.activated = true;
      this.canMove = false;
      this.animation.change(this.sprite_sheet.frame_sets[1], 5);
    }
  }

  getPushed() {}

  moveRight() {
    if (this.canMove) {
      this.movement.direction = DIRECTIONS.RIGHT;
      this.movement.activated = true;
      this.canMove = false;
      this.animation.change(this.sprite_sheet.frame_sets[1], 5);
    }
  }
  moveUp() {
    if (this.canMove) {
      this.movement.direction = DIRECTIONS.UP;
      this.movement.activated = true;
      this.canMove = false;
      this.animation.change(this.sprite_sheet.frame_sets[1], 5);
    }
  }
  moveDown() {
    if (this.canMove) {
      this.movement.direction = DIRECTIONS.DOWN;
      this.movement.activated = true;
      this.canMove = false;
      this.animation.change(this.sprite_sheet.frame_sets[1], 5);
    }
  }

  push(direction) {
    if (this.canMove) {
      this.movement.direction = direction;
      this.movement.activated = true;
      this.canMove = false;
      this.animation.change(this.sprite_sheet.frame_sets[1], 5);
    }
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite_sheet.image,
      this.animation.frame * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.position.x,
      this.position.y,
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  }

  update(deltaTime) {
    if (this.game.currentGameState == GAMESTATE.PAUSED) {
      return;
    }
    if (this.movement.activated) {
      this.movingDirection(this.movement.direction);
      this.otherPlayers.forEach((player) => {
        if (pushingDetection(player, this, this.movement.direction)) {
          player.push(this.movement.direction);
        }
      });
    }

    this.animation.update(deltaTime);

    // if (this.position.x < this.game.gameArea.startX)
    //   this.position.x = this.game.gameArea.startX;
    // if (this.position.x + this.width > this.game.gameArea.endX) {
    //   this.position.x = this.game.gameArea.endX - this.width;
    // }
    // if (this.position.y < this.game.gameArea.startY) {
    //   this.position.y = this.game.gameArea.startY;
    // }
    // if (this.position.y + this.height > this.game.gameArea.endY) {
    //   this.position.y = this.game.gameArea.endY;
    // }
  }
}