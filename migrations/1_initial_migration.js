const Migrations = artifacts.require("Migrations");
const Fallback = artifacts.require("Fallback")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Fallback, 10);
  
};
