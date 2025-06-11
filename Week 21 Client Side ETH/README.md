## `useReadContract 

 [**`useReadContract` Hook**](https://wagmi.sh/react/api/hooks/useReadContract) allows you to read data on a smart contract, from a `view` or `pure` (read-only) function. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.


The useWriteContract Hook allows you to mutate data on a smart contract, from a payable or nonpayable (write) function. These types of functions require gas to be executed, hence a transaction is broadcasted in order to change the state.

