// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import PermitPrecompile from '@/utils/PermitPrecompile'
import {ethers} from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY);
const abi = new ethers.utils.Interface([
  "function gift()"
]) 

// JSON.stringify doesnt serialize bigint so we need to return it as string...
BigInt.prototype.toJSON = function(){return this.toString()}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BackendResponse>
) {
  
  const precompile = new PermitPrecompile(provider)
  // get the precompile nonce
  const nonce = await precompile.nonceOfAddress(signer.address);
  const encodedData = abi.encodeFunctionData("gift", [])
  const message: CallPermitMessage = {
      from: signer.address,
      to: process.env.ERC721_ADDRESS,
      value: BigInt(0),
      data: encodedData,
      gaslimit: BigInt(500_000),
      nonce: BigInt(nonce),
      deadline: Date.now() + 3600
  }
  const signature = await precompile.sign(message,signer);
  
  res.status(200).json({signature,message})
}
