import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey, sendAndConfirmTransaction,
    SystemProgram,
    Transaction
} from "@solana/web3.js";
import bs58 from "bs58";
import {PRIVATE_KEY, PUBLIC_KEY} from "./address.js";


const connection =  new Connection(clusterApiUrl('devnet') , 'confirmed')

const secretKey = bs58.decode(PRIVATE_KEY);
const payer = Keypair.fromSecretKey(secretKey);


 export async function transferSOL(recipientAddress, amount){



    try{


        const to  = new PublicKey(recipientAddress);
        const amountInLamports = amount * LAMPORTS_PER_SOL;


        const transaction = new Transaction().add(
            SystemProgram.transfer(
                {
                    fromPubkey:payer.publicKey,
                    toPubkey:to,
                    lamports:amountInLamports
                }

            )
        )

        const signature = await sendAndConfirmTransaction(connection , transaction, [payer])

        console.log(`✅ Successfully transferred ${amount} SOL to ${recipientAddress}`);
        console.log(`Transaction Signature: ${signature}`);



    }catch(error){
        console.log(error)
    }


}

// const recipientAddress = "Etf7PWQDoTNGfTGfzTy8cvoyaiYYquqWS24JgDy8LF9w";
// const amount = 0.01;
//
// await  transferSOL(recipientAddress, amount);