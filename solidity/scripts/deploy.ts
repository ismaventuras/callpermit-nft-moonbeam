import { ethers , network} from "hardhat";

async function main() {

  const [owner,] = await ethers.getSigners()
  const contract = await ethers.getContractFactory("CallPermitNFT"); 
  const uri = process.env.NEXT_PUBLIC_NFT_URI
  const instance = await contract.deploy(owner.address,uri);  
  await instance.deployed();      

  console.log(`contract deployed to ${instance.address}`);
  console.log(`verify: npm run verify -- -- --network moonbaseAlpha ${instance.address} ${owner.address} ${uri}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
