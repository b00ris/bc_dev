pragma solidity ^0.4.0;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "./YetAnotherToken.sol";

contract CrowdsaleYAT is Crowdsale {
    constructor(uint256 _rate, YetAnotherToken _token, address _wallet) public Crowdsale(_rate, _wallet, _token){

    }
}
