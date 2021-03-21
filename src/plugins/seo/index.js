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
                        content: 'Crab Network (Crab for short) is a Canary Network for Darwinia. The positioning of Crab is similar to Polkadot’s Kusama Network. Expect Chaos is a reasonable expectation.',
                    },
                }],
            };
        },
    };
};
