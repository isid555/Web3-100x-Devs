Cross-Contract Invocation (CCI) refers to the process where one smart contract interacts with or calls functions in another smart contract. This is a common technique in decentralized applications (dApps) to enable contracts to work together seamlessly.

Key Features of CCI
Enables Communication Between Contracts
CCI allows one contract to call functions in another contract. This is essential for building complex systems where multiple contracts need to cooperate.
Uses Interfaces for Interaction
To safely and effectively interact with another contract, the calling contract typically uses an interface. The interface defines the functions of the other contract it can call.
Modularity and Reusability
With CCI, you can build systems where different parts (contracts) are independent but can still communicate. This makes the system modular and easy to upgrade or reuse.
Payable and Non-Payable Interactions
CCI can involve transferring Ether between contracts using the payable keyword or just calling functions without transferring funds.


Example
Token Transfers: A contract calls the ERC-20 or ERC-721 token standard contract to transfer tokens or query balances.

Interface
Interface is like a set of rules or instructions that tells one smart contract how to interact with another. It defines the functions that can be called on a contract, but it doesn’t include the code or logic behind those functions.

Payable
A special type of function in a smart contract that allows it to accept Ether (ETH) when someone interacts with it.

