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
import {PRIVATE_KEY, PUBLIC_KEY , TOKEN_MINT_ADDRESS} from "./address.js";
import {
    amountToUiAmount,
    burn,
    createBurnCheckedInstruction, getAccount,
    getAssociatedTokenAddress,
    getOrCreateAssociatedTokenAccount
} from "@solana/spl-token";


const connection =  new Connection(clusterApiUrl('devnet') , 'confirmed')

const secretKey = bs58.decode(PRIVATE_KEY);
const payer = Keypair.fromSecretKey(secretKey);

export   async function burnToken(burnAmount){

        const mintAddress = new PublicKey(TOKEN_MINT_ADDRESS)

            burnAmount = burnAmount * 1000000000;

    const associatedTokenAccount = await getAssociatedTokenAddress(mintAddress, payer.publicKey);


    console.log(`🔹 Associated Token Account: ${associatedTokenAccount.toBase58()}`);

    const tokenAccount = await getAccount(connection, associatedTokenAccount);
    const tokenBalance = tokenAccount.amount;


    console.log(`✅ Token Balance: ${tokenBalance} (Raw Units)`);


    const transaction = new Transaction().add(
        createBurnCheckedInstruction(
            associatedTokenAccount,
            mintAddress,
            payer.publicKey,
            burnAmount,
            9
        )
    );

    const txnSignature = await sendAndConfirmTransaction(connection, transaction, [payer]);

    console.log(`🔥 Burned ${burnAmount} tokens successfully!`);
    console.log(`🔗 Transaction Signature: ${txnSignature}`);
    console.log(`🔍 View on Explorer: https://explorer.solana.com/tx/${txnSignature}?cluster=devnet`);






}

// await burnToken(1)

