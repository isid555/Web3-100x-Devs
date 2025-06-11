"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abi_1 = require("./abi");
const ethers_1 = require("ethers");
const provider = new ethers_1.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/-rj1mfqdqwB4iBYlzUTBMLFir79YxHAi");
const PRIVATE_KEY = "fba7342ef6879df2c735644c734ea69c140f423d84eb2d53fbdfd53fd5d7c586";
const CONTRACT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
function getWallet() {
    const wallet = new ethers_1.Wallet(PRIVATE_KEY, provider);
    return wallet;
}
async function sendTxn(from, amount) {
    const wallet = getWallet();
    const contract = new ethers_1.Contract(CONTRACT_ADDRESS, abi_1.abi, wallet);
    const tx = await contract.depositedOnOppositeChain(from, amount);
    tx.wait();
}
async function pollBlock(blockNumber) {
    console.log("before logs");
    const logs = await provider.getLogs({
        address: CONTRACT_ADDRESS,
        fromBlock: blockNumber,
        toBlock: blockNumber,
        topics: [(0, ethers_1.id)("Deposit(address,uint256)")]
    });
    logs.forEach(async (log) => {
        const from = log.topics[1];
        const amount = log.topics[2];
        await sendTxn(from, amount);
    });
}
pollBlock(21493826).then(() => {
    console.log("Succuess");
}).catch((error) => {
    console.log(error);
});
