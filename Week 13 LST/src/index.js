import express from 'express'
import {burnToken} from "./burnTokens.js";
import {mintTokenTo} from "./checkIfIcanMint.js"
import {transferSOL} from "./transferSOL.js";

import { LAMPORTS_PER_SOL, Connection, Keypair} from '@solana/web3.js';
import { PRIVATE_KEY, PUBLIC_KEY, TOKEN_MINT_ADDRESS } from './address.js';


const app = express();
app.use(express.json())

const connection = new Connection("https://api.devnet.solana.com/", "confirmed");

app.post("/getHsol" , async(req,res)=>{





        try{
            const amount = req.body.amount;
            const recipientAddress =req.body.recipientAddress;

          const response =   await  mintTokenTo(recipientAddress , amount)

                res.send({
                    response
                })

        }catch(error){
            console.log(error)
        }


}  )

app.listen(3000 , ()=>{
    console.log("Server is running");
})