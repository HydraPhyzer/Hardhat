/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
require('dotenv').config()

module.exports = {
  
  networks:{
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`,
      accounts:[`${process.env.PRIVATE_KEY}`]
    }
  },
  solidity: "0.8.19",
};
