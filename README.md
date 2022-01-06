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

Set the secret:

    flyctl secrets set RPC_URL= VAULT_CONTRACT= LEVERAGED_TOKEN_CONTRACT= MIN_LEVERAGE_RATIO_IN_ETHER= MAX_LEVERAGE_RATIO_IN_ETHER= WALLET_PRIVATE_KEY= SENTRY_DSN=

Run the following command to deploy:

    flyctl deploy
