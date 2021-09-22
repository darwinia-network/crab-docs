const ethers = require('ethers');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: {
      name: 'development',
      rpc: 'http://localhost:9933',
      chainId: 42,
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
const contractAddress = 'CONTRACT-ADDRESS-HERE';

// Create Wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

/*
   -- Send Function --
*/
// Create Contract Instance with Signer
const incrementer = new ethers.Contract(contractAddress, abi, wallet);
const reset = async () => {
   console.log(
      `Calling the reset function in contract at address: ${contractAddress}`
   );

   // Sign-Send Tx and Wait for Receipt
   const createReceipt = await incrementer.reset();
   await createReceipt.wait();

   console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

reset();
