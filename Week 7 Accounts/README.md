## Key points

- Accounts can store up to 10MB of data, which can consist of either executable program code or program state.
    - Programs (smart contracts) are stateless accounts that store executable code.
    - Data accounts are created by programs to store and manage program state.
- Accounts require a rent deposit in SOL, proportional to the amount of data stored, which is fully refundable when the account is closed.
- Every account has a program `owner`. Only the program that owns an account can modify its data or deduct its lamport balance. However, anyone can increase the balance.
- Native programs are built-in programs included with the Solana runtime.
## AccountInfo

Accounts have a [max size of 10MB](https://github.com/solana-labs/solana/blob/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/sdk/program/src/system_instruction.rs#L85) (10 Mega Bytes) and the data stored on every account on Solana has the following structure known as the [AccountInfo](https://github.com/solana-labs/solana/blob/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/sdk/program/src/account_info.rs#L19).



# System program

Solana contains a small handful of native programs that are part of the validator implementation and provide various core functionalities for the network.

When developing custom programs on Solana, you will commonly interact with two native programs, the `System Program` and the `BPF Loader`.

## System program

By default, all new accounts are owned by the [System Program](https://github.com/solana-labs/solana/tree/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/system/src). The System Program performs several key tasks such as:

- [New Account Creation](https://github.com/solana-labs/solana/blob/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/system/src/system_processor.rs#L145): Only the System Program can create new accounts.
- [Space Allocation](https://github.com/solana-labs/solana/blob/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/system/src/system_processor.rs#L70): Sets the byte capacity for the data field of each account.
- [Assign Program Ownership](https://github.com/solana-labs/solana/blob/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/system/src/system_processor.rs#L112): Once the System Program creates an account, it can reassign the designated program owner to a different program account. This is how custom programs take ownership of new accounts created by the System Program.

On Solana, a `wallet` is simply an account owned by the System Program. The lamport balance of the wallet is the amount of SOL owned by the account.



# BPF Loader Program

The [BPF Loader](https://github.com/solana-labs/solana/tree/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/bpf_loader/src) is the program designated as the "owner" of all other programs on the network, excluding Native Programs. It is responsible for deploying, upgrading, and executing custom programs.

A program I deployed just before todays class - https://explorer.solana.com/address/8rpHNPsyEJQEJjC2waWvUXyvCkYghCZndACoXs9sNKZg?cluster=devnet


# Authority in solana programs

In Solana programs, `authorities` are entities or accounts that have the right to perform certain actions or make changes within the program.

For example

- Token mint authority - Can mint new tokens
    1. Token with mint auth - https://explorer.solana.com/address/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
    2. Token with No mint auth - https://explorer.solana.com/address/8FQvjBxFdR51wbZfQVaWbkjR2sNNxDLyabNePPmsyou9
- Token freeze authority - Can freeze tokens in an account

  Token with a freeze auth - https://explorer.solana.com/address/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v

- Upgrade authority - Can `upgrade` the code of a program.

  https://explorer.solana.com/address/8rpHNPsyEJQEJjC2waWvUXyvCkYghCZndACoXs9sNKZg?cluster=devnet

  ![Screenshot 2024-09-13 at 7.04.39 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/085e8ad8-528e-47d7-8922-a23dc4016453/bba392c1-fadc-4c03-ad60-8b68fb151e0d/Screenshot_2024-09-13_at_7.04.39_PM.png)



