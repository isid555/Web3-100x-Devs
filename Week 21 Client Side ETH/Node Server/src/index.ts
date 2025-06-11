import { abi } from "./abi";
import { Contract, JsonRpcProvider, Wallet, id } from "ethers";

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/-rj1mfqdqwB4iBYlzUTBMLFir79YxHAi");

const PRIVATE_KEY = "fba7342ef6879df2c735644c734ea69c140f423d84eb2d53fbdfd53fd5d7c586";
const CONTRACT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";

function getWallet() {
    const wallet = new Wallet(PRIVATE_KEY, provider);
    return wallet;
}



async function sendTxn(from: string, amount: string) {
    const wallet = getWallet();
    const contract = new Contract(CONTRACT_ADDRESS, abi, wallet);
    const tx = await contract.depositedOnOppositeChain(from, amount);
    tx.wait();
}



async function pollBlock(blockNumber: number) {
    console.log("before logs")
    const logs = await provider.getLogs({
        address: CONTRACT_ADDRESS,
        fromBlock: blockNumber,
        toBlock: blockNumber,
        topics: [id("Deposit(address,uint256)")]
    });

    logs.forEach(async log => {
        const from = log.topics[1];
        const amount = log.topics[2];
        await sendTxn(from, amount);
    });
}



 pollBlock(21493826).then(() =>{
     console.log("Succuess")
 }).catch((error) =>{
     console.log(error);
 })







