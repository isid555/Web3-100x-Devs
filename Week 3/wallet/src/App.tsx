import {generateMnemonic} from 'bip39'
import './App.css'
import {useState} from "react";
import {SolanaWallet} from "./Solana.tsx";
import {EthWallet} from "./Ethereum.tsx";


function App() {
  const [mnemonic, setMnemonic] = useState("");


    const handleGenerateMnemonic = () => {
        const mn = generateMnemonic();
        setMnemonic(mn);
        console.log(mn);
    };


  return (
    <>
<button onClick={handleGenerateMnemonic}>
Create Seed Pharse
</button>

     <div>
         {mnemonic}
     </div>


        <div>
            <SolanaWallet mnemonic={mnemonic}/>
            <EthWallet mnemonic={mnemonic}/>
        </div>


    </>
  )
}

export default App
