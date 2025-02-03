import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletDisconnectButton, WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {RequestAirdrop} from "./RequestAirDrop.jsx";
import {ShowSolBalance} from "./ShowSolBalance.jsx";
import {SignMessage} from "./SignMessage(.jsx";
import {SendTokens} from "./SendTokens.jsx";


function App() {


  return (
    <>
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"} >
      <WalletProvider wallets={[]} autoConnect >
        <WalletModalProvider >
          <WalletMultiButton/>
          <WalletDisconnectButton/>
          <div>
            Hi world
            <RequestAirdrop/>
            <ShowSolBalance/>
            <SignMessage/>
            <SendTokens/>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </>
  )
}

export default App
