import { useReadContract } from 'wagmi'
import { contract } from './contract'

export function TotalBalance() {
    const { data, isLoading, error } = useReadContract({
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        abi: [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
        ],
        functionName: 'balanceOf',
        args: ["0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f"]
    })

    return (
        <div>
            Balance  - {JSON.stringify(data?.toString())}
        </div>
    )
}