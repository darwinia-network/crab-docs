from compile import abi, bytecode
from web3 import Web3

#
# -- Define Provider & Variables --
#
# Provider
provider_rpc = {
    'development': 'http://localhost:9933',
    "pangolin": 'https://pangolin-rpc.darwinia.network',
    "crab": 'https://crab-rpc.darwinia.network',
}
web3 = Web3(Web3.HTTPProvider(provider_rpc["development"]))  # Change to correct network

# Variables
account_from = {
    'private_key': 'YOUR-PRIVATE-KEY-HERE',
    'address': 'PUBLIC-ADDRESS-OF-PK-HERE',
}
contract_address = 'CONTRACT-ADDRESS-HERE'
value = 3

#
#  -- Send Function --
#
print(
    f'Calling the increment by { value } function in contract at address: { contract_address }'
)

# Create Contract Instance
Incrementer = web3.eth.contract(address=contract_address, abi=abi)

# Build Increment Tx
increment_tx = Incrementer.functions.increment(value).buildTransaction(
    {
        'from': account_from['address'],
        'nonce': web3.eth.getTransactionCount(account_from['address']),
    }
)

# Sign Tx with PK
tx_create = web3.eth.account.signTransaction(increment_tx, account_from['private_key'])

# Send Tx and Wait for Receipt
tx_hash = web3.eth.sendRawTransaction(tx_create.rawTransaction)
tx_receipt = web3.eth.waitForTransactionReceipt(tx_hash)

print(f'Tx successful with hash: { tx_receipt.transactionHash.hex() }')
