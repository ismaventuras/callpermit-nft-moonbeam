# Call Permit NFT Moonbeam

The smart contract uses the Call Permit precompile to implement Lazy Minting pattern.
Based on [Interacting with the Call Permit Precompile](https://docs.moonbeam.network/builders/pallets-precompiles/precompiles/call-permit/) by Moonbeam team.

- Deployed on: Moonbase Alpha
- Faucet: [Link](https://apps.moonbeam.network/moonbase-alpha/faucet/)
- Demo on vercel: [Link](https://callpermit-nft-moonbeam.vercel.app/)

## Run locally

```bash
# clone repo
git clone https://github.com/ismaventuras/callpermit-nft-moonbeam.git .
# copy .env file
cp .env.example .env
# install dependencies
npm install
```

Add your private key and moonscan api key on .env file then run `npm run deploy` to deploy the contract to moonbeam. Then copy the contract address to .env file.

Replace the RPC or the ipfs url for your own if you need to and run `npm run dev` to start the web server.
