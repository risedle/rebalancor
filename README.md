# Risedle Offchain Rebalancing bot

This bot monitor current leverage ratio of the specified RISE token then trigger
the rebalance if needed.

## Get started

Clone the repository:

    git clone git@github.com:risedle/rebalancing-bot.git
    cd rebalancing-bot/

Install the dependencies:

    npm install

Copy `.env.example` to `.env` and modify the values.

## Run

Build the program:

    tsc

Run the program:

    node dist/cron.js

## Deployment

This bot is deployed to [fly.io](https://fly.io/docs/introduction/).

Create new app:

    flyctl launch

Set the secrets:

    flyctl secrets --app kovan-rebalance-ethrise set RPC_URL="here" WALLET_PRIVATE_KEY="here" SENTRY_DSN="here"

Run the following command to deploy:

    flyctl deploy --app kovan-rebalance-ethrise --config kovan-ethrise.toml .
