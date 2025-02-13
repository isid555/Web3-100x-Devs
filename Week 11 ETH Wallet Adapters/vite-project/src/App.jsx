import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import {WalletOptions} from "./WalletOptions.jsx";
import {Account} from "./Account.jsx";
import {SendTransaction} from "./SendTransaction.jsx";


const queryClient = new QueryClient()

function App() {
  return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletOptions/>
            <Account/>
            <SendTransaction/>
        </QueryClientProvider>
      </WagmiProvider>
  )
}


export default App;