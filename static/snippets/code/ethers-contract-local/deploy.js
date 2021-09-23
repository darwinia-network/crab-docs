const ethers = require('ethers');
const contractFile = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: {
      name: 'development',
      rpc: 'http://localhost:9933',
      chainId: 43,
   },
   pangolin: {
      name: 'pangolin',
      rpc: 'http://pangolin-rpc.darwinia.network',
      chainId: 43,
   },
   crab: {
      name: 'crab',
      rpc: 'http://crab-rpc.darwinia.network',
      chainId: 44,
   },
};
const provider = new ethers.providers.StaticJsonRpcProvider(
   providerRPC.development.rpc,
   {
      chainId: providerRPC.development.chainId,
      name: providerRPC.development.name,
   }
); //Change to correct network

// Variables
const account_from = {
   privateKey: 'YOUR-PRIVATE-KEY-HERE',
};
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// Create Wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

/*
   -- Deploy Contract --
*/
// Create Contract Instance with Signer
const incrementer = new ethers.ContractFactory(abi, bytecode, wallet);

const deploy = async () => {
   console.log(`Attempting to deploy from account: ${wallet.address}`);

   // Send Tx (Initial Value set to 5) and Wait for Receipt
   const contract = await incrementer.deploy([5]);
   await contract.deployed();

   console.log(`Contract deployed at address: ${contract.address}`);
};

deploy();
