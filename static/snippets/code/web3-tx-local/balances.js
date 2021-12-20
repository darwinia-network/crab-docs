const Web3 = require('web3');

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
const addressFrom = 'ADDRESS-FROM-HERE';
const addressTo = 'ADDRESS-TO-HERE';

/*
   -- Balance Call Function --
*/
const balances = async () => {
   const balanceFrom = web3.utils.fromWei(
      await web3.eth.getBalance(addressFrom),
      'ether'
   );
   const balanceTo = web3.utils.fromWei(
      await web3.eth.getBalance(addressTo),
      'ether'
   );

   console.log(`The balance of ${addressFrom} is: ${balanceFrom} PRING`);
   console.log(`The balance of ${addressTo} is: ${balanceTo} PRING`);
};

balances();
