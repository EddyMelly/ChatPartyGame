import { GAMESTATE, COLOUR, DIRECTIONS } from './SharedConstants.js';
var lowestTeam = 'red';
export default class TwitchApi {
  constructor(channel, game) {
    this.channel = channel;
    this.users = [];
    this.game = game;
    this.statusElement = document.getElementById('status');
    this.twitchCall = new TwitchJs({
      log: {
        enabled: false,
      },
    });
  }
  disconnectTwitchChat() {
    const { chat } = this.twitchCall;
    chat.disconnect();
    this.statusElement.innerHTML = 'disconnected';
    this.statusElement.style.color = 'red';
  }

  connectTwitchChat() {
    const { chat } = this.twitchCall;
    chat
      .connect()
      .then(() => {
        chat
          .join(this.channel)
          .then(() => {
            console.log('connected boy');
            this.statusElement.innerHTML = 'connected';
            this.statusElement.style.color = 'green';
          })
          .catch(function (err) {
            console.log(err);
            this.statusElement.innerHTML = 'Edgar Fucked Up';
            this.statusElement.style.color = 'red';
          });
      })
      .catch(function (err) {
        console.log(err);
        statusElement.innerHTML = 'Error: Cant connect right now';
        statusElement.style.color = 'red';
      });

    chat.on('*', (message) => {
      var message = message;
      var clean_message = DOMPurify.sanitize(message.message, {
        ALLOWED_TAGS: ['b'],
      });
      var clean_username = DOMPurify.sanitize(message.username, {
        ALLOWED_TAGS: ['b'],
      });
      var uppercaseMessage = clean_message.toUpperCase();
      var upperCaseMessageClean = uppercaseMessage.replace(/ .*/, '');

      switch (this.game.currentGameState) {
        case GAMESTATE.JOINING:
          if (upperCaseMessageClean === 'JOIN') {
            this.addUserToTeam(clean_username);
          }
          if (
            upperCaseMessageClean === DIRECTIONS.LEFT ||
            upperCaseMessageClean === DIRECTIONS.RIGHT ||
            upperCaseMessageClean === DIRECTIONS.UP ||
            upperCaseMessageClean === DIRECTIONS.DOWN
          ) {
            this.performInstruction(clean_username, upperCaseMessageClean);
          }
          break;
        case GAMESTATE.PAUSED:
          //DO NOTHING
          break;
        case GAMESTATE.VICTORY:
          //VICTORY
          break;
        case GAMESTATE.FIRSTGAME:
          if (upperCaseMessageClean === 'JOIN') {
            this.addUserToTeam(clean_username);
          }
          if (
            upperCaseMessageClean === DIRECTIONS.LEFT ||
            upperCaseMessageClean === DIRECTIONS.RIGHT ||
            upperCaseMessageClean === DIRECTIONS.UP ||
            upperCaseMessageClean === DIRECTIONS.DOWN
          ) {
            this.performInstruction(clean_username, upperCaseMessageClean);
          }
      }
    });
  }

  performInstruction(userName, instruction) {
    var foundTeam;
    var result = this.game.allPlayers.find(
      (player) => player.userName === userName
    );
    if (result) {
      console.log(
        result.userName +
          ' is trying to perform ' +
          instruction +
          ' on team ' +
          result.team
      );

      if (
        this.game.players.some((player) => player.teamColour === result.team)
      ) {
        var foundTeam = this.game.players.find(
          (x) => x.teamColour === result.team
        ).player;
        if (foundTeam) {
          console.log(foundTeam);
          this.completeInstruction(foundTeam, instruction);
        }
      }
    }
  }

  completeInstruction(playerTeam, instruction) {
    switch (instruction) {
      case DIRECTIONS.LEFT:
        playerTeam.moveLeft();
        break;
      case DIRECTIONS.RIGHT:
        playerTeam.moveRight();
        break;
      case DIRECTIONS.UP:
        playerTeam.moveUp();
        break;
      case DIRECTIONS.DOWN:
        playerTeam.moveDown();
        break;
      default:
        break;
    }
  }

  addUserToTeam(cleanUserName) {
    if (this.game.allPlayers.length < 20) {
      if (!this.checkIfJoined(cleanUserName)) {
        let lowestTeam = this.determineLowestTeam();
        console.log('adding ' + cleanUserName + ' to team ' + lowestTeam);

        this.game.allTeams[lowestTeam].push(cleanUserName);
        console.log(this.game.allTeams[lowestTeam]);
        console.log('after this');
        this.game.allPlayers.push({
          userName: cleanUserName,
          team: lowestTeam,
        });
      }
    } else {
      console.log('all full, not added');
    }
  }

  determineLowestTeam() {
    for (const team in this.game.allTeams) {
      if (this.game.allTeams[team].length === 0) {
        lowestTeam = team;
        return lowestTeam;
      }
    }
    for (const team in this.game.allTeams) {
      if (
        this.game.allTeams[team].length < this.game.allTeams[lowestTeam].length
      ) {
        lowestTeam = team;
      }
    }
    return lowestTeam;
  }

  checkIfJoined(userName) {
    if (this.game.allPlayers.some((player) => player.userName === userName)) {
      return true;
    } else {
      return false;
    }
  }
}
