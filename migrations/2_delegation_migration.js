
const Delegate = artifacts.require("Delegate")
const Delegation = artifacts.require("Delegation")

module.exports = function(deployer) {
  
  deployer.deploy(Delegation, Delegate.address)
  
};


