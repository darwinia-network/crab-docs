module.exports = {
  firstSidebar: {
    "Crab Network": [
      'crab-home', 
      'crab-tools', 
      'crab-crowdloan',
      'crab-parameters'
    ],

    'Tutorials': [
      'crab-tut-create-account',
      'crab-tut-claim-cring',
      'crab-tut-node',
      {
        'Staking': [
          'crab-tut-validator',
          'crab-tut-nominator'
        ]
      },
      'crab-tut-exchange'
    ],

    "DVM": [
      'dvm-intro',
      {
        'Overview': [
          'dvm-address',
          'dvm-system-contract'
        ]
      },
      {
        'Wallets': [
          'dvm-apps',
          'dvm-metamask', 
          {
            'Smart App':[
              'dvm-smart-app',
              'dvm-deposit',
              'dvm-withdraw'
            ]
          }
        ]
      },
      // 'dvm-deposit',
      // 'dvm-withdraw',
      'dvm-explorer',
      {
        'Interaction': [
          'dvm-rpc',
          {
            'Contract': [
              'dvm-remix',
              'dvm-web3-contract',
              'dvm-web3-transfer'
            ]
          }
        ]
      },
      'dvm-eco'
    ],                  

    'Pangolin Testnet': [
      'pangolin-home',
      {
        'Bridges': [
          'pangolin-bridge-ropsten'
        ]
      }
    ]
  },

};
