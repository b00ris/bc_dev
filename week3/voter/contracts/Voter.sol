pragma solidity ^0.4.0;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract Voter is StandardToken {
    string public name = "VOTER COIN";
    string public symbol = "VOC";
    uint8 public decimals = 18;

    Proposal[] public  proposals;

    struct Proposal {
        string Description;
        address Owner;
        address[] VotedAddresses;
        mapping(address => uint) Votes;
    }

    constructor() public
    {
        balances[msg.sender] = 1000 ether;
        totalSupply_ = balances[msg.sender];
        emit Transfer(address(0), msg.sender, totalSupply_);
    }

    function createProposal(string _description) public {
        proposals.push(Proposal({
            Description : _description,
            Owner : msg.sender,
            VotedAddresses : new address[](0)
            }));
        proposals[0].VotedAddresses.push(msg.sender);
    }

    function voteProposal(uint _proposal, uint _vote) public checkVoted(_proposal) checkVoteType(_vote) {
        Proposal storage p = proposals[_proposal];
        p.Votes[msg.sender] = _vote;
        p.VotedAddresses.push(msg.sender);
    }

    modifier checkVoted(uint _proposal) {
        Proposal storage p = proposals[_proposal];
        require(p.Votes[msg.sender] == 0, "already voted");
        _;
    }

    modifier checkVoteType(uint vote) {
        require(vote == 1 || vote == 2, "incorrect vote");
        _;
    }

    function numOfVotes(uint _proposal) public view returns (uint) {
        Proposal storage p = proposals[_proposal];
        return p.VotedAddresses.length;
    }

    function resultSum(uint _proposal) public view returns (uint) {
        uint first;
        uint second;
        (first, second) = calculateSum(_proposal);
        return calculate(first, second);
    }
    function resultNum(uint _proposal) public view returns (uint) {
        uint first;
        uint second;

        (first, second) = calculateNum(_proposal);
        return calculate(first, second);
    }

    function calculateSum(uint _proposal) public view returns (uint, uint) {
        Proposal storage p = proposals[_proposal];
        uint first = 0;
        uint second = 0;
        require(p.VotedAddresses.length > 0);

        for (uint i = 0; i < p.VotedAddresses.length; i++) {
            if (p.Votes[p.VotedAddresses[i]] == 1) {
                first += balances[p.VotedAddresses[i]];
            }
            if (p.Votes[p.VotedAddresses[i]] == 2) {
                second += balances[p.VotedAddresses[i]];
            }
        }
        return (first, second);
    }

    function calculateNum(uint _proposal) public view returns (uint, uint) {
        Proposal storage p = proposals[_proposal];
        uint first = 0;
        uint second = 0;
        require(p.VotedAddresses.length > 0);
        for (uint i = 0; i < p.VotedAddresses.length; i++) {
            if (p.Votes[p.VotedAddresses[i]] == 1) {
                first++;
            }
            if (p.Votes[p.VotedAddresses[i]] == 2) {
                second++;
            }
        }
        return (first, second);
    }

    function calculate(uint first, uint second) pure private returns (uint) {
        if (first > second) {
            return 1;
        }
        if (first < second) {
            return 2;
        }
        return 0;
    }
}