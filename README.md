# matrix-hyper-bot

[![TravisCI badge](https://travis-ci.org/turt2live/matrix-hyper-bot.svg?branch=master)](https://travis-ci.org/turt2live/matrix-hyper-bot)

A silly matrix bot that prefixes messages with "hyper" if the message is a single noun

Questions? Ask away in [#hyperbot:t2bot.io](https://matrix.to/#/#hyperbot:t2bot.io)

This is **silly bot** that serves no practical purpose. It may be used as a demonstration for how the [matrix-bot-sdk](https://github.com/turt2live/matrix-js-bot-sdk) could be used, but should not be taken seriously.

# Usage

1. Invite [@hyperbot:t2bot.io](https://matrix.to/#/@hyperbot:t2bot.io) to your room
2. Send a message that is a noun, such as `matrix`

# Building your own

*Note*: You'll need to have an [access token](https://t2bot.io/docs/access_tokens) for an account the bot may use.

1. Clone this repository
2. `npm install`
3. `npm run build`
4. Copy `config/default.yaml` to `config/production.yaml` and edit accordingly
5. Run the bot with `NODE_ENV=prodiction node lib/index.js`

## Docker

```bash
# Create the directory structure for the bot's volume
mkdir -p /matrix-hyper-bot/config
mkdir -p /matrix-hyper-bot/logs
mkdir -p /matrix-hyper-bot/storage

# Create the configuration file. Use the default configuration as a template.
# Logs will automatically be enabled, and the dataPath will be ignored.
nano /matrix-hyper-bot/config/production.yaml

# Run the container
docker run -v /matrix-hyper-bot:/data turt2live/matrix-hyper-bot
```