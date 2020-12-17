pragma solidity ^0.5.11;

contract Fallback {
    address payable public owner;
    event Log(uint256 gas);

    constructor() public {
        owner = msg.sender;
    }

    function() external payable {
        // send & transfer forwards 2300 gas to this fallback function
        // call forwards all the gas
        emit Log(gasleft());
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

contract SendToFallback {
    function transferToFallback(address payable _to) public payable {
        _to.transfer(msg.value);
    }

    function callFallback(address payable _to) public payable {
        (bool sent, ) = _to.call.value(msg.value)("");
        require(sent, "Failed to send ether");
    }
}
