import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";

/*- `@solana/web3.js` provides you with a `requestAirdrop` function.
- You can get the `current users` public key using the `useWallet` hook */

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    async function requestAirdrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }

    return <div>
        <br/><br/>


        {wallet.connected ? <p>
            Your wallet's public key is {wallet.publicKey.toString()}
        </p> :
        <p>Please connect your wallet</p>}


        <input id="amount" type="text" placeholder="Amount" />
        <button onClick={requestAirdrop}>Request Airdrop</button>
    </div>
}