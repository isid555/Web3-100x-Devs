import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider , useAccount } from 'wagmi'
import { config } from './config'
import { Account } from './Account.tsx'
import { WalletOptions } from './wallet-options'
import {TotalBalance} from "./TotalBalance.tsx";
import {TotalSupply} from "./TotalSupply.tsx";
import {AllowUSDT} from "./AllowUSDT.tsx";

const queryClient = new QueryClient()

function ConnectWallet() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletOptions />
}


function App() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectWallet />
                <TotalBalance/>
                <TotalSupply/>
                <AllowUSDT/>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default App;