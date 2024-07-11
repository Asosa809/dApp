pragma solidity ^0.8.0;

contract TresFinance {
    struct Transaction {
        uint id;
        string description;
        uint amount;
        uint timestamp;
    }

    mapping(address => Transaction[]) public transactions;
    uint public nextId;

    function addTransaction(string memory description, uint amount) public {
        transactions[msg.sender].push(Transaction(nextId, description, amount, block.timestamp));
        nextId++;
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions[msg.sender];
    }
}
