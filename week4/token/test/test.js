'use strict';


const Crowdsale = artifacts.require('CrowdsaleYAT.sol');
const YAT = artifacts.require('YetAnotherToken.sol');

function ether (n) {
    return new web3.BigNumber(web3.toWei(n, 'ether'));
}

contract('YAT', function(accounts) {
    it('test construction', async function() {
        const rate = 1;
        const totalSupply=ether(5000);

        const token = await YAT.new(totalSupply, {from:accounts[1]});

        console.log((await token.balanceOf(accounts[1])).toString());

        const crowdsale = await Crowdsale.new(rate, token.address, accounts[2], {from:accounts[1]});
        console.log((await token.balanceOf(accounts[1])).toString());
        await token.transfer(crowdsale.address, totalSupply*0.8, {from:accounts[1]});
        console.log((await token.balanceOf(accounts[1])).toString());
        console.log((await token.balanceOf(crowdsale.address)).toString());


        console.log((await token.balanceOf(accounts[0])).toString());
        await crowdsale.send(ether(1), {from: accounts[0]});

        console.log((await token.balanceOf(accounts[0])).toString());
    });
});


