const GAMESTATE = {
  PAUSED: 0,
  JOINING: 1,
};
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

      switch (this.game.savedGameState) {
        case GAMESTATE.JOINING:
          //JOIN TEAM LOGIC
          if (upperCaseMessageClean === 'JOIN') {
            this.addUserToTeam(clean_username);
          }
          break;
        case GAMESTATE.PAUSED:
          //DO NOTHING
          break;
      }
    });
  }

  addUserToTeam(cleanUserName) {
    if (this.game.allPlayers.length < 20) {
      if (!this.checkIfJoined(cleanUserName)) {
        let lowestTeam = this.determineLowestTeam();
        console.log('adding ' + cleanUserName + ' to team ' + lowestTeam);

        this.game.allTeams[lowestTeam].push(cleanUserName);
        console.log(this.game.allTeams[lowestTeam]);
        this.game.allPlayers.push(cleanUserName);
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
    if (this.game.allPlayers.includes(userName)) {
      console.log(userName + ' is already listed');
      return true;
    } else {
      return false;
    }
  }
}
