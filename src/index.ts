import {
    AutojoinRoomsMixin,
    MatrixClient,
    RichRepliesPreprocessor,
    RichReply,
    SimpleRetryJoinStrategy
} from "matrix-bot-sdk";
import config from "./config";
import { LogService } from "matrix-js-snippets";
import { LocalstorageStorageProvider } from "./LocalstorageStorageProvider";
import * as path from "path";
import * as WordPOS from "wordpos";

LogService.configure(config.logging);
const storageProvider = new LocalstorageStorageProvider(path.join(config.dataPath, "localstorage"));
const client = new MatrixClient(config.homeserverUrl, config.accessToken, storageProvider);
const wordpos = new WordPOS({profile: false, stopwords: true});

// Strip out replies so we don't accidentally hyperize replies
client.addPreprocessor(new RichRepliesPreprocessor());

let userId = "";
client.getUserId().then(uid => {
    userId = uid;

    client.on("room.message", (roomId, event) => {
        if (event['sender'] === userId) return;
        if (event['type'] !== "m.room.message") return;
        if (!event['content']) return;
        if (event['content']['msgtype'] !== "m.text") return;
        if (!event['content']['body']) return;

        tryHyperizing(event, roomId);
    });

    AutojoinRoomsMixin.setupOnClient(client);
    client.setJoinStrategy(new SimpleRetryJoinStrategy());
    return client.start();
}).then(() => LogService.info("index", "Hyperbot started!"));

function tryHyperizing(event: any, roomId: string) {
    const message = event["content"]["body"];
    wordpos.isNoun(message, isNoun => {
        LogService.info("tryHyperizing", `Message '${message}' is noun? ${isNoun}`);
        if (isNoun) {
            const hyperized = "hyper " + message.toLowerCase();
            const reply = RichReply.createFor(event, hyperized, hyperized);
            reply["msgtype"] = "m.notice";
            return client.sendMessage(roomId, reply);
        }
    });
}