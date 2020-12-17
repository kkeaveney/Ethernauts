const Migrations = artifacts.require("Migrations");
const Fallback = artifacts.require("Fallback")
const SendToFallback = artifacts.require("SendToFallback")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Fallback);
  deployer.deploy(SendToFallback);
};
