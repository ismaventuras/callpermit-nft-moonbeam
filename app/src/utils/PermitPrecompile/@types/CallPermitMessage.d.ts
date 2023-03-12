type CallPermitMessage = {
    // the address of the message signer
    from: string;
    // destination contract address
    to: string;
    // funds to be sent
    value: BigInt;
    // encoded contract function and arguments
    data: string;
    // gas limit for the call
    gaslimit: BigInt;
    // precompile nonce - do not confuse with evm nonce
    nonce: BigInt;
    // unix timestamp until when the permit will be available
    deadline: number;
}