---
title: Chainlink
sidebar_position: 2
description: How to use request data from a Chainlink Oracle in your Pangolin Ethereum Dapp using smart contracts or Javascript
---

# Chainlink Oracle

## Introduction

Developers can now use [Chainlink's decentralized Oracle network](https://chain.link/) to fetch data in the Pangolin TestNet. This tutorial goes through two different ways of using Chainlink Oracles:

 - [Basic Request Model](https://docs.chain.link/docs/architecture-request-model), where the end-user sends a request to an Oracle provider, which fetches the data through an API, and fulfils the request storing this data on-chain
 - [Price Feeds](https://docs.chain.link/docs/architecture-decentralized-model), where data is continuously updated by Oracle operators in a smart contract so that other smart contracts can fetch it

## Basic Request Model

Before we go into fetching the data itself, it is important to understand the basics of the "basic request model."

import ChainlinkBRM from '/snippets/text/chainlink/chainlink-brm.md';

<ChainlinkBRM name="chainlinkBRM"/>

### The Client Contract

The Client contract is the element that starts the communication with the Oracle by sending a request. As shown in the diagram, it calls the _transferAndCall_ method from the LINK token contract, but there is more processing that is needed to track the request to the Oracle. For this example, you can use the code in [this file](/snippets/code/chainlink/Client.sol), and deploy it on [Remix](/builders/tools/remix/) to try it out. Let's look at the core functions of the contract:

 - _constructor_: runs when the contract is deployed. It sets the address of the LINK token and the owner of the contract
 - _requestPrice_: needs the Oracle contract address, the job ID, and the payment (in LINK) tokens to the fulfiller of the request. Builds the new request that is sent using the _sendChainlinkRequestTo_ function from the _ChainlinkClient.sol_ import
 - _fulfill_: callback used by the Oracle node to fulfill the request by storing the queried information in the contract

```solidity
pragma solidity 0.6.6;

import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol";
/**
 * @title Client based in ChainlinkClient
 * @notice End users can deploy this contract to request the Prices from an Oracle
 */
contract Client is ChainlinkClient {
  //... there is mode code here

  // Deploy with the address of the LINK token
  constructor(address _link) public {
    // Set the address for the LINK token for the network
    setChainlinkToken(_link);
    owner = msg.sender;
  }

  // Creates Chainlink Request
  function requestPrice(address _oracle, string memory _jobId, uint256 _payment)
    public
    onlyOwner
  {
    // newRequest takes a JobID, a callback address, and callback function as input
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), address(this), this.fulfill.selector);
    // Sends the request with the amount of payment specified to the oracle
    sendChainlinkRequestTo(_oracle, req, _payment);
  }

  // Callback function called by the Oracle when it has resolved the request
  function fulfill(bytes32 _requestId, uint256 _price)
    public
    recordChainlinkFulfillment(_requestId)
  {
    currentPrice = _price;
  }

  //... there is more code here
```

Note that the Client contract must have a LINK tokens balance to be able to pay for this request. However, if you deploy your setup, you can set the LINK value to 0 in your `ChainlinkClient.sol` contract, but you still need to have the LINK token contract deployed.

### Try it on Pangolin

If you want to skip the hurdles of deploying all contracts, setting up your Oracle node, creating job IDs, and so on, we've got you covered.

A custom Client contract on Pangolin that makes all requests to our Oracle contract, with a 0 LINK token payment, is available. These requests are fulfilled by an Oracle node that we are running. You can try it out with the following interface contract and the custom Client contract deployed at `0xab8eC6D46717a2CC91f4394F253a52E9719e308f`:

```solidity
pragma solidity 0.6.6;

/**
 * @title Simple Interface to interact with Universal Client Contract
 * @notice Client Address 0xab8eC6D46717a2CC91f4394F253a52E9719e308f
 */
interface ChainlinkInterface {

  /**
   * @notice Creates a Chainlink request with the job specification ID,
   * @notice and sends it to the Oracle.
   * @param _oracle The address of the Oracle contract fixed top
   * @param _jobId The job spec ID that we want to call in string format
   * @param _payment For this example the PAYMENT is set to zero
   */
    function requestPrice(address _oracle, string calldata _jobId, uint256 _payment) external;

    function currentPrice() external view returns (uint);

}
```

This provides two functions. `requestPrice()` needs the job ID of the data you want to query. This function starts the chain of events explained before. `currentPrice()` is a view function that returns the latest price stored in the contract.

Currently, the Oracle node has a set of Job IDs for different price datas for the following pairs:

|  Base/Quote  |     |                 Job ID Reference                  |
| :----------: | --- | :-----------------------------------------------: |
|  RING to USD |     |  4cda609794884c58a8690d402e80bfea  |
|  BTC to USD  |     |  66f0d2a59b82482799bee1e714d94991  |
|  ETH to USD  |     |  8f032a4cf422438b835f243b96ecfc7a  |
|  DOT to USD  |     |  fd5e3c79e83344d5a6c3de75501a4c54  |
|  KSM to USD  |     |  dd3a14692e68435da5b28b8716d06423  |
| AAVE to USD  |     |  764e831e1d30420ca52aab23c6489319  |
| ALGO to USD  |     |  5fa0cb97996f4e5cbe5954c09c3544b3  |
| BAND to USD  |     |  b494823291974e50bc5d8c6466a18b38  |
| LINK to USD  |     |  bf322091c7d44d418761754d367534d4  |
| SUSHI to USD |     |  5e47777ecc664801a64bd4b23c5e912c |
|  UNI to USD  |     |  ea3111fdc33e4a9c9af8dd0ede87b279  |

Let's go ahead and use the interface contract with the `BTC to USD` Job ID in [Remix](/builders/tools/remix/).

After creating the file and compiling the contract, head to the "Deploy and Run Transactions" tab, enter the Client contract address, and click on "At Address." Make sure you have set the "Environment" to "Injected Web3" so you are connected to Pangolin. This will create an instance of the Client contract that you can interact with. Use the function `requestPrice()` to query the data of the corresponding Job ID. Once the transaction is confirmed, we have to wait until the whole process explained before occurs. We can check the price using the view function `currentPrice()`.

![Chainlink Basic Request on Pangolin](/images/chainlink/chainlink-image1.png)

If there is any specific pair you want us to include, feel free to reach out to us through our [Telegram](https://t.me/DarwiniaDev).

### Run your Client Contract

If you want to run your Client contract but use our Oracle node, you can do so with the following information:

|  Contract Type  |     |                      Address                      |
| :-------------: | --- | :-----------------------------------------------: |
| Oracle Contract |     | 0x97C02719aEf6B70f0abDa6402f9Bb136aFF7043d |
|   LINK Token    |     | 0xbE872fFa86274E9717884394f088C02EE929c18d |

Remember that the LINK token payment is set to zero.

### Other Requests

Chainlink's Oracles can tentatively provide many different types of data feeds with the use of external adapters. However, for simplicity, our Oracle node is configured to deliver only price feeds.

If you are interested in running your own Oracle node in Pangolin, please visit [this guide](https://docs.chain.link/docs/running-a-chainlink-node/). Also, we recommend going through [Chainlink's documentation site](https://docs.chain.link/docs).

