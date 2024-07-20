// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract sendHelp{
    struct Memo{
        string name;
        string message;
        address from;
        uint256 timestamp;
    }

    address payable owner;
    Memo[] memo;

    constructor(){
        owner = payable(msg.sender);
    }

    function sendHelpp(string memory name, string memory message)public payable  {
        require(msg.value > 0,"Please send amount more than 0");
        owner.transfer(msg.value);
        memo.push(Memo(name,message,msg.sender,block.timestamp));
    }

    function getMemo() public view returns(Memo[] memory) {
        return memo;
    }

    function getContactBal() public view returns (uint){
        uint bal = address(owner).balance;
        return bal;
    }
}