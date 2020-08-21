export default class JoiningScreen {
  constructor(game) {
    this.game = game;
    this.teamNamePositions = {
      RED: { x: 150, y: 50 },
      BLUE: { x: 550, y: 50 },
      GREEN: { x: 150, y: 250 },
      YELLOW: { x: 550, y: 250 },
    };
    this.backGroundImage = document.getElementById('lavaBackground');
  }

  update(deltaTime) {}

  draw(ctx) {
    for (const team in this.game.allTeams) {
      ctx.font = '20px luckiest_guyregular';
      ctx.fillStyle = team;
      ctx.textAlign = 'center';
      ctx.fillText(
        team,
        this.teamNamePositions[team].x,
        this.teamNamePositions[team].y
      );
      var yposition = 20;

      for (const player of this.game.allTeams[team]) {
        ctx.font = '12px galindoregular';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.fillText(
          player,
          this.teamNamePositions[team].x,
          this.teamNamePositions[team].y + yposition
        );
        yposition = yposition + 10;
      }
    }
  }
}
