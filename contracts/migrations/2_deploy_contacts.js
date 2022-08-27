const Contracts = artifacts.require('./Contracts.sol')

module.exports = function (deployer) {
  deployer.deploy(Contracts)
}
