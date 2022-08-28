const Tododapp = artifacts.require('./Tododapp.sol')

module.exports = function (deployer) {
  deployer.deploy(Tododapp)
}
