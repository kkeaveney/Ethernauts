
const Migrations = artifacts.require("Migrations");
const Fallback = artifacts.require("Fallback")

const settings = {
  contribution: 1000
}

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Fallback, settings.contribution);
  
};
