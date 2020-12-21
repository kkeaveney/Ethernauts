
const Migrations = artifacts.require("Migrations");
//const Fallback = artifacts.require("Fallback")
const Fallout = artifacts.require("Fallout")

const settings = {
  contribution: 100000000000000
}

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  //deployer.deploy(Fallback, settings.contribution);
  deployer.deploy(Fallout)
  
};
