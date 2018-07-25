'use strict';


const Voter = artifacts.require('Voter.sol');


contract('Voter', function(accounts) {

    it('test construction', async function() {
        const token = await Voter.new();
    });

    it('test proposal create', async function() {
        const token = await Voter.new();

        await token.createProposal("some test", {from: accounts[0]});
        await token.proposals(0);

    });

    it('test proposal create', async function() {
        const token = await Voter.new();

        try {
            await token.proposals(0);
        } catch (e) {
            return true;
        }
        throw new Error("I should never see this!")
    });

    it('test proposal vote calculate by num', async function() {
        const token = await Voter.new();

        await token.createProposal("some test", {from: accounts[0]});

        await token.voteProposal(0, 1, {from:accounts[1]});
        assert("1"===(await token.resultNum(0)).toString());
        await token.voteProposal(0, 2, {from:accounts[2]});
        await token.voteProposal(0, 2, {from:accounts[3]});
        assert("2"===(await token.resultNum(0)).toString());
    });

    it('test proposal vote vithout votes', async function() {
        const token = await Voter.new();

        await token.createProposal("some test", {from: accounts[0]});
        assert("0"===(await token.resultNum(0)).toString());
    });

    it('test balanced proposal vote', async function() {
        const token = await Voter.new({from: accounts[0]});

        await token.createProposal("some test", {from: accounts[0]});
        await token.createProposal("some test", {from: accounts[0]});

        await token.voteProposal(1, 1, {from:accounts[1]});
        await token.voteProposal(1, 2, {from:accounts[2]});
        await token.voteProposal(1, 1, {from:accounts[3]});
        await token.voteProposal(1, 2, {from:accounts[4]});

        assert("0"===(await token.resultSum(1)).toString());
        await token.transfer(accounts[1], 1000, {from: accounts[0]});
        assert("1"===(await token.resultSum(1)).toString());
        await token.transfer(accounts[2], 1001, {from: accounts[0]});
        assert("2"===(await token.resultSum(1)).toString());

        await token.transfer(accounts[3], 50, {from: accounts[0]});
        assert("1"===(await token.resultSum(1)).toString());

        await token.transfer(accounts[4], 100, {from: accounts[0]});
        assert("2"===(await token.resultSum(1)).toString());
    });

    it('test balanced proposal vote', async function() {
        const token = await Voter.new({from: accounts[0]});

        await token.createProposal("some test", {from: accounts[0]});

        await token.voteProposal(0, 1, {from:accounts[1]});
        await token.voteProposal(0, 2, {from:accounts[2]});


        let [first,second]=(await token.calculateSum(0));
        assert("0"===first.toString());
        assert("0"===second.toString());

        await token.transfer(accounts[1], 1000, {from: accounts[0]});
        [first,second]=(await token.calculateSum(0));
        assert("1000"===first.toString());
        assert("0"===second.toString());

        await token.transfer(accounts[2], 1001, {from: accounts[0]});
        [first,second]=(await token.calculateSum(0));

        assert("1000"===first.toString());
        assert("1001"===second.toString());
    });
});


