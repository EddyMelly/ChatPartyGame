const GAMESTATE = {
  PAUSED: 0,
  JOINING: 1,
};

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
      var uppercaseUserName = clean_username.toUpperCase();

      switch (this.game.savedGameState) {
        case GAMESTATE.JOINING:
          //JOIN TEAM LOGIC
          this.decideMessage(
            clean_message,
            message.tags['badgeInfo'],
            uppercaseUserName
          );
          break;
        case GAMESTATE.PAUSED:
          //DO NOTHING
          break;
      }
    });
  }

  userJoin(cleanMessage, cleanUserName, subBadge) {
    if (!this.checkIfJoined(cleanUserName)) {
    }
  }

  joinUser(userName) {
    //determine lowest
    //add to all players
  }

  checkIfJoined(userName) {
    if (this.game.allPlayers.includes(userName)) {
      return true;
      console.log('new name adding');
    } else {
      return false;
      console.log('old name not adding');
    }
  }
  decideMessage(cleanMessage, subBadge, cleanUserName) {
    var uppercaseMessage = cleanMessage.toUpperCase();
    var uppercaseUserName = cleanUserName.toUpperCase();
    var upperCaseMessageClean = uppercaseMessage.replace(/ .*/, '');
    if (this.subCheck(subBadge)) {
    }
  }

  subCheck(subscriber) {
    if (subscriber !== '') {
      return true;
    } else {
      return false;
    }
  }
}
