import { COLOUR } from './SharedConstants.js';

export default class VictoryScreen {
  constructor(game, winningTeam) {
    this.winningTeam = winningTeam;
    this.game = game;
    this.backGroundImage = document.getElementById('winScreenBackGround');
    this.teamNamePosition = { x: 500, y: 500 };
    switch (winningTeam) {
      case COLOUR.RED:
        this.winningTeamColour = '#d62839';
        break;
      case COLOUR.BLUE:
        this.winningTeamColour = '#339dd7';
        break;
      case COLOUR.GREEN:
        this.winningTeamColour = '#44cf6c';
        break;
      case COLOUR.YELLOW:
        this.winningTeamColour = '#e3c34f';
        break;
      default:
        this.winningTeamColour = 'black';
    }
    
  }

  update(deltaTime) {}

  draw(ctx) {
    ctx.drawImage(this.backGroundImage, 300, 50, 600, 600);
    ctx.font = '50px luckiest_guyregular';
    ctx.fillStyle = this.winningTeamColour;
    ctx.textAlign = 'center';

    ctx.fillText(this.winningTeam, 605, 185);
  }
}
