const LogService = require("matrix-js-snippets").LogService;
const WordPOS = require("wordpos");

class NounHandler {

    constructor() {
        this._wordpos = new WordPOS({profile: false, stopwords: true});
    }

    start(client) {
        this._client = client;

        this._client.on('event', (event) => {
            if (event.getType() !== 'm.room.message') return;
            if (event.getSender() === client.credentials.userId) return;
            if (event.getContent().msgtype !== 'm.text') return;

            this._tryHyperizing(event);
        });
    }

    _tryHyperizing(event) {
        var message = event.getContent().body;
        this._wordpos.isNoun(message, isNoun => {
            LogService.info("NounHandler", "Message '" + message + "' is noun? " + isNoun);
            if (isNoun) {
                this._client.sendNotice(event.getRoomId(), "hyper " + message);
            }
        });
    }
}

module.exports = new NounHandler();