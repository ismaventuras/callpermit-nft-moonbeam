type CustomSignatureType = {
    signature:string;
    r:string;
    s:string;
    v:number;
}
type BackendResponse = {
    message: CallPermitMessage,
    signature: CustomSignatureType
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface BigInt {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string;
  }