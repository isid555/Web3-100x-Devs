import {Connection, Keypair, PublicKey} from "@solana/web3.js";
import dotenv from "dotenv";
import {PRIVATE_KEY ,PUBLIC_KEY , TOKEN_MINT_ADDRESS} from "./address.js"
import {createAssociatedTokenAccount, getOrCreateAssociatedTokenAccount, mintTo} from "@solana/spl-token";
dotenv.config();
import bs58 from "bs58";

const RPC_URL = "https://api.devnet.solana.com"

const connection  = new Connection(RPC_URL , 'confirmed')

const secretKey = bs58.decode(PRIVATE_KEY);
const payer = Keypair.fromSecretKey(secretKey);

 export  async function mintTokenTo(recipientAddress, amount){
    try{
        const mint = new PublicKey(TOKEN_MINT_ADDRESS);
        const recipient = new PublicKey(recipientAddress);


        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            recipient
        )

        console.log(`Recipient's token account: ${tokenAccount.address.toBase58()}`);


        const signature = await  mintTo(
            connection,
            payer,
            mint,
            tokenAccount.address,
            payer,
            amount
        );

        console.log(`Minted ${amount} tokens to ${recipientAddress}`);
        console.log(`Transaction Signature: ${signature}`);

    }catch (error){
        console.log(error)
    }
}



// // Example usage
// const recipientAddress = "Etf7PWQDoTNGfTGfzTy8cvoyaiYYquqWS24JgDy8LF9w";
// const tokenMintAddress = "2XmvKCDCisQD4KbyEJ2r2VRYEFtxREKXnX1PpavVBMw2";
// const amount = 100 * 10 ** 6;
//
// // await createTokenAccount(recipientAddress, tokenMintAddress);
// await mintTokenTo(recipientAddress, tokenMintAddress, amount);


