import rebalance from "./rebalance";
import dotenv from "dotenv";
import { ethers } from "ethers";

// Load environment variables
dotenv.config();

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

rebalance(
    vaultContractAddress,
    leveragedTokenAddress,
    minLeverageRatio,
    maxLeverageRatio,
    wallet
);
