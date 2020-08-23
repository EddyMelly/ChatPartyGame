import { COLOUR } from './SharedConstants.js';

export default class InputHandler {
  constructor(player, game, colour) {
    document.addEventListener('keydown', (event) => {
      if (colour === COLOUR.RED) {
        switch (event.keyCode) {
          case 37:
            player.player.moveLeft();
            break;
          case 38:
            player.player.moveUp();
            break;
          case 39:
            player.player.moveRight();
            break;
          case 40:
            player.player.moveDown();
            break;
          case 74:
            player.player.moveJump();
        }
      } else {
        switch (event.keyCode) {
          case 65:
            player.player.moveLeft();
            break;
          case 87:
            player.player.moveUp();
            break;
          case 68:
            player.player.moveRight();
            break;
          case 83:
            player.player.moveDown();
            break;
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
        case 37:
          if (player.player.speed < 0) {
            player.player.stop();
          }
          break;
        case 39:
          if (player.player.speed > 0) {
            player.player.stop();
          }
          break;
        case 38:
          if (player.player.speed < 0) {
            player.player.stop();
          }
          break;
        case 40:
          if (player.speed > 0) {
            player.player.stop();
          }
          break;
          case 74:
          if (player.speed > 0) {
            player.player.stop();
          }
          break;
      }
    });
  }
}
