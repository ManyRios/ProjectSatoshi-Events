pragma solidity ^0.5.16; //compiler version

contract testevent{
    
//declare public variables to interact with our contract   
    
   string public fName;
   uint public age;
 
   
   //constructor to initialize the variables
   constructor()public {
       fName = "Manuel";
       age = 31;
   }
   
   //declare a event to send feeds to frontend
    event Sent(address sender, string name, uint _age);
   
   //function to set new values to our variables 
   function setInstructor(string memory _fName, uint _age) public {
       fName = _fName;
       age = _age;
       
       //emit keyword to use the event and their parameters in order 
       emit Sent(msg.sender, fName, _age);
   }
   
   //function to get the values of the variables in our contract
   function getInstructor() public view returns (string memory, uint) {
       return (fName, age);
   }
    
    
}
