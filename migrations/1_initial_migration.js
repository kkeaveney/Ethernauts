
const Migrations = artifacts.require("Migrations");
const Fallback = artifacts.require("Fallback")

const settings = {
  contribution: 100000000000000
}

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Fallback, settings.contribution);
  
};
