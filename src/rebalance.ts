import { Contract, Wallet, BigNumber, utils } from "ethers";

const RISE_TOKEN_VAULT_INTERFACE = new utils.Interface([
    // Read only
    "function getLeverageRatioInEther(address leveragedToken) external view returns (uint256)",

    // Write
    "function rebalance(address leveragedToken) external",
]);

// Rebalance the leveraged token
async function rebalance(
    vaultContractAddress: string,
    leveragedTokenAddress: string,
    minLeverageRatio: string,
    maxLeverageRatio: string,
    wallet: Wallet
): Promise<void> {
    // Initialize the contract
    const riseTokenVaultContract = new Contract(
        vaultContractAddress,
        RISE_TOKEN_VAULT_INTERFACE,
        wallet
    );

    // Get current leverage ratio
    const currentLeverageRatio: BigNumber =
        await riseTokenVaultContract.getLeverageRatioInEther(
            leveragedTokenAddress
        );

    // Convert string to BigNumber
    const min = BigNumber.from(minLeverageRatio);
    const max = BigNumber.from(maxLeverageRatio);

    if (currentLeverageRatio.lt(min) || currentLeverageRatio.gt(max)) {
        console.log("Rebalancing ...");
        const rebalanceTx = await riseTokenVaultContract.rebalance(
            leveragedTokenAddress
        );
        console.log("rebalanceTx hash", rebalanceTx.hash);
        await rebalanceTx.wait();
        console.log("Rebalancing ...DONE");
    } else {
        console.log("No Rebalance");
    }
}

export default rebalance;
