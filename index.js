const express = require('express');
const app = express();
const {Router} = require('express');
const router = Router();
const Web3 = require('web3');
const abi = require('./abi.json'); //Contract ABI 
const benc = require('./byteencode.json');

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); //Binance tesnet smart chain

const contractAddress = '0x646C04b5484FA87398Abc57e725A716e304D3601';
let contract, owner;
app.set('port', 3000 );

async function main(){
    await app.listen(app.get('port'));
    console.log('Server on port: ', app.get('port'));
    contract = new web3.eth.Contract( abi, contractAddress ); 
    
    web3.eth.sendTransaction({
        from: web3.eth.accounts.wallet,
        to: '0x0B75fbeB0BC7CC0e9F9880f78a245046eCBDBB0D',
        value: '1000000000000000000',
        gas: 5000000,
        gasPrice: 18e9,
    }, function(err, transactionHash) {
      if (err) {
        console.log(err);
        } else {
        console.log(transactionHash);
       }
    });
}
/*
   export async function test(){
        try{
            console.log("paso por aqui");     
            await contract.methods.getOwner().call();
            console.log(owner);
        
        }catch(e){
            console.log(e.message)
        } 
    
    };*/

    main();
   
    app.get('/name', async (req, res)=>{
        try{
            await res.send(contract.methods.name().call() )
        }catch(e){
            console.log(e)
        }
      });
 
    app.get('/owner', async ()=>{
        try{
            await res.send(contract.methods.getOwner().call() )
        }catch(e){

        }
    });
       

    app.get('/totalSupply', async (req, res )=>{
        try{
            await res.send(
                contract.methods.totalSupply().call() 
                
                );
        }catch(e){

        }
    });


    app.get('/transfer', async (req, res) => {
        const {from, amount } = await req.body
        res.send( Transfer(from, amount) )
    });
       
    
    async function Transfer(from, amount){
        try{
            await res.send( contract.methods.transfer(from, amount).send({from: from })
                .on('transactionHash', function(hash){
                    console.log(hash)
                })
                .on('receipt', function(receipt){
                    console.log(receipt)
                })
                .on('confirmation', function(confirmationNumber, receipt){
                    console.log(confirmationNumber)
                })
                .on('error', function(error, receipt) {
                    console.log(error)
                })
            );
        }catch(e){

        }
    }





//Asyncronus function


