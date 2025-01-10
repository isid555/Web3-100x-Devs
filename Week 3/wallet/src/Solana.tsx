import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    const addWallet = async () => {
        try {
            // Convert mnemonic to seed buffer
            const seedBuffer = await mnemonicToSeed(mnemonic);

            // Derive the key from the seed using the specified path
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seedBuffer.toString("hex")).key;

            // Generate a keypair from the derived seed
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);

            // Update state with the new public key
            setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
            setCurrentIndex(currentIndex + 1);
        } catch (error) {
            console.error("Error adding wallet:", error);
        }
    };

    return (
        <div>
            <button onClick={addWallet}>
                Add Wallet
            </button>
            {publicKeys.map((p, index) => (
                <div key={index}>
                  SOL -   {p}
                </div>
            ))}
        </div>
    );
}
