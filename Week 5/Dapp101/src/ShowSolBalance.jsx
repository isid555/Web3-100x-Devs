import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {isWalletAdapterCompatibleStandardWallet} from "@solana/wallet-adapter-base";



export function ShowSolBalance() {
    const {connection}  = useConnection();
    const wallet  = useWallet();


    async  function getBalance(){
        if(wallet.publicKey){
            const balance= await connection.getBalance(wallet.publicKey)

            document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;
        }
    }

    getBalance();


    return (

            <div>
                SOL Balance in testnet is
                <br></br>
                <span id={"balance"}> </span>
            </div>

    )


}