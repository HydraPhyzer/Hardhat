// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract Token{
    string public name = "My Hardhat Token";
    string public symbol = "MHT";
    uint public Supply = 1000;
    address public Manager;
    
    mapping(address => uint) public Balances;
    constructor(){
        console.log(">> My Address Is %s", address(this));
        
        Manager = msg.sender;
        Balances[msg.sender]=Supply;
    }
    function Transfer(address To,uint Amount) external {
        require(Balances[msg.sender] >= Amount,"Not Enough Balance");

        console.log(">> Transferring %s Amount to %s", Amount , To);

        Balances[msg.sender] -= Amount;
        Balances[To] += Amount;
    }
    function Balance(address Of) external view returns(uint){
        return Balances[Of];
    }

}