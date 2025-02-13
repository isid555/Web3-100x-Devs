import { useState } from 'react'
import {createPublicClient , http} from "viem"
import {mainnet , sepolia} from "viem/chains";

//Tanstack
import  {useQuery , useQueryClient , QueryClient , QueryClientProvider } from "@tanstack/react-query";


import './App.css'
async  function getBalance(){
    const client = createPublicClient({
        chain:sepolia,
        transport:http()
    });
    const address = "0x654778D430373edc566926313449E41C6531C29E"
    const balance = await client.getBalance({
        address:"0x654778D430373edc566926313449E41C6531C29E"
    })

    console.log(balance)
    return balance.toString();

}

const queryClient = new QueryClient();

function App() {


    return (


        <>
            <QueryClientProvider client={queryClient}>
                <Todo/>
            </QueryClientProvider>

        </>
    )
}


function Todo(){
    // Queries

    const query = useQuery({queryKey:['balance'] , queryFn:getBalance , refetchInterval:3*1000})


    return(
        <div>
            Balance :
            {query.data}
        </div>
    )
}

export default App
