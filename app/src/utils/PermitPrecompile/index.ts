import {ethers} from "ethers"

export default class PermitPrecompile {
    readonly address = "0x000000000000000000000000000000000000080a";
    readonly abi = [
        "function dispatch(address from, address to, uint256 value, bytes memory data, uint64 gaslimit, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external returns (bytes memory output)",
        "function nonces(address owner) external view returns (uint256)",
        "function DOMAIN_SEPARATOR() external view returns (bytes32)"
    ]
    private readonly domain = {
        name: 'Call Permit Precompile',
        version: '1',
        chainId: 1287,
        verifyingContract: '0x000000000000000000000000000000000000080a',
    }
    private readonly types = {
        CallPermit: [
            {
                name: 'from',
                type: 'address',
            },
            {
                name: 'to',
                type: 'address',
            },
            {
                name: 'value',
                type: 'uint256',
            },
            {
                name: 'data',
                type: 'bytes',
            },
            {
                name: 'gaslimit',
                type: 'uint64',
            },
            {
                name: 'nonce',
                type: 'uint256',
            },
            {
                name: 'deadline',
                type: 'uint256',
            },
        ],
    }
    contract: ethers.Contract
    provider: ethers.providers.Provider

    constructor(provider: ethers.providers.Provider, chainId: 1284 | 1285 | 1287 = 1287) {
        this.contract = new ethers.Contract(this.address, this.abi, provider)
        this.provider = provider
        this.domain.chainId = chainId
    }

    async nonceOfAddress(address: string) {
        if (!ethers.utils.isAddress(address)) throw Error("[Permitprecompile.nonceOfAddress]:invalid address")
        const nonce = await this.contract.nonces(address);
        return nonce
    }

    async sign(message: CallPermitMessage, signer: ethers.Wallet) {
        const signature = await signer._signTypedData(this.domain, this.types, message);
        //const ethersSignature = ethers.Signature.from(signature); // ethers v6
        const ethersSignature = ethers.utils.splitSignature(signature)        
        const formattedSignature = {
            signature,
            r: ethersSignature.r,
            s: ethersSignature.s,
            v: ethersSignature.v,
        };
        return formattedSignature
    }

}
