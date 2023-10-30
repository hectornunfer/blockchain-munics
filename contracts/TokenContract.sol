// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.18;

contract TokenContract {

    uint256 public tokenPrice = 5 ether;
    address public owner;

    struct Receivers {
        string name;
        uint256 tokens;
    }

    mapping(address => Receivers) public users;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    event TokensPurchased(address indexed buyer, uint256 amount);
    
    constructor() {
        owner = msg.sender;
        users[owner].tokens = 100;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function double(uint _value) public pure returns (uint) {
        return _value * 2;
    }

    function register(string memory _name) public {
        users[msg.sender].name = _name;
    }

    function giveToken(address _receiver, uint256 _amount) public onlyOwner {
        require(users[owner].tokens >= _amount);
        users[owner].tokens -= _amount;
        users[_receiver].tokens += _amount;
    }

    function buyTokens(uint256 _amount) public payable {
        uint256 totalCost = _amount * tokenPrice;
        require(msg.value >= totalCost, "Cantidad de Ether insuficiente para comprar tokens");
        require(users[owner].tokens >= _amount, "No hay suficientes tokens disponibles para la compra");

        giveToken(msg.sender, _amount);

        emit TokensPurchased(msg.sender, _amount);
    }
}
