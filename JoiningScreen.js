export default class JoiningScreen {
  constructor(game) {
    this.game = game;

    this.backGroundImage = document.getElementById('joiningBackground');
    this.waitingMessage = [
      'WAITING FOR PLAYERS',
      'WAITING FOR PLAYERS .',
      'WAITING FOR PLAYERS ..',
      'WAITING FOR PLAYERS ...',
    ];
    this.currentWaitingMessage = this.waitingMessage[0];
    this.ticker = 0;
    this.timer = 60;
  }

  update(deltaTime) {
    this.ticker += deltaTime / 1000;
    if (this.ticker >= 1) {
      this.callEverySecond();
      this.ticker = 0;
    }
  }

  callEverySecond() {
    this.timer--;

    const currentIndex = this.waitingMessage.indexOf(
      this.currentWaitingMessage
    );
    const nextIndex = (currentIndex + 1) % this.waitingMessage.length;
    this.currentWaitingMessage = this.waitingMessage[nextIndex];

    if (this.timer === 0) {
      if (this.game.allPlayers.length >= 8) {
        this.game.startGlassGame();
      } else {
        this.timer = 60;
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(this.backGroundImage, 300, 50, 600, 600);
    ctx.font = '50px luckiest_guyregular';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    ctx.fillText(this.timer, 575, 100);

    ctx.font = '30px luckiest_guyregular';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    ctx.fillText(this.currentWaitingMessage, 450, 45);
  }
}
