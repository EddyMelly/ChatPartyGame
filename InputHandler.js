export default class InputHandler {
  constructor(player, game, colour) {
    document.addEventListener('keydown', (event) => {
      if (colour == 0) {
        switch (event.keyCode) {
          case 37:
            player.moveLeft();
            break;
          case 38:
            player.moveUp();
            break;
          case 39:
            player.moveRight();
            break;
          case 40:
            player.moveDown();
            break;
        }
      } else {
        switch (event.keyCode) {
          case 65:
            player.moveLeft();
            break;
          case 87:
            player.moveUp();
            break;
          case 68:
            player.moveRight();
            break;
          case 83:
            player.moveDown();
            break;
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
        case 37:
          if (player.speed < 0) {
            player.stop();
          }
          break;
        case 39:
          if (player.speed > 0) {
            player.stop();
          }
          break;
        case 38:
          if (player.speed < 0) {
            player.stop();
          }
          break;
        case 40:
          if (player.speed > 0) {
            player.stop();
          }
          break;
      }
    });
  }
}
