Custom Tokens
Custom tokens are any tokens other than the native cryptocurrency (like ETH on the Ethereum blockchain). They are built using the blockchain’s standards (like ERC-20 or ERC-721 for Ethereum) and represent unique digital assets.


EOA (Externally Owned Account):
This is your wallet address.
It doesn’t directly store custom token balances; instead, it interacts with the smart contract.
Smart Contract Address:
Stores:
Native Balance: If someone sends ETH to the contract.
Storage: The ledger for custom token balances. For example, if 10 USDC belongs to your wallet, this is recorded here.
Code: The rules or functions of the custom token (e.g., transfer, mint, burn).

Why Is This Important?
Custom token balances are not directly stored in your wallet. Instead:
Your wallet queries the smart contract’s storage to display your token balance.
This structure allows tokens to have unique rules and functionality, managed by their respective smart contracts.


What is an Allowance?
It allows a token holder to give permission to another address (like a smart contract or person) to spend a specified amount of their tokens on their behalf.

