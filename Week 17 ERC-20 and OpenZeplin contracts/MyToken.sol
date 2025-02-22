// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;


contract MyContract {

    address public owner;
    mapping (address => uint) balances;
    uint totalSupply;
    mapping ( address => mapping(address =>uint)) public allowances;


    constructor(){
        owner = msg.sender;
    }


    function approve(address sender , uint value) public returns(bool success){
        allowances[msg.sender][sender] = value;
        return true;
    }


    function transferfrom(address from , address to , uint value) public returns(bool success){
        uint allowance  = allowances[from][msg.sender];
        require(allowance >= value);
        uint balanceOfOwner = balances[from];
        require(balanceOfOwner >= value);
        balances[from] -= value;
        balances[to] += value;
        allowances[from][msg.sender] -= value;
        return  true;
    }




    function  mint(uint amount) public {
        require(owner == msg.sender);
        totalSupply += amount;
        balances[owner] += amount;
    }

    function  mintTo(address to , uint amount )   public {
        require(owner == msg.sender);
        totalSupply += amount;
        balances[to] += amount;
    }

    function transfer(address to , uint amount) public {

        uint exist = balances[msg.sender];
        require(exist >= amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;


    }

    function getTotalSupply() public view returns(uint) {
        return totalSupply;
    }













}