const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9933',
   pangolin: 'https://pangolin-rpc.darwinia.network',
   crab: 'https://crab-rpc.darwinia.network',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const contractAddress = 'CONTRACT-ADDRESS-HERE';

/*
   -- Call Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

const get = async () => {
   console.log(`Making a call to contract at address: ${contractAddress}`);

   // Call Contract
   const data = await incrementer.methods.number().call();

   console.log(`The current number stored is: ${data}`);
};

get();
