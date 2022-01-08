import cron from "node-cron";
import rebalance from "./rebalance";
import { ethers } from "ethers";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";

// Load environment variables
dotenv.config();

// Initialize sentry
Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

Sentry.setTag("app_name", process.env.SENTRY_APP_NAME);

const task = cron.schedule("*/5 * * * *", async () => {
    // Initialize provider
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

    // Contract addresses
    const vaultContractAddress = process.env.VAULT_CONTRACT;
    const leveragedTokenAddress = process.env.LEVERAGED_TOKEN_CONTRACT;

    // Leverate ratios
    const minLeverageRatio = process.env.MIN_LEVERAGE_RATIO_IN_ETHER;
    const maxLeverageRatio = process.env.MAX_LEVERAGE_RATIO_IN_ETHER;

    // Create the wallet
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    try {
        await rebalance(
            vaultContractAddress,
            leveragedTokenAddress,
            minLeverageRatio,
            maxLeverageRatio,
            wallet
        );
    } catch (e) {
        console.error("Failed to run rebalance:", e);
        Sentry.captureException(e);
    }
});

process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Stopping cron job ...");
    task.stop();
    console.log("Cronjob stopped ...");
});
