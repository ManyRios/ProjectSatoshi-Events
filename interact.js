//Initialize web3 and connect to metamask and takes the provider. Int his case we're using testnet or 'https://data-seed-prebsc-1-s1.binance.org:8545' 
web3 = new Web3(web3.currentProvider);   

    //This is the abi of the Smart Contract, taken from the compiled contract in remix
    let abi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "Sent",
		"type": "event"
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
	},
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
	}
]
 
 //Contract Address taken from deployed contract in remix
 const contractAddress = '0x8b3f69fA9ccD963AC0564f8afAd76585B23e3Ef4';
    
//Initialize the contract with the ABI and contract address information 
 contract = new web3.eth.Contract( abi, contractAddress );

//When the DOM load all the elemtens this functions start 
document.addEventListener('DOMContentLoaded', async ()=>{
 
	//returns array of address in metamask wallet
   
    let accounts = await web3.eth.getAccounts();
  
  //Set userAccount to first Address in our metamask wallet 
    let userAccount = accounts[0];
  

  //This shows in console the user account of the owner
  console.log(userAccount, 'user account');
  
  //function for check the balance of an address on BSC
	const checkBalance = async (e)=>{	
    let holder = document.querySelector('#balance').value; //it takes the address pasted by the user
		let balance = document.querySelector('.balancevalue');//will show in a label the amount of the balance
 
		await web3.eth.getBalance(holder).then( (res) =>{
			console.log(res, ' this is the balance');
			balance.innerHTML = ( res +  ' BNB'); 
		});	
	};
  
  	//when the user makes a click in the button the function will return the values
	const instructor = async (e)=>{
	 
		let res = await contract.methods.getInstructor().call()
			console.log(res);
    //Set in html label the values of name and age, they cames as an array, then we ask for them in res[0] and res[1] positions
			document.querySelector('.instruct').innerHTML = ( ' Name: '+ res[0]+ ', Age: '+ res[1] ) 
		
	}
  
  //Set values to the smart contract to the variables name and age of the instructor 
  const setInstructor = async (e)=>{
      //declare variable name from a element of the html
      let name = document.querySelector('#name').value;
    //declare variable age from a element of the html
      let age = document.querySelector('#age').value;
      console.log(name, ' ', age);
     //Send the variables values declared before to our smart contract function setInstructor
      let receiver = await contract.methods.setInstructor(name,age).send({from:        userAccount});
    //declare a variable from an html element to show the result in there
      let hash = document.querySelector('#hash')
      //set the attribute for hash,  to show watch the txhash on bscscan
      hash.setAttribute('href', "https://testnet.bscscan.com/tx/" + receiver.transactionHash)
     // show the txhash on the html
      hash.innerHTML = ' ' + receiver.transactionHash
      console.log(receiver.transactionHash, ' txt');
  }
  
  //This event, listen for any click in the DOM 
  document.addEventListener('click', async (e) =>{
    e.preventDefault(); //prevent the default refresh of the browser when the user makes a click
    //variable to take the name of the clicked element, to do an action depending of its property name
    let target = e.path[0].name;
    console.log(target, " target");
    //here we compare each name of the clicked element
   if(target === "checkBalance"){
      checkBalance();//call the function checkBalance if the name of the clicked element is equal to "checkBalance"
    }else if(target === "checkInstructor"){
      instructor();//call the function instructor if the name of the clicked element is equal to "instructor"
    }else if(target === "setValues"){
      setInstructor();//call the function setInstructor if the name of the clicked element is equal to "setInstructor"
    } 
  })
  
  
 });
 
		
	

 


    
    
