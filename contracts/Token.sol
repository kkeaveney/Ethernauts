pragma solidity ^0.6.6;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Token {
    mapping(address => uint256) balances;
    uint256 public totalSupply;
    address public owner;

    constructor(uint256 _initialSupply) public {
        balances[msg.sender] = totalSupply = _initialSupply;
        owner = msg.sender;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balances[msg.sender] - _value >= 0);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }
}
