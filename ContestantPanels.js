import { DIRECTIONS, COLOUR } from './SharedConstants.js';

export default class ContestantPanels {
  constructor(game) {
    this.game = game;
    this.teamNamePositions = {
      RED: { x: 150, y: 50 },
      BLUE: { x: 1050, y: 50 },
      GREEN: { x: 150, y: 400 },
      YELLOW: { x: 1050, y: 400 },
    };
    this.blueInstruction = '';
    this.redInstruction = '';
    this.greenInstruction = '';
    this.yellowInstruction = '';
    this.redInstructionPosition = { x: 150, y: 315 };
    this.blueInstructionPosition = { x: 1050, y: 315 };
    this.greenInstructionPosition = { x: 150, y: 665 };
    this.yellowInstructionPosition = { x: 1050, y: 665 };
  }

  update(deltaTime) {}

  changeInstruction(instruction, team) {
    switch (team) {
      case COLOUR.RED:
        this.redInstruction = instruction;
        break;
      case COLOUR.BLUE:
        this.blueInstruction = instruction;
        break;
      case COLOUR.GREEN:
        this.greenInstruction = instruction;
        break;
      case COLOUR.YELLOW:
        this.yellowInstruction = instruction;
    }
  }

  drawInstruction(ctx, instruction, instructionPosition) {
    ctx.font = '35px luckiest_guyregular';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    ctx.fillText(instruction, instructionPosition.x, instructionPosition.y);
  }

  truncate(str) {
    return str.length > 15 ? str.substr(0, 15) + '...' : str;
  }

  draw(ctx) {
    this.drawInstruction(ctx, this.redInstruction, this.redInstructionPosition);
    this.drawInstruction(
      ctx,
      this.blueInstruction,
      this.blueInstructionPosition
    );
    this.drawInstruction(
      ctx,
      this.greenInstruction,
      this.greenInstructionPosition
    );
    this.drawInstruction(
      ctx,
      this.yellowInstruction,
      this.yellowInstructionPosition
    );

    for (const team in this.game.allTeams) {
      var yposition = 50;

      for (const player of this.game.allTeams[team]) {
        ctx.font = '20px galindoregular';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';

        var truncatedName = this.truncate(player);

        ctx.fillText(
          truncatedName,
          this.teamNamePositions[team].x,
          this.teamNamePositions[team].y + yposition
        );
        yposition = yposition + 35;
      }
    }
  }
}
