
const contractAddress = '0xA40D097d3C601798403caD0D9AFC018fadb2eE85';
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_fName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setInstructor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "age",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInstructor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const web3 = new Web3(Web3.currentProvider ||'https://data-seed-prebsc-1-s1.binance.org:8545');//Binance Smart Chain Testnet network

contract = new web3.eth.Contract( abi, contractAddress );

document.addEventListener('DOMContentLoaded', ()=>{
	async function test(){
		console.log('provider' + Web3.currentProvider )
        console.log('cuenta: '+ web3.eth.accounts.wallet)
	   
		await web3.eth.sendTransaction({
            from: web3.eth.accounts.wallet
        }, function(err, transactionHash) {
          if (err) {
            console.log(err);
            } else {
            console.log(transactionHash);
           }
		});
		
		console.log('account wallet ' + web3.eth.accounts.wallet);
	}

	document.getElementById('checkBalance').addEventListener('click', async function getbalances(e){
		e.preventDefault();
		let holder = document.querySelector('#balance').value;
		let balance = document.querySelector('.balancevalue');
		await web3.eth.getBalance(String(holder)).then( (res) =>{
			console.log(res);
			balance.innerHTML = ( ' ' + res + ' BNB');
		}); 

		
	});
	
	document.querySelector('#checkInstructor').addEventListener('click', async function instructor(e){
		e.preventDefault();
		contract.methods.getInstructor().call().then( ( res )=>{
			console.log(res);
			document.querySelector('.instruct').innerHTML = ( ' Name: ' + res[0] + ', Age: ' + res[1] )
		}) 
	})






})




/*
    */
   
    //getBalance('0xaF3D6A4EE567e89aa0Fa0770FCc8Ab3e65518096');

