const Crowdsale = artifacts.require('./CrowdsaleYAT.sol');
const YAT = artifacts.require('./YetAnotherToken.sol');

const rate = 1;
const totalSupply=ether(50);
module.exports = function(deployer) {
    deployer.deploy(YAT, totalSupply).then(function(){
        deployer.deploy(Crowdsale, rate, YAT.address, "0x6079C49fA011Aec079c73e6C25BF51ae31575b69").then(function () {
                YAT.deployed().then(function(instance) {
                    instance.transfer(Crowdsale.address, totalSupply*0.8);
                });
            }
        );
    });
};

function ether (n) {
    return new web3.BigNumber(web3.toWei(n, 'ether'));
}

