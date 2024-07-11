# Decentralized App

## Overview
dApp is a decentralized application that allows users to record and manage financial transactions on the Ethereum blockchain. The project leverages Solidity for smart contract development, React.js for the frontend, and Web3.js for blockchain interactions.

## Features
- Record financial transactions with descriptions and amounts.
- Connect MetaMask wallet for seamless blockchain interactions.
- Light and dark mode UI for enhanced user experience.
- Secure and immutable transaction records on the Ethereum blockchain.

## Technologies Used
- **Solidity**: For writing and deploying smart contracts.
- **React.js**: For building a responsive and dynamic frontend.
- **Web3.js**: For interacting with the Ethereum blockchain.
- **Truffle**: For smart contract development and testing.
- **Ganache**: For local blockchain development and testing.
- **MetaMask**: For Ethereum wallet integration.
- **Bootstrap**: For responsive and consistent styling.

## Installation

### Prerequisites
- Node.js and npm
- Truffle
- Ganache
- MetaMask extension in your browser

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/dApp.git
   cd Tres-dApp/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile and deploy the smart contracts:
   ```bash
   truffle migrate --network development --reset
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Usage
1. Make sure Ganache is running:
   ```bash
   ganache
   ```
2. Open your browser and navigate to:
   ```bash
   http://localhost:3000
   ```
3. Connect your MetaMask wallet and start adding transactions.

## Contributing
Contributions are welcome! Please create an issue or submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.