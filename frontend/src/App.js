import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import TresFinance from './abis/TresFinance.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadBlockchainData = async () => {
            try {
                if (window.ethereum) {
                    window.web3 = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                } else if (window.web3) {
                    window.web3 = new Web3(window.web3.currentProvider);
                } else {
                    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
                    return;
                }

                const web3 = window.web3;
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                console.log("Account:", accounts[0]);

                const networkId = await web3.eth.net.getId();
                console.log("Network ID:", networkId);

                const networkData = TresFinance.networks[networkId];
                console.log("Network Data:", networkData);

                if (networkData) {
                    const contract = new web3.eth.Contract(TresFinance.abi, networkData.address);
                    setContract(contract);
                    const transactions = await contract.methods.getTransactions().call({ from: accounts[0] });
                    setTransactions(transactions);
                    console.log("Contract:", contract);
                    console.log("Transactions:", transactions);
                } else {
                    alert('Smart contract not deployed to detected network.');
                }
            } catch (error) {
                console.error("Error loading blockchain data:", error);
            }
        };
        loadBlockchainData();
    }, []);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : '';
    }, [darkMode]);

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3 = window.web3;
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
            } catch (error) {
                console.error('User denied account access:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install MetaMask and try again.');
        }
    };

    const addTransaction = async () => {
        if (!description || amount <= 0) {
            setMessage('Please enter a valid description and amount greater than 0.');
            return;
        }
        try {
            console.log('Sending transaction:', description, amount);
            const receipt = await contract.methods.addTransaction(description, amount).send({ from: account, gas: 200000 });
            const transactions = await contract.methods.getTransactions().call({ from: account });
            setTransactions(transactions.map((tx, index) => ({
                ...tx,
                hash: receipt.transactionHash,
                gasUsed: receipt.gasUsed
            })));
            setDescription('');
            setAmount(0);
            setMessage('Transaction added successfully!');
        } catch (error) {
            console.error('Error adding transaction:', error);
            setMessage('Error adding transaction. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Decentralized App</h1>
                <FontAwesomeIcon
                    icon={darkMode ? faSun : faMoon}
                    className="toggle-button"
                    onClick={() => setDarkMode(!darkMode)}
                />
            </div>
            <button className="btn btn-secondary mb-3" onClick={connectMetaMask}>
                Connect MetaMask
            </button>
            <p>Account: {account}</p>
            {message && <p className="text-danger">{message}</p>}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                />
                <button className="btn btn-primary mt-3" onClick={addTransaction}>Add Transaction</button>
            </div>
            <ul className="list-group transaction-list">
                {transactions.map((tx, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{tx.description}</span>
                        <span>{Number(tx.amount).toString()}</span>
                        <span>{new Date(Number(tx.timestamp) * 1000).toLocaleString()}</span>
                        <span>Hash: {tx.hash}</span>
                        <span>Gas: {tx.gasUsed}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
