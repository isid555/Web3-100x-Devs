const crypto =  require('crypto')

// const input = "100xdevs"
//
// const hash = crypto.createHash('sha256').update(input).digest("hex");
// console.log(hash)


function findHashWithPrefix(prefix  ){
    let input = 0;
    while(true){
        // let inputStr = input.toString()
        // inputStr = str+inputStr;
        let inputStr = `harkirat => Raman | Rs 100 
    Ram => Ankit | Rs 10`
        let hash = crypto.createHash('sha256').update(inputStr).digest("hex")
        if(hash.startsWith(prefix)){
            return {input:inputStr , hash:hash}
        }
        else{
            input++;
        }
    }
}

let {input , hash } = findHashWithPrefix("00000"  )
console.log(input , hash)
