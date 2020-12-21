pragma solidity ^0.6.6;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Fallback {
    using SafeMath for uint256;
    mapping(address => uint256) public contributions;
    address payable public owner;

    constructor(uint256 contribution) public payable {
        owner = msg.sender;
        contributions[msg.sender] = contribution * (1 ether);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "caller is not the owner");
        _;
    }

    function contribute() public payable {
        require(msg.value < 0.001 ether);
        contributions[msg.sender] += msg.value;
        if (contributions[msg.sender] > contributions[owner]) {
            owner = msg.sender;
        }
    }

    function getContribution() public view returns (uint256) {
        return contributions[msg.sender];
    }

    function withdraw() public payable onlyOwner {
        owner.transfer((address(this)).balance);
    }

    function getBalance() public view returns (uint256) {
        return (address(this)).balance;
    }

    receive() external payable {
        require(msg.value > 0 && contributions[msg.sender] > 0);
        owner = msg.sender;
    }
}
