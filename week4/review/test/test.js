'use strict';


const VulnerableOne = artifacts.require('VulnerableOne.sol');


contract('VulnerableOne test', function (accounts) {
    it('test construction', async function () {
        const token = await VulnerableOne.new();
    });
    it('test set super user bu generic users', async function () {
        const token = await VulnerableOne.new({from: accounts[0]});
        token.add_new_user(accounts[1], {from: accounts[0]});
        token.set_super_user(accounts[1], {from: accounts[1]});

        assert(true == await token.isSuperUser(accounts[0]));
        assert(false == await token.isSuperUser(accounts[1]));
    });
});


