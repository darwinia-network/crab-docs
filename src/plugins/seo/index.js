module.exports = function (context, options) {
    return {
        name: 'docusaurus-plugin',
        injectHtmlTags() {
            return {
                headTags: [{
                    tagName: 'meta',
                    attributes: {
                        name: 'keywords',
                        content: 'polkadot kusama darwinia blockchain bridge dapps solidity bitcoin ethereum',
                    },
                }, {
                    tagName: 'meta',
                    attributes: {
                        name: 'description',
                        content: 'Darwinia Crab network is the canary network for Darwinia. It is the first cross-chain NFT blockchain in the Polkadot ecology, and provides the smart contract solution. Crab is going to participate in the Kusama Parachain Slot Auction.',
                    },
                }],
            };
        },
    };
};
