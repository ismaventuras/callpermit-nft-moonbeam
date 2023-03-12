import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks:{
    moonbaseAlpha:{
      url:process.env.RPC,
      accounts:[process.env.PRIVATE_KEY]
    }
  },
  etherscan:{
    apiKey:{
      moonbaseAlpha:process.env.ETHERSCAN_API_KEY
    }
  }
};

export default config;
