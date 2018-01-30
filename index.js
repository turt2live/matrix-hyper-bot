const LogService = require("matrix-js-snippets").LogService;
const config = require("config");

LogService.configure(config["logging"]);

const sdk = require("matrix-js-sdk");
const NounHandler = require("./src/NounHandler");
const matrixUtils = require("matrix-js-snippets");

const client = sdk.createClient({
    baseUrl: config['homeserverUrl'],
    accessToken: config['accessToken'],
    userId: config['userId']
});

matrixUtils.autoAcceptInvites(client);
NounHandler.start(client);

client.startClient({initialSyncLimit: 3});