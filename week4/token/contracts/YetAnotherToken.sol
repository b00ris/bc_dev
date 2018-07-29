pragma solidity ^0.4.0;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract YetAnotherToken is StandardToken, DetailedERC20 {
    constructor(uint256 _totalSupply) public DetailedERC20("Yet another token", "YAT", 18){
        balances[msg.sender] = _totalSupply;
        totalSupply_ = _totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply_);
    }
}
