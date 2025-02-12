require('dotenv').config();  // Make sure to load environment variables from .env file
const { Connection, Keypair, VersionedTransaction } = require('@solana/web3.js');
const axios = require('axios');
const { Wallet } = require('@project-serum/anchor');
const bs58 = require('bs58'); // Correct import of bs58

// Connect to Solana Devnet
const connection = new Connection('https://api.devnet.solana.com');

// Load Private Key from Environment Variable (ensure your private key is in Base58 format in .env file)
const privateKey = bs58.decode(process.env.PRIVATE_KEY);
const wallet = new Wallet(Keypair.fromSecretKey(privateKey));

async function main() {
    try {
        // Get a quote from Jupiter for swapping Devnet SOL → Devnet USDC
        const response = await axios.get('https://quote-api.jup.ag/v6/quote', {
            params: {
                inputMint: 'So11111111111111111111111111111111111111112', // SOL (Devnet)
                outputMint: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU', // Devnet USDC
                amount: 100000000, // 0.1 SOL in lamports (1 SOL = 1B lamports)
                slippageBps: 50, // 0.5% slippage
            }
        });

        const quoteResponse = response.data;
        console.log("Quote Response:", quoteResponse);

        // Request a swap transaction from Jupiter
        const { data: { swapTransaction } } = await axios.post('https://quote-api.jup.ag/v6/swap', {
            quoteResponse,
            userPublicKey: wallet.publicKey.toString(),
        });

        console.log("Swap Transaction Received");

        // Decode and deserialize transaction
        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
        const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
        console.log("Deserialized Transaction:", transaction);

        // Sign transaction with wallet's private key
        transaction.sign([wallet.payer]);

        // Fetch latest blockhash to include in the transaction
        const latestBlockHash = await connection.getLatestBlockhash();

        // Send the transaction
        const rawTransaction = transaction.serialize();
        const txid = await connection.sendRawTransaction(rawTransaction, {
            skipPreflight: true,
            maxRetries: 2
        });

        // Confirm the transaction on Devnet
        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: txid
        });

        console.log(`Transaction Successful! View on Devnet Explorer: https://solscan.io/tx/${txid}?cluster=devnet`);

    } catch (error) {
        console.error("Error:", error);
    }
}

main();
